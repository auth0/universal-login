#!/usr/bin/env node

/**
 * Consolidate screen documentation by moving variable and function files
 * into the index.mdx as ParamField components
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';
const SCREENS_PATH = path.join(REACT_SDK_PATH, 'API-Reference/namespaces/Screens/namespaces');

class ScreenConsolidator {
  constructor() {
    this.screenCount = 0;
    this.filesConsolidated = 0;
  }

  /**
   * Extract the name from title (e.g., "Variable: useUser" -> "useUser")
   */
  extractNameFromTitle(title) {
    return title.replace(/^(?:Variable|Function|Class|Interface): /, '').trim();
  }

  /**
   * Extract return type from signature (line starting with >)
   */
  extractReturnType(content) {
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.startsWith('>')) {
        // Extract type info from the signature
        // Format: > **name**: type or > **name**(): type
        const match = line.match(/:\s*(.+?)(?:\n|$)/);
        if (match) {
          return match[1].trim();
        }
        break;
      }
    }
    return 'unknown';
  }

  /**
   * Extract content without frontmatter
   */
  extractContent(content) {
    // Remove frontmatter
    const parts = content.split('---');
    if (parts.length >= 3) {
      return parts[2].trim();
    }
    return content;
  }

  /**
   * Remove horizontal rule lines (***) from content
   */
  removeHorizontalRules(content) {
    // Remove lines that contain only *** (with optional whitespace)
    return content.replace(/^\s*\*{3,}\s*$/gm, '').replace(/\n\n\n/g, '\n\n');
  }

  /**
   * Convert headers inside ParamField content to bold text
   */
  normalizeHeadersForParamField(content) {
    // Convert headers (##, ###, ####, etc.) to bold text **text**
    // Match from most # down to least to avoid double-converting
    // Pattern: ^### Header -> **Header** (with blank line after)
    content = content.replace(/^#+\s+(.+?)$/gm, '**$1**');
    return content;
  }

  /**
   * Build ParamField component
   */
  buildParamField(name, content, isVariable = true) {
    const type = this.extractReturnType(content);

    // Remove horizontal rules from content
    let cleanedContent = this.removeHorizontalRules(content);

    // Normalize headers inside ParamField to bold text
    const normalizedContent = this.normalizeHeadersForParamField(cleanedContent);

    // Escape special characters in name for use as attribute
    const safeName = name.replace(/[^a-zA-Z0-9_]/g, '');

    let paramField = `<ParamField body='${name}' type={${this.formatType(type)}}>\n`;
    paramField += normalizedContent;
    paramField += '\n</ParamField>\n\n';

    return paramField;
  }

  /**
   * Format type for ParamField - convert markdown links to JSX and escape HTML chars
   */
  formatType(typeStr) {
    // Convert markdown links [text](url) to JSX <a href="url">text</a>
    // Format: () => [`Type`](path) or [`Type`](path)

    // Extract markdown link pattern [text](url)
    const linkMatch = typeStr.match(/\[([^\]]+)\]\(([^)]+)\)/);

    if (linkMatch) {
      // Remove backticks from link text
      let linkText = linkMatch[1].replace(/`/g, '');
      const linkHref = linkMatch[2];
      return `<a href="${linkHref}">${linkText}</a>`;
    }

    // For non-link types in span, escape < and > for HTML
    // Handle backslash-escaped characters and convert to HTML entities
    let escapedType = typeStr
      .replace(/\\</g, '&lt;')   // Convert \< to &lt;
      .replace(/\\>/g, '&gt;')   // Convert \> to &gt;
      .replace(/\\\|/g, '|')     // Remove backslash before |
      .replace(/`/g, '')         // Remove backticks
      .replace(/</g, '&lt;')     // Escape any remaining unescaped <
      .replace(/>/g, '&gt;');    // Escape any remaining unescaped >

    return `<span>${escapedType}</span>`;
  }

  /**
   * Convert References section to ParamField components
   */
  convertReferences(referencesContent) {
    // Parse the references section
    // Format: ### itemName\n\nRe-exports [itemName](path)\n\n***\n\n
    // Extract all links and convert to ParamField

    const paramFields = [];

    // Match markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(referencesContent)) !== null) {
      const itemName = match[1];
      const itemPath = match[2];

      // Determine type from path (Hooks, Types, interfaces, etc.)
      let type = 'Unknown';
      if (itemPath.includes('/Hooks/')) {
        type = 'Hooks';
      } else if (itemPath.includes('/Types/')) {
        type = 'Types';
      }

      // Build ParamField
      const paramField = `<ParamField body={<a href="${itemPath}">${itemName}</a>} type='${type}'/>`;
      paramFields.push(paramField);
    }

    return paramFields.join('\n\n');
  }

  /**
   * Read and consolidate a screen folder
   */
  consolidateScreen(screenPath) {
    const screenName = path.basename(screenPath);
    const variablesPath = path.join(screenPath, 'variables');
    const functionsPath = path.join(screenPath, 'functions');
    const indexPath = path.join(screenPath, 'index.mdx');

    console.log(`  Processing: ${screenName}`);

    // Read current index
    let indexContent = fs.readFileSync(indexPath, 'utf-8');
    const { title, content: indexBody } = this.extractFrontmatter(indexContent);

    let newContent = `---\ntitle: "${title}"\n---\n\n`;

    // Process Variables
    if (fs.existsSync(variablesPath)) {
      const variableFiles = fs.readdirSync(variablesPath).filter(f => f.endsWith('.mdx'));

      if (variableFiles.length > 0) {
        newContent += '## Variables\n\n';

        for (const file of variableFiles) {
          const filePath = path.join(variablesPath, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { title: fileTitle } = this.extractFrontmatter(fileContent);
          const name = this.extractNameFromTitle(fileTitle);
          const body = this.extractContent(fileContent);

          newContent += this.buildParamField(name, body, true);

          this.filesConsolidated++;
        }

        newContent += '\n';
      }
    }

    // Process Functions
    if (fs.existsSync(functionsPath)) {
      const functionFiles = fs.readdirSync(functionsPath).filter(f => f.endsWith('.mdx'));

      if (functionFiles.length > 0) {
        newContent += '## Functions\n\n';

        for (const file of functionFiles) {
          const filePath = path.join(functionsPath, file);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { title: fileTitle } = this.extractFrontmatter(fileContent);
          const name = this.extractNameFromTitle(fileTitle);
          const body = this.extractContent(fileContent);

          newContent += this.buildParamField(name, body, false);

          this.filesConsolidated++;
        }

        newContent += '\n';
      }
    }

    // Add References section if it exists in original index
    const referencesMatch = indexBody.match(/## References\n\n([\s\S]*?)$/);
    if (referencesMatch) {
      const convertedReferences = this.convertReferences(referencesMatch[1]);
      newContent += '## References\n\n' + convertedReferences;
    }

    // Write updated index
    fs.writeFileSync(indexPath, newContent);
    console.log(`    ✓ Updated index.mdx`);

    // Delete variable and function folders
    if (fs.existsSync(variablesPath)) {
      fs.rmSync(variablesPath, { recursive: true });
      console.log(`    ✓ Removed variables/`);
    }

    if (fs.existsSync(functionsPath)) {
      fs.rmSync(functionsPath, { recursive: true });
      console.log(`    ✓ Removed functions/`);
    }

    this.screenCount++;
  }

  /**
   * Extract frontmatter and body
   */
  extractFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/);
    if (!match) {
      return { title: 'Unknown', content };
    }

    const frontmatter = match[1];
    const body = match[2];

    const titleMatch = frontmatter.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : 'Unknown';

    return { title, content: body };
  }

  /**
   * Run consolidation
   */
  run() {
    console.log('🚀 Starting screen consolidation...\n');

    if (!fs.existsSync(SCREENS_PATH)) {
      console.error(`✗ Screens path not found: ${SCREENS_PATH}`);
      process.exit(1);
    }

    const screenFolders = fs.readdirSync(SCREENS_PATH).filter(name => {
      const fullPath = path.join(SCREENS_PATH, name);
      return fs.statSync(fullPath).isDirectory();
    });

    console.log(`📂 Found ${screenFolders.length} screens\n`);

    for (const screen of screenFolders) {
      const screenPath = path.join(SCREENS_PATH, screen);
      this.consolidateScreen(screenPath);
    }

    console.log(`\n✓ Consolidation complete!`);
    console.log(`  • Screens processed: ${this.screenCount}`);
    console.log(`  • Files consolidated: ${this.filesConsolidated}`);
  }
}

const consolidator = new ScreenConsolidator();
consolidator.run();
