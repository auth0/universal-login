#!/usr/bin/env node

/**
 * Fix missing closing backticks in code blocks
 *
 * Detects code blocks that are missing closing ``` and adds them
 * Handles cases where a code block is left open before the next section
 *
 * From:
 * ```typescript
 * code here
 *
 * #### Next Section
 *
 * To:
 * ```typescript
 * code here
 * ```
 *
 * #### Next Section
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

class CodeBlockBacktickFixer {
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.filesProcessed = 0;
    this.blocksFixed = 0;
  }

  /**
   * Fix missing closing backticks in code blocks
   */
  fixCodeBlocks(content) {
    let modifiedContent = content;
    let fixCount = 0;

    // Find all opening code blocks (``` or ```language)
    const codeBlockRegex = /^```[a-z]*$/gm;

    // Split content into lines for processing
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeBlockStartLine = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for opening code block
      if (line.match(/^```[a-z]*$/)) {
        if (inCodeBlock) {
          // Found closing backticks
          inCodeBlock = false;
        } else {
          // Found opening backticks
          inCodeBlock = true;
          codeBlockStartLine = i;
        }
      } else if (inCodeBlock && (line.startsWith('##') || line.startsWith('####'))) {
        // Found a section heading while still in code block
        // Insert closing backticks before this line
        lines.splice(i, 0, '```');
        inCodeBlock = false;
        fixCount++;
        i++; // Skip the newly inserted line
      }
    }

    // If code block is still open at end of file, close it
    if (inCodeBlock) {
      lines.push('```');
      fixCount++;
    }

    this.blocksFixed += fixCount;
    return lines.join('\n');
  }

  /**
   * Process a single file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Fix code blocks
      content = this.fixCodeBlocks(content);

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
    console.log('🚀 Starting code block backtick fixing...\n');

    if (!fs.existsSync(this.outputDir)) {
      console.error(`✗ Output directory not found: ${this.outputDir}`);
      process.exit(1);
    }

    console.log(`📂 Processing directory: ${this.outputDir}\n`);

    this.walkDirectory(this.outputDir);

    console.log(`\n✓ Code block fixing complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Code blocks fixed: ${this.blocksFixed}`);
  }
}

// Run fixing
const fixer = new CodeBlockBacktickFixer(OUTPUT_DIR);
fixer.fix();
