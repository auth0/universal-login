#!/usr/bin/env node

/**
 * Fix GitHub links to point to official auth0 repository instead of fork
 *
 * Transformations:
 * - Replace WriteChoiceMigration with auth0 in GitHub URLs
 * - Updates links from fork to official repository
 *
 * From:
 * https://github.com/WriteChoiceMigration/universal-login/blob/...
 *
 * To:
 * https://github.com/auth0/universal-login/blob/...
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

class GitHubLinkFixer {
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.filesProcessed = 0;
    this.linksFixed = 0;
  }

  /**
   * Fix GitHub links in content
   * Replaces WriteChoiceMigration with auth0
   */
  fixLinks(content) {
    let modifiedContent = content;
    let matchCount = 0;

    // Pattern: Replace WriteChoiceMigration with auth0 in GitHub URLs
    // From: https://github.com/WriteChoiceMigration/universal-login/...
    // To: https://github.com/auth0/universal-login/...
    const githubPattern = /https:\/\/github\.com\/WriteChoiceMigration\//g;

    modifiedContent = modifiedContent.replace(githubPattern, () => {
      matchCount++;
      return 'https://github.com/auth0/';
    });

    this.linksFixed += matchCount;
    return modifiedContent;
  }

  /**
   * Process a single MDX file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Fix links
      content = this.fixLinks(content);

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
   * Run link fixing
   */
  fixAllLinks() {
    console.log('🚀 Starting GitHub link fixing process...\n');

    if (!fs.existsSync(this.outputDir)) {
      console.error(`✗ Output directory not found: ${this.outputDir}`);
      process.exit(1);
    }

    console.log(`📂 Processing directory: ${this.outputDir}\n`);

    this.walkDirectory(this.outputDir);

    console.log(`\n✓ GitHub link fixing complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • GitHub links fixed: ${this.linksFixed}`);
  }
}

// Run link fixing
const fixer = new GitHubLinkFixer(OUTPUT_DIR);
fixer.fixAllLinks();
