#!/usr/bin/env node

/**
 * Generate Mintlify-compatible markdown documentation
 * from TypeScript source and interface files
 *
 * Usage: node scripts/generate-mintlify-docs.js [options]
 * Options:
 *   --output, -o   Output directory (default: docs/markdown_output)
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
  outputDir: path.resolve(projectRoot, 'docs/markdown_output'),
  srcDir: path.resolve(projectRoot, 'src'),
  interfacesDir: path.resolve(projectRoot, 'interfaces'),
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
  --output, -o PATH    Output directory (default: docs/markdown_output)
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

          // Extract the first paragraph (before @tags)
          const firstParagraph = extracted.split(/\n@/).shift() || '';
          let cleaned = firstParagraph.trim();

          // Remove JSDoc syntax patterns
          cleaned = cleaned
            .replace(/\/\*\*\s*/, '')
            .replace(/\*\/\s*$/, '')
            .trim();
          cleaned = cleaned.replace(/\{[^}]+\}\s*/g, ''); // Remove type annotations {Type}
          cleaned = cleaned.replace(/@\w+\s+\S+\s*-?\s*/g, ''); // Remove @tag patterns
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
        if (
          ts.isPropertyDeclaration(member) ||
          ts.isMethodDeclaration(member)
        ) {
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
        });
      }

      // Get the interface definition text
      const interfaceText = node.getText(sourceFile);

      interfaces.push({
        name: node.name.getText(),
        description: jsDoc || '',
        members,
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

function generateMintlifyMarkdown(item, type) {
  // Create frontmatter
  const frontmatter = {
    title: item.name,
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
    // Combine all members (own and inherited) into a single Properties section
    if (item.members && item.members.length > 0) {
      mdx += '## Properties\n\n';
      for (const member of item.members) {
        const desc = member.description
          ? cleanDescription(member.description)
          : '';
        const required = !member.isOptional ? ' required' : '';
        const normalizedType = normalizeType(member.type);
        mdx += `<ParamField path="${member.name}" type="${normalizedType}"${required}>\n`;
        if (desc) {
          mdx += `  ${desc}\n`;
        }
        mdx += `</ParamField>\n\n`;
      }
    }
  } else if (type === 'interface') {
    // Add interface definition at the top wrapped in RequestExample
    if (item.definition) {
      mdx += `<RequestExample>\n\n`;
      mdx += `\`\`\`typescript Interface\n${item.definition}\n\`\`\`\n\n`;
      mdx += `</RequestExample>\n\n`;
    }

    mdx += '## Properties\n\n';
    if (item.members && item.members.length > 0) {
      for (const member of item.members) {
        const desc = member.description
          ? cleanDescription(member.description.replace(/\n/g, ' '))
          : '';
        const required = !member.isOptional ? ' required' : '';
        const normalizedType = normalizeType(member.type);
        mdx += `<ParamField path="${member.name}" type="${normalizedType}"${required}>\n`;
        if (desc) {
          mdx += `  ${desc}\n`;
        }
        mdx += `</ParamField>\n\n`;
      }
    }
  } else if (type === 'type') {
    mdx += `## Type Definition\n\n`;
    mdx += `\`\`\`typescript\ntype ${item.name} = ${item.type};\n\`\`\`\n\n`;
  } else if (type === 'function') {
    mdx += '## Parameters\n\n';
    if (item.params && item.params.length > 0) {
      for (const param of item.params) {
        const required = !param.isOptional ? ' required' : '';
        const normalizedType = normalizeType(param.type);
        mdx += `<ParamField path="${param.name}" type="${normalizedType}"${required}>\n`;
        mdx += `</ParamField>\n\n`;
      }
    }
    mdx += `## Returns\n\n`;
    const normalizedReturns = normalizeType(item.returns);
    mdx += `<ParamField path="response" type="${normalizedReturns}">\n`;
    mdx += `</ParamField>\n\n`;
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

  // Second pass: Resolve class inheritance and generate markdown
  console.log('📝 Resolving inheritance and generating class documentation...');
  for (const cls of allClasses) {
    try {
      const resolvedClass = resolveClassInheritance(cls, allClasses);
      const filename = `${resolvedClass.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'classes', filename);
      const markdown = generateMintlifyMarkdown(resolvedClass, 'class');
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
      const markdown = generateMintlifyMarkdown(func, 'function');
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
      const markdown = generateMintlifyMarkdown(en, 'enum');
      writeFile(outputPath, markdown);
      navStructure.enums.push(en.name);
      totalItems++;
    } catch (error) {
      console.error(`⚠️  Error generating enum ${en.name}:`, error.message);
    }
  }

  // Parse and process interface files
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

  // Generate interface markdown
  console.log('📝 Generating interface documentation...');
  for (const iface of allInterfaces) {
    try {
      const filename = `${iface.name}.mdx`;
      const outputPath = path.join(config.outputDir, 'interfaces', filename);
      const markdown = generateMintlifyMarkdown(iface, 'interface');
      writeFile(outputPath, markdown);
      navStructure.interfaces.push(iface.name);
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
      const markdown = generateMintlifyMarkdown(type, 'type');
      writeFile(outputPath, markdown);
      navStructure.types.push(type.name);
      totalItems++;
    } catch (error) {
      console.error(`⚠️  Error generating type ${type.name}:`, error.message);
    }
  }

  // Generate navigation file
  console.log('📑 Generating navigation file...');
  const navJson = {
    name: '@auth0/auth0-acul-js',
    version: '1.0.0',
    structure: navStructure,
    generatedAt: new Date().toISOString(),
  };

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
