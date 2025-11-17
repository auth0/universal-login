#!/usr/bin/env node

/**
 * Fix malformed method sections with #<ParamField...> patterns
 *
 * Transformations:
 * - Find methods with malformed heading patterns like #<ParamField...>
 * - Convert to proper <ParamField> wrapping the entire method
 * - Wrap Parameters sections in <Expandable> component
 * - Keep Returns section intact
 *
 * From:
 * ### methodName()
 * > **methodName**: ...
 * Defined in: ...
 * #<ParamField body='Parameters' type='unknown'>
 * ##### paramName
 * ...
 * #### Returns
 * returnType
 * </ParamField>
 *
 * To:
 * <ParamField body='methodName' type='returnType'>
 * > **methodName**: ...
 * Defined in: ...
 * <Expandable title="Parameters">
 * <ParamField body='paramName' type='...'>
 * ...
 * </ParamField>
 * </Expandable>
 * #### Returns
 * returnType
 * </ParamField>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const OUTPUT_DIR = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk'
);

class MalformedMethodFixer {
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.filesProcessed = 0;
    this.methodsFixed = 0;
  }

  /**
   * Extract method name from heading
   * From: ### methodName() or ### methodName()?
   * To: methodName
   */
  extractMethodName(heading) {
    const match = heading.match(/^###\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\(\)\??/);
    return match ? match[1] : 'method';
  }

  /**
   * Extract return type from the content
   * Looks for #### Returns section, backtick-wrapped type, or signature
   */
  extractReturnType(methodBlock) {
    // Look for #### Returns followed by type
    const returnsMatch = methodBlock.match(/#### Returns\n+`?([^`\n]+)`?/);
    if (returnsMatch) {
      return returnsMatch[1].trim();
    }

    // Look for backtick-wrapped return type (e.g., `void`, `string`) with flexible newlines
    const backtickMatch = methodBlock.match(/\n`([^`]+)`[\s\n]*/);
    if (backtickMatch) {
      return backtickMatch[1].trim();
    }

    // Look for return type from arrow function signature (e.g., => `void` or => `Promise<void>`)
    const signatureMatch = methodBlock.match(/=>\s*`([^`]+)`/);
    if (signatureMatch) {
      return signatureMatch[1].trim();
    }

    // Look for plain return type without backticks
    const plainTypeMatch = methodBlock.match(/\n([a-zA-Z<>[\]|() ]+)\n\n\n</);
    if (plainTypeMatch) {
      return plainTypeMatch[1].trim();
    }

    return 'unknown';
  }

  /**
   * Fix malformed methods and properties in content
   */
  fixMalformedMethods(content) {
    // First, fix standalone #<ParamField patterns (properties with nested fields)
    // Pattern: #<ParamField followed by content until </ParamField>
    const standalonePattern = /#(<ParamField[^>]*>)([\s\S]*?)(<\/ParamField>)/g;
    content = content.replace(standalonePattern, '<$1$2$3');

    // Pattern: method heading followed by signature and malformed #<ParamField
    // Matches: ### methodName() ... <ParamField...> ... </ParamField>
    const methodPattern = /(###\s+[a-zA-Z_$][a-zA-Z0-9_$]*\(\)\??)\n([\s\S]*?)(<ParamField[^>]*>)([\s\S]*?)(<\/ParamField>)/g;

    let fixCount = 0;
    let modifiedContent = content;

    modifiedContent = modifiedContent.replace(methodPattern, (fullMatch, heading, contentBeforeParamField, openingTag, paramsAndReturns, closingTag) => {
      const methodName = this.extractMethodName(heading);
      const returnType = this.extractReturnType(paramsAndReturns);

      // Remove the heading line from contentBeforeParamField
      let cleanedBefore = contentBeforeParamField.replace(/^\n/, '').trimStart();

      // Handle the parameters section
      let innerContent = paramsAndReturns;

      // If there's a ##### paramName pattern, wrap it in Expandable
      if (innerContent.includes('#####') || innerContent.includes('##### ')) {
        // Extract everything before #### Returns (or just Parameters if no Returns)
        const returnsMatch = innerContent.match(/([\s\S]*?)(#### Returns[\s\S]*?)$/);

        let paramsSectionContent = '';
        let returnsSection = '';

        if (returnsMatch) {
          paramsSectionContent = returnsMatch[1];
          returnsSection = returnsMatch[2];
        } else {
          paramsSectionContent = innerContent;
        }

        // Convert parameter items to nested ParamFields
        const paramPattern = /(##### ([^\n]+)\n)([\s\S]*?)(?=\n##### |\n#### |$)/g;
        let paramFields = '';
        let paramMatch;
        let hasParams = false;

        while ((paramMatch = paramPattern.exec(paramsSectionContent)) !== null) {
          hasParams = true;
          const paramName = paramMatch[2];
          const paramDesc = paramMatch[3].trim();

          // Extract type from description
          const typeMatch = paramDesc.match(/\[`?([^\]`]+)`?\]\(([^)]+)\)|`([^`]+)`|^([^\n]+)/);
          let paramType = 'unknown';

          if (typeMatch && typeMatch[1]) {
            // Markdown link
            paramType = `{<span><a href="${typeMatch[2]}">${typeMatch[1]}</a></span>}`;
          } else if (typeMatch && typeMatch[3]) {
            // Backtick type
            paramType = `'${typeMatch[3]}'`;
          } else if (typeMatch && typeMatch[4]) {
            // Plain type
            paramType = `'${typeMatch[4]}'`;
          }

          paramFields += `<ParamField body='${paramName}' type=${paramType}>\n${paramDesc}\n</ParamField>\n`;
        }

        if (hasParams) {
          innerContent = `<Expandable title="Parameters">\n${paramFields}</Expandable>\n${returnsSection}`;
        } else {
          innerContent = returnsSection || paramsAndReturns;
        }
      }

      fixCount++;
      return `${openingTag}${cleanedBefore}${innerContent}\n${closingTag}`;
    });

    this.methodsFixed += fixCount;
    return modifiedContent;
  }

  /**
   * Process a single MDX file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Fix malformed methods
      content = this.fixMalformedMethods(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
      }

      this.filesProcessed++;
      return true;
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Walk directory and process all MDX files
   */
  walkDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        this.walkDirectory(fullPath);
      } else if (entry.name.endsWith('.mdx')) {
        this.processFile(fullPath);
      }
    }
  }

  /**
   * Run fixing
   */
  fix() {
    console.log('🚀 Starting malformed method section fixing...\n');

    if (!fs.existsSync(this.outputDir)) {
      console.error(`✗ Output directory not found: ${this.outputDir}`);
      process.exit(1);
    }

    console.log(`📂 Processing directory: ${this.outputDir}\n`);

    this.walkDirectory(this.outputDir);

    console.log(`\n✓ Malformed method fixing complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Methods fixed: ${this.methodsFixed}`);
  }
}

// Run fixing
const fixer = new MalformedMethodFixer(OUTPUT_DIR);
fixer.fix();
