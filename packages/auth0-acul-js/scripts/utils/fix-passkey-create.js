#!/usr/bin/env node

/**
 * Fix PasskeyCreate.mdx - specialized fix for this unique nested structure
 *
 * Reconstructs the Properties section with proper ParamField and Expandable nesting
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const FILE_PATH = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/interfaces/PasskeyCreate.mdx'
);

class PasskeyCreateFixer {
  constructor(filePath) {
    this.filePath = filePath;
  }

  fix() {
    console.log('🚀 Starting PasskeyCreate.mdx specialized fix...\n');

    if (!fs.existsSync(this.filePath)) {
      console.error(`✗ File not found: ${this.filePath}`);
      process.exit(1);
    }

    let content = fs.readFileSync(this.filePath, 'utf-8');

    // Split into sections
    const parts = content.split('## Properties\n');
    if (parts.length !== 2) {
      console.error('✗ Could not find Properties section');
      process.exit(1);
    }

    const before = parts[0];
    const propertiesSection = parts[1];

    // Parse the properties section
    const props = this.parseProperties(propertiesSection);

    // Rebuild from scratch
    const rebuilt = this.buildProperties(props);

    // Write back
    const newContent = before + '## Properties\n\n' + rebuilt;
    fs.writeFileSync(this.filePath, newContent);

    console.log(`✓ PasskeyCreate.mdx fixed!`);
    console.log(`  • Wrapped public_key in ParamField`);
    console.log(`  • Organized properties with Expandable sections`);
    console.log(`  • Fixed nested structure for objects with sub-properties\n`);
  }

  /**
   * Parse properties from raw content
   */
  parseProperties(content) {
    const lines = content.split('\n');
    let i = 0;
    let props = {
      main: null,
      signature: null,
      definedIn: null,
      subprops: []
    };

    // Find ### public_key
    while (i < lines.length && !lines[i].match(/^### public_key/)) {
      i++;
    }

    if (i < lines.length) {
      i++; // Skip heading

      // Get signature
      while (i < lines.length && lines[i].trim() === '') i++;
      if (i < lines.length && lines[i].startsWith('>')) {
        props.signature = lines[i];
        i++;
      }

      // Get Defined in
      while (i < lines.length && lines[i].trim() === '') i++;
      if (i < lines.length && lines[i].startsWith('Defined in:')) {
        props.definedIn = lines[i];
        i++;
      }

      // Parse h4 and h5 properties
      while (i < lines.length) {
        const line = lines[i];

        // Skip malformed markers and empty lines
        if (line.startsWith('<') || line.startsWith('#<') || line.trim() === '') {
          i++;
          continue;
        }

        // Check for h4 (#### propertyName)
        if (line.match(/^#### /)) {
          const propName = line.replace(/^#### /, '').trim();
          const subprop = {
            name: propName,
            signature: null,
            children: []
          };
          i++;

          // Get signature
          while (i < lines.length && lines[i].trim() === '') i++;
          if (i < lines.length && lines[i].startsWith('>')) {
            subprop.signature = lines[i];
            i++;
          }

          // Check for h5 children
          while (i < lines.length && lines[i].match(/^##### /)) {
            const h5Line = lines[i];
            const h5Name = h5Line.replace(/^##### /, '').trim();
            const child = {
              name: h5Name,
              signature: null
            };
            i++;

            // Get signature
            while (i < lines.length && lines[i].trim() === '') i++;
            if (i < lines.length && lines[i].startsWith('>')) {
              child.signature = lines[i];
              i++;
            }

            subprop.children.push(child);
          }

          props.subprops.push(subprop);
          continue;
        }

        i++;
      }
    }

    return props;
  }

  /**
   * Build properly formatted properties section
   */
  buildProperties(props) {
    let result = [];

    result.push('<ParamField body=\'public_key\' type=\'object\'>');
    if (props.signature) result.push(props.signature);
    result.push('');
    if (props.definedIn) result.push(props.definedIn);
    result.push('');
    result.push('<Expandable title="Properties">');

    // Add each sub-property
    for (let i = 0; i < props.subprops.length; i++) {
      const subprop = props.subprops[i];
      result.push(`<ParamField body='${subprop.name}' type='object'>`);
      if (subprop.signature) result.push(subprop.signature);

      // If has children, add Expandable
      if (subprop.children.length > 0) {
        result.push('');
        result.push('<Expandable title="Properties">');

        for (const child of subprop.children) {
          result.push(`<ParamField body='${child.name}' type='string'>`);
          if (child.signature) result.push(child.signature);
          result.push('</ParamField>');
        }

        result.push('</Expandable>');
      }

      result.push('</ParamField>');
    }

    result.push('</Expandable>');
    result.push('</ParamField>');

    return result.join('\n');
  }
}

// Run the fix
const fixer = new PasskeyCreateFixer(FILE_PATH);
fixer.fix();
