#!/usr/bin/env node

/**
 * Generate Mintlify-compatible markdown documentation
 * from TypeScript source and interface files
 *
 * Usage: node scripts/generate-mintlify-docs.js [options]
 * Options:
 *   --output, -o   Output directory (default: docs)
 *   --src           Source directory (default: src)
 *   --interfaces    Interfaces directory (default: interfaces)
 *   --help          Show this help message
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Configuration
const config = {
  outputDir: path.resolve(projectRoot, '../../docs/customize/login-pages/advanced-customizations/reference/js-sdk'),
  srcDir: path.resolve(projectRoot, 'src'),
  interfacesDir: path.resolve(projectRoot, 'interfaces'),
  examplesDir: path.resolve(projectRoot, 'examples'),
  tsconfigPath: path.resolve(projectRoot, 'tsconfig.json'),
};

// Parse command line arguments
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output' || args[i] === '-o') {
    config.outputDir = path.resolve(args[++i]);
  } else if (args[i] === '--src') {
    config.srcDir = path.resolve(args[++i]);
  } else if (args[i] === '--interfaces') {
    config.interfacesDir = path.resolve(args[++i]);
  } else if (args[i] === '--help') {
    console.log(`
Generate Mintlify-compatible markdown documentation

Usage: node scripts/generate-mintlify-docs.js [options]

Options:
  --output, -o PATH    Output directory (default: docs)
  --src PATH          Source directory (default: src)
  --interfaces PATH   Interfaces directory (default: interfaces)
  --help              Show this help message
    `);
    process.exit(0);
  }
}

// Utility functions
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
}

function getFiles(dir, ext = '.ts') {
  const files = [];

  function walk(currentPath) {
    if (!fs.existsSync(currentPath)) return;

    const entries = fs.readdirSync(currentPath);

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !entry.startsWith('.')) {
        walk(fullPath);
      } else if (stat.isFile() && fullPath.endsWith(ext)) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function extractCodeBlocksFromExample(name) {
  // Convert name to kebab-case and find matching example file
  const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  const examplePath = path.join(config.examplesDir, `${kebabName}.md`);

  if (!fs.existsSync(examplePath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(examplePath, 'utf-8');
    const codeBlocks = [];

    // Split by lines to track headers
    const lines = content.split('\n');
    let lastHeader = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Track headers (### or ## level)
      if (line.match(/^#+\s/)) {
        lastHeader = line.replace(/^#+\s/, '').trim();
        continue;
      }

      // Match code blocks
      if (line.startsWith('```')) {
        const match = line.match(/^```(\w+)/);
        if (match) {
          const language = match[1];
          const title = lastHeader || language;
          let code = '';
          let j = i + 1;

          // Collect all lines until closing ```
          while (j < lines.length && !lines[j].startsWith('```')) {
            code += (code ? '\n' : '') + lines[j];
            j++;
          }

          codeBlocks.push({
            language,
            title,
            code: code.trim(),
          });

          i = j; // Skip to the closing ```
        }
      }
    }

    return codeBlocks;
  } catch (error) {
    return [];
  }
}

function extractJSDoc(sourceFile, node) {
  const fullText = sourceFile.getFullText();
  const start = node.getStart(sourceFile, true); // Get the start with leading trivia
  const actualStart = node.getStart(); // Get start without leading trivia

  // Get text from last newline before the actual start to the actual start
  // This ensures we only get comments immediately before this node
  const beforeText = fullText.substring(0, actualStart);

  // Find the last /** ... */ comment that appears immediately before this node
  // by looking only in the section after the previous non-whitespace token
  const lines = beforeText.split('\n');
  const lineWithNode =
    beforeText.substring(0, actualStart).split('\n').length - 1;

  // Search upward from current line to find JSDoc
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];

    // Skip empty lines and lines with just whitespace
    if (!line.trim()) continue;

    // If we find a JSDoc block, process it
    if (line.includes('*/')) {
      // Found the end of a comment, now find the start
      for (let j = i; j >= 0; j--) {
        if (lines[j].includes('/**')) {
          // Found the start, extract the full comment
          const comment = lines.slice(j, i + 1).join('\n');
          let extracted = comment
            .split('\n')
            .map((l) => l.replace(/^\s*\*\s?/, '').trim())
            .filter((l) => l && l !== '/**' && l !== '*/')
            .join('\n');

          // Extract description text, handling @remarks and @example tags specially
          // First, try to extract @remarks content (text immediately after @remarks)
          let cleaned = '';

          // Look for @remarks followed by description text
          const remarksMatch = extracted.match(/@remarks\s+([\s\S]*?)(?=\n\s*@|\n\s*$)/);
          if (remarksMatch && remarksMatch[1]) {
            cleaned = remarksMatch[1].trim();
          } else {
            // If no @remarks, get the first paragraph before any @tag
            const parts = extracted.split(/\n\s*@/);
            let firstParagraph = parts[0] || '';

            // Also split by empty lines to get just the first paragraph
            const paragraphs = firstParagraph.split(/\n\s*\n/);
            cleaned = paragraphs[0].trim();

            // If what we got is only @example or empty, return null (no description)
            if (!cleaned || cleaned.toLowerCase().startsWith('@example') || cleaned.toLowerCase().startsWith('example')) {
              return null;
            }
          }

          // Remove JSDoc syntax patterns
          cleaned = cleaned
            .replace(/\/\*\*\s*/, '')
            .replace(/\*\/\s*$/, '')
            .trim();
          cleaned = cleaned.replace(/\{[^}]+\}\s*/g, ''); // Remove type annotations {Type}
          cleaned = cleaned.replace(/@property\s+\w+\s*-?\s*/g, ''); // Remove @property tag
          cleaned = cleaned.replace(/\/\*\*[\s\S]*?\*\//g, ''); // Remove nested comments

          return cleaned.trim() || null;
        }
      }
      break;
    } else if (
      !line.includes('/**') &&
      line.trim() &&
      !line.trim().startsWith('//')
    ) {
      // Hit a non-comment line, stop searching
      break;
    }
  }

  return null;
}

function parseTypeScriptFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
  );

  const classes = [];
  const interfaces = [];
  const types = [];
  const functions = [];
  const enums = [];

  function visit(node) {
    if (ts.isClassDeclaration(node) && node.name) {
      const jsDoc = extractJSDoc(sourceFile, node);
      const members = [];
      let extendsClass = null;

      // Check for extends clause
      if (node.heritageClauses) {
        for (const clause of node.heritageClauses) {
          if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
            extendsClass = clause.types[0]?.expression.getText() || null;
          }
        }
      }

      for (const member of node.members) {
        if (ts.isPropertyDeclaration(member)) {
          const memberJsDoc = extractJSDoc(sourceFile, member);
          const memberName = member.name?.getText() || 'unknown';
          // Check if property is optional (has ? modifier)
          const isOptional = member.questionToken !== undefined;
          members.push({
            name: memberName,
            type: member.type?.getText() || 'any',
            description: memberJsDoc || '',
            isInherited: false,
            isOptional: isOptional,
            isMethod: false,
          });
        } else if (ts.isMethodDeclaration(member)) {
          const memberJsDoc = extractJSDoc(sourceFile, member);
          const memberName = member.name?.getText() || 'unknown';
          const params = member.parameters.map((p) => ({
            name: p.name?.getText() || 'unknown',
            type: p.type?.getText() || 'any',
            isOptional: p.questionToken !== undefined,
          }));
          members.push({
            name: memberName,
            type: member.type?.getText() || 'void',
            description: memberJsDoc || '',
            isInherited: false,
            isMethod: true,
            params: params,
          });
        }
      }

      classes.push({
        name: node.name.getText(),
        description: jsDoc || '',
        members,
        extendsClass,
        filePath,
      });
    } else if (ts.isInterfaceDeclaration(node) && node.name) {
      const jsDoc = extractJSDoc(sourceFile, node);
      const members = [];
      let extendsInterface = null;

      // Check for extends clause
      if (node.heritageClauses) {
        for (const clause of node.heritageClauses) {
          if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
            extendsInterface = clause.types[0]?.expression.getText() || null;
          }
        }
      }

      for (const member of node.members) {
        const memberJsDoc = extractJSDoc(sourceFile, member);
        const memberName = member.name?.getText() || 'unknown';
        // Check if property is optional (has ? modifier)
        const isOptional = member.questionToken !== undefined;
        members.push({
          name: memberName,
          type: member.type?.getText() || 'any',
          description: memberJsDoc || '',
          isOptional: isOptional,
          isInherited: false,
        });
      }

      // Get the interface definition text
      const interfaceText = node.getText(sourceFile);

      interfaces.push({
        name: node.name.getText(),
        description: jsDoc || '',
        members,
        extendsInterface,
        filePath,
        definition: interfaceText,
      });
    } else if (ts.isTypeAliasDeclaration(node) && node.name) {
      const jsDoc = extractJSDoc(sourceFile, node);
      types.push({
        name: node.name.getText(),
        description: jsDoc || '',
        type: node.type.getText(),
        filePath,
      });
    } else if (ts.isFunctionDeclaration(node) && node.name) {
      const jsDoc = extractJSDoc(sourceFile, node);
      const params = node.parameters.map((p) => ({
        name: p.name?.getText() || 'unknown',
        type: p.type?.getText() || 'any',
        isOptional: p.questionToken !== undefined,
      }));

      functions.push({
        name: node.name.getText(),
        description: jsDoc || '',
        params,
        returns: node.type?.getText() || 'void',
        filePath,
      });
    } else if (ts.isEnumDeclaration(node) && node.name) {
      const jsDoc = extractJSDoc(sourceFile, node);
      const members = [];

      for (const member of node.members) {
        members.push({
          name: member.name?.getText() || 'unknown',
          value: member.initializer?.getText() || '',
        });
      }

      enums.push({
        name: node.name.getText(),
        description: jsDoc || '',
        members,
        filePath,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return { classes, interfaces, types, functions, enums };
}

// Cache for resolved classes to handle inheritance
const classCache = new Map();

function resolveClassInheritance(classItem, allClasses) {
  if (!classItem.extendsClass) {
    return classItem;
  }

  const parentClassName = classItem.extendsClass;
  const parentClass = allClasses.find((c) => c.name === parentClassName);

  if (!parentClass) {
    // Parent not found in parsed files, return as-is
    return classItem;
  }

  // Recursively resolve parent inheritance
  const resolvedParent = resolveClassInheritance(parentClass, allClasses);

  // Merge parent members with current members
  const inheritedMembers = resolvedParent.members.map((m) => ({
    ...m,
    isInherited: true,
  }));

  // Don't duplicate members - own members override inherited
  const ownMemberNames = new Set(classItem.members.map((m) => m.name));
  const uniqueInheritedMembers = inheritedMembers.filter(
    (m) => !ownMemberNames.has(m.name),
  );

  return {
    ...classItem,
    members: [...classItem.members, ...uniqueInheritedMembers],
    parentClass: resolvedParent,
  };
}

function resolveInterfaceInheritance(interfaceItem, allInterfaces) {
  if (!interfaceItem.extendsInterface) {
    return interfaceItem;
  }

  const parentInterfaceName = interfaceItem.extendsInterface;
  const parentInterface = allInterfaces.find(
    (i) => i.name === parentInterfaceName,
  );

  if (!parentInterface) {
    // Parent not found in parsed files, return as-is
    return interfaceItem;
  }

  // Recursively resolve parent inheritance
  const resolvedParent = resolveInterfaceInheritance(
    parentInterface,
    allInterfaces,
  );

  // Merge parent members with current members
  const inheritedMembers = resolvedParent.members.map((m) => ({
    ...m,
    isInherited: true,
  }));

  // Don't duplicate members - own members override inherited
  const ownMemberNames = new Set(interfaceItem.members.map((m) => m.name));
  const uniqueInheritedMembers = inheritedMembers.filter(
    (m) => !ownMemberNames.has(m.name),
  );

  return {
    ...interfaceItem,
    members: [...interfaceItem.members, ...uniqueInheritedMembers],
    parentInterface: resolvedParent,
  };
}

function cleanDescription(text) {
  if (!text) return '';
  // Remove trailing slashes
  let cleaned = text.replace(/\s*\/+\s*$/, '').trim();
  // Remove @class tags that appear in inherited descriptions
  cleaned = cleaned.replace(/@class\s+\w+\s*/g, '').trim();
  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

function normalizeType(type) {
  if (!type) return 'any';
  // Convert double quotes to single quotes to avoid breaking JSX attributes
  return type.replace(/"/g, "'");
}

function escapeGenericBrackets(type) {
  // Escape angle brackets in generic types like Record<K, V>, Array<T>, etc.
  // This must be done BEFORE adding links and spans to prevent breaking HTML
  // We need to be careful not to escape brackets that are part of HTML tags
  if (!type) return type;

  // Split by HTML tags to avoid escaping brackets inside tags
  // Match real HTML tags: <tag>, </tag>, <tag attr="value">, etc.
  // Key difference: HTML tags have either:
  // - A slash: </
  // - An equal sign (attribute): =
  // - Whitespace followed by a known tag name
  const parts = type.split(
    /(<\s*\/\s*[a-zA-Z][a-zA-Z0-9]*\s*>|<\s*[a-z][a-zA-Z0-9]*(?:\s+[^>]*)?=.*?>)/g,
  );

  return parts
    .map((part, index) => {
      // Even indices are non-tag parts, odd indices are HTML tags
      if (index % 2 === 0) {
        // This is not an HTML tag - escape angle brackets
        return part.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
        // This is an HTML tag - leave it as is
        return part;
      }
    })
    .join('');
}

function isTypeOptionalByNullable(type) {
  if (!type) return false;
  // Check if type contains | null or | undefined
  return /\|\s*(null|undefined)/.test(type);
}

function extractTypeNames(fullType) {
  // Extract type names from complex types like "string | null", "Array<Type>", "Record<string, Type>", etc.
  const typeNames = [];
  // Match PascalCase identifiers (class/interface names)
  const matches = fullType.match(/\b[A-Z][a-zA-Z0-9]*\b/g);
  if (matches) {
    typeNames.push(...matches);
  }
  return [...new Set(typeNames)]; // Remove duplicates
}

function generateTypeWithLinks(
  fullType,
  allClassNames,
  allInterfaceNames,
  normalizedType,
) {
  if (!fullType) {
    return { type: normalizedType, hasLinks: false };
  }

  const typeNames = extractTypeNames(fullType);
  let result = normalizedType;
  let hasLinks = false;

  // Sort by length descending to replace longest matches first to avoid partial replacements
  typeNames.sort((a, b) => b.length - a.length);

  for (const typeName of typeNames) {
    // Check if this type is a known class or interface
    const isClass = allClassNames.has(typeName);
    const isInterface = allInterfaceNames.has(typeName);

    if (isClass || isInterface) {
      hasLinks = true;
      const path = isClass ? '/docs/customize/login-pages/advanced-customizations/reference/js-sdk/classes' : '/docs/customize/login-pages/advanced-customizations/reference/js-sdk/interfaces';

      // Pattern to match: TypeName with optional array brackets
      // This handles: TypeName, TypeName[], TypeName[][], etc.
      // But NOT inside parentheses (we'll handle those separately)
      const pattern = `(?<![\\/]>)\\b${typeName}(\\[\\])*(?![\\/]>)`;
      const regex = new RegExp(pattern, 'g');

      result = result.replace(regex, (match) => {
        // match will be like "TypeName" or "TypeName[]" or "TypeName[][]"
        return `<a href="${path}/${typeName}">${match}</a>`;
      });
    }
  }

  return { type: result, hasLinks };
}

function isInlineObjectType(type) {
  if (!type) return false;
  // Check if type starts with { and contains property definitions
  return /^\s*\{[\s\S]*:[\s\S]*\}/.test(type);
}

function isArrayOfObjects(type) {
  if (!type) return false;
  // Check if type is like [ { ... }, ] or Array< { ... } >
  // Match patterns like: [ { ... } ], [ { ... }, ], or Array<{ ... }>
  return /^\s*\[[\s\S]*\{[\s\S]*:[\s\S]*\}[\s\S]*\]|^\s*Array\s*<[\s\S]*\{[\s\S]*:[\s\S]*\}[\s\S]*>/.test(
    type,
  );
}

function extractObjectFromArray(type) {
  // Extracts the object from an array type like [ { type: string; alg: number; }, ] or Array<{ ... }>
  let depth = 0;
  let objectStart = -1;
  let objectEnd = -1;

  for (let i = 0; i < type.length; i++) {
    const char = type[i];

    if (char === '{') {
      if (depth === 0) {
        objectStart = i;
      }
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0 && objectStart !== -1) {
        objectEnd = i + 1;
        break;
      }
    }
  }

  if (objectStart === -1 || objectEnd === -1) return null;

  return type.substring(objectStart, objectEnd);
}

function extractObjectFromUnionType(type) {
  // Extracts an object type from a union type like "string | { ... }"
  // Returns the object part if found, null otherwise
  if (!type.includes('|')) return null;

  // Find the object literal in the union type
  let depth = 0;
  let objectStart = -1;
  let objectEnd = -1;

  for (let i = 0; i < type.length; i++) {
    const char = type[i];

    if (char === '{') {
      if (depth === 0) {
        objectStart = i;
      }
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0 && objectStart !== -1) {
        objectEnd = i + 1;
        break;
      }
    }
  }

  if (objectStart === -1 || objectEnd === -1) return null;

  return type.substring(objectStart, objectEnd);
}

function getTypeWithoutObject(type) {
  // Returns the type string with object parts removed from union
  // e.g., "string | { ... }" becomes "string"
  if (!type.includes('|')) return type;

  // Remove object literals from the union
  let depth = 0;
  let inObject = false;
  let output = '';

  for (let i = 0; i < type.length; i++) {
    const char = type[i];

    if (char === '{') {
      depth++;
      inObject = true;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        inObject = false;
      }
      // Don't include the closing brace
      continue;
    }

    if (!inObject) {
      output += char;
    }
  }

  // Clean up pipes and whitespace
  const result = output
    .split('|')
    .map((s) => s.trim())
    .filter((s) => s && s !== '') // Filter out empty strings and standalone braces
    .join(' | ');

  return result || 'object';
}

function parseObjectTypeProperties(typeStr) {
  // Parse inline object type string and extract properties
  // Format: { propName?: type; propName2: type; ... }
  const properties = [];

  // Remove outer braces and normalize whitespace
  let content = typeStr.replace(/^\s*\{\s*/, '').replace(/\s*\}\s*$/, '');

  // Normalize newlines and extra whitespace while preserving structure
  content = content.replace(/\n\s*/g, ' ').trim();

  // Split by semicolon but respect nested braces and pipes (|)
  let depth = 0;
  let pipePipeParen = 0;
  let current = '';

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (char === '{') depth++;
    else if (char === '}') depth--;
    else if (char === '<') pipePipeParen++;
    else if (char === '>') pipePipeParen--;
    else if (char === ';' && depth === 0 && pipePipeParen === 0) {
      if (current.trim()) {
        properties.push(current.trim());
      }
      current = '';
      continue;
    }

    current += char;
  }

  // Don't forget the last property (if no trailing semicolon)
  if (current.trim()) {
    properties.push(current.trim());
  }

  // Parse each property into name, optional flag, and type
  return properties
    .map((prop) => {
      // Match: name with optional colon, followed by type
      // Handle patterns like: "colors?: { ... }" or "primary?: string"
      const match = prop.match(/^(\w+)(\?)?\s*:\s*(.+)$/);
      if (!match) return null;

      let type = match[3].trim();
      // Remove leading pipes from union types that start with |
      type = type.replace(/^\|\s*/, '');

      return {
        name: match[1],
        isOptional: !!match[2],
        type: type,
      };
    })
    .filter(Boolean);
}

