#!/usr/bin/env node

import fs from 'fs/promises';
import fsSync, { readFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked  } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to unify all package documentation into a single root docs folder
 * - Copies each package's docs folder to root/docs/<package-name>
 * - Creates an index.html file listing all package documentation
 */

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');
const UNIFIED_DOCS_DIR = path.join(ROOT_DIR, 'docs');

let totalFiles = 0;
let processedFiles = 0;

// Parse command line arguments for selective package updates
const args = process.argv.slice(2);
const packageFilter = args.find(arg => arg.startsWith('--package='))?.split('=')[1];
const packagesFilter = args.find(arg => arg.startsWith('--packages='))?.split('=')[1]?.split(',');
const forceAll = args.includes('--all');

console.log('🔍 Command line options:');
if (packageFilter) console.log(`   • Single package: ${packageFilter}`);
if (packagesFilter) console.log(`   • Multiple packages: ${packagesFilter.join(', ')}`);
if (forceAll) console.log('   • Force all packages');
if (!packageFilter && !packagesFilter && !forceAll) console.log('   • Auto-detect changed packages (release-safe mode)');

/**
 * Check if a package should be included based on filters
 */
function shouldIncludePackage(packageName) {
  // If specific package filter is set
  if (packageFilter) {
    return packageName === packageFilter;
  }
  
  // If multiple packages filter is set
  if (packagesFilter && packagesFilter.length > 0) {
    return packagesFilter.includes(packageName);
  }
  
  // If force all is set, include everything
  if (forceAll) {
    return true;
  }
  
  // Default: include all packages (for backwards compatibility)
  return true;
}

/**
 * Detect recently changed packages using git
 */
async function getChangedPackages() {
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);
    
    // Get list of changed files in the last commit or staged files
    const { stdout } = await execAsync('git diff --name-only HEAD~1 HEAD || git diff --cached --name-only || git diff --name-only');
    
    const changedFiles = stdout.split('\n').filter(Boolean);
    const changedPackages = new Set();
    
    // Extract package names from changed file paths
    changedFiles.forEach(file => {
      const match = file.match(/^packages\/([^\/]+)\//);
      if (match) {
        changedPackages.add(match[1]);
      }
    });
    
    return Array.from(changedPackages);
  } catch (error) {
    console.warn('⚠️  Could not detect changed packages via git:', error.message);
    return [];
  }
}

async function readMd() {
    try {
        const readmePath = path.join(ROOT_DIR, 'README.md');
        const md = await fs.readFile(readmePath, 'utf-8');
        const html = marked.parse(md);
        return html;
    } catch (e) {
        console.log('Warning: Could not read README.md:', e.message);
        return '<p>README content not available</p>';
    }
}

/**
 * Count total files for progress tracking
 */
async function countFiles(dir) {
  let count = 0;
  try {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        count += await countFiles(fullPath);
      } else {
        count++;
      }
    }
  } catch (error) {
    // Directory doesn't exist or is inaccessible
  }
  return count;
}

/**
 * Show progress
 */
function showProgress(packageName) {
  const percentage = Math.round((processedFiles / totalFiles) * 100);
  const progressBar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
  process.stdout.write(`\r   [${progressBar}] ${percentage}% - ${packageName} (${processedFiles}/${totalFiles} files)`);
}

/**
 * Recursively copy directory contents (async)
 */
async function copyDirectory(src, dest, packageName = '') {
  try {
    const exists = fsSync.existsSync(src);
    if (!exists) {
      console.warn(`\nSource directory does not exist: ${src}`);
      return;
    }

    // Create destination directory if it doesn't exist
    await fs.mkdir(dest, { recursive: true });

    const items = await fs.readdir(src);

    // Process files in batches to avoid overwhelming the system
    const batchSize = 10;
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (item) => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        try {
          const stat = await fs.stat(srcPath);
          
          if (stat.isDirectory()) {
            await copyDirectory(srcPath, destPath, packageName);
          } else {
            await fs.copyFile(srcPath, destPath);
            processedFiles++;
            if (packageName) showProgress(packageName);
          }
        } catch (error) {
          console.warn(`\nWarning: Failed to copy ${srcPath}: ${error.message}`);
        }
      }));
    }
  } catch (error) {
    console.error(`\nError copying directory ${src}: ${error.message}`);
  }
}

/**
 * Get all packages with documentation (async)
 */
