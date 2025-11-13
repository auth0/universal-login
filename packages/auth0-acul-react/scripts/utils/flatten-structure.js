#!/usr/bin/env node

/**
 * Flatten directory structure by removing "namespaces" folders
 *
 * Transforms paths like:
 * - API-Reference/namespaces/Screens/namespaces/accept-invitation/
 *   → API-Reference/Screens/accept-invitation/
 * - API-Reference/namespaces/Hooks/functions/useAuth0Themes
 *   → API-Reference/Hooks/useAuth0Themes
 * - API-Reference/namespaces/Types/classes/ContextHooks
 *   → API-Reference/Types/classes/ContextHooks
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';
const API_REF_PATH = path.join(REACT_SDK_PATH, 'API-Reference');

class StructureFlattener {
  constructor() {
    this.moved = 0;
  }

  /**
   * Move a file from source to destination
   */
  moveFile(srcPath, destPath) {
    const destDir = path.dirname(destPath);

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Move the file
    fs.renameSync(srcPath, destPath);
    this.moved++;
  }

  /**
   * Remove empty directory recursively
   */
  removeEmptyDirs(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    // If directory is empty, remove it
    if (items.length === 0) {
      fs.rmdirSync(dir);
      return;
    }

    // Recursively check subdirectories
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.removeEmptyDirs(fullPath);
      }
    }

    // Try to remove the directory again if it's now empty
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  }

  /**
   * Flatten Screens structure: namespaces/Screens/namespaces/* → Screens/*
   * Also preserves index.mdx from namespaces/Screens/
   */
  flattenScreens() {
    console.log('  Processing Screens...');
    const oldScreensNamespacePath = path.join(API_REF_PATH, 'namespaces', 'Screens');
    const oldScreensPath = path.join(oldScreensNamespacePath, 'namespaces');
    const newScreensPath = path.join(API_REF_PATH, 'Screens');

    if (!fs.existsSync(oldScreensNamespacePath)) {
      console.log('    ℹ Screens directory not found');
      return;
    }

    // Create Screens directory if it doesn't exist
    if (!fs.existsSync(newScreensPath)) {
      fs.mkdirSync(newScreensPath, { recursive: true });
    }

    // Move index.mdx from namespace level
    const oldIndexPath = path.join(oldScreensNamespacePath, 'index.mdx');
    const newIndexPath = path.join(newScreensPath, 'index.mdx');
    if (fs.existsSync(oldIndexPath) && !fs.existsSync(newIndexPath)) {
      fs.renameSync(oldIndexPath, newIndexPath);
      console.log(`    ✓ Moved: index.mdx`);
      this.moved++;
    }

    // Get all screen directories
    if (fs.existsSync(oldScreensPath)) {
      const screenDirs = fs.readdirSync(oldScreensPath);

      for (const screenName of screenDirs) {
        const srcPath = path.join(oldScreensPath, screenName);
        const destPath = path.join(newScreensPath, screenName);

        if (fs.statSync(srcPath).isDirectory()) {
          // Move directory
          if (fs.existsSync(destPath)) {
            // If destination exists, just remove source
            this.removeEmptyDirs(srcPath);
          } else {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.renameSync(srcPath, destPath);
            console.log(`    ✓ Moved: ${screenName}/`);
            this.moved++;
          }
        }
      }
    }
  }

  /**
   * Flatten Hooks structure: namespaces/Hooks/functions/* → Hooks/*
   * Also preserves index.mdx from namespaces/Hooks/
   */
  flattenHooks() {
    console.log('  Processing Hooks...');
    const oldHooksNamespacePath = path.join(API_REF_PATH, 'namespaces', 'Hooks');
    const oldHooksFunctionsPath = path.join(oldHooksNamespacePath, 'functions');
    const newHooksPath = path.join(API_REF_PATH, 'Hooks');

    if (!fs.existsSync(oldHooksNamespacePath)) {
      console.log('    ℹ Hooks directory not found');
      return;
    }

    // Create Hooks directory if it doesn't exist
    if (!fs.existsSync(newHooksPath)) {
      fs.mkdirSync(newHooksPath, { recursive: true });
    }

    // Move index.mdx from namespace level
    const oldIndexPath = path.join(oldHooksNamespacePath, 'index.mdx');
    const newIndexPath = path.join(newHooksPath, 'index.mdx');
    if (fs.existsSync(oldIndexPath) && !fs.existsSync(newIndexPath)) {
      fs.renameSync(oldIndexPath, newIndexPath);
      console.log(`    ✓ Moved: index.mdx`);
      this.moved++;
    }

    // Get all hook files from functions subdirectory
    if (fs.existsSync(oldHooksFunctionsPath)) {
      const hookFiles = fs.readdirSync(oldHooksFunctionsPath);

      for (const hookFile of hookFiles) {
        const srcPath = path.join(oldHooksFunctionsPath, hookFile);
        const destPath = path.join(newHooksPath, hookFile);

        if (fs.existsSync(srcPath)) {
          // Move file or directory
          fs.renameSync(srcPath, destPath);
          console.log(`    ✓ Moved: ${hookFile}`);
          this.moved++;
        }
      }
    }
  }

  /**
   * Flatten Types structure: namespaces/Types/* → Types/*
   * Preserves index.mdx and moves classes, interfaces, etc.
   */
  flattenTypes() {
    console.log('  Processing Types...');
    const oldTypesPath = path.join(API_REF_PATH, 'namespaces', 'Types');
    const newTypesPath = path.join(API_REF_PATH, 'Types');

    if (!fs.existsSync(oldTypesPath)) {
      console.log('    ℹ Types directory not found');
      return;
    }

    // Create Types directory if it doesn't exist
    if (!fs.existsSync(newTypesPath)) {
      fs.mkdirSync(newTypesPath, { recursive: true });
    }

    // Move index.mdx from namespace level
    const oldIndexPath = path.join(oldTypesPath, 'index.mdx');
    const newIndexPath = path.join(newTypesPath, 'index.mdx');
    if (fs.existsSync(oldIndexPath) && !fs.existsSync(newIndexPath)) {
      fs.renameSync(oldIndexPath, newIndexPath);
      console.log(`    ✓ Moved: index.mdx`);
      this.moved++;
    }

    // Get all type directories (classes, interfaces, type-aliases)
    const typeItems = fs.readdirSync(oldTypesPath);

    for (const item of typeItems) {
      const srcPath = path.join(oldTypesPath, item);
      const destPath = path.join(newTypesPath, item);

      // Skip index.mdx as we already handled it
      if (item === 'index.mdx') {
        continue;
      }

      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        // Move file or directory
        fs.renameSync(srcPath, destPath);
        console.log(`    ✓ Moved: ${item}`);
        this.moved++;
      }
    }
  }

  /**
   * Flatten index and README files
   */
  flattenRoot() {
    console.log('  Processing root index...');
    const oldIndexPath = path.join(API_REF_PATH, 'namespaces', 'index.mdx');
    const newIndexPath = path.join(API_REF_PATH, 'index.mdx');

    if (fs.existsSync(oldIndexPath) && !fs.existsSync(newIndexPath)) {
      fs.renameSync(oldIndexPath, newIndexPath);
      console.log('    ✓ Moved: index.mdx');
      this.moved++;
    }
  }

  /**
   * Main flattening logic
   */
  run() {
    console.log('🚀 Flattening directory structure...\n');

    try {
      this.flattenScreens();
      this.flattenHooks();
      this.flattenTypes();
      this.flattenRoot();

      // Clean up old namespaces directories
      console.log('\n  Cleaning up old directories...');
      const oldNamespacesPath = path.join(API_REF_PATH, 'namespaces');
      if (fs.existsSync(oldNamespacesPath)) {
        // Remove any remaining files/directories recursively
        const removeRecursive = (dirPath) => {
          if (fs.existsSync(dirPath)) {
            const items = fs.readdirSync(dirPath);
            for (const item of items) {
              const itemPath = path.join(dirPath, item);
              const stat = fs.statSync(itemPath);
              if (stat.isDirectory()) {
                removeRecursive(itemPath);
              } else {
                fs.unlinkSync(itemPath);
              }
            }
            fs.rmdirSync(dirPath);
          }
        };
        removeRecursive(oldNamespacesPath);
        console.log('    ✓ Removed: namespaces/');
      }

      console.log(`\n✓ Structure flattening complete!`);
      console.log(`  • Items moved: ${this.moved}`);
    } catch (error) {
      console.error('Error flattening structure:', error.message);
      process.exit(1);
    }
  }
}

const flattener = new StructureFlattener();
flattener.run();
