#!/usr/bin/env node

/**
 * Extract @example code blocks from constructors in class source files
 *
 * For class files only:
 * - Reads the TypeScript source file from the repository
 * - Finds the constructor
 * - Locates the first @example JSDoc tag after the constructor
 * - Extracts the code block (without JSDoc markers)
 * - Adds it as a <RequestExample> component to the MDX file
 *
 * From source:
 * constructor() { ... }
 *
 * /**
 *  * @example
 *  * ```typescript
 *  * import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';
 *  * const acceptInvitation = new AcceptInvitation();
 *  * ```
 *  *\/
 *
 * To MDX:
 * <RequestExample>
 * ```ts
 * import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';
 * const acceptInvitation = new AcceptInvitation();
 * ```
 * </RequestExample>
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

class ConstructorExampleExtractor {
  constructor(classesDir) {
    this.classesDir = classesDir;
    this.filesProcessed = 0;
    this.examplesAdded = 0;
    this.examplesReplaced = 0;
    this.examplesRemoved = 0;
  }

  /**
   * Parse GitHub URL to extract file path
   * From: https://github.com/auth0/universal-login/blob/41ce742.../packages/auth0-acul-js/src/screens/accept-invitation.ts#L20
   * Extract: /packages/auth0-acul-js/src/screens/accept-invitation.ts
   */
  parseGitHubLink(url) {
    const match = url.match(/blob\/[a-f0-9]+\/(packages\/auth0-acul-js\/.+?)(?:#L\d+)?$/);
    if (!match) {
      return null;
    }
    return path.join(MONOREPO_ROOT, match[1]);
  }

  /**
   * Extract the @example code block from JSDoc comment after constructor
   *
   * Handles two formats:
   * 1. @example followed by code block in backticks
   * 2. @example followed by code without backticks (asterisk-prefixed lines)
   */
  extractExampleFromSource(sourceCode) {
    try {
      // Find constructor start
      const constructorMatch = sourceCode.match(/constructor\s*\([^)]*\)\s*\{/);
      if (!constructorMatch) {
        return null;
      }

      // Find the end of the constructor by matching braces
      const constructorStart = constructorMatch.index + constructorMatch[0].length;
      let braceCount = 1;
      let constructorEnd = constructorStart;

      for (let i = constructorStart; i < sourceCode.length && braceCount > 0; i++) {
        if (sourceCode[i] === '{') braceCount++;
        if (sourceCode[i] === '}') braceCount--;
        constructorEnd = i;
      }

      // Start searching after the constructor's closing brace
      const afterConstructor = sourceCode.substring(constructorEnd + 1);

      // Find the first @example tag after constructor
      const exampleMatch = afterConstructor.match(/@example\s*\n/);
      if (!exampleMatch) {
        return null;
      }

      // Start from the @example tag
      const afterExample = afterConstructor.substring(exampleMatch.index + exampleMatch[0].length);

      // Format 1: Check if there's a code block with backticks (```typescript or ```ts)
      const backtickBlockMatch = afterExample.match(/\s*\*\s*```(?:typescript|ts)?\s*\n([\s\S]*?)\s*\*\s*```/);
      if (backtickBlockMatch) {
        // Extract code from within the backticks, removing leading * from each line
        const codeLines = backtickBlockMatch[1].split('\n');
        const cleanedCode = codeLines
          .map(line => {
            // Remove leading whitespace and asterisk
            const cleaned = line.replace(/^\s*\*\s?/, '');
            return cleaned;
          })
          .join('\n')
          .trim();

        return cleanedCode;
      }

      // Format 2: Code without backticks (asterisk-prefixed lines until end of comment)
      // Match from @example until the closing */
      const noBacktickMatch = afterExample.match(/^([\s\S]*?)\*\//);
      if (noBacktickMatch) {
        const codeLines = noBacktickMatch[1].split('\n');
        const cleanedCode = codeLines
          .map(line => {
            // Remove leading whitespace and asterisk
            const cleaned = line.replace(/^\s*\*\s?/, '');
            return cleaned;
          })
          .filter(line => line.trim().length > 0) // Remove empty lines at start/end
          .join('\n')
          .trim();

        return cleanedCode;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Remove RequestExample from MDX file if it exists
   * Returns: { content, wasRemoved }
   */
  removeExampleFromMDX(content) {
    // Check if RequestExample exists
    const existingExampleMatch = content.match(/\n\n<RequestExample>\n```[\s\S]*?```\n<\/RequestExample>/);

    if (existingExampleMatch) {
      // Remove the existing example
      return {
        content: content.replace(existingExampleMatch[0], ''),
        wasRemoved: true
      };
    }

    return { content, wasRemoved: false };
  }

  /**
   * Add or replace example in MDX file
   * - If RequestExample exists, replace it with the new code
   * - If not, insert after "Defined in:" line and before first ## section
   * Returns: { content, wasReplacement }
   */
  addExampleToMDX(content, exampleCode) {
    // Build the new example component
    const newExample = `\n\n<RequestExample>\n\`\`\`ts\n${exampleCode}\n\`\`\`\n</RequestExample>`;

    // Check if RequestExample already exists
    const existingExampleMatch = content.match(/\n\n<RequestExample>\n```[\s\S]*?```\n<\/RequestExample>/);

    if (existingExampleMatch) {
      // Replace the existing example
      return {
        content: content.replace(existingExampleMatch[0], newExample),
        wasReplacement: true
      };
    }

    // Find the "Defined in:" line (first occurrence)
    const definedInMatch = content.match(/Defined in: \[[^\]]+\]\([^)]+\)/);
    if (!definedInMatch) {
      return { content, wasReplacement: false };
    }

    const insertPosition = definedInMatch.index + definedInMatch[0].length;

    // Insert the example
    return {
      content: content.substring(0, insertPosition) + newExample + content.substring(insertPosition),
      wasReplacement: false
    };
  }

  /**
   * Process a single class file
   */
  processFile(filePath) {
    try {
      // Read the MDX file
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Find the "Defined in:" link to get the source file path
      const definedInMatch = content.match(/Defined in: \[([^\]]+)\]\(([^)]+)\)/);
      if (!definedInMatch) {
        this.filesProcessed++;
        return true;
      }

      // Parse the GitHub link to get source file path
      const sourceFilePath = this.parseGitHubLink(definedInMatch[2]);
      if (!sourceFilePath || !fs.existsSync(sourceFilePath)) {
        this.filesProcessed++;
        return true;
      }

      // Read the source file
      const sourceCode = fs.readFileSync(sourceFilePath, 'utf-8');

      // Extract the @example code block
      const exampleCode = this.extractExampleFromSource(sourceCode);

      if (!exampleCode) {
        // No example found - remove RequestExample if it exists
        const removeResult = this.removeExampleFromMDX(content);
        content = removeResult.content;

        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          if (removeResult.wasRemoved) {
            this.examplesRemoved += 1;
            console.log(`✓ Removed example from: ${path.basename(filePath)}`);
          }
        }

        this.filesProcessed++;
        return true;
      }

      // Add or replace the example in the MDX file
      const result = this.addExampleToMDX(content, exampleCode);
      content = result.content;

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        if (result.wasReplacement) {
          this.examplesReplaced += 1;
          console.log(`✓ Replaced example in: ${path.basename(filePath)}`);
        } else {
          this.examplesAdded += 1;
          console.log(`✓ Added example to: ${path.basename(filePath)}`);
        }
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
   * Run extraction
   */
  extract() {
    console.log('🚀 Starting constructor @example extraction...\n');

    console.log(`📂 Processing directory: ${this.classesDir}\n`);

    this.processAllFiles();

    console.log(`\n✓ Constructor example extraction complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Examples added: ${this.examplesAdded}`);
    console.log(`  • Examples replaced: ${this.examplesReplaced}`);
    console.log(`  • Examples removed: ${this.examplesRemoved}`);
  }
}

// Run extraction
const extractor = new ConstructorExampleExtractor(CLASSES_DIR);
extractor.extract();
