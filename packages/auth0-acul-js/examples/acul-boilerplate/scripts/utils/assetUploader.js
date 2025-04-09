/**
 * Asset Discovery Utility for Advanced Mode
 * 
 * Finds built assets in the dist directory and creates
 * the head tags configuration for Auth0 custom login.
 */

import fs from 'fs';
import path from 'path';

/**
 * Find files with a specific extension in a directory
 * @param {string} directory - Directory to search
 * @param {string} extension - File extension to look for (e.g., '.js')
 * @param {Array} excludes - Patterns to exclude (e.g., ['.map'])
 * @returns {Array} - Array of matching file paths
 */
function findFilesByExtension(directory, extension, excludes = []) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);
  
  return files.filter(file => {
    // Skip directories
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      return false;
    }
    
    // Check if file has the correct extension
    const hasExtension = file.endsWith(extension);
    
    // Check if file should be excluded
    const isExcluded = excludes.some(pattern => file.includes(pattern));
    
    return hasExtension && !isExcluded;
  });
}

/**
 * Analyze and categorize JavaScript files based on content and naming patterns
 * @param {Array} files - Array of file paths
 * @param {string} directory - Base directory for the files
 * @returns {Object} - Categorized files
 */
function analyzeJsFiles(files, directory) {
  const result = {
    // Entry points typically have fewer dependencies
    entryPoints: [],
    // Framework files typically include vendor code (React, etc.)
    frameworkFiles: [],
    // Library files for application-specific libraries
    libraryFiles: [],
    // Utility files often contain helper functions
    utilityFiles: []
  };
  
  // Sort files to ensure deterministic loading order
  const sortedFiles = [...files].sort();
  
  for (const fileName of sortedFiles) {
    const filePath = path.join(directory, fileName);
    const fileSize = fs.statSync(filePath).size;
    
    // Quick check based on naming conventions (most reliable)
    if (fileName.startsWith('vendor.') || fileName.includes('react') || fileName.includes('framework')) {
      result.frameworkFiles.push(fileName);
      continue;
    }
    
    if (fileName.includes('auth0-acul') || fileName.includes('dependencies')) {
      result.libraryFiles.push(fileName);
      continue;
    }
    
    if (fileName.startsWith('main.') || fileName.startsWith('index.')) {
      result.entryPoints.push(fileName);
      continue;
    }
    
    // Fallback to using file size as a heuristic
    // Larger files are more likely to be framework or library files
    if (fileSize > 100000) { // 100KB
      result.frameworkFiles.push(fileName);
    } else if (fileSize > 50000) { // 50KB
      result.libraryFiles.push(fileName);
    } else {
      result.utilityFiles.push(fileName);
    }
  }
  
  return result;
}

/**
 * Find all required assets for the screen
 * @param {string} screenName - The name of the screen
 * @returns {Object} - Object containing all found assets
 */
