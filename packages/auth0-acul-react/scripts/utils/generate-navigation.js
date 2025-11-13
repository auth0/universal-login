#!/usr/bin/env node

/**
 * Generate navigation.json for React SDK documentation
 * 
 * Creates a Mintlify navigation structure by scanning the generated documentation
 * and deduplicating entries
 */

import fs from 'fs';
import path from 'path';

const REACT_SDK_PATH = 'docs/customize/login-pages/advanced-customizations/reference/react-sdk';
const OUTPUT_PATH = path.join(REACT_SDK_PATH, 'navigation.json');

class NavigationGenerator {
  constructor() {
    this.pages = {
      hooks: [],
      screens: [],
      classes: [],
      interfaces: [],
      typeAliases: []
    };
    this.seen = new Set();
  }

  /**
   * Get all files from a directory recursively
   */
  getAllFiles(dir) {
    const files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }

    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllFiles(fullPath));
      } else if (item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * Convert file path to relative documentation path
   */
  filePathToDocPath(filePath) {
    // Remove .mdx and convert to doc path
    const relative = path.relative(REACT_SDK_PATH, filePath)
      .replace(/\.mdx$/, '')
      .replace(/\\/g, '/');
    
    return `docs/customize/login-pages/advanced-customizations/reference/react-sdk/${relative}`;
  }

  /**
   * Extract title from mdx file
   */
  getFileTitle(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const titleMatch = content.match(/^---[\s\S]*?title:\s*"([^"]+)"/);
      
      if (titleMatch) {
        return titleMatch[1].replace(/\\/g, '');
      }
    } catch (e) {
      // Ignore read errors
    }
    
    return path.basename(filePath, '.mdx');
  }

  /**
   * Add unique page with deduplication
   */
  addUniquePage(pages, filePath) {
    const docPath = this.filePathToDocPath(filePath);
    
    // Skip if already seen
    if (this.seen.has(docPath)) {
      return;
    }
    
    this.seen.add(docPath);
    pages.push(docPath);
  }

  /**
   * Scan and organize files
   */
  scanFiles() {
    console.log('📂 Scanning documentation files...');

    // Scan Hooks
    const hooksDir = path.join(REACT_SDK_PATH, 'API-Reference/Hooks');
    const hookFiles = this.getAllFiles(hooksDir)
      .filter(file => path.extname(file) === '.mdx' && path.basename(file) !== 'index.mdx')
      .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

    for (const file of hookFiles) {
      this.addUniquePage(this.pages.hooks, file);
    }
    console.log(`  ✓ Found ${this.pages.hooks.length} hooks`);

    // Scan Screens
    const screensDir = path.join(REACT_SDK_PATH, 'API-Reference/Screens');
    const screenDirs = fs.readdirSync(screensDir)
      .filter(name => {
        const fullPath = path.join(screensDir, name);
        return fs.statSync(fullPath).isDirectory();
      })
      .sort();

    for (const screenName of screenDirs) {
      const indexPath = path.join(screensDir, screenName, 'index.mdx');
      if (fs.existsSync(indexPath)) {
        this.addUniquePage(this.pages.screens, indexPath);
      }
    }
    console.log(`  ✓ Found ${this.pages.screens.length} screens`);

    // Scan Classes
    const classesDir = path.join(REACT_SDK_PATH, 'API-Reference/Types/classes');
    const classFiles = this.getAllFiles(classesDir)
      .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

    for (const file of classFiles) {
      this.addUniquePage(this.pages.classes, file);
    }
    console.log(`  ✓ Found ${this.pages.classes.length} classes`);

    // Scan Interfaces
    const interfacesDir = path.join(REACT_SDK_PATH, 'API-Reference/Types/interfaces');
    const interfaceFiles = this.getAllFiles(interfacesDir)
      .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

    for (const file of interfaceFiles) {
      this.addUniquePage(this.pages.interfaces, file);
    }
    console.log(`  ✓ Found ${this.pages.interfaces.length} interfaces`);

    // Scan Type Aliases
    const typeAliasesDir = path.join(REACT_SDK_PATH, 'API-Reference/Types/type-aliases');
    if (fs.existsSync(typeAliasesDir)) {
      const typeFiles = this.getAllFiles(typeAliasesDir)
        .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

      for (const file of typeFiles) {
        this.addUniquePage(this.pages.typeAliases, file);
      }
    }
    console.log(`  ✓ Found ${this.pages.typeAliases.length} type aliases`);
  }

  /**
   * Build navigation structure
   */
  buildNavigation() {
    const nav = {
      group: '@auth0/auth0-acul-react',
      pages: []
    };

    // Add Hooks
    if (this.pages.hooks.length > 0) {
      nav.pages.push({
        group: 'Hooks',
        pages: this.pages.hooks
      });
    }

    // Add Screens
    if (this.pages.screens.length > 0) {
      nav.pages.push({
        group: 'Screens',
        pages: this.pages.screens
      });
    }

    // Add Classes
    if (this.pages.classes.length > 0) {
      nav.pages.push({
        group: 'Classes',
        pages: this.pages.classes
      });
    }

    // Add Interfaces
    if (this.pages.interfaces.length > 0) {
      nav.pages.push({
        group: 'Interfaces',
        pages: this.pages.interfaces
      });
    }

    // Add Type Aliases
    if (this.pages.typeAliases.length > 0) {
      nav.pages.push({
        group: 'Type Aliases',
        pages: this.pages.typeAliases
      });
    }

    return nav;
  }

  /**
   * Write navigation to file
   */
  writeNavigation(nav) {
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(nav, null, 2) + '\n');
    console.log(`\n✓ Navigation file created: ${OUTPUT_PATH}`);
  }

  /**
   * Run the generation
   */
  run() {
    console.log('🚀 Generating navigation.json for React SDK...\n');

    try {
      this.scanFiles();
      const nav = this.buildNavigation();
      this.writeNavigation(nav);

      console.log(`\n📊 Summary:`);
      console.log(`  • Total pages: ${this.seen.size}`);
      console.log(`  • Hooks: ${this.pages.hooks.length}`);
      console.log(`  • Screens: ${this.pages.screens.length}`);
      console.log(`  • Classes: ${this.pages.classes.length}`);
      console.log(`  • Interfaces: ${this.pages.interfaces.length}`);
      console.log(`  • Type Aliases: ${this.pages.typeAliases.length}`);
    } catch (error) {
      console.error('Error generating navigation:', error.message);
      process.exit(1);
    }
  }
}

const generator = new NavigationGenerator();
generator.run();
