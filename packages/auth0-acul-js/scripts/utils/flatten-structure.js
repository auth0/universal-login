#!/usr/bin/env node

/**
 * Flatten directory structure by removing @auth0/namespaces prefix
 *
 * Transformations:
 * - Move files from @auth0/namespaces/Screens to Screens
 * - Move files from @auth0/namespaces/Types to Types
 * - Delete the now-empty @auth0 directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const OUTPUT_DIR = path.join(MONOREPO_ROOT, 'docs/customize/login-pages/advanced-customizations/reference/js-sdk');

class StructureFlattener {
  constructor(outputDir) {
    this.outputDir = outputDir;
    this.movedCount = 0;
  }

  /**
   * Move file from source to destination, creating directories as needed
   */
  moveFile(sourceFile, destinationFile) {
    try {
      // Create destination directory if it doesn't exist
      const destDir = path.dirname(destinationFile);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Read and write the file
      const content = fs.readFileSync(sourceFile, 'utf-8');
      fs.writeFileSync(destinationFile, content);

      // Delete the source file
      fs.unlinkSync(sourceFile);

      return true;
    } catch (error) {
      console.error(`✗ Error moving file: ${sourceFile}`);
      console.error(error.message);
      return false;
    }
  }

  /**
   * Remove empty directories recursively
   */
  removeEmptyDirs(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      // If directory is not empty, recurse into subdirectories first
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          this.removeEmptyDirs(fullPath);
        }
      }

      // Check if directory is now empty and remove it
      const remaining = fs.readdirSync(dir);
      if (remaining.length === 0) {
        fs.rmdirSync(dir);
      }
    } catch (error) {
      // Silently ignore errors when removing directories
      // (directory might already be removed or be in use)
    }
  }

  /**
   * Flatten the @auth0/namespaces structure
   */
  flatten() {
    console.log('🚀 Starting directory structure flattening...\n');

    const auth0Dir = path.join(this.outputDir, '@auth0');

    if (!fs.existsSync(auth0Dir)) {
      console.log('ℹ️  No @auth0 directory found, skipping flattening.');
      return;
    }

    console.log(`📂 Processing: ${auth0Dir}`);

    // Find all files in @auth0/namespaces and move them to the root
    const namespacesDir = path.join(auth0Dir, 'namespaces');

    if (fs.existsSync(namespacesDir)) {
      const entries = fs.readdirSync(namespacesDir, { withFileTypes: true });

      for (const entry of entries) {
        const namespacePath = path.join(namespacesDir, entry.name);

        if (entry.isDirectory()) {
          // Move the namespace directory (e.g., Screens, Types) to the root
          const targetPath = path.join(this.outputDir, entry.name);

          // If target already exists, merge them
          if (fs.existsSync(targetPath)) {
            this.mergeDirectories(namespacePath, targetPath);
          } else {
            // Simple move: rename the directory
            fs.renameSync(namespacePath, targetPath);
          }

          console.log(`✓ Moved: @auth0/namespaces/${entry.name} → ${entry.name}`);
          this.movedCount++;
        }
      }
    }

    // Clean up empty directories
    this.removeEmptyDirs(auth0Dir);

    console.log(`\n✓ Flattening complete! ${this.movedCount} directories moved.`);
  }

  /**
   * Merge source directory into target directory
   */
  mergeDirectories(sourceDir, targetDir) {
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        if (fs.existsSync(targetPath)) {
          // Recursively merge subdirectories
          this.mergeDirectories(sourcePath, targetPath);
        } else {
          // Move the entire directory
          fs.renameSync(sourcePath, targetPath);
        }
      } else {
        // Move individual files
        const content = fs.readFileSync(sourcePath, 'utf-8');
        fs.writeFileSync(targetPath, content);
        fs.unlinkSync(sourcePath);
      }
    }

    // Remove the now-empty source directory
    try {
      fs.rmdirSync(sourceDir);
    } catch (error) {
      // Ignore if directory is not empty
    }
  }
}

// Run flattening
const flattener = new StructureFlattener(OUTPUT_DIR);
flattener.flatten();