export function findAssets(screenName) {
  const distPath = path.join(process.cwd(), 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  // Validate directories exist
  if (!fs.existsSync(distPath)) {
    throw new Error('Dist directory not found. Build process may have failed.');
  }
  
  if (!fs.existsSync(assetsPath)) {
    throw new Error('Assets directory not found. Build process may have failed.');
  }
  
  // Check for screen-specific directory
  const screenDirPath = path.join(assetsPath, screenName);
  
  if (!fs.existsSync(screenDirPath)) {
    throw new Error(`Screen directory for "${screenName}" not found. Build may have failed or screen name is incorrect.`);
  }
  
  // Discover all assets by type and location
  const assets = {
    // JavaScript files
    root: {
      js: findFilesByExtension(assetsPath, '.js', ['.map'])
    },
    screen: {
      js: findFilesByExtension(screenDirPath, '.js', ['.map'])
    },
    shared: {
      js: []
    },
    
    // CSS files with location info for easier reference
    css: []
  };
  
  // Check for shared directory
  const sharedDirPath = path.join(assetsPath, 'shared');
  if (fs.existsSync(sharedDirPath)) {
    assets.shared.js = findFilesByExtension(sharedDirPath, '.js', ['.map']);
  }
  
  // Find CSS files in all locations
  const rootCssFiles = findFilesByExtension(assetsPath, '.css', []);
  const screenCssFiles = findFilesByExtension(screenDirPath, '.css', []);
  let sharedCssFiles = [];
  
  if (fs.existsSync(sharedDirPath)) {
    sharedCssFiles = findFilesByExtension(sharedDirPath, '.css', []);
  }
  
  // Add location info to CSS files
  rootCssFiles.forEach(file => assets.css.push({ path: file, location: 'root' }));
  screenCssFiles.forEach(file => assets.css.push({ path: file, location: screenName }));
  sharedCssFiles.forEach(file => assets.css.push({ path: file, location: 'shared' }));
  
  // Make sure we have screen JS files
  if (assets.screen.js.length === 0) {
    throw new Error(`No JavaScript files found for screen "${screenName}". Build may have failed.`);
  }
  
  // Analyze JS files by location
  const rootJsAnalysis = analyzeJsFiles(assets.root.js, assetsPath);
  const sharedJsAnalysis = analyzeJsFiles(assets.shared.js, sharedDirPath);
  const screenJsAnalysis = analyzeJsFiles(assets.screen.js, screenDirPath);
  
  return {
    // CSS files with location info
    cssFiles: assets.css,
    
    // Root assets (usually loaders or main entry point)
    mainJsFiles: rootJsAnalysis.entryPoints,
    
    // Screen-specific assets
    screenJsFiles: screenJsAnalysis.entryPoints.length > 0 
      ? screenJsAnalysis.entryPoints 
      : [assets.screen.js[0]], // Fallback to first file if no entry point is identified
    screenUtilityFiles: screenJsAnalysis.utilityFiles,
    
    // Shared assets
    frameworkFiles: sharedJsAnalysis.frameworkFiles,
    libraryFiles: sharedJsAnalysis.libraryFiles,
    utilityFiles: sharedJsAnalysis.utilityFiles,
    
    // Raw asset collections for debugging
    rawAssets: assets
  };
}

/**
 * Create head tags configuration for Auth0
 * @param {number} port - The port for assets server 
 * @param {Object} assets - Asset object from findAssets()
 * @param {string} screenName - Screen name
 * @returns {Array} - Array of head tag objects
 */
export function createHeadTags(port, assets, screenName) {
  const headTags = [];
  const baseUrl = `http://127.0.0.1:${port}`;
  
  // Add base tag to ensure all relative URLs resolve correctly
  headTags.push({
    tag: "base",
    attributes: {
      href: `${baseUrl}/`
    }
  });
  
  // Add viewport meta tag
  headTags.push({
    tag: "meta",
    attributes: {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  });
  
  // Add CSS files based on their location
  assets.cssFiles.forEach(cssFile => {
    let href;
    
    if (cssFile.location === 'root') {
      href = `${baseUrl}/assets/${cssFile.path}`;
    } else if (cssFile.location === screenName) {
      href = `${baseUrl}/assets/${screenName}/${cssFile.path}`;
    } else {
      href = `${baseUrl}/assets/shared/${cssFile.path}`;
    }
    
    headTags.push({
      tag: "link",
      attributes: {
        rel: "stylesheet",
        href
      }
    });
  });
  
  // Proper script loading order:
  // 1. Framework files (React, etc.)
  // 2. Utility files
  // 3. Library files (Auth0 ACUL, etc.)
  // 4. Main entry point
  // 5. Screen-specific scripts
  
  // 1. Framework files (load first)
  assets.frameworkFiles.forEach(file => {
    headTags.push({
      tag: "script",
      attributes: {
        src: `${baseUrl}/assets/shared/${file}`,
        type: "module"
      }
    });
  });
  
  // 2. Utility files
  assets.utilityFiles.forEach(file => {
    headTags.push({
      tag: "script",
      attributes: {
        src: `${baseUrl}/assets/shared/${file}`,
        type: "module"
      }
    });
  });
  
  // 3. Library files
  assets.libraryFiles.forEach(file => {
    headTags.push({
      tag: "script",
      attributes: {
        src: `${baseUrl}/assets/shared/${file}`,
        type: "module"
      }
    });
  });
  
  // 4. Main entry point files
  assets.mainJsFiles.forEach(file => {
    headTags.push({
      tag: "script",
      attributes: {
        src: `${baseUrl}/assets/${file}`,
        type: "module"
      }
    });
  });
  
  // 5. Screen-specific entry point
  assets.screenJsFiles.forEach(file => {
    headTags.push({
      tag: "script",
      attributes: {
        src: `${baseUrl}/assets/${screenName}/${file}`,
        type: "module"
      }
    });
  });
  
  // 6. Screen-specific utility files
  assets.screenUtilityFiles.forEach(file => {
    headTags.push({
      tag: "script",
      attributes: {
        src: `${baseUrl}/assets/${screenName}/${file}`,
        type: "module"
      }
    });
  });
  
  return headTags;
} 