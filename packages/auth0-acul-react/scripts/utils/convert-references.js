#!/usr/bin/env node

/**
 * Convert References sections in all MDX files to ParamField components
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';

class ReferencesConverter {
  constructor() {
    this.fileCount = 0;
    this.referencesConverted = 0;
  }

  /**
   * Determine type category from link path
   */
  getTypeFromPath(linkPath) {
    if (linkPath.includes('/Hooks/')) return 'Hooks';
    if (linkPath.includes('/interfaces/')) return 'Interfaces';
    if (linkPath.includes('/classes/')) return 'Classes';
    if (linkPath.includes('/type-aliases/')) return 'Type Aliases';
    if (linkPath.includes('/enums/')) return 'Enums';
    return 'Types';
  }

  /**
   * Convert References section to ParamField components
   */
  convertReferences(content) {
    // Match the References section
    const referencesRegex = /^## References\n\n([\s\S]*)$/m;
    const match = content.match(referencesRegex);

    if (!match) {
      return content;
    }

    let referencesContent = match[1];
    const paramFields = [];

    // Split by ### (reference names)
    const referenceLines = referencesContent.split('\n');
    let i = 0;

    while (i < referenceLines.length) {
      const line = referenceLines[i];

      // Check if this is a reference header
      if (line.match(/^### /)) {
        const refName = line.replace(/^### /, '').trim();

        // Look for the markdown link in the following lines
        let linkFound = false;
        for (let j = i + 1; j < Math.min(i + 5, referenceLines.length); j++) {
          const contentLine = referenceLines[j];
          const linkMatch = contentLine.match(/\[([^\]]+)\]\(([^)]+)\)/);

          if (linkMatch) {
            const linkText = linkMatch[1];
            const linkPath = linkMatch[2];
            const refType = this.getTypeFromPath(linkPath);

            // Create HTML link
            const htmlLink = `<a href="${linkPath}">${linkText}</a>`;

            // Create ParamField with link in body
            const paramField = `<ParamField body={${htmlLink}} type='${refType}'/>`;
            paramFields.push(paramField);
            this.referencesConverted++;
            linkFound = true;
            break;
          }
        }

        if (linkFound) {
          // Skip to next reference (look for ***)
          while (i < referenceLines.length && !referenceLines[i].match(/^\*{3,}$/)) {
            i++;
          }
          i++; // Skip the *** line
        } else {
          i++;
        }
      } else {
        i++;
      }
    }

    if (paramFields.length > 0) {
      const newReferences = `## References\n\n${paramFields.join('\n\n')}\n`;
      return content.replace(referencesRegex, newReferences);
    }

    return content;
  }

  /**
   * Process an MDX file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Convert References
      const newContent = this.convertReferences(content);

      // Only write if changed
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
      }

      this.fileCount++;
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
   * Run conversion
   */
  run() {
    console.log('🚀 Converting References sections to ParamFields...\n');

    if (!fs.existsSync(REACT_SDK_PATH)) {
      console.error(`✗ Path not found: ${REACT_SDK_PATH}`);
      process.exit(1);
    }

    this.walkDirectory(REACT_SDK_PATH);

    console.log(`\n✓ References conversion complete!`);
    console.log(`  • Files processed: ${this.fileCount}`);
    console.log(`  • References converted: ${this.referencesConverted}`);
  }
}

// Run conversion
const converter = new ReferencesConverter();
converter.run();
