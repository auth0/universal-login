#!/usr/bin/env node

/**
 * Convert Type Alias definitions to ParamField components
 *
 * Transformations:
 * - Find type alias definition line (> **AliasName** = `...`)
 * - Extract alias name and type union
 * - Wrap in <ParamField body="AliasName" type="type values">
 * - Preserve all original content (Defined in, descriptions, etc.)
 *
 * From:
 * > **AuthenticatorTransport** = `"usb"` \| `"nfc"` \| `"ble"` \| `"internal"` \| `"hybrid"`
 *
 * To:
 * <ParamField body="AuthenticatorTransport" type="usb | nfc | ble | internal | hybrid">
 * > **AuthenticatorTransport** = `"usb"` \| `"nfc"` \| `"ble"` \| `"internal"` \| `"hybrid"`
 * ... rest of content
 * </ParamField>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const TYPE_ALIASES_DIR = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/type-aliases'
);

class TypeAliasParamFieldConverter {
  constructor(typeAliasesDir) {
    this.typeAliasesDir = typeAliasesDir;
    this.filesProcessed = 0;
    this.aliasesWrapped = 0;
  }

  /**
   * Extract alias name from the definition line
   * From: > **AuthenticatorTransport** = `"usb"` \| `"nfc"` ...
   * To: AuthenticatorTransport
   */
  extractAliasName(definitionLine) {
    const match = definitionLine.match(/>\s*\*\*([^*]+)\*\*/);
    if (match) {
      return match[1];
    }
    return 'TypeAlias';
  }

  /**
   * Extract type values from the definition line
   * From: > **AuthenticatorTransport** = `"usb"` \| `"nfc"` \| `"ble"` \| `"internal"` \| `"hybrid"`
   * To: usb | nfc | ble | internal | hybrid
   *
   * Removes backticks and quotes, cleans up escaping
   */
  extractTypeAttribute(definitionLine) {
    // Find everything after the = sign
    const match = definitionLine.match(/=\s*(.+)$/);
    if (!match) {
      return "type='unknown'";
    }

    let typeStr = match[1];

    // Remove backticks
    typeStr = typeStr.replace(/`/g, '');

    // Remove quotes
    typeStr = typeStr.replace(/"/g, '');
    typeStr = typeStr.replace(/'/g, '');

    // Clean up escaped pipes and whitespace
    typeStr = typeStr.replace(/\s*\\\|\s*/g, ' | ');

    // Remove extra whitespace
    typeStr = typeStr.trim();

    return `type='${typeStr}'`;
  }

  /**
   * Convert Parameters section within a property to Expandable component
   * From: #### Parameters
   *       ##### paramName
   *       Type description
   * To: <Expandable title="Parameters">
   *       <ParamField body='paramName' type='Type'>
   *       Description
   *       </ParamField>
   *     </Expandable>
   */
  convertParametersInProperty(content) {
    // Match the entire Parameters section: #### Parameters until next ####
    const parametersRegex = /(#### Parameters\n)([\s\S]*?)(?=\n#### [A-Z]|$)/;

    return content.replace(parametersRegex, (fullMatch, header, paramContent) => {
      // Find all parameter blocks: ##### paramName until next ##### or ####
      const paramBlockRegex = /(##### ([^\n]+)\n)([\s\S]*?)(?=\n##### |\n#### |$)/g;

      let paramFields = '';
      let match;

      while ((match = paramBlockRegex.exec(paramContent)) !== null) {
        const paramName = match[2];
        const paramDesc = match[3];

        // Extract type from the parameter description
        // Usually the type is in a markdown link or backticks
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

        paramFields += `<ParamField body='${paramName}' type=${paramType}>\n`;
        if (description) {
          paramFields += `${description}\n`;
        }
        paramFields += `</ParamField>\n`;
      }

      if (paramFields) {
        return `<Expandable title="Parameters">\n${paramFields}</Expandable>\n`;
      }

      return fullMatch;
    });
  }

  /**
   * Convert Properties section to Expandable with nested ParamFields
   * From: ## Properties
   *       ### propName
   *       > **propName**: type
   *       Description
   * To: <Expandable title="Properties">
   *       <ParamField body='propName' type='type'>
   *       > **propName**: type
   *       Description
   *       </ParamField>
   *     </Expandable>
   */
  convertPropertiesSection(content) {
    // Match the entire Properties section
    const propertiesSectionRegex = /(## Properties\n[\s\S]*?)(?=\n## [A-Z]|$)/;

    return content.replace(propertiesSectionRegex, (fullMatch) => {
      // Find all property blocks within this section
      // Each property block is: "### PropertyName" ... until next "###" or "##"
      const propertyBlockRegex = /(### [A-Za-z?()]+\n[\s\S]*?)(?=\n### [A-Za-z?]|\n## [A-Z]|$)/g;

      let propertyFields = '';
      let match;

      while ((match = propertyBlockRegex.exec(fullMatch)) !== null) {
        const blockMatch = match[1];

        // Extract property name from h3 heading
        const headerMatch = blockMatch.match(/^### ([A-Za-z?()]+)/);
        const propertyName = headerMatch ? headerMatch[1] : 'property';

        // Extract type from signature line (starts with >)
        let propertyType = 'unknown';
        const signatureMatch = blockMatch.match(/^>\s*(?:`\w+`\s+)*\*\*[^*]+\*\*:\s*(.+)$/m);
        if (signatureMatch) {
          const typeStr = signatureMatch[1];
          // Extract the first part (remove backticks)
          const typeMatch = typeStr.match(/^`([^`]+)`/) || typeStr.match(/^([^\n]+)/);
          if (typeMatch) {
            propertyType = `'${typeMatch[1].replace(/`/g, '').trim()}'`;
          }
        }

        // Remove the "### PropertyName" heading from the block
        let cleanedBlock = blockMatch
          .replace(/^### [A-Za-z?()]+\n/, '') // Remove the heading
          .replace(/^\n/, ''); // Remove leading blank line

        // Remove trailing *** separator if present
        cleanedBlock = cleanedBlock.replace(/\n\*\*\*\s*$/, '');

        // Convert nested Parameters sections to Expandable
        cleanedBlock = this.convertParametersInProperty(cleanedBlock);

        propertyFields += `<ParamField body='${propertyName}' type=${propertyType}>\n${cleanedBlock}\n</ParamField>\n`;
      }

      if (propertyFields) {
        return `<Expandable title="Properties">\n${propertyFields}</Expandable>\n`;
      }

      return fullMatch;
    });
  }

  /**
   * Remove *** separators between property definitions
   */
  removePropertySeparators(content) {
    return content.replace(/\n\*\*\*\n/g, '\n');
  }

  /**
   * Convert root-level Parameters section to Expandable with nested ParamFields
   * From: ## Parameters
   *       ### paramName
   *       `type`
   *       Description
   * To: <Expandable title="Parameters">
   *       <ParamField body='paramName' type='type'>
   *       Description
   *       </ParamField>
   *     </Expandable>
   */
  convertRootParametersSection(content) {
    // Match the entire Parameters section: ## Parameters until next ## or end
    const parametersRegex = /(## Parameters\n)([\s\S]*?)(?=\n## [A-Z]|$)/;

    return content.replace(parametersRegex, (fullMatch, header, paramContent) => {
      // Find all parameter blocks: ### paramName until next ### or ##
      const paramBlockRegex = /(### ([^\n]+)\n)([\s\S]*?)(?=\n### |\n## |$)/g;

      let paramFields = '';
      let match;

      while ((match = paramBlockRegex.exec(paramContent)) !== null) {
        const paramName = match[2];
        const paramDesc = match[3];

        // Extract type from the parameter description
        // Usually the first backtick-wrapped item is the type
        let paramType = 'unknown';

        // Try to extract from backticks first
        const typeMatch = paramDesc.match(/^`([^`]+)`/m);
        if (typeMatch) {
          paramType = `'${typeMatch[1]}'`;
        } else {
          // Try markdown link
          const linkMatch = paramDesc.match(/\[`?([^\]`]+)`?\]\(([^)]+)\)/);
          if (linkMatch) {
            paramType = `{<span><a href="${linkMatch[2]}">${linkMatch[1]}</a></span>}`;
          } else {
            // Try to get first line as type
            const firstLine = paramDesc.split('\n')[0].trim();
            if (firstLine) {
              paramType = `'${firstLine}'`;
            }
          }
        }

        // Get the description (everything after the type)
        const descStart = paramDesc.indexOf('\n') !== -1 ? paramDesc.indexOf('\n') + 1 : 0;
        const description = paramDesc.substring(descStart).trim();

        paramFields += `<ParamField body='${paramName}' type=${paramType}>\n`;
        if (description) {
          paramFields += `${description}\n`;
        }
        paramFields += `</ParamField>\n`;
      }

      if (paramFields) {
        return `<Expandable title="Parameters">\n${paramFields}</Expandable>\n`;
      }

      return fullMatch;
    });
  }

  /**
   * Convert Example sections to RequestExample components
   * From: ## Example
   *       ```ts
   *       code here
   *       ```
   * To: <RequestExample>
   *       ```ts Example
   *       code here
   *       ```
   *     </RequestExample>
   */
  convertExamples(content) {
    // Match ## Example section until next ## or end
    const exampleRegex = /(## Example\n)([\s\S]*?)(?=\n## [A-Z]|$)/;

    return content.replace(exampleRegex, (fullMatch, header, exampleContent) => {
      // Check if there's a code block
      const codeBlockRegex = /^(```[a-z]*)\n/m;
      const hasCodeBlock = codeBlockRegex.test(exampleContent);

      if (!hasCodeBlock) {
        return fullMatch;
      }

      // Remove the "## Example" header
      let cleanedContent = exampleContent.trim();

      // Add "Example" label to the code fence
      cleanedContent = cleanedContent.replace(/^(```[a-z]*)\n/m, '$1 Example\n');

      // Wrap in RequestExample
      return `<RequestExample>\n${cleanedContent}\n</RequestExample>\n`;
    });
  }

  /**
   * Convert type alias definitions to ParamField components
   */
  convertTypeAliases(content) {
    // Find the first non-frontmatter, non-empty line that contains the type definition
    const lines = content.split('\n');
    let definitionLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('>') && lines[i].includes('**') && lines[i].includes('=')) {
        definitionLineIndex = i;
        break;
      }
    }

    if (definitionLineIndex === -1) {
      // No type definition found
      return content;
    }

    const definitionLine = lines[definitionLineIndex];
    const aliasName = this.extractAliasName(definitionLine);
    const typeAttribute = this.extractTypeAttribute(definitionLine);

    // Build the new content
    const beforeDefinition = lines.slice(0, definitionLineIndex).join('\n');
    let afterDefinition = lines.slice(definitionLineIndex + 1).join('\n');

    // Check if there's a Properties section
    if (afterDefinition.includes('## Properties')) {
      afterDefinition = this.convertPropertiesSection(afterDefinition);
    }

    // Check if there's a root-level Parameters section
    if (afterDefinition.includes('## Parameters')) {
      afterDefinition = this.convertRootParametersSection(afterDefinition);
    }

    // Check if there's an Example section
    if (afterDefinition.includes('## Example')) {
      afterDefinition = this.convertExamples(afterDefinition);
    }

    // Remove property separators
    afterDefinition = this.removePropertySeparators(afterDefinition);

    const wrappedContent = `${beforeDefinition}
<ParamField body="${aliasName}" ${typeAttribute}>
${definitionLine}
${afterDefinition}
</ParamField>`;

    return wrappedContent;
  }

  /**
   * Process a single type alias file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Convert type aliases to ParamField
      content = this.convertTypeAliases(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.aliasesWrapped += 1;
      }

      this.filesProcessed++;
      return true;
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Process all type alias files
   */
  processAllFiles() {
    if (!fs.existsSync(this.typeAliasesDir)) {
      console.error(`✗ Type aliases directory not found: ${this.typeAliasesDir}`);
      process.exit(1);
    }

    const files = fs.readdirSync(this.typeAliasesDir);

    for (const file of files) {
      if (file.endsWith('.mdx')) {
        const filePath = path.join(this.typeAliasesDir, file);
        this.processFile(filePath);
      }
    }
  }

  /**
   * Run conversion
   */
  convert() {
    console.log('🚀 Starting Type Aliases to ParamField conversion...\n');

    console.log(`📂 Processing directory: ${this.typeAliasesDir}\n`);

    this.processAllFiles();

    console.log(`\n✓ Conversion complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Type aliases wrapped: ${this.aliasesWrapped}`);
  }
}

// Run conversion
const converter = new TypeAliasParamFieldConverter(TYPE_ALIASES_DIR);
converter.convert();
