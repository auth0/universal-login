#!/usr/bin/env node

/**
 * Comment out signature lines inside ParamField components
 *
 * Transformations:
 * - Find ParamField components
 * - Comment out the first line that starts with greater-than symbol
 * - This removes redundant info since body/type already capture it
 *
 * Converts signature lines like:
 *   > **propertyName**: string
 * Into MDX comments:
 *   {slash-star > **propertyName**: string star-slash}
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

class ParamFieldSignatureCommenter {
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.filesProcessed = 0;
    this.signaturesCommented = 0;
  }

  /**
   * Comment out ALL signature lines in ParamField components
   * Replaces lines starting with > inside ParamField with MDX comments
   */
  commentSignatures(content) {
    let modifiedContent = content;
    let matchCount = 0;

    // Find all ParamField components and comment out ANY lines starting with >
    const paramFieldPattern = /(<ParamField[^>]*>)([\s\S]*?)(<\/ParamField>)/g;

    modifiedContent = modifiedContent.replace(paramFieldPattern, (match, opening, middle, closing) => {
      // Comment out all lines that start with > in the middle content
      const lines = middle.split('\n');
      const processedLines = lines.map(line => {
        const trimmed = line.trimStart();
        // If line starts with > and is not already commented, comment it
        if (trimmed.startsWith('>') && !trimmed.startsWith('{/*')) {
          matchCount++;
          // Preserve indentation
          const indent = line.match(/^\s*/)[0];
          return indent + '{/*' + trimmed + '*/}';
        }
        return line;
      });

      return opening + processedLines.join('\n') + closing;
    });

    this.signaturesCommented += matchCount;
    return modifiedContent;
  }

  /**
   * Process a single MDX file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Comment out signatures
      content = this.commentSignatures(content);

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
   * Run the commenting process
   */
  run() {
    console.log('🚀 Starting ParamField signature commenting...\n');

    if (!fs.existsSync(this.outputDir)) {
      console.error(`✗ Output directory not found: ${this.outputDir}`);
      process.exit(1);
    }

    console.log(`📂 Processing directory: ${this.outputDir}\n`);

    this.walkDirectory(this.outputDir);

    console.log(`\n✓ ParamField signature commenting complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Signatures commented: ${this.signaturesCommented}`);
  }
}

// Run the commenter
const commenter = new ParamFieldSignatureCommenter(OUTPUT_DIR);
commenter.run();
