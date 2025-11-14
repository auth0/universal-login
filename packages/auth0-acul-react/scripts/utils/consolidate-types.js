#!/usr/bin/env node

/**
 * Consolidate Types classes by converting Constructor Parameters and Methods to ParamField components
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';
const CLASSES_PATH = path.join(REACT_SDK_PATH, 'API-Reference/namespaces/Types/classes');

class TypesConsolidator {
  constructor() {
    this.classCount = 0;
  }

  /**
   * Remove horizontal rule lines (***) from content
   */
  removeHorizontalRules(content) {
    // Remove lines that contain only *** (with optional whitespace)
    return content.replace(/^\s*\*{3,}\s*$/gm, '').replace(/\n\n\n/g, '\n\n');
  }

  /**
   * Convert markdown links to HTML links for use in JSX attributes
   * E.g., [Text](url) → <a href="url">Text</a>
   */
  markdownLinkToHtml(text) {
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  /**
   * Format type for JSX ParamField
   * Handles array notation and HTML links properly
   * E.g., <a href="...">Type</a>[] → <span><a href="...">Type</a>[]</span>
   */
  formatTypeForParamField(paramType) {
    // Convert markdown links to HTML links
    let formattedType = this.markdownLinkToHtml(paramType);

    // Escape < and > that are NOT part of HTML tags (for generic types like Record<string, string>)
    // First, preserve our HTML tags by replacing them with placeholders
    const htmlTags = [];
    let withPlaceholders = formattedType.replace(/<a[^>]*>.*?<\/a>/g, (match) => {
      const placeholder = `__HTML_TAG_${htmlTags.length}__`;
      htmlTags.push(match);
      return placeholder;
    });

    // Now escape remaining angle brackets (these are from generic types)
    withPlaceholders = withPlaceholders
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Restore the HTML tags
    htmlTags.forEach((tag, idx) => {
      withPlaceholders = withPlaceholders.replace(`__HTML_TAG_${idx}__`, tag);
    });

    formattedType = withPlaceholders;

    // Trim and check if type contains array notation (including cases with trailing whitespace)
    const trimmed = formattedType.trimEnd();
    const arrayNotationMatch = trimmed.match(/(\[\])+$/);
    const arrayNotation = arrayNotationMatch ? arrayNotationMatch[0] : '';
    const baseType = arrayNotation ? trimmed.slice(0, -arrayNotation.length) : trimmed;

    // If type contains HTML tags
    if (baseType.includes('<a')) {
      // Check if there are other characters mixed with HTML (parentheses, pipes, spaces, etc.)
      // Remove the HTML tag to see what's left
      const withoutHtml = baseType.replace(/<a[^>]*>.*?<\/a>/g, '');
      const hasOtherChars = withoutHtml.trim().length > 0;

      // If there are other characters or array notation, wrap in span
      if (hasOtherChars || arrayNotation) {
        return {
          type: `type={<span>${baseType}${arrayNotation}</span>}`,
          isJsx: true
        };
      }

      // Pure HTML without extra characters - use JSX syntax without span
      return {
        type: `type={${baseType}}`,
        isJsx: true
      };
    }

    // Regular string type
    return {
      type: `type='${trimmed}'`,
      isJsx: false
    };
  }

  /**
   * Determine type category from link path
   */
  getTypeFromPath(path) {
    if (path.includes('/Hooks/')) return 'Hooks';
    if (path.includes('/interfaces/')) return 'Interfaces';
    if (path.includes('/classes/')) return 'Classes';
    if (path.includes('/type-aliases/')) return 'Type Aliases';
    if (path.includes('/enums/')) return 'Enums';
    return 'Types';
  }

  /**
   * Convert References section to ParamField components
   */
  convertReferences(content) {
    // Match the References section
    const referencesRegex = /^## References\n\n([\s\S]*)$/m;
    const match = content.match(referencesRegex);

    if (!match) {
      return content;
    }

    let referencesContent = match[1];
    const paramFields = [];

    // Split by ### (reference names)
    const referenceLines = referencesContent.split('\n');
    let i = 0;

    while (i < referenceLines.length) {
      const line = referenceLines[i];

      // Check if this is a reference header
      if (line.match(/^### /)) {
        const refName = line.replace(/^### /, '').trim();

        // Look for the markdown link in the following lines
        let linkFound = false;
        for (let j = i + 1; j < Math.min(i + 5, referenceLines.length); j++) {
          const contentLine = referenceLines[j];
          const linkMatch = contentLine.match(/\[([^\]]+)\]\(([^)]+)\)/);

          if (linkMatch) {
            const linkText = linkMatch[1];
            const linkPath = linkMatch[2];
            const refType = this.getTypeFromPath(linkPath);

            // Create HTML link
            const htmlLink = `<a href="${linkPath}">${linkText}</a>`;

            // Create ParamField with link in body
            const paramField = `<ParamField body={${htmlLink}} type='${refType}'/>`;
            paramFields.push(paramField);
            linkFound = true;
            break;
          }
        }

        if (linkFound) {
          // Skip to next reference (look for ***)
          while (i < referenceLines.length && !referenceLines[i].match(/^\*{3,}$/)) {
            i++;
          }
          i++; // Skip the *** line
        } else {
          i++;
        }
      } else {
        i++;
      }
    }

    if (paramFields.length > 0) {
      const newReferences = `## References\n\n${paramFields.join('\n\n')}\n`;
      return content.replace(referencesRegex, newReferences);
    }

    return content;
  }

  /**
   * Convert headers inside content (like in ParamField) to bold text
   */
  normalizeHeadersForParamField(content) {
    // Convert headers (##, ###, ####, etc.) to bold text **text**
    content = content.replace(/^#+\s+(.+?)$/gm, '**$1**');
    return content;
  }

  /**
   * Convert Constructor parameters to ParamFields
   */
  convertConstructorParameters(content) {
    // Match the Constructor section
    const constructorRegex = /^## Constructors\n\n([\s\S]*?)(?=^## )/m;
    const match = content.match(constructorRegex);

    if (!match) {
      return content;
    }

    let constructorContent = match[1];

    // Find and convert parameters under #### Parameters
    const paramsRegex = /^#### Parameters\n\n([\s\S]*?)(?=^#### )/m;
    const paramsMatch = constructorContent.match(paramsRegex);

    if (!paramsMatch) {
      return content;
    }

    const paramsContent = paramsMatch[1];
    const paramBlocks = [];

    // Split by ##### (parameter names)
    const paramRegex = /^##### ([^\n]+)\n\n([\s\S]*?)(?=^##### |^#### |$)/gm;
    let paramMatch;

    while ((paramMatch = paramRegex.exec(paramsContent)) !== null) {
      const paramName = paramMatch[1].trim();
      let paramBody = paramMatch[2].trim();

      // Remove horizontal rules from parameter body
      paramBody = this.removeHorizontalRules(paramBody);

      // Extract type from first line or entire content if no newline
      let paramType = paramBody.split('\n')[0].trim();
      if (!paramType) {
        paramType = 'unknown';
      } else {
        // Clean up the type - remove backticks and backslashes
        paramType = paramType
          .replace(/`/g, '')        // Remove backticks
          .replace(/\\/g, '');      // Remove escape characters
      }

      // Format type with proper handling for array notation and HTML links
      const { type: typeAttr } = this.formatTypeForParamField(paramType);

      const paramField = `<ParamField body='${paramName}' ${typeAttr}>
</ParamField>`;

      paramBlocks.push(paramField);
    }

    if (paramBlocks.length > 0) {
      const newParams = `#### Parameters\n\n${paramBlocks.join('\n\n')}\n\n`;
      constructorContent = constructorContent.replace(paramsRegex, newParams);
      return content.replace(constructorRegex, constructorContent);
    }

    return content;
  }

  /**
   * Convert Methods to ParamFields
   */
  convertMethods(content) {
    // Match the Methods section - match from "## Methods" to end of file
    const methodsRegex = /^## Methods\n\n([\s\S]*)$/m;
    const match = content.match(methodsRegex);

    if (!match) {
      return content;
    }

    let methodsContent = match[1];
    const methodBlocks = [];

    // Split by ### (method names) - extract each method and everything until the next one
    const methodLines = methodsContent.split('\n');
    let currentMethod = null;
    let currentBody = [];

    for (let i = 0; i < methodLines.length; i++) {
      const line = methodLines[i];

      // Check if this is a method header
      if (line.match(/^### /)) {
        // Save previous method if exists
        if (currentMethod) {
          // Join lines until we hit *** (method separator) or another ###
          let bodyLines = [];
          for (let j = 0; j < currentBody.length; j++) {
            if (currentBody[j].match(/^\*\*\*$/)) {
              break; // Stop at separator
            }
            bodyLines.push(currentBody[j]);
          }

          let methodBody = bodyLines.join('\n').trim();
          methodBody = this.removeHorizontalRules(methodBody);
          methodBody = this.normalizeHeadersForParamField(methodBody);

          // Extract type from signature line
          const signatureMatch = methodBody.match(/^> \*\*([^*]+)\*\*[^:]*:\s*(.+?)(?:\n|$)/);
          let methodType = 'unknown';

          if (signatureMatch) {
            methodType = signatureMatch[2].trim()
              .replace(/`/g, '')        // Remove backticks
              .replace(/\\/g, '');      // Remove escape characters
          }

          // Format type with proper handling for array notation and HTML links
          const { type: typeAttr } = this.formatTypeForParamField(methodType);

          const methodField = `<ParamField body='${currentMethod}' ${typeAttr}>
${methodBody}
</ParamField>`;

          methodBlocks.push(methodField);
        }

        // Start new method
        currentMethod = line.replace(/^### /, '').trim();
        currentBody = [];
      } else {
        // Add line to current method body
        currentBody.push(line);
      }
    }

    // Don't forget the last method
    if (currentMethod) {
      let bodyLines = [];
      for (let j = 0; j < currentBody.length; j++) {
        if (currentBody[j].match(/^\*\*\*$/)) {
          break;
        }
        bodyLines.push(currentBody[j]);
      }

      let methodBody = bodyLines.join('\n').trim();
      methodBody = this.removeHorizontalRules(methodBody);
      methodBody = this.normalizeHeadersForParamField(methodBody);

      // Extract type from signature line
      const signatureMatch = methodBody.match(/^> \*\*([^*]+)\*\*[^:]*:\s*(.+?)(?:\n|$)/);
      let methodType = 'unknown';

      if (signatureMatch) {
        methodType = signatureMatch[2].trim()
          .replace(/`/g, '')        // Remove backticks
          .replace(/\\/g, '');      // Remove escape characters
      }

      // Format type with proper handling for array notation and HTML links
      const { type: typeAttr } = this.formatTypeForParamField(methodType);

      const methodField = `<ParamField body='${currentMethod}' ${typeAttr}>
${methodBody}
</ParamField>`;

      methodBlocks.push(methodField);
    }

    if (methodBlocks.length > 0) {
      const newMethods = `## Methods\n\n${methodBlocks.join('\n\n')}\n`;
      const methodsRegex = /^## Methods\n\n([\s\S]*)$/m;
      return content.replace(methodsRegex, newMethods);
    }

    return content;
  }

  /**
   * Process a class file
   */
  processClassFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Convert Constructor parameters
      content = this.convertConstructorParameters(content);

      // Convert Methods
      content = this.convertMethods(content);

      // Convert References
      content = this.convertReferences(content);

      // Write back
      fs.writeFileSync(filePath, content);
      console.log(`    ✓ Converted: ${path.basename(filePath)}`);
      this.classCount++;

      return true;
    } catch (error) {
      console.error(`    ✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Run consolidation
   */
  run() {
    console.log('🚀 Starting Types classes consolidation...\n');

    if (!fs.existsSync(CLASSES_PATH)) {
      console.error(`✗ Classes path not found: ${CLASSES_PATH}`);
      process.exit(1);
    }

    const classFiles = fs.readdirSync(CLASSES_PATH).filter(f => f.endsWith('.mdx'));

    console.log(`📂 Found ${classFiles.length} class files\n`);

    for (const file of classFiles) {
      const filePath = path.join(CLASSES_PATH, file);
      this.processClassFile(filePath);
    }

    console.log(`\n✓ Types classes consolidation complete!`);
    console.log(`  • Classes processed: ${this.classCount}`);
  }
}

const consolidator = new TypesConsolidator();
consolidator.run();