function generateNestedParamFields(
  properties,
  allClassNames,
  allInterfaceNames,
  indentLevel = 1,
) {
  // Generate nested ParamField elements for object properties
  const indent = '  '.repeat(indentLevel);
  const nextIndent = '  '.repeat(indentLevel + 1);
  let mdx = '';

  for (const prop of properties) {
    const isNullable = isTypeOptionalByNullable(prop.type);
    const isOptional = prop.isOptional || isNullable;
    const required = !isOptional ? ' required' : '';
    const normalizedType = escapeGenericBrackets(normalizeType(prop.type));

    // Check if this property is itself an object type
    const isObjectProp = isInlineObjectType(prop.type);

    // Check if this is an array of objects
    const isArrayOfObjectsProp = !isObjectProp
      ? isArrayOfObjects(prop.type)
      : false;

    // Check if this is a union type that contains an object
    const objectInUnion =
      !isObjectProp && !isArrayOfObjectsProp
        ? extractObjectFromUnionType(prop.type)
        : null;

    if (isObjectProp) {
      // Pure object type
      const nestedProps = parseObjectTypeProperties(prop.type);
      mdx += `${indent}<ParamField path="${prop.name}" type="object"${required}>\n`;
      mdx += `${nextIndent}<Expandable title="properties">\n`;
      mdx += generateNestedParamFields(
        nestedProps,
        allClassNames,
        allInterfaceNames,
        indentLevel + 2,
      );
      mdx += `${nextIndent}</Expandable>\n`;
      mdx += `${indent}</ParamField>\n`;
    } else if (isArrayOfObjectsProp) {
      // Array of objects (e.g., [ { type: string; ... }, ])
      const objectType = extractObjectFromArray(prop.type);
      const nestedProps = parseObjectTypeProperties(objectType);
      mdx += `${indent}<ParamField path="${prop.name}" type={<span>array of objects</span>}${required}>\n`;
      mdx += `${nextIndent}<Expandable title="properties">\n`;
      mdx += generateNestedParamFields(
        nestedProps,
        allClassNames,
        allInterfaceNames,
        indentLevel + 2,
      );
      mdx += `${nextIndent}</Expandable>\n`;
      mdx += `${indent}</ParamField>\n`;
    } else if (objectInUnion) {
      // Union type containing an object (e.g., "string | { ... }")
      const typeWithoutObj = getTypeWithoutObject(prop.type);
      const nestedProps = parseObjectTypeProperties(objectInUnion);
      const baseNormalizedType = escapeGenericBrackets(
        normalizeType(typeWithoutObj),
      );
      const { type: typeValue, hasLinks } = generateTypeWithLinks(
        typeWithoutObj,
        allClassNames,
        allInterfaceNames,
        baseNormalizedType,
      );
      const typeAttr = `{<span>${typeValue} | object</span>}`;

      mdx += `${indent}<ParamField path="${prop.name}" type=${typeAttr}${required}>\n`;
      mdx += `${nextIndent}<Expandable title="properties">\n`;
      mdx += generateNestedParamFields(
        nestedProps,
        allClassNames,
        allInterfaceNames,
        indentLevel + 2,
      );
      mdx += `${nextIndent}</Expandable>\n`;
      mdx += `${indent}</ParamField>\n`;
    } else {
      // Regular type
      const { type: typeValue, hasLinks } = generateTypeWithLinks(
        prop.type,
        allClassNames,
        allInterfaceNames,
        normalizedType,
      );
      const typeAttr = `{<span>${typeValue}</span>}`;
      mdx += `${indent}<ParamField path="${prop.name}" type=${typeAttr}${required}>\n`;
      mdx += `${indent}</ParamField>\n`;
    }
  }

  return mdx;
}

