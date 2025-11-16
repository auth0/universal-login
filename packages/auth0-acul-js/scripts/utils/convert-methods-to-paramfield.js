#!/usr/bin/env node

/**
 * Convert Methods sections to ParamField components with return type handling
 *
 * Transformations:
 * - Find "## Methods" sections in class files
 * - Extract method blocks (### MethodName down to next section)
 * - Extract method name and return type from signature
 * - Create ParamField with:
 *   - body='methodName' (single quotes for strings)
 *   - type='ReturnType' or type={<span><a href="...">ReturnType</a></span>} for linked types
 *   - Remove backticks from types: Promise<void> not Promise\<void\>
 *   - HTML-escape < and > to &lt; and &gt; when in HTML attributes
 * - Convert #### Parameters sections to Expandable with nested ParamFields
 * - Preserve all original content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const CLASSES_DIR = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/classes'
);

class MethodsParamFieldConverter {
  constructor(classesDir) {
    this.classesDir = classesDir;
    this.filesProcessed = 0;
    this.methodsWrapped = 0;
  }

  /**
   * Extract method name from h3 heading
   * From: ### methodName()
   * To: methodName
   */
  extractMethodName(heading) {
    const match = heading.match(/^### ([a-zA-Z_$][a-zA-Z0-9_$]*)\(\)/);
    return match ? match[1] : 'method';
  }

  /**
   * Extract return type from signature line
   * From: > **methodName**(...): `Promise`\<`void`\>
   * To: type='Promise<void>' for string types
   *     type={<span><a href="...">TypeName</a></span>&lt;...&gt;} for HTML with links
   *
   * Removes backticks and backslashes from the type
   * HTML-escapes < and > only when in HTML attributes
   * Handles array notation like Error[]
   */
  extractReturnTypeAttribute(blockContent) {
    // Find the signature line (starts with >)
    // Match the return type after ):
    const signatureMatch = blockContent.match(/^>\s*\*\*[a-zA-Z_$][a-zA-Z0-9_$]*\*\*.*?\):\s*(.+)$/m);
    if (!signatureMatch) {
      return "type='unknown'";
    }

    let typeStr = signatureMatch[1];

    // Remove trailing backslashes and extra content (we want just the type)
    typeStr = typeStr.split('\n')[0]; // Get first line only

    // Check if it's a markdown link [TypeName](url) followed by optional []
    const linkMatch = typeStr.match(/\[`?([^\]`]+)`?\]\(([^)]+)\)([\[\]]*)/);
    if (linkMatch) {
      const typeName = linkMatch[1];
      const typeUrl = linkMatch[2];
      const suffix = linkMatch[3]; // Capture [] if present
      // For linked types, use HTML escaping since it's in HTML
      const cleanType = this.escapeHtmlEntities(this.cleanType(typeName));
      return `type={<span><a href="${typeUrl}">${cleanType}</a>${suffix}</span>}`;
    }

    // Clean the type: remove backticks and backslashes (no HTML escaping for strings)
    const cleanedType = this.cleanType(typeStr);

    // Check if it contains link-like patterns with backticks
    if (cleanedType.includes('[') && cleanedType.includes('](')) {
      // Has HTML, so escape
      const escapedType = this.escapeHtmlEntities(cleanedType);
      return `type={<span>${escapedType}</span>}`;
    }

    // Return as string type (no HTML escaping needed for strings)
    return `type='${cleanedType}'`;
  }

  /**
   * Clean type string by removing backticks and backslashes
   * From: `Promise`\<`void`\> or Promise\<void`\>
   * To: Promise<void>
   *
   * Note: HTML escaping happens separately based on context (string vs HTML)
   */
  cleanType(typeStr) {
    // Remove backticks
    let cleaned = typeStr.replace(/`/g, '');

    // Remove backslashes before < and >
    cleaned = cleaned.replace(/\\/g, '');

    return cleaned.trim();
  }

  /**
   * HTML-escape < and > for use in HTML attributes
   */
  escapeHtmlEntities(typeStr) {
    return typeStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /**
   * Convert Parameters section within method to Expandable component
   * From: #### Parameters
   *       ##### paramName
   *       Type description
   * To: <Expandable title="Parameters">
   *       <ParamField body='paramName' type='Type'>
   *       </ParamField>
   *     </Expandable>
   */
  convertParametersSection(content) {
    // Find #### Parameters section
    const parametersRegex = /(#### Parameters\n)([\s\S]*?)(?=\n#### [A-Z]|$)/;

    return content.replace(parametersRegex, (fullMatch, header, paramContent) => {
      // Find all parameter blocks (h5 items)
      // Each parameter is: ##### paramName followed by type/description until next h5 or section
      const paramBlockRegex = /(##### ([^\n]+)\n)([\s\S]*?)(?=\n##### |\n#### |$)/g;

      let paramFields = '';
      let match;

      while ((match = paramBlockRegex.exec(paramContent)) !== null) {
        const paramName = match[2];
        const paramDesc = match[3];

        // Extract type from the parameter description
        // Usually the type is in a link [Type](url) or plain text backticks
        let paramType = 'unknown';

        // Try to extract from markdown link first
        const linkMatch = paramDesc.match(/\[`?([^\]`]+)`?\]\(([^)]+)\)/);
        if (linkMatch) {
          paramType = `{<span><a href="${linkMatch[2]}">${linkMatch[1]}</a></span>}`;
        } else {
          // Try to extract from backticks or plain type
          const typeMatch = paramDesc.match(/^`([^`]+)`/m) || paramDesc.match(/^([^\n]+)/m);
          if (typeMatch) {
            paramType = `'${typeMatch[1].replace(/`/g, '').trim()}'`;
          }
        }

        // Get the description (everything after the type)
        const descStart = paramDesc.indexOf('\n') !== -1 ? paramDesc.indexOf('\n') + 1 : 0;
        const description = paramDesc.substring(descStart).trim();

        paramFields += `  <ParamField body='${paramName}' type=${paramType}>\n`;
        if (description) {
          paramFields += `${description}\n`;
        }
        paramFields += `  </ParamField>\n`;
      }

      if (paramFields) {
        return `<Expandable title="Parameters">\n${paramFields}</Expandable>\n`;
      }

      return fullMatch;
    });
  }

  /**
   * Convert Methods section to ParamField components
   */
  convertMethods(content) {
    // Match the entire Methods section
    const methodsSectionRegex = /(## Methods\n[\s\S]*?)(?=\n## [A-Z]|$)/;

    return content.replace(methodsSectionRegex, (fullMatch) => {
      // Find all method blocks within this section
      // Each method block is: "### methodName()" ... until next "###" or "##" or "***"
      const methodBlockRegex = /(### [a-zA-Z_$][a-zA-Z0-9_$]*\(\)\n[\s\S]*?)(?=\n### [a-zA-Z_$]|\n## [A-Z]|\n\*\*\*|$)/g;

      let modifiedSection = fullMatch.replace(methodBlockRegex, (blockMatch) => {
        // Extract method name and return type
        const headerMatch = blockMatch.match(/^### ([a-zA-Z_$][a-zA-Z0-9_$]*)\(\)/);
        const methodName = headerMatch ? headerMatch[1] : 'method';
        const returnTypeAttribute = this.extractReturnTypeAttribute(blockMatch);

        // Remove the "### methodName()" heading and leading blank line from the block
        let cleanedBlock = blockMatch
          .replace(/^### [a-zA-Z_$][a-zA-Z0-9_$]*\(\)\n/, '') // Remove the heading
          .replace(/^\n/, ''); // Remove leading blank line if it exists

        // Convert Parameters section to Expandable
        cleanedBlock = this.convertParametersSection(cleanedBlock);

        // Remove trailing *** separator if present
        cleanedBlock = cleanedBlock.replace(/\n\*\*\*\s*$/, '');

        // Wrap in ParamField with single quotes for body and custom type attribute
        return `<ParamField body='${methodName}' ${returnTypeAttribute}>\n${cleanedBlock}\n</ParamField>`;
      });

      // Remove all *** separators between ParamFields
      modifiedSection = modifiedSection.replace(/\n\*\*\*\n/g, '\n');

      return modifiedSection;
    });
  }

  /**
   * Process a single class file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Convert methods to ParamField
      content = this.convertMethods(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.methodsWrapped += 1;
      }

      this.filesProcessed++;
      return true;
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Process all class files
   */
  processAllFiles() {
    if (!fs.existsSync(this.classesDir)) {
      console.error(`✗ Classes directory not found: ${this.classesDir}`);
      process.exit(1);
    }

    const files = fs.readdirSync(this.classesDir);

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(this.classesDir, file);
        this.processFile(filePath);
      }
    }
  }

  /**
   * Run conversion
   */
  convert() {
    console.log('🚀 Starting Methods to ParamField conversion...\n');

    console.log(`📂 Processing directory: ${this.classesDir}\n`);

    this.processAllFiles();

    console.log(`\n✓ Conversion complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Files with methods wrapped: ${this.methodsWrapped}`);
  }
}

// Run conversion
const converter = new MethodsParamFieldConverter(CLASSES_DIR);
converter.convert();
