#!/usr/bin/env node

/**
 * Convert Example sections to RequestExample components
 *
 * Transformations:
 * - Find "#### Example" sections
 * - Remove the #### Example heading
 * - Add "Example" to the code block fence (e.g., ```typescript becomes ```typescript Example)
 * - Wrap the code block in <RequestExample> tags
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

class ExampleRequestExampleConverter {
  constructor(classesDir) {
    this.classesDir = classesDir;
    this.filesProcessed = 0;
    this.examplesConverted = 0;
  }

  /**
   * Ensure code blocks are properly closed
   * If a ``` is opened but not closed, add a closing ```
   */
  ensureClosedCodeBlocks(content) {
    let result = content;
    const lines = result.split('\n');
    let insideCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^```/)) {
        insideCodeBlock = !insideCodeBlock;
      }
    }

    // If we end in an open code block, add closing ```
    if (insideCodeBlock) {
      result += '\n```';
    }

    return result;
  }

  /**
   * Count code blocks in example content
   */
  countCodeBlocks(exampleContent) {
    const codeBlockRegex = /```/g;
    const matches = exampleContent.match(codeBlockRegex);
    // Each code block has 2 fence markers (opening and closing)
    return matches ? matches.length / 2 : 0;
  }

  /**
   * Convert Example sections to RequestExample/ResponseExample components
   *
   * Rules:
   * - 1 code block: wrap in <RequestExample>
   * - 2 code blocks: wrap 1st in <RequestExample>, 2nd in <ResponseExample>
   * - More than 2: don't add any components
   *
   * From:
   * #### Example
   * ```typescript
   * code here
   * ```
   *
   * To (1 block):
   * <RequestExample>
   * ```typescript Example
   * code here
   * ```
   * </RequestExample>
   *
   * To (2 blocks):
   * <RequestExample>
   * ```typescript Example
   * code here
   * ```
   * </RequestExample>
   * <ResponseExample>
   * ```json Response
   * response here
   * ```
   * </ResponseExample>
   */
  convertExamples(content) {
    // First, count total Example sections in this file
    const totalExamples = (content.match(/#### Example/g) || []).length;

    // Track which example we're currently processing
    let exampleIndex = 0;

    // Match #### Example section until next #### heading or end of file
    const exampleSectionRegex = /(#### Example\n)([\s\S]*?)(?=\n#### [A-Z]|\n<\/ParamField>|$)/g;

    return content.replace(exampleSectionRegex, (fullMatch, heading, exampleContent) => {
      exampleIndex++;

      // Ensure code blocks are properly closed
      exampleContent = this.ensureClosedCodeBlocks(exampleContent);

      // Count code blocks in this example section
      const codeBlockCount = this.countCodeBlocks(exampleContent);

      // If more than 2 code blocks, don't modify
      if (codeBlockCount > 2) {
        return fullMatch;
      }

      // If no code blocks, don't modify
      if (codeBlockCount === 0) {
        return fullMatch;
      }

      // If more than 2 Examples total in file, don't modify
      if (totalExamples > 2) {
        return fullMatch;
      }

      // Process code blocks based on count and position
      let processedContent = exampleContent;

      // Single code block case
      if (codeBlockCount === 1) {
        // If exactly 2 Examples total: use RequestExample for 1st, ResponseExample for 2nd
        if (totalExamples === 2) {
          const label = exampleIndex === 1 ? 'Example' : 'Response';
          const wrapper = exampleIndex === 1 ? 'RequestExample' : 'ResponseExample';
          processedContent = processedContent.replace(
            /^(```[a-z]*)\n/m,
            `$1 ${label}\n`
          );
          return `<${wrapper}>\n${processedContent}\n</${wrapper}>\n`;
        }

        // If only 1 Example: wrap in RequestExample
        if (totalExamples === 1) {
          processedContent = processedContent.replace(
            /^(```[a-z]*)\n/m,
            '$1 Example\n'
          );
          return `<RequestExample>\n${processedContent}\n</RequestExample>\n`;
        }
      }

      // Two code blocks in single Example section case
      if (codeBlockCount === 2) {
        // Only apply if there's exactly 1 Example section (not 2)
        if (totalExamples === 1) {
          const codeBlockPattern = /(```[a-z]*)\n([\s\S]*?```)\n([\s\S]*?)(```[a-z]*)\n([\s\S]*?```)/;
          const match = processedContent.match(codeBlockPattern);

          if (match) {
            const lang1 = match[1];
            const code1 = match[2];
            const between = match[3];
            const lang2 = match[4];
            const code2 = match[5];

            const wrapped = `<RequestExample>\n${lang1} Example\n${code1}\n</RequestExample>\n${between}<ResponseExample>\n${lang2} Response\n${code2}\n</ResponseExample>\n`;
            return wrapped;
          }
        }
      }

      return fullMatch;
    });
  }

  /**
   * Process a single class file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Convert examples to RequestExample
      content = this.convertExamples(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.examplesConverted += 1;
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
    console.log('🚀 Starting Example to RequestExample conversion...\n');

    console.log(`📂 Processing directory: ${this.classesDir}\n`);

    this.processAllFiles();

    console.log(`\n✓ Conversion complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Files with examples converted: ${this.examplesConverted}`);
  }
}

// Run conversion
const converter = new ExampleRequestExampleConverter(CLASSES_DIR);
converter.convert();