function generateMintlifyMarkdown(
  item,
  type,
  allClassNames = new Set(),
  allInterfaceNames = new Set(),
) {
  // Create frontmatter
  const displayName = item.name;
  const frontmatter = {
    title: displayName,
    description: cleanDescription(item.description || ''),
  };

  let mdx = `---
title: "${frontmatter.title.replace(/"/g, '\\"')}"
description: "${frontmatter.description.replace(/"/g, '\\"')}"
---

`;

  // Add description only if it exists and is different from frontmatter description
  // This avoids duplicating the same text in both frontmatter and body
  if (
    item.description &&
    cleanDescription(item.description) !== frontmatter.description
  ) {
    mdx += `${cleanDescription(item.description)}\n\n`;
  }

  // Add type-specific content
  if (type === 'class') {
    // Add examples from the examples folder
    const codeBlocks = extractCodeBlocksFromExample(item.name);
    if (codeBlocks.length > 0) {
      mdx += `<RequestExample>\n\n`;
      for (const block of codeBlocks) {
        mdx += `\`\`\`${block.language} ${block.title} lines\n${block.code}\n\`\`\`\n\n`;
      }
      mdx += `</RequestExample>\n\n`;
    }

    // Separate properties and methods
    const properties = item.members ? item.members.filter(m => !m.isMethod) : [];
    const methods = item.members ? item.members.filter(m => m.isMethod) : [];

    // Add Properties section
    if (properties.length > 0) {
      mdx += '## Properties\n\n';
      for (const member of properties) {
        const desc = member.description
          ? cleanDescription(member.description)
          : '';
        const isNullable = isTypeOptionalByNullable(member.type);
        const required = !member.isOptional && !isNullable ? ' required' : '';
        const normalizedType = escapeGenericBrackets(
          normalizeType(member.type),
        );

        // Check if this is an inline object type
        const isObjectType = isInlineObjectType(member.type);

        // Check if this is an array of objects
        const isArrayOfObjectsType = !isObjectType
          ? isArrayOfObjects(member.type)
          : false;

        // Check if this is a union type that contains an object
        const objectInUnion =
          !isObjectType && !isArrayOfObjectsType
            ? extractObjectFromUnionType(member.type)
            : null;

        if (isObjectType) {
          const nestedProps = parseObjectTypeProperties(member.type);
          mdx += `<ParamField path="${member.name}" type="object"${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else if (isArrayOfObjectsType) {
          // Array of objects (e.g., [ { type: string; ... }, ])
          const objectType = extractObjectFromArray(member.type);
          const nestedProps = parseObjectTypeProperties(objectType);
          mdx += `<ParamField path="${member.name}" type={<span>array of objects</span>}${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else if (objectInUnion) {
          // Union type containing an object (e.g., "Interface | { ... }")
          const typeWithoutObj = getTypeWithoutObject(member.type);
          const nestedProps = parseObjectTypeProperties(objectInUnion);
          const baseNormalizedType = escapeGenericBrackets(
            normalizeType(typeWithoutObj),
          );
          const { type: typeValue, hasLinks } = generateTypeWithLinks(
            typeWithoutObj,
            allClassNames,
            allInterfaceNames,
            baseNormalizedType,
          );
          const typeAttr = `{<span>${typeValue} | object</span>}`;

          mdx += `<ParamField path="${member.name}" type=${typeAttr}${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else {
          const { type: typeValue, hasLinks } = generateTypeWithLinks(
            member.type,
            allClassNames,
            allInterfaceNames,
            normalizedType,
          );
          const typeAttr = `{<span>${typeValue}</span>}`;
          mdx += `<ParamField path="${member.name}" type=${typeAttr}${required}>\n`;
          if (desc) {
            mdx += `  ${desc}\n`;
          }
          mdx += `</ParamField>\n\n`;
        }
      }
    }

    // Add Methods section
    if (methods.length > 0) {
      mdx += '## Methods\n\n';
      for (const method of methods) {
        const desc = method.description
          ? cleanDescription(method.description)
          : '';

        // Get return type - methods should return the type annotation if it exists
        const returnType = method.type || 'void';
        const normalizedReturnType = escapeGenericBrackets(
          normalizeType(returnType),
        );
        const { type: returnTypeValue } = generateTypeWithLinks(
          returnType,
          allClassNames,
          allInterfaceNames,
          normalizedReturnType,
        );

        // Create ParamField for the method with return type
        mdx += `<ParamField path="${method.name}" type={<span>${returnTypeValue}</span>}>\n`;
        if (desc) {
          mdx += `  ${desc}\n\n`;
        }

        // Add parameters if any
        if (method.params && method.params.length > 0) {
          mdx += `  <Expandable title="parameters">\n`;
          for (const param of method.params) {
            const isNullable = isTypeOptionalByNullable(param.type);
            const required = !param.isOptional && !isNullable ? ' required' : '';
            const normalizedType = escapeGenericBrackets(
              normalizeType(param.type),
            );
            const { type: typeValue } = generateTypeWithLinks(
              param.type,
              allClassNames,
              allInterfaceNames,
              normalizedType,
            );
            mdx += `    <ParamField path="${param.name}" type={<span>${typeValue}</span>}${required}>\n`;
            mdx += `    </ParamField>\n`;
          }
          mdx += `  </Expandable>\n`;
        }

        mdx += `</ParamField>\n\n`;
      }
    }
  } else if (type === 'interface') {
    // Add interface definition and examples wrapped in RequestExample
    const codeBlocks = extractCodeBlocksFromExample(item.name);
    const hasDefinitionOrExamples = item.definition || codeBlocks.length > 0;

    if (hasDefinitionOrExamples) {
      mdx += `<RequestExample>\n\n`;

      // Add interface definition first
      if (item.definition) {
        mdx += `\`\`\`typescript Interface lines\n${item.definition}\n\`\`\`\n\n`;
      }

      // Add example code blocks
      for (const block of codeBlocks) {
        mdx += `\`\`\`${block.language} ${block.title}\n${block.code}\n\`\`\`\n\n`;
      }

      mdx += `</RequestExample>\n\n`;
    }

    mdx += '## Properties\n\n';
    if (item.members && item.members.length > 0) {
      for (const member of item.members) {
        const desc = member.description
          ? cleanDescription(member.description.replace(/\n/g, ' '))
          : '';
        const isNullable = isTypeOptionalByNullable(member.type);
        const required = !member.isOptional && !isNullable ? ' required' : '';
        const normalizedType = escapeGenericBrackets(
          normalizeType(member.type),
        );

        // Check if this is an inline object type
        const isObjectType = isInlineObjectType(member.type);

        // Check if this is an array of objects
        const isArrayOfObjectsType = !isObjectType
          ? isArrayOfObjects(member.type)
          : false;

        // Check if this is a union type that contains an object
        const objectInUnion =
          !isObjectType && !isArrayOfObjectsType
            ? extractObjectFromUnionType(member.type)
            : null;

        if (isObjectType) {
          const nestedProps = parseObjectTypeProperties(member.type);
          mdx += `<ParamField path="${member.name}" type="object"${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else if (isArrayOfObjectsType) {
          // Array of objects (e.g., [ { type: string; ... }, ])
          const objectType = extractObjectFromArray(member.type);
          const nestedProps = parseObjectTypeProperties(objectType);
          mdx += `<ParamField path="${member.name}" type={<span>array of objects</span>}${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          if (desc) {
            mdx += `  ${desc}\n`;
          }
          mdx += `</ParamField>\n\n`;
        } else if (objectInUnion) {
          // Union type containing an object (e.g., "Interface | { ... }")
          const typeWithoutObj = getTypeWithoutObject(member.type);
          const nestedProps = parseObjectTypeProperties(objectInUnion);
          const baseNormalizedType = escapeGenericBrackets(
            normalizeType(typeWithoutObj),
          );
          const { type: typeValue, hasLinks } = generateTypeWithLinks(
            typeWithoutObj,
            allClassNames,
            allInterfaceNames,
            baseNormalizedType,
          );
          const typeAttr = `{<span>${typeValue} | object</span>}`;

          mdx += `<ParamField path="${member.name}" type=${typeAttr}${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          if (desc) {
            mdx += `  ${desc}\n`;
          }
          mdx += `</ParamField>\n\n`;
        } else {
          const { type: typeValue, hasLinks } = generateTypeWithLinks(
            member.type,
            allClassNames,
            allInterfaceNames,
            normalizedType,
          );
          const typeAttr = `{<span>${typeValue}</span>}`;
          mdx += `<ParamField path="${member.name}" type=${typeAttr}${required}>\n`;
          if (desc) {
            mdx += `  ${desc}\n`;
          }
          mdx += `</ParamField>\n\n`;
        }
      }
    }
  } else if (type === 'type') {
    mdx += `## Type Definition\n\n`;
    mdx += `\`\`\`typescript\ntype ${item.name} = ${item.type};\n\`\`\`\n\n`;
  } else if (type === 'function') {
    mdx += '## Parameters\n\n';
    if (item.params && item.params.length > 0) {
      for (const param of item.params) {
        const isNullable = isTypeOptionalByNullable(param.type);
        const required = !param.isOptional && !isNullable ? ' required' : '';
        const normalizedType = escapeGenericBrackets(normalizeType(param.type));

        // Check if this is an inline object type
        const isObjectType = isInlineObjectType(param.type);

        // Check if this is an array of objects
        const isArrayOfObjectsType = !isObjectType
          ? isArrayOfObjects(param.type)
          : false;

        // Check if this is a union type that contains an object
        const objectInUnion =
          !isObjectType && !isArrayOfObjectsType
            ? extractObjectFromUnionType(param.type)
            : null;

        if (isObjectType) {
          const nestedProps = parseObjectTypeProperties(param.type);
          mdx += `<ParamField path="${param.name}" type="object"${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else if (isArrayOfObjectsType) {
          // Array of objects (e.g., [ { type: string; ... }, ])
          const objectType = extractObjectFromArray(param.type);
          const nestedProps = parseObjectTypeProperties(objectType);
          mdx += `<ParamField path="${param.name}" type={<span>array of objects</span>}${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else if (objectInUnion) {
          // Union type containing an object (e.g., "Interface | { ... }")
          const typeWithoutObj = getTypeWithoutObject(param.type);
          const nestedProps = parseObjectTypeProperties(objectInUnion);
          const baseNormalizedType = escapeGenericBrackets(
            normalizeType(typeWithoutObj),
          );
          const { type: typeValue, hasLinks } = generateTypeWithLinks(
            typeWithoutObj,
            allClassNames,
            allInterfaceNames,
            baseNormalizedType,
          );
          const typeAttr = `{<span>${typeValue} | object</span>}`;

          mdx += `<ParamField path="${param.name}" type=${typeAttr}${required}>\n`;
          mdx += `  <Expandable title="properties">\n`;
          mdx += generateNestedParamFields(
            nestedProps,
            allClassNames,
            allInterfaceNames,
            2,
          );
          mdx += `  </Expandable>\n`;
          mdx += `</ParamField>\n\n`;
        } else {
          const { type: typeValue, hasLinks } = generateTypeWithLinks(
            param.type,
            allClassNames,
            allInterfaceNames,
            normalizedType,
          );
          const typeAttr = `{<span>${typeValue}</span>}`;
          mdx += `<ParamField path="${param.name}" type=${typeAttr}${required}>\n`;
          mdx += `</ParamField>\n\n`;
        }
      }
    }
    mdx += `## Returns\n\n`;
    const normalizedReturns = escapeGenericBrackets(
      normalizeType(item.returns),
    );
    const isReturnObjectType = isInlineObjectType(item.returns);
    const isReturnArrayOfObjectsType = !isReturnObjectType
      ? isArrayOfObjects(item.returns)
      : false;
    const objectInReturnUnion =
      !isReturnObjectType && !isReturnArrayOfObjectsType
        ? extractObjectFromUnionType(item.returns)
        : null;

    if (isReturnObjectType) {
      const nestedProps = parseObjectTypeProperties(item.returns);
      mdx += `<ParamField path="response" type="object">\n`;
      mdx += `  <Expandable title="properties">\n`;
      mdx += generateNestedParamFields(
        nestedProps,
        allClassNames,
        allInterfaceNames,
        2,
      );
      mdx += `  </Expandable>\n`;
      mdx += `</ParamField>\n\n`;
    } else if (isReturnArrayOfObjectsType) {
      // Array of objects (e.g., [ { type: string; ... }, ])
      const objectType = extractObjectFromArray(item.returns);
      const nestedProps = parseObjectTypeProperties(objectType);
      mdx += `<ParamField path="response" type={<span>array of objects</span>}>\n`;
      mdx += `  <Expandable title="properties">\n`;
      mdx += generateNestedParamFields(
        nestedProps,
        allClassNames,
        allInterfaceNames,
        2,
      );
      mdx += `  </Expandable>\n`;
      mdx += `</ParamField>\n\n`;
    } else if (objectInReturnUnion) {
      // Union type containing an object (e.g., "Interface | { ... }")
      const typeWithoutObj = getTypeWithoutObject(item.returns);
      const nestedProps = parseObjectTypeProperties(objectInReturnUnion);
      const baseNormalizedType = escapeGenericBrackets(
        normalizeType(typeWithoutObj),
      );
      const { type: returnsValue, hasLinks: returnsHasLinks } =
        generateTypeWithLinks(
          typeWithoutObj,
          allClassNames,
          allInterfaceNames,
          baseNormalizedType,
        );
      const returnsTypeAttr = `{<span>${returnsValue} | object</span>}`;

      mdx += `<ParamField path="response" type=${returnsTypeAttr}>\n`;
      mdx += `  <Expandable title="properties">\n`;
      mdx += generateNestedParamFields(
        nestedProps,
        allClassNames,
        allInterfaceNames,
        2,
      );
      mdx += `  </Expandable>\n`;
      mdx += `</ParamField>\n\n`;
    } else {
      const { type: returnsValue, hasLinks: returnsHasLinks } =
        generateTypeWithLinks(
          item.returns,
          allClassNames,
          allInterfaceNames,
          normalizedReturns,
        );
      const returnsTypeAttr = `{<span>${returnsValue}</span>}`;
      mdx += `<ParamField path="response" type=${returnsTypeAttr}>\n`;
      mdx += `</ParamField>\n\n`;
    }
  } else if (type === 'enum') {
    mdx += '## Values\n\n';
    if (item.members && item.members.length > 0) {
      for (const member of item.members) {
        const value = member.value || member.name;
        mdx += `<ParamField path="${member.name}" type="string">\n`;
        mdx += `  ${value}\n`;
        mdx += `</ParamField>\n\n`;
      }
    }
  }

  // Add metadata
  mdx += '---\n\n';
  const relativePath = path.relative(projectRoot, item.filePath);
  const githubUrl = `https://github.com/auth0/universal-login/blob/master/packages/auth0-acul-js/${relativePath}`;
  mdx += `**File:** [${relativePath}](${githubUrl})\n`;

  return mdx;
}

async function generateDocumentation() {
  console.log('🚀 Generating Mintlify documentation...\n');

  ensureDir(config.outputDir);

  const srcFiles = getFiles(config.srcDir, '.ts').filter(
    (f) => !f.includes('.test.ts') && !f.includes('.spec.ts'),
  );
  const interfaceFiles = getFiles(config.interfacesDir, '.ts');

  let totalItems = 0;
  const navStructure = {
    classes: [],
    interfaces: [],
    types: [],
    functions: [],
    enums: [],
  };

  // Collect all parsed items
  const allClasses = [];
  const allInterfaces = [];
  const allFunctions = [];
  const allEnums = [];
  const allTypes = [];

  console.log(
    `📁 Found ${srcFiles.length} source files and ${interfaceFiles.length} interface files\n`,
  );

  // First pass: Parse all files and collect classes
  console.log('📝 Parsing source files...');
  for (const file of srcFiles) {
    try {
      const parsed = parseTypeScriptFile(file);
      allClasses.push(...parsed.classes);
      allFunctions.push(...parsed.functions);
      allEnums.push(...parsed.enums);
    } catch (error) {
      console.error(`⚠️  Error parsing ${file}:`, error.message);
    }
  }

  // Parse interface files early to collect names
  console.log('📝 Parsing interface files...');
  for (const file of interfaceFiles) {
    try {
      const parsed = parseTypeScriptFile(file);
      allInterfaces.push(...parsed.interfaces);
      allTypes.push(...parsed.types);
    } catch (error) {
      console.error(`⚠️  Error parsing ${file}:`, error.message);
    }
  }

  // Create sets of class and interface names for linking
  const allClassNames = new Set(allClasses.map((c) => c.name));
  const allInterfaceNames = new Set(allInterfaces.map((i) => i.name));

  // Second pass: Resolve class inheritance and generate markdown
  console.log('📝 Resolving inheritance and generating class documentation...');
  for (const cls of allClasses) {
    try {
      const resolvedClass = resolveClassInheritance(cls, allClasses);
      const filename = `${resolvedClass.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'classes', filename);
      const markdown = generateMintlifyMarkdown(
        resolvedClass,
        'class',
        allClassNames,
        allInterfaceNames,
      );
      writeFile(outputPath, markdown);
      navStructure.classes.push(resolvedClass.name);
      totalItems++;
    } catch (error) {
      console.error(`⚠️  Error generating class ${cls.name}:`, error.message);
    }
  }

  // Generate function markdown
  console.log('📝 Generating function documentation...');
  for (const func of allFunctions) {
    try {
      const filename = `${func.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'functions', filename);
      const markdown = generateMintlifyMarkdown(
        func,
        'function',
        allClassNames,
        allInterfaceNames,
      );
      writeFile(outputPath, markdown);
      navStructure.functions.push(func.name);
      totalItems++;
    } catch (error) {
      console.error(
        `⚠️  Error generating function ${func.name}:`,
        error.message,
      );
    }
  }

  // Generate enum markdown
  console.log('📝 Generating enum documentation...');
  for (const en of allEnums) {
    try {
      const filename = `${en.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'enums', filename);
      const markdown = generateMintlifyMarkdown(
        en,
        'enum',
        allClassNames,
        allInterfaceNames,
      );
      writeFile(outputPath, markdown);
      navStructure.enums.push(en.name);
      totalItems++;
    } catch (error) {
      console.error(`⚠️  Error generating enum ${en.name}:`, error.message);
    }
  }

  // Generate interface markdown
  console.log(
    '📝 Resolving inheritance and generating interface documentation...',
  );
  for (const iface of allInterfaces) {
    try {
      const resolvedInterface = resolveInterfaceInheritance(
        iface,
        allInterfaces,
      );
      const filename = `${resolvedInterface.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'interfaces', filename);
      const markdown = generateMintlifyMarkdown(
        resolvedInterface,
        'interface',
        allClassNames,
        allInterfaceNames,
      );
      writeFile(outputPath, markdown);
      navStructure.interfaces.push(resolvedInterface.name);
      totalItems++;
    } catch (error) {
      console.error(
        `⚠️  Error generating interface ${iface.name}:`,
        error.message,
      );
    }
  }

  // Generate type markdown
  console.log('📝 Generating type documentation...');
  for (const type of allTypes) {
    try {
      const filename = `${type.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'types', filename);
      const markdown = generateMintlifyMarkdown(
        type,
        'type',
        allClassNames,
        allInterfaceNames,
      );
      writeFile(outputPath, markdown);
      navStructure.types.push(type.name);
      totalItems++;
    } catch (error) {
      console.error(`⚠️  Error generating type ${type.name}:`, error.message);
    }
  }

  // Generate navigation file in Mintlify format
  console.log('📑 Generating navigation file...');
  const navJson = {
    group: '@auth0/auth0-acul-js',
    pages: [],
  };

  // Add Classes section
  if (navStructure.classes.length > 0) {
    navJson.pages.push({
      group: 'Classes',
      pages: navStructure.classes.map(
        (className) =>
          `docs/customize/login-pages/advanced-customizations/reference/js-sdk/classes/${className}`,
      ),
    });
  }

  // Add Interfaces section
  if (navStructure.interfaces.length > 0) {
    navJson.pages.push({
      group: 'Interfaces',
      pages: navStructure.interfaces.map(
        (ifaceName) =>
          `docs/customize/login-pages/advanced-customizations/reference/js-sdk/interfaces/${ifaceName}`,
      ),
    });
  }

  // Add Types section
  if (navStructure.types.length > 0) {
    navJson.pages.push({
      group: 'Types',
      pages: navStructure.types.map(
        (typeName) =>
          `docs/customize/login-pages/advanced-customizations/reference/js-sdk/types/${typeName}`,
      ),
    });
  }

  // Add Functions section
  if (navStructure.functions.length > 0) {
    navJson.pages.push({
      group: 'Functions',
      pages: navStructure.functions.map(
        (funcName) =>
          `docs/customize/login-pages/advanced-customizations/reference/js-sdk/functions/${funcName}`,
      ),
    });
  }

  // Add Enums section
  if (navStructure.enums.length > 0) {
    navJson.pages.push({
      group: 'Enums',
      pages: navStructure.enums.map(
        (enumName) =>
          `docs/customize/login-pages/advanced-customizations/reference/js-sdk/enums/${enumName}`,
      ),
    });
  }

  writeFile(
    path.join(config.outputDir, 'navigation.json'),
    JSON.stringify(navJson, null, 2),
  );

  // Generate index
  console.log('📇 Generating documentation index...');
  let indexMarkdown = `# Auth0 ACUL JS Documentation\n\n`;
  indexMarkdown += `Generated on ${new Date().toLocaleString()}\n\n`;

  if (navStructure.classes.length > 0) {
    indexMarkdown += `## Classes (${navStructure.classes.length})\n\n`;
    for (const className of navStructure.classes.slice(0, 10)) {
      indexMarkdown += `- [${className}](./classes/${className}.mdx)\n`;
    }
    if (navStructure.classes.length > 10) {
      indexMarkdown += `- ... and ${navStructure.classes.length - 10} more\n`;
    }
    indexMarkdown += '\n';
  }

  if (navStructure.interfaces.length > 0) {
    indexMarkdown += `## Interfaces (${navStructure.interfaces.length})\n\n`;
    for (const ifaceName of navStructure.interfaces.slice(0, 10)) {
      indexMarkdown += `- [${ifaceName}](./interfaces/${ifaceName}.mdx)\n`;
    }
    if (navStructure.interfaces.length > 10) {
      indexMarkdown += `- ... and ${navStructure.interfaces.length - 10} more\n`;
    }
    indexMarkdown += '\n';
  }

  if (navStructure.functions.length > 0) {
    indexMarkdown += `## Functions (${navStructure.functions.length})\n\n`;
    for (const funcName of navStructure.functions.slice(0, 10)) {
      indexMarkdown += `- [${funcName}](./functions/${funcName}.mdx)\n`;
    }
    if (navStructure.functions.length > 10) {
      indexMarkdown += `- ... and ${navStructure.functions.length - 10} more\n`;
    }
    indexMarkdown += '\n';
  }

  if (navStructure.enums.length > 0) {
    indexMarkdown += `## Enums (${navStructure.enums.length})\n\n`;
    for (const enumName of navStructure.enums.slice(0, 10)) {
      indexMarkdown += `- [${enumName}](./enums/${enumName}.mdx)\n`;
    }
    if (navStructure.enums.length > 10) {
      indexMarkdown += `- ... and ${navStructure.enums.length - 10} more\n`;
    }
  }

  writeFile(path.join(config.outputDir, 'README.md'), indexMarkdown);

  console.log('\n✅ Documentation generation complete!\n');
  console.log(`📊 Summary:`);
  console.log(`  - Classes: ${navStructure.classes.length}`);
  console.log(`  - Interfaces: ${navStructure.interfaces.length}`);
  console.log(`  - Functions: ${navStructure.functions.length}`);
  console.log(`  - Types: ${navStructure.types.length}`);
  console.log(`  - Enums: ${navStructure.enums.length}`);
  console.log(`  - Total items: ${totalItems}\n`);
  console.log(`📁 Output directory: ${config.outputDir}\n`);
}

// Run the generator
generateDocumentation().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
