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
   * Convert headers inside ParamField content to bold text
   */
  normalizeHeadersForParamField(content) {
    // Convert headers (##, ###, ####, etc.) to bold text **text**
    content = content.replace(/^#+\s+(.+?)$/gm, '**$1**');
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

          if (signatureMatch) {
            propertyType = signatureMatch[1].trim()
              .replace(/`/g, '')        // Remove backticks
              .replace(/\\/g, '')       // Remove escape characters
              .replace(/\|.*$/, '');    // Remove union types, keep first type
          }

          const propertyField = `<ParamField body='${currentProperty}' type='${propertyType}'>
${propertyBody}
</ParamField>`;

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

      if (signatureMatch) {
        propertyType = signatureMatch[1].trim()
          .replace(/`/g, '')        // Remove backticks
          .replace(/\\/g, '')       // Remove escape characters
          .replace(/\|.*$/, '');    // Remove union types, keep first type
      }

      const propertyField = `<ParamField body='${currentProperty}' type='${propertyType}'>
${propertyBody}
</ParamField>`;

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
