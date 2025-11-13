#!/usr/bin/env node

/**
 * Fix links after flattening directory structure
 *
 * Updates all markdown links to remove "namespaces" from paths
 * since those directories are removed during flattening.
 *
 * Transformations:
 * - /...../API-Reference/namespaces/Hooks/.... → /...../API-Reference/Hooks/...
 * - /...../API-Reference/namespaces/Types/.... → /...../API-Reference/Types/...
 * - /...../API-Reference/namespaces/Screens/namespaces/.... → /...../API-Reference/Screens/...
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';

class LinkFixer {
  constructor() {
    this.filesProcessed = 0;
    this.linksFixed = 0;
  }

  /**
   * Remove "namespaces" segments from paths
   */
  fixPathsInContent(content) {
    let updatedContent = content;
    let fixed = 0;

    // Fix links like: /path/API-Reference/namespaces/Hooks/ → /path/API-Reference/Hooks/
    updatedContent = updatedContent.replace(
      /\/API-Reference\/namespaces\/Hooks\//g,
      () => {
        fixed++;
        return '/API-Reference/Hooks/';
      }
    );

    // Fix links like: /path/API-Reference/namespaces/Types/ → /path/API-Reference/Types/
    updatedContent = updatedContent.replace(
      /\/API-Reference\/namespaces\/Types\//g,
      () => {
        fixed++;
        return '/API-Reference/Types/';
      }
    );

    // Fix links like: /path/API-Reference/namespaces/Screens/namespaces/ → /path/API-Reference/Screens/
    updatedContent = updatedContent.replace(
      /\/API-Reference\/namespaces\/Screens\/namespaces\//g,
      () => {
        fixed++;
        return '/API-Reference/Screens/';
      }
    );

    // Fix links at end of path (without trailing slash)
    updatedContent = updatedContent.replace(
      /\/API-Reference\/namespaces\/Hooks([)\]`\s]|$)/g,
      (match, suffix) => {
        fixed++;
        return '/API-Reference/Hooks' + suffix;
      }
    );

    updatedContent = updatedContent.replace(
      /\/API-Reference\/namespaces\/Types([)\]`\s]|$)/g,
      (match, suffix) => {
        fixed++;
        return '/API-Reference/Types' + suffix;
      }
    );

    updatedContent = updatedContent.replace(
      /\/API-Reference\/namespaces\/Screens\/namespaces([)\]`\s]|$)/g,
      (match, suffix) => {
        fixed++;
        return '/API-Reference/Screens' + suffix;
      }
    );

    this.linksFixed += fixed;
    return updatedContent;
  }

  /**
   * Process a single file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const updatedContent = this.fixPathsInContent(content);

      // Only write if content changed
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        this.filesProcessed++;
      }

      return true;
    } catch (error) {
      console.error(`    ✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Walk directory and process all .mdx files
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
  run() {
    console.log('🚀 Fixing links after flattening...\n');

    if (!fs.existsSync(REACT_SDK_PATH)) {
      console.error(`✗ React SDK path not found: ${REACT_SDK_PATH}`);
      process.exit(1);
    }

    console.log(`📂 Processing: ${REACT_SDK_PATH}\n`);

    this.walkDirectory(REACT_SDK_PATH);

    console.log(`\n✓ Link fixing complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Links fixed: ${this.linksFixed}`);
  }
}

const fixer = new LinkFixer();
fixer.run();
