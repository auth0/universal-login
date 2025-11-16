#!/usr/bin/env node

/**
 * Convert Constructor sections to ParamField components
 *
 * Transformations:
 * - Find "## Constructors" sections in class files
 * - Extract constructor blocks (### Constructor down to next section)
 * - Wrap them in <ParamField body="ConstructorName" type="Constructor">
 * - Preserve all original content (Returns, Overrides, etc.)
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

class ConstructorParamFieldConverter {
  constructor(classesDir) {
    this.classesDir = classesDir;
    this.filesProcessed = 0;
    this.constructorsWrapped = 0;
  }

  /**
   * Extract constructor name from the signature
   * From: **new AcceptInvitation**(): `AcceptInvitation`
   * To: AcceptInvitation
   */
  extractConstructorName(signature) {
    const match = signature.match(/\*\*new\s+(\w+)\*\*/);
    if (match) {
      return match[1];
    }
    return 'Constructor';
  }

  /**
   * Convert Constructors section to ParamField components
   * Uses regex-based approach for reliability
   */
  convertConstructors(content) {
    // Match the entire Constructors section: from "## Constructors" to the next "##" section
    // This regex captures the ## Constructors header and everything until the next ##
    const constructorsSectionRegex = /(## Constructors\n[\s\S]*?)(?=\n## [A-Z]|$)/;

    return content.replace(constructorsSectionRegex, (fullMatch) => {
      // Now find all constructor blocks within this section
      // Each constructor block is: "### Constructor" ... until next "###" or "##"
      const constructorBlockRegex = /(### Constructor\n[\s\S]*?)(?=\n### [A-Z]|\n## [A-Z]|$)/g;

      const modifiedSection = fullMatch.replace(constructorBlockRegex, (blockMatch) => {
        // Extract constructor name from signature: **new ConstructorName**
        const nameMatch = blockMatch.match(/\*\*new\s+(\w+)\*\*/);
        const constructorName = nameMatch ? nameMatch[1] : 'Constructor';

        // Remove the "### Constructor" heading and following blank line from the block
        let cleanedBlock = blockMatch
          .replace(/^### Constructor\n/, '') // Remove the heading
          .replace(/^\n/, ''); // Remove leading blank line if it exists

        // Wrap in ParamField
        return `<ParamField body="${constructorName}" type="Constructor">\n${cleanedBlock}\n</ParamField>`;
      });

      return modifiedSection;
    });
  }

  /**
   * Process a single class file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Convert constructors to ParamField
      content = this.convertConstructors(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.constructorsWrapped += 1;
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
    console.log('🚀 Starting Constructor to ParamField conversion...\n');

    console.log(`📂 Processing directory: ${this.classesDir}\n`);

    this.processAllFiles();

    console.log(`\n✓ Conversion complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Constructors wrapped: ${this.constructorsWrapped}`);
  }
}

// Run conversion
const converter = new ConstructorParamFieldConverter(CLASSES_DIR);
converter.convert();
