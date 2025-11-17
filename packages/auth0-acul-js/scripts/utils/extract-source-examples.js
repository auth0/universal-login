#!/usr/bin/env node

/**
 * Extract source code examples from GitHub links in type-alias files
 *
 * Transformations:
 * - Find "Defined in:" links in type-alias files
 * - Extract file path and line number from GitHub URL
 * - Read the actual source code from the repository
 * - Add code example as RequestExample component
 *
 * From:
 * Defined in: [src/constants/identifiers.ts:20](https://github.com/auth0/universal-login/blob/.../packages/auth0-acul-js/src/constants/identifiers.ts#L20)
 *
 * To:
 * Defined in: [src/constants/identifiers.ts:20](...)
 * <RequestExample>
 * ```ts
 * export type IdentifierType = 'phone' | 'email' | 'username';
 * ```
 * </RequestExample>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, '../../../..');
const TYPE_ALIASES_DIR = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/type-aliases'
);
const INTERFACES_DIR = path.join(
  MONOREPO_ROOT,
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/Screens/interfaces'
);

class SourceExampleExtractor {
  constructor(dirs) {
    // Accept either a single directory or an array of directories
    this.dirs = Array.isArray(dirs) ? dirs : [dirs];
    this.filesProcessed = 0;
    this.examplesAdded = 0;
  }

  /**
   * Parse GitHub URL to extract file path and line number
   * From: https://github.com/auth0/universal-login/blob/41ce742.../packages/auth0-acul-js/src/constants/identifiers.ts#L20
   * Extract: /packages/auth0-acul-js/src/constants/identifiers.ts and line 20
   */
  parseGitHubLink(url) {
    // Extract file path and line number from GitHub URL
    // Pattern: /blob/[commit]/packages/auth0-acul-js/path/to/file.ts#L[lineNumber]
    const match = url.match(/blob\/[a-f0-9]+\/(packages\/auth0-acul-js\/.+?)(?:#L(\d+))?$/);

    if (!match) {
      return null;
    }

    const filePath = match[1];
    const lineNumber = match[2] ? parseInt(match[2], 10) : null;

    return {
      filePath: path.join(MONOREPO_ROOT, filePath),
      lineNumber
    };
  }

  /**
   * Extract code from the source file
   * Handles:
   * - Single-line definitions (e.g., type X = Y)
   * - Multi-line with braces (e.g., type X = { ... })
   * - Multi-line union types (e.g., type X = | Y | Z)
   */
  extractCode(filePath, lineNumber) {
    try {
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      if (!lineNumber || lineNumber <= 0 || lineNumber > lines.length) {
        return null;
      }

      const startIdx = lineNumber - 1; // Convert to 0-indexed
      const startLine = lines[startIdx];

      // Case 1: Multi-line definition with braces { ... }
      if (startLine.includes('{') && !startLine.includes('}')) {
        let braceCount = 0;
        let endIdx = startIdx;

        for (let i = startIdx; i < lines.length; i++) {
          const line = lines[i];

          // Count braces
          for (const char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
          }

          endIdx = i;

          // Found matching closing brace
          if (braceCount === 0 && line.includes('}')) {
            break;
          }
        }

        return lines.slice(startIdx, endIdx + 1).join('\n');
      }

      // Case 2: Union type with pipes (= | value | value)
      // Detect if line ends with = or contains pipe
      if ((startLine.includes('=') && !startLine.includes(';')) || startLine.trim().endsWith('=')) {
        let endIdx = startIdx;

        // Continue reading until we find a line ending with semicolon
        for (let i = startIdx; i < lines.length; i++) {
          const line = lines[i].trim();
          endIdx = i;

          // Stop if line ends with semicolon
          if (line.endsWith(';')) {
            break;
          }
        }

        return lines.slice(startIdx, endIdx + 1).join('\n');
      }

      // Case 3: Single-line definition
      return startLine;
    } catch (error) {
      return null;
    }
  }

  /**
   * Detect the programming language from file extension
   */
  getLanguage(filePath) {
    const ext = path.extname(filePath);
    const languageMap = {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.js': 'js',
      '.jsx': 'jsx',
      '.py': 'python',
      '.java': 'java',
      '.go': 'go',
      '.rs': 'rust'
    };
    return languageMap[ext] || 'text';
  }

  /**
   * Add source code example to file
   * For type-aliases: inserts inside ParamField (before closing tag)
   * For interfaces: inserts after top-level "Defined in:" and before first ##
   */
  addSourceExample(content) {
    // Find the FIRST "Defined in:" line (top-level)
    const definedInRegex = /Defined in: \[([^\]]+)\]\(([^)]+)\)/;
    const match = content.match(definedInRegex);

    if (!match) {
      return content;
    }

    // Check if example already exists anywhere in the content
    if (content.includes('<RequestExample>')) {
      // Already has an example
      return content;
    }

    // Parse the GitHub link
    const linkInfo = this.parseGitHubLink(match[2]);
    if (!linkInfo || !linkInfo.lineNumber) {
      return content;
    }

    // Extract the code (single or multi-line)
    const codeBlock = this.extractCode(linkInfo.filePath, linkInfo.lineNumber);
    if (!codeBlock || !codeBlock.trim()) {
      return content;
    }

    // Get the language
    const language = this.getLanguage(linkInfo.filePath);

    // Build the example
    const example = `\n\n<RequestExample>\n\`\`\`${language}\n${codeBlock}\n\`\`\`\n</RequestExample>`;

    // Detect if this is a type-alias (has <ParamField> wrapping the whole thing)
    // or an interface (properties are wrapped individually in <ParamField>)
    const hasTopLevelParamField = content.includes('<ParamField body="') && content.indexOf('<ParamField body="') < match.index;

    if (hasTopLevelParamField) {
      // Type-alias: find the closing </ParamField> and insert before it
      const closingParamField = '</ParamField>';
      const closeIndex = content.lastIndexOf(closingParamField);

      if (closeIndex !== -1) {
        return content.substring(0, closeIndex) + example + '\n' + content.substring(closeIndex);
      }
    } else {
      // Interface: insert after "Defined in:" line and before first ## section
      const afterDefinedIn = match.index + match[0].length;

      // Find the first ## section after the "Defined in:" line
      const sectionRegex = /\n## /;
      const sectionMatch = content.substring(afterDefinedIn).match(sectionRegex);

      if (sectionMatch) {
        const insertPosition = afterDefinedIn + sectionMatch.index;
        return content.substring(0, insertPosition) + example + '\n' + content.substring(insertPosition);
      }
    }

    return content;
  }

  /**
   * Process a single type alias file
   */
  processFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const originalContent = content;

      // Add source example
      content = this.addSourceExample(content);

      // Write back if changed
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.examplesAdded += 1;
      }

      this.filesProcessed++;
      return true;
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Process all files in all directories
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
   * Run extraction
   */
  extract() {
    console.log('🚀 Starting source code example extraction...\n');

    console.log(`📂 Processing directories:`);
    for (const dir of this.dirs) {
      console.log(`   • ${dir}`);
    }
    console.log('');

    this.processAllFiles();

    console.log(`\n✓ Source example extraction complete!`);
    console.log(`  • Files processed: ${this.filesProcessed}`);
    console.log(`  • Examples added: ${this.examplesAdded}`);
  }
}

// Run extraction for both type-aliases and interfaces
const extractor = new SourceExampleExtractor([TYPE_ALIASES_DIR, INTERFACES_DIR]);
extractor.extract();