async function getPackagesWithDocs() {
  const packages = [];
  
  try {
    const exists = fsSync.existsSync(PACKAGES_DIR);
    if (!exists) {
      console.error('Packages directory not found:', PACKAGES_DIR);
      return packages;
    }

    const packageNames = await fs.readdir(PACKAGES_DIR);
    const validPackageNames = [];
    
    // Filter to only directories
    for (const name of packageNames) {
      const packageDir = path.join(PACKAGES_DIR, name);
      const stat = await fs.stat(packageDir);
      if (stat.isDirectory()) {
        validPackageNames.push(name);
      }
    }

    // Get changed packages for auto-detection
    const changedPackages = await getChangedPackages();
    if (changedPackages.length > 0 && !packageFilter && !packagesFilter && !forceAll) {
      console.log(`🔍 Auto-detected changed packages: ${changedPackages.join(', ')}`);
    } else if (changedPackages.length === 0 && !packageFilter && !packagesFilter && !forceAll) {
      console.log('🔍 No changed packages detected. Use --all to force rebuild all packages.');
    }

    for (const packageName of validPackageNames) {
      const packageDocsDir = path.join(PACKAGES_DIR, packageName, 'docs');
      const packageJsonPath = path.join(PACKAGES_DIR, packageName, 'package.json');
      
      const docsExists = fsSync.existsSync(packageDocsDir);
      const packageJsonExists = fsSync.existsSync(packageJsonPath);
      
      if (docsExists && packageJsonExists) {
        // Check if package should be included based on filters or changes
        let includePackage = shouldIncludePackage(packageName);
        
        // If no explicit filters and we have changed packages, only include changed ones
        if (!packageFilter && !packagesFilter && !forceAll && changedPackages.length > 0) {
          includePackage = changedPackages.includes(packageName);
        }
        
        if (includePackage) {
          try {
            const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            packages.push({
              name: packageName,
              displayName: packageJson.name || packageName,
              description: packageJson.description || '',
              version: packageJson.version || '0.0.0',
              docsPath: packageDocsDir
            });
          } catch (error) {
            console.warn(`Failed to read package.json for ${packageName}:`, error.message);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading packages directory:', error.message);
  }

  return packages;
}

/**
 * Read and parse HTML content from a file
 */
async function readHtmlContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.warn(`Failed to read ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Extract body content from HTML
 */
function extractBodyContent(htmlContent, packageName) {
  if (!htmlContent) return '';
  
  // Extract content between <body> tags, excluding scripts and navigation
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  
  let bodyContent = bodyMatch[1];
  
  // Remove scripts and navigation elements
  bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  bodyContent = bodyContent.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
  bodyContent = bodyContent.replace(/class="tsd-navigation[^"]*"/gi, '');
  bodyContent = bodyContent.replace(/class="page-menu"/gi, '');
  bodyContent = bodyContent.replace(/class="site-menu"/gi, '');
  bodyContent = bodyContent.replace(/<div class="tsd-page-toolbar">[\s\S]*?<\/div>/gi, '');
  bodyContent = bodyContent.replace(/<div class="col-sidebar">[\s\S]*?<\/div>/gi, '');
  bodyContent = bodyContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  bodyContent = bodyContent.replace(/<div class="overlay[^"]*">[\s\S]*?<\/div>/gi, '');
  
  // Add package section wrapper
  return `
    <div class="package-section" id="package-${packageName}">
      <div class="package-header">
        <h1>📦 ${packageName.replace('auth0-acul-', '').toUpperCase()} Package Documentation</h1>
      </div>
      <div class="package-content">
        ${bodyContent}
      </div>
    </div>
  `;
}

/**
 * Extract CSS from HTML
 */
function extractCssContent(htmlContent) {
  if (!htmlContent) return '';
  
  const cssLinks = htmlContent.match(/<link[^>]+rel="stylesheet"[^>]*>/gi) || [];
  const styleElements = htmlContent.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  
  return [...cssLinks, ...styleElements].join('\n');
}

/**
 * Get all packages that have docs folders (for landing page generation)
 */
async function getAllPackagesForLanding() {
  const packages = [];
  
  try {
    const exists = fsSync.existsSync(PACKAGES_DIR);
    if (!exists) return packages;

    const packageNames = await fs.readdir(PACKAGES_DIR);
    
    for (const packageName of packageNames) {
      const packageDir = path.join(PACKAGES_DIR, packageName);
      const stat = await fs.stat(packageDir).catch(() => null);
      if (!stat?.isDirectory()) continue;
      
      const packageDocsDir = path.join(PACKAGES_DIR, packageName, 'docs');
      const packageJsonPath = path.join(PACKAGES_DIR, packageName, 'package.json');
      const unifiedDocsDir = path.join(UNIFIED_DOCS_DIR, packageName);
      
      // Check if docs exist either in package or unified location
      const docsExists = fsSync.existsSync(packageDocsDir) || fsSync.existsSync(unifiedDocsDir);
      const packageJsonExists = fsSync.existsSync(packageJsonPath);
      
      if (docsExists && packageJsonExists) {
        try {
          const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
          const packageJson = JSON.parse(packageJsonContent);
          packages.push({
            name: packageName,
            displayName: packageJson.name || packageName,
            description: packageJson.description || '',
            version: packageJson.version || '0.0.0'
          });
        } catch (error) {
          console.warn(`Failed to read package.json for ${packageName}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('Error reading packages for landing page:', error.message);
  }

  return packages;
}

/**
 * Generate main index.html with README content and package links (async)
 */
async function generateMainIndex(updatedPackages) {
  console.log('📝 Generating main index.html with README content...');
  
  // Get all packages for the landing page (not just updated ones)
  const allPackages = await getAllPackagesForLanding();
  
  // Create main index.html with README content and package links
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Login SDK Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
        }
        .header p {
            margin: 0.5rem 0 0 0;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .readme-content {
            background: white;
            padding: 3rem;
            margin: 2rem 0;
            border-radius: 12px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.08);
        }
        .packages-section {
            background: white;
            padding: 2rem;
            margin: 2rem 0;
            border-radius: 12px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.08);
        }
        .packages-section h2 {
            color: #2c3e50;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
            text-align: center;
        }
        .package-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        .package-card {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            text-align: center;
            border: 1px solid #e9ecef;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .package-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .package-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .package-version {
            background: #e3f2fd;
            color: #1976d2;
            padding: 0.2rem 0.6rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            margin-bottom: 1rem;
            display: inline-block;
        }
        .package-description {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }
        .package-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #007bff;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            transition: background-color 0.2s ease;
        }
        .package-link:hover {
            background: #0056b3;
            text-decoration: none;
            color: white;
        }
        .footer {
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            color: #666;
            font-size: 0.9rem;
        }
        /* Style README content */
        .readme-content img {
            max-width: 100%;
            height: auto;
        }
        .readme-content h1 {
            color: #2c3e50;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 0.5rem;
        }
        .readme-content h2 {
            color: #34495e;
            margin-top: 2rem;
        }
        .readme-content code {
            background: #f1f3f4;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'Monaco', 'Consolas', monospace;
        }
        .readme-content pre {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            border-left: 4px solid #007bff;
        }
        .readme-content blockquote {
            border-left: 4px solid #ffc107;
            background: #fff3cd;
            padding: 1rem 1.5rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        .readme-content a {
            color: #007bff;
            text-decoration: none;
        }
        .readme-content a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Universal Login SDK Documentation</h1>
        <p>Comprehensive documentation for all packages</p>
    </div>
    
    <div class="packages-section">
        <h2>📚 Package Documentation</h2>
        <p style="text-align: center; color: #666;">Browse individual package documentation</p>
        <div class="package-links">
            ${allPackages.map(pkg => `
                <div class="package-card">
                    <div class="package-title">📦 ${pkg.displayName}</div>
                    <div class="package-version">v${pkg.version}</div>
                    ${pkg.description ? `<div class="package-description">${pkg.description}</div>` : ''}
                    <a href="${pkg.name}/index.html" class="package-link">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        View Documentation
                    </a>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="readme-content">
        ${await readMd()}
    </div>

    <div class="footer">
        <p>Generated on ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <p>🔗 <a href="https://auth0.com" style="color: #007bff;">Auth0</a> | 
           📚 <a href="https://github.com/auth0/universal-login" style="color: #007bff;">GitHub</a></p>
    </div>
</body>
</html>`;

  const landingPath = path.join(UNIFIED_DOCS_DIR, 'index.html');
  await fs.writeFile(landingPath, indexHtml, 'utf8');
  console.log(`✅ Generated main index.html with README content at: ${landingPath}`);
}

/**
 * Main function to unify all documentation (async)
 */
async function unifyDocumentation() {
  console.log('🚀 Starting documentation unification...\n');

  // Ensure unified docs directory exists
  try {
    const exists = fsSync.existsSync(UNIFIED_DOCS_DIR);
    if (!exists) {
      await fs.mkdir(UNIFIED_DOCS_DIR, { recursive: true });
      console.log(`📁 Created unified docs directory: ${UNIFIED_DOCS_DIR}`);
    } else {
      // Clean existing unified docs (except README.md if it exists)
      console.log('🧹 Cleaning existing unified docs directory...');
      const items = await fs.readdir(UNIFIED_DOCS_DIR);
      await Promise.all(items.map(async (item) => {
        if (item !== 'README.md') {
          const itemPath = path.join(UNIFIED_DOCS_DIR, item);
          const stat = await fs.stat(itemPath);
          if (stat.isDirectory()) {
            await fs.rm(itemPath, { recursive: true, force: true });
          } else {
            await fs.unlink(itemPath);
          }
        }
      }));
      console.log('   ✅ Cleaned existing unified docs directory');
    }
  } catch (error) {
    console.error('Error managing unified docs directory:', error.message);
    return;
  }

  // Get all packages with documentation
  console.log('📦 Scanning for packages with documentation...');
  const packages = await getPackagesWithDocs();
  
  if (packages.length === 0) {
    console.warn('⚠️  No packages with documentation found');
    return;
  }

  console.log(`\n📦 Found ${packages.length} package(s) with documentation:`);
  packages.forEach(pkg => {
    console.log(`   • ${pkg.displayName} (v${pkg.version})`);
  });

  // Clean existing unified docs (only for packages we're updating)
  if (packages.length > 0) {
    console.log('\n🧹 Cleaning unified docs for selected packages...');
    const items = await fs.readdir(UNIFIED_DOCS_DIR).catch(() => []);
    const packageNames = packages.map(pkg => pkg.name);
    
    for (const item of items) {
      if (item !== 'README.md' && item !== 'index.html' && item !== '.nojekyll') {
        const itemPath = path.join(UNIFIED_DOCS_DIR, item);
        const stat = await fs.stat(itemPath).catch(() => null);
        
        // Only clean if this package is being updated AND the directory exists
        if (stat?.isDirectory() && packageNames.includes(item)) {
          console.log(`   • Cleaning ${item} (package being updated)...`);
          await fs.rm(itemPath, { recursive: true, force: true });
        }
      }
    }
    console.log('   ✅ Cleaned existing docs for selected packages only');
    
    // Log preserved packages
    const preservedPackages = items.filter(item => 
      item !== 'README.md' && item !== 'index.html' && item !== '.nojekyll' && 
      !packageNames.includes(item)
    );
    if (preservedPackages.length > 0) {
      console.log(`   📦 Preserved documentation for: ${preservedPackages.join(', ')}`);
    }
  }

  // Count total files for progress tracking
  console.log('\n📊 Counting files for progress tracking...');
  for (const pkg of packages) {
    const fileCount = await countFiles(pkg.docsPath);
    totalFiles += fileCount;
    console.log(`   • ${pkg.displayName}: ${fileCount} files`);
  }
  console.log(`\n📈 Total files to copy: ${totalFiles}\n`);

  // Copy each package's docs to unified directory
  for (const pkg of packages) {
    const sourceDir = pkg.docsPath;
    const targetDir = path.join(UNIFIED_DOCS_DIR, pkg.name);
    
    console.log(`📋 Copying ${pkg.displayName} docs...`);
    console.log(`   From: ${sourceDir}`);
    console.log(`   To:   ${targetDir}`);
    
    try {
      await copyDirectory(sourceDir, targetDir, pkg.displayName);
      console.log(`\n   ✅ Successfully copied ${pkg.displayName} documentation\n`);
    } catch (error) {
      console.error(`\n   ❌ Failed to copy ${pkg.displayName} documentation:`, error.message);
    }
  }

  // Generate main index.html
  console.log('📝 Generating main index.html...');
  await generateMainIndex(packages);

  // Create .nojekyll file for GitHub Pages
  console.log('📝 Creating .nojekyll file for GitHub Pages...');
  const nojekyllPath = path.join(UNIFIED_DOCS_DIR, '.nojekyll');
  await fs.writeFile(nojekyllPath, '', 'utf8')
}

// Run the script
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  unifyDocumentation().catch(error => {
    console.error('❌ Documentation unification failed:', error.message);
    process.exit(1);
  });
}

export { unifyDocumentation };
