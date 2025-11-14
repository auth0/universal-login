#!/usr/bin/env node

/**
 * Consolidate interface Properties by converting them to ParamField components
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';
const INTERFACES_PATH = path.join(REACT_SDK_PATH, 'API-Reference/namespaces/Types/interfaces');

class InterfacesConsolidator {
  constructor() {
    this.interfaceCount = 0;
    this.propertiesConverted = 0;
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
  formatTypeForParamField(propertyType) {
    // Convert markdown links to HTML links
    let formattedType = this.markdownLinkToHtml(propertyType);

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
   * Check if a type is an object type (starts with '{' or is the word 'object')
   */
  isObjectType(typeStr) {
    const trimmed = typeStr.trim();
    return trimmed === 'object' || trimmed.startsWith('{') || trimmed.startsWith('\\{');
  }

  /**
   * Parse object properties from a type string OR from separate property sections
   * E.g., { errors: Error[], state: string, locale: string }
   * OR separate **propertyName** sections with type signatures
   * Returns array of { name, type } objects
   */
  parseObjectProperties(signatureLine, propertyBody) {
    // First, try to extract from object signature: { prop1: type1; prop2: type2; }
    const typeMatch = signatureLine.match(/:\s*(.+?)(?:\n|$)/);
    if (typeMatch) {
      let typeStr = typeMatch[1].trim();

      // Remove escaped braces and find the object content
      typeStr = typeStr.replace(/\\\{/g, '{').replace(/\\\}/g, '}');

      // Extract content between first { and last }
      const objectMatch = typeStr.match(/\{([^}]+)\}/);
      if (objectMatch) {
        const objectContent = objectMatch[1];
        const properties = [];

        // Split by semicolon to get individual properties
        const propStrings = objectContent.split(';').map(p => p.trim()).filter(p => p);

        for (const propStr of propStrings) {
          // Match property: `propName`: type
          const propMatch = propStr.match(/`([^`]+)`:\s*(.+?)$/);
          if (propMatch) {
            const propName = propMatch[1];
            let propType = propMatch[2].trim();

            // First remove escape characters
            propType = propType.replace(/\\/g, '');

            // Remove | null anywhere in the type (including markdown syntax \| `null`)
            propType = propType.replace(/\s*\|\s*`?null`?\s*/g, '').trim();

            // Remove all backticks
            propType = propType.replace(/`/g, '');

            // Convert markdown links
            propType = this.markdownLinkToHtml(propType);

            // Final cleanup of spaces
            propType = propType.trim();

            properties.push({ name: propName, type: propType });
          }
        }

        if (properties.length > 0) {
          return properties;
        }
      }
    }

    // If no properties found in signature, look for separate property sections
    // These are marked with **propertyName** followed by type signature
    if (propertyBody) {
      const properties = [];
      const lines = propertyBody.split('\n');
      const boldPattern = /^\*\*[^*]+\*\*$/;
      const typePattern = /^>\s+\*\*[^*]+\*\*:\s*(.+?)(?:\n|$)/;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Look for **propertyName** pattern
        if (boldPattern.test(line)) {
          // Extract property name from bold text
          const propName = line.replace(/\*\*/g, '').trim();

          // Look for the type signature in the following lines
          for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
            const typeLine = lines[j];
            const typeMatch = typePattern.exec(typeLine);

            if (typeMatch) {
              let propType = typeMatch[1].trim();

              // Remove escape characters
              propType = propType.replace(/\\/g, '');

              // Remove | null
              propType = propType.replace(/\s*\|\s*`?null`?\s*/g, '').trim();

              // Remove all backticks
              propType = propType.replace(/`/g, '');

              // Convert markdown links
              propType = this.markdownLinkToHtml(propType);

              // Final cleanup of spaces
              propType = propType.trim();

              properties.push({ name: propName, type: propType });
              break;
            }
          }
        }
      }

      if (properties.length > 0) {
        return properties;
      }
    }

    return [];
  }

  /**
   * Generate expandable section for object properties
   */
  generateObjectExpandable(properties) {
    if (properties.length === 0) return '';

    const paramFields = properties.map(prop => {
      // For object properties, use direct type attribute (don't escape angle brackets in attributes)
      // Angle brackets don't need HTML entity escaping inside single-quoted attributes
      let typeAttr;

      if (prop.type.includes('<a')) {
        // Type contains HTML links - use formatTypeForParamField to handle properly
        const { type: formatted } = this.formatTypeForParamField(prop.type);
        typeAttr = formatted;
      } else {
        // Plain text type - use single quotes without escaping angle brackets
        typeAttr = `type='${prop.type}'`;
      }

      // Use single quotes for all attributes to avoid conflicts with type content
      return `  <ParamField body='${prop.name}' ${typeAttr}>

  </ParamField>`;
    });

    return `<Expandable title="properties">
${paramFields.join('\n')}
</Expandable>`;
  }

  /**
   * Convert headers inside ParamField content to bold text
   */
  normalizeHeadersForParamField(content) {
    // Convert headers (##, ###, ####, etc.) to bold text **text**
    content = content.replace(/^#+\s+(.+?)$/gm, '**$1**');
    return content;
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
   * Convert Properties to ParamFields
   */
  convertProperties(content) {
    // Match the Properties section
    const propertiesRegex = /^## Properties\n\n([\s\S]*)$/m;
    const match = content.match(propertiesRegex);

    if (!match) {
      return content;
    }

    let propertiesContent = match[1];
    const propertyBlocks = [];

    // Split by ### (property names)
    const propertyLines = propertiesContent.split('\n');
    let currentProperty = null;
    let currentBody = [];

    for (let i = 0; i < propertyLines.length; i++) {
      const line = propertyLines[i];

      // Check if this is a property header
      if (line.match(/^### /)) {
        // Save previous property if exists
        if (currentProperty) {
          let bodyLines = [];
          for (let j = 0; j < currentBody.length; j++) {
            bodyLines.push(currentBody[j]);
          }

          let propertyBody = bodyLines.join('\n').trim();
          propertyBody = this.removeHorizontalRules(propertyBody);
          propertyBody = this.normalizeHeadersForParamField(propertyBody);

          // Extract type from signature line
          // Look for: > `optional` **propertyName**: type
          const signatureMatch = propertyBody.match(/^> .*?\*\*[^*]+\*\*:\s*(.+?)(?:\n|$)/);
          let propertyType = 'unknown';
          const signatureLine = propertyBody.split('\n')[0]; // Get full signature line

          if (signatureMatch) {
            propertyType = signatureMatch[1].trim()
              .replace(/`/g, '')                          // Remove backticks
              .replace(/\\/g, '')                         // Remove escape characters
              .replace(/\s*\|\s*(null|undefined)\s*$/g, ''); // Remove only | null or | undefined at end
          }

          // Check if this is an object type
          let propertyField;
          if (this.isObjectType(propertyType)) {
            // Parse object properties and generate expandable section
            const objProps = this.parseObjectProperties(signatureLine, propertyBody);
            const expandableSection = this.generateObjectExpandable(objProps);

            propertyField = `<ParamField body='${currentProperty}' type="object">

${expandableSection}
</ParamField>`;
          } else {
            // Format type with proper handling for array notation and HTML links
            const { type: typeAttr } = this.formatTypeForParamField(propertyType);

            propertyField = `<ParamField body='${currentProperty}' ${typeAttr}>
${propertyBody}
</ParamField>`;
          }

          propertyBlocks.push(propertyField);
          this.propertiesConverted++;
        }

        // Start new property
        currentProperty = line.replace(/^### /, '').trim();
        currentBody = [];
      } else {
        // Add line to current property body
        currentBody.push(line);
      }
    }

    // Don't forget the last property
    if (currentProperty) {
      let bodyLines = [];
      for (let j = 0; j < currentBody.length; j++) {
        bodyLines.push(currentBody[j]);
      }

      let propertyBody = bodyLines.join('\n').trim();
      propertyBody = this.removeHorizontalRules(propertyBody);
      propertyBody = this.normalizeHeadersForParamField(propertyBody);

      // Extract type from signature line
      const signatureMatch = propertyBody.match(/^> .*?\*\*[^*]+\*\*:\s*(.+?)(?:\n|$)/);
      let propertyType = 'unknown';
      const signatureLine = propertyBody.split('\n')[0]; // Get full signature line

      if (signatureMatch) {
        propertyType = signatureMatch[1].trim()
          .replace(/`/g, '')                          // Remove backticks
          .replace(/\\/g, '')                         // Remove escape characters
          .replace(/\s*\|\s*(null|undefined)\s*$/g, ''); // Remove only | null or | undefined at end
      }

      // Check if this is an object type
      let propertyField;
      if (this.isObjectType(propertyType)) {
        // Parse object properties and generate expandable section
        const objProps = this.parseObjectProperties(signatureLine, propertyBody);
        const expandableSection = this.generateObjectExpandable(objProps);

        propertyField = `<ParamField body='${currentProperty}' type="object">

${expandableSection}
</ParamField>`;
      } else {
        // Format type with proper handling for array notation and HTML links
        const { type: typeAttr } = this.formatTypeForParamField(propertyType);

        propertyField = `<ParamField body='${currentProperty}' ${typeAttr}>
${propertyBody}
</ParamField>`;
      }

      propertyBlocks.push(propertyField);
      this.propertiesConverted++;
    }

    if (propertyBlocks.length > 0) {
      const newProperties = `## Properties\n\n${propertyBlocks.join('\n\n')}\n`;
      const propertiesRegex2 = /^## Properties\n\n([\s\S]*)$/m;
      return content.replace(propertiesRegex2, newProperties);
    }

    return content;
  }

  /**
   * Process an interface file
   */
  processInterfaceFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Convert Properties
      content = this.convertProperties(content);

      // Convert References
      content = this.convertReferences(content);

      // Write back
      fs.writeFileSync(filePath, content);
      console.log(`    ✓ Converted: ${path.basename(filePath)}`);
      this.interfaceCount++;

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
    console.log('🚀 Starting Types interfaces consolidation...\n');

    if (!fs.existsSync(INTERFACES_PATH)) {
      console.error(`✗ Interfaces path not found: ${INTERFACES_PATH}`);
      process.exit(1);
    }

    const interfaceFiles = fs.readdirSync(INTERFACES_PATH).filter(f => f.endsWith('.mdx'));

    console.log(`📂 Found ${interfaceFiles.length} interface files\n`);

    for (const file of interfaceFiles) {
      const filePath = path.join(INTERFACES_PATH, file);
      this.processInterfaceFile(filePath);
    }

    console.log(`\n✓ Types interfaces consolidation complete!`);
    console.log(`  • Interfaces processed: ${this.interfaceCount}`);
    console.log(`  • Properties converted: ${this.propertiesConverted}`);
  }
}

const consolidator = new InterfacesConsolidator();
consolidator.run();
