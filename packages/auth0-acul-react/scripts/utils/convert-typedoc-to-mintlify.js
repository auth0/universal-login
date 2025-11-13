#!/usr/bin/env node

/**
 * Convert TypeDoc markdown files to Mintlify MDX format
 *
 * Transformations:
 * - Remove header/breadcrumb lines before H1
 * - Extract H1 title to frontmatter
 * - Convert table-style variables/functions to lists
 * - Fix relative links (remove .md, add ./ prefix)
 * - Rename README.md to index.mdx
 */

import fs from 'fs';
import path from 'path';

const INPUT_DIR = 'packages/auth0-acul-react/docs';
const OUTPUT_DIR = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';

class TypeDocToMintlifyConverter {
  constructor(inputDir, outputDir) {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
    this.fileCount = 0;
  }

  /**
   * Remove header lines (breadcrumb, navigation) before H1
   */
  removeHeader(content) {
    const lines = content.split('\n');
    let headerEndIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('# ')) {
        headerEndIndex = i;
        break;
      }
    }

    return lines.slice(headerEndIndex).join('\n').trim();
  }

  /**
   * Extract H1 title and remove it from content
   */
  extractTitle(content) {
    const match = content.match(/^# (.+?)\n/);
    if (!match) {
      return { title: 'Untitled', content };
    }

    const title = match[1]
      .replace(/Function: /i, '')
      .replace(/Interface: /i, '')
      .replace(/Class: /i, '')
      .replace(/Namespace: /i, '')
      .replace(/\(\)/g, '') // Remove ()
      .trim();

    const contentWithoutH1 = content.replace(/^# .+?\n/, '').trim();

    return { title, content: contentWithoutH1 };
  }

  /**
   * Resolve relative path to absolute path
   * @param {string} relativePath - The relative path (e.g., "../../Types/interfaces")
   * @param {string} currentFileDir - The directory of the current file being processed
   * @returns {string} Absolute path from root (e.g., "/docs/customize/login-pages/.../Types/interfaces")
   */
  resolvePathToAbsolute(relativePath, currentFileDir) {
    // Resolve the relative path from the current file's directory
    const resolvedPath = path.resolve(currentFileDir, relativePath);

    // Get the base path of the output directory (docs/customize/login-pages/...)
    const basePath = this.outputDir.split(path.sep).join('/');

    // Convert to path relative to output root
    const relativeParts = path.relative(this.outputDir, resolvedPath).split(path.sep);

    // Build the absolute documentation path including the base path
    const docPath = '/' + basePath + '/' + relativeParts.join('/');

    return docPath;
  }

  /**
   * Fix links: convert to full absolute paths
   * @param {string} content - The markdown content
   * @param {string} outputFilePath - The output file path (where this content will be written)
   */
  fixLinks(content, outputFilePath) {
    const currentFileDir = path.dirname(outputFilePath);

    // Match markdown links like [text](path)
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, link) => {
      // Skip external links (http, https, #)
      if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) {
        return match;
      }

      let fixedLink = link;

      // Process relative links
      if (fixedLink.startsWith('.')) {
        // Remove .md extension
        fixedLink = fixedLink.replace(/\.md$/, '');

        // Remove /README from end of path (since README becomes index.mdx)
        fixedLink = fixedLink.replace(/\/README$/, '');

        // Resolve relative path to absolute
        fixedLink = this.resolvePathToAbsolute(fixedLink, currentFileDir);
      } else if (!fixedLink.startsWith('/')) {
        // For paths that don't start with . or /, treat as relative
        // Remove .md extension
        fixedLink = fixedLink.replace(/\.md$/, '');

        // Remove /README from end of path
        fixedLink = fixedLink.replace(/\/README$/, '');

        // Make it relative and resolve
        fixedLink = './' + fixedLink;
        fixedLink = this.resolvePathToAbsolute(fixedLink, currentFileDir);
      }

      return `[${text}](${fixedLink})`;
    });
  }

  /**
   * Convert tables to list format with descriptions
   * Handles Variables, Functions, Namespaces, Classes, Interfaces, Type Aliases, etc.
   */
  convertTableToList(content) {
    // Split content into lines to process tables more reliably
    const lines = content.split('\n');
    const result = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check if this is a section header with a table (##)
      if (line.match(/^## /)) {
        result.push(line);
        i++;

        // Skip empty line after header
        if (i < lines.length && lines[i].trim() === '') {
          result.push('');
          i++;
        }

        // Check if next line is table header
        if (i < lines.length && lines[i].startsWith('|')) {
          // Skip the header row and separator
          i++; // skip header
          i++; // skip separator

          // Collect all table rows
          const listItems = [];
          while (i < lines.length && lines[i].startsWith('|')) {
            const tableLine = lines[i];
            // Split by pipe and extract cells
            const cells = tableLine
              .split('|')
              .map(cell => cell.trim())
              .filter(cell => cell && cell !== '|');

            if (cells.length >= 1) {
              const link = cells[0]; // First cell is the link
              const description = cells[1]; // Second cell is description (if exists)

              if (description && description !== '-' && description !== 'Description') {
                listItems.push(`- ${link}: ${description}`);
              } else {
                listItems.push(`- ${link}`);
              }
            }

            i++;
          }

          // Add list items to result
          result.push(listItems.join('\n'));
          result.push('');
        }
      } else {
        result.push(line);
        i++;
      }
    }

    return result.join('\n').replace(/\n\n\n/g, '\n\n'); // Clean up multiple blank lines
  }

  /**
   * Create frontmatter
   */
  createFrontmatter(title) {
    return `---\ntitle: "${title.replace(/\\/g, '').replace(/"/g, '\\"')}"\n---\n\n`;
  }

  /**
   * Process markdown file and convert to MDX
   */
  processFile(filePath, relativePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Remove header/breadcrumb
      content = this.removeHeader(content);

      // Extract title and remove H1
      const { title, content: contentWithoutH1 } = this.extractTitle(content);

      // Determine output path first (before processing content)
      let outputPath = path.join(this.outputDir, relativePath);

      // Convert README.md to index.mdx
      if (path.basename(outputPath) === 'README.md') {
        outputPath = path.join(path.dirname(outputPath), 'index.mdx');
      } else {
        // Change .md to .mdx
        outputPath = outputPath.replace(/\.md$/, '.mdx');
      }

      // Convert tables to lists
      let processedContent = this.convertTableToList(contentWithoutH1);

      // Fix links - pass output path so we know where the file will be located
      processedContent = this.fixLinks(processedContent, outputPath);

      // Create frontmatter
      const frontmatter = this.createFrontmatter(title);

      // Final MDX content
      const mdxContent = frontmatter + processedContent;

      // Create output directory
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Write file
      fs.writeFileSync(outputPath, mdxContent);
      console.log(`✓ Converted: ${relativePath} → ${path.relative(this.outputDir, outputPath)}`);
      this.fileCount++;

      return true;
    } catch (error) {
      console.error(`✗ Error processing ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * Walk directory and process all markdown files
   */
  walkDirectory(dir, baseDir = dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      if (entry.isDirectory()) {
        this.walkDirectory(fullPath, baseDir);
      } else if (entry.name.endsWith('.md')) {
        this.processFile(fullPath, relativePath);
      }
    }
  }

  /**
   * Run conversion
   */
  convert() {
    console.log('🚀 Starting TypeDoc to Mintlify conversion...\n');

    if (!fs.existsSync(this.inputDir)) {
      console.error(`✗ Input directory not found: ${this.inputDir}`);
      process.exit(1);
    }

    console.log(`📂 Reading from: ${this.inputDir}`);
    console.log(`📝 Writing to: ${this.outputDir}\n`);

    this.walkDirectory(this.inputDir);

    console.log(`\n✓ Conversion complete! ${this.fileCount} files processed.`);
  }
}

// Run conversion
const converter = new TypeDocToMintlifyConverter(INPUT_DIR, OUTPUT_DIR);
converter.convert();
