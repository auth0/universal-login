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

      const paramField = `<ParamField body='${paramName}' type='${paramType}'>
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

          const methodField = `<ParamField body='${currentMethod}' type='${methodType}'>
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

      const methodField = `<ParamField body='${currentMethod}' type='${methodType}'>
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
