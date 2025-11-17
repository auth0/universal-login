#!/usr/bin/env node

/**
 * Convert Properties sections to ParamField components with type links
 *
 * Transformations:
 * - Find "## Properties" sections in class files
 * - Extract property blocks (### PropertyName down to next section)
 * - Extract property name and type from signature
 * - Create ParamField with:
 *   - body='propertyName' (single quotes for strings)
 *   - type={<span><a href="...">TypeName</a></span>} for linked types
 *   - type='PlainType' for plain text types
 * - Preserve all original content
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
const INTERFACES_DIR = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/interfaces'
);

class PropertiesParamFieldConverter {
  constructor(dirs) {
    // Accept either a single directory string or an array of directories
    this.dirs = Array.isArray(dirs) ? dirs : [dirs];
    this.filesProcessed = 0;
    this.propertiesWrapped = 0;
  }

  /**
   * Extract property name from h3 heading
   * From: ### branding
   * To: branding
   */
  extractPropertyName(heading) {
    const match = heading.match(/^### (.+)$/);
    return match ? match[1] : 'property';
  }

  /**
   * Extract type from signature line and build type attribute
   * From: > **branding**: [`BrandingMembers`](/docs/.../) or > **prop**: `string`
   * To: type={<span><a href="/docs/...">BrandingMembers</a></span>} or type='string'
   */
  extractTypeAttribute(blockContent) {
    // Find the signature line (starts with >)
    // This regex is more flexible to handle `static` and other modifiers
    const signatureMatch = blockContent.match(/^>\s*(?:`\w+`\s+)*\*\*\w+\*\*:\s*(.+)$/m);
    if (!signatureMatch) {
      return "type='unknown'";
    }

    const typeStr = signatureMatch[1];

    // Check if it's a markdown link [TypeName](url)
    const linkMatch = typeStr.match(/\[`?([^\]`]+)`?\]\(([^)]+)\)/);
    if (linkMatch) {
      const typeName = linkMatch[1];
      const typeUrl = linkMatch[2];
      return `type={<span><a href="${typeUrl}">${typeName}</a></span>}`;
    }

    // Extract plain type (e.g., `string`, `number`, etc.)
    // Get only the FIRST backtick-wrapped token (before any = sign)
    const plainTypeMatch = typeStr.match(/`([^`]+)`/);
    if (plainTypeMatch) {
      return `type='${plainTypeMatch[1]}'`;
    }

    // Fallback to the entire type string (remove backticks and brackets)
    return `type='${typeStr.replace(/[`\[\]]/g, '')}'`;
  }

  /**
   * Convert Properties section to ParamField components
   */
  convertProperties(content) {
    // Match the entire Properties section
    const propertiesSectionRegex = /(## Properties\n[\s\S]*?)(?=\n## [A-Z]|$)/;

    return content.replace(propertiesSectionRegex, (fullMatch) => {
      // Find all property blocks within this section
      // Each property block is: "### PropertyName" ... until next "###" or "##" or "***"
      // Note: Properties can have a ? suffix for optional properties (e.g., ### field?)
      const propertyBlockRegex = /(### [A-Za-z?]+\n[\s\S]*?)(?=\n### [A-Za-z?]|\n## [A-Z]|\n\*\*\*|$)/g;

      let modifiedSection = fullMatch.replace(propertyBlockRegex, (blockMatch) => {
        // Extract property name and type
        const headerMatch = blockMatch.match(/^### ([A-Za-z?]+)/);
        const propertyName = headerMatch ? headerMatch[1] : 'property';
        const typeAttribute = this.extractTypeAttribute(blockMatch);

        // Remove the "### PropertyName" heading and leading blank line from the block
        let cleanedBlock = blockMatch
          .replace(/^### [A-Za-z?]+\n/, '') // Remove the heading (with optional ? suffix)
          .replace(/^\n/, ''); // Remove leading blank line if it exists

        // Remove trailing *** separator if present
        cleanedBlock = cleanedBlock.replace(/\n\*\*\*\s*$/, '');

        // Wrap in ParamField with single quotes for body and custom type attribute
        return `<ParamField body='${propertyName}' ${typeAttribute}>\n${cleanedBlock}\n</ParamField>`;
      });

      // Remove all *** separators between ParamFields
      modifiedSection = modifiedSection.replace(/\n\*\*\*\n/g, '\n');

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

      // Convert properties to ParamField
      content = this.convertProperties(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.propertiesWrapped += 1;
      }

      this.filesProcessed++;
      return true;
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Process all class and interface files
   */
  processAllFiles() {
    for (const dir of this.dirs) {
      if (!fs.existsSync(dir)) {
        console.log(`ℹ️  Directory not found, skipping: ${dir}`);
        continue;
      }

      const files = fs.readdirSync(dir);

      for (const file of files) {
        if (file.endsWith('.mdx')) {
          const filePath = path.join(dir, file);
          this.processFile(filePath);
        }
      }
    }
  }

  /**
   * Run conversion
   */
  convert() {
    console.log('🚀 Starting Properties to ParamField conversion...\n');

    console.log(`📂 Processing directories:`);
    for (const dir of this.dirs) {
      console.log(`   • ${dir}`);
    }
    console.log('');

    this.processAllFiles();

    console.log(`\n✓ Conversion complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Files with properties wrapped: ${this.propertiesWrapped}`);
  }
}

// Run conversion
const converter = new PropertiesParamFieldConverter([CLASSES_DIR, INTERFACES_DIR]);
converter.convert();
