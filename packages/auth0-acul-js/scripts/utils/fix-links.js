#!/usr/bin/env node

/**
 * Fix internal links to use /docs prefix and remove @auth0/namespaces from paths
 *
 * Transformations:
 * - Convert absolute paths to /docs/customize/... format
 * - Remove @auth0/namespaces/ from link paths
 * - Ensure consistency across all MDX files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const OUTPUT_DIR = path.join(MONOREPO_ROOT, 'docs/customize/login-pages/advanced-customizations/reference/js-sdk');

class LinkFixer {
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.filesProcessed = 0;
    this.linksFixed = 0;
  }

  /**
   * Fix links in content
   * Converts links to use /docs prefix and removes @auth0/namespaces
   */
  fixLinks(content) {
    let modifiedContent = content;
    let matchCount = 0;

    // Pattern 1: Full absolute paths with @auth0/namespaces
    // From: //home/.../docs/customize/login-pages/advanced-customizations/reference/js-sdk/@auth0/namespaces/Screens/...
    // To: /docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/...
    const fullPathPattern = /\[([^\]]+)\]\(\/\/[^)]*?\/docs\/customize\/login-pages\/advanced-customizations\/reference\/js-sdk\/@auth0\/namespaces\/([^)]+)\)/g;

    modifiedContent = modifiedContent.replace(fullPathPattern, (match, text, linkPath) => {
      matchCount++;
      return `[${text}](/docs/customize/login-pages/advanced-customizations/reference/js-sdk/${linkPath})`;
    });

    // Pattern 2: Paths already with /docs but still containing @auth0/namespaces
    // From: /docs/customize/login-pages/.../js-sdk/@auth0/namespaces/Screens/...
    // To: /docs/customize/login-pages/.../js-sdk/Screens/...
    const docsPathPattern = /\[([^\]]+)\]\(\/docs\/customize\/login-pages\/advanced-customizations\/reference\/js-sdk\/@auth0\/namespaces\/([^)]+)\)/g;

    modifiedContent = modifiedContent.replace(docsPathPattern, (match, text, linkPath) => {
      matchCount++;
      return `[${text}](/docs/customize/login-pages/advanced-customizations/reference/js-sdk/${linkPath})`;
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
    console.log('🚀 Starting link fixing process...\n');

    if (!fs.existsSync(this.outputDir)) {
      console.error(`✗ Output directory not found: ${this.outputDir}`);
      process.exit(1);
    }

    console.log(`📂 Processing directory: ${this.outputDir}\n`);

    this.walkDirectory(this.outputDir);

    console.log(`\n✓ Link fixing complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Links fixed: ${this.linksFixed}`);
  }
}

// Run link fixing
const fixer = new LinkFixer(OUTPUT_DIR);
fixer.fixAllLinks();
