/**
 * Asset Discovery and Upload Utility for Advanced Mode
 * 
 * Finds built assets in the dist directory and creates
 * the head tags configuration for Auth0 custom login.
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { CONFIG } from './server-config.js';
import { uploadScreenConfig } from './auth0TokenFetch.js';
import { logger } from './logger.js';
import ora from 'ora';

/**
 * Runs a command as a promise
 * @param {string} command - The command to run
 * @param {Array} args - Command arguments
 * @returns {Promise<void>} - Promise that resolves when command completes
 */
const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, FORCE_COLOR: "true" }
    });
    
    // Capture and log stdout/stderr
    process.stdout.on('data', (data) => {
      logger.debug(data.toString().trim());
    });
    
    process.stderr.on('data', (data) => {
      logger.debug(data.toString().trim());
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
};

/**
 * Prepares and uploads assets for advanced mode configuration
 * @param {string} screenName - The name of the screen to configure
 */
export const uploadAdvancedConfig = async (screenName) => {
  logger.section('Preparing Advanced Mode Assets');
  
  // Check if dist directory exists, clean if needed
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    logger.info('Using existing build from dist directory');
  }
  
  const spinner = ora({
    text: `🔍 Discovering assets for ${screenName}...`,
    color: 'cyan'
  }).start();
  
  try {
    // Validate and locate all required assets
    const { 
      mainJsFile, 
      screenJsFile,
      vendorJsFile,
      auth0AculJsFile,
      dependenciesJsFile,
      cssFiles 
    } = findAssets(screenName);
    
    spinner.succeed(`Assets discovered for ${screenName}`);
    
    // Log asset details in a more structured way
    logger.info(`Asset summary for ${screenName}:`);
    const assetTable = [
      { type: 'Main JS', path: mainJsFile || 'None' },
      { type: 'Screen JS', path: `${screenName}/${screenJsFile}` },
      { type: 'Vendor JS', path: vendorJsFile ? `shared/${vendorJsFile}` : 'None' },
      { type: 'Auth0 ACUL JS', path: auth0AculJsFile ? `shared/${auth0AculJsFile}` : 'None' },
      { type: 'Dependencies JS', path: dependenciesJsFile ? `shared/${dependenciesJsFile}` : 'None' },
      { type: 'CSS Files', path: `${cssFiles.length} file(s)` }
    ];
    
    // Display asset table
    assetTable.forEach(asset => {
      logger.info(`• ${asset.type.padEnd(15)} ${asset.path}`);
    });
    
    // Create head tags configuration
    const spinnerHeadTags = ora({
      text: `🔧 Creating head tags configuration...`,
      color: 'cyan'
    }).start();
    
    const headTags = createHeadTags(
      CONFIG.port, 
      mainJsFile, 
      screenJsFile, 
      screenName, 
      vendorJsFile,
      auth0AculJsFile,
      dependenciesJsFile,
      cssFiles
    );
    
    spinnerHeadTags.succeed(`Created ${headTags.length} head tags for configuration`);
    
    // Create the full configuration payload
    const advancedConfig = {
      rendering_mode: "advanced",
      context_configuration: [
        "branding.settings",
        "branding.themes.default",
        "client.logo_uri",
        "client.description",
        "organization.display_name",
        "organization.branding",
        "screen.texts",
        "tenant.name",
        "tenant.friendly_name",
        "tenant.enabled_locales",
        "untrusted_data.submitted_form_data",
        "untrusted_data.authorization_params.ui_locales",
        "untrusted_data.authorization_params.login_hint",
        "untrusted_data.authorization_params.screen_hint"
      ],
      default_head_tags_disabled: false,
      head_tags: headTags
    };
    
    // Log head tag summary
    logger.info(`Head tags summary: ${headTags.length} tags configured`);
    logger.data('Sample tags (first 2)', headTags.slice(0, 2));
    
    // Upload the configuration
    await uploadScreenConfig(screenName, advancedConfig);
  } catch (error) {
    spinner.fail(`Failed to prepare assets: ${error.message}`);
    throw error;
  }
};

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
  
  // Get all files in the assets directory
  const assetFiles = fs.readdirSync(assetsPath);
  
  // Find main JS file in the assets root - look for main.*.js
  const mainJsFile = assetFiles.find(f => 
    f.startsWith('main.') && 
    f.endsWith('.js') && 
    !f.endsWith('.map') && 
    !fs.statSync(path.join(assetsPath, f)).isDirectory()
  );
  
  // Find screen-specific JS file in the screen directory
  const screenFiles = fs.readdirSync(screenDirPath);
  
  // Try to find index.*.js file
  const screenJsFile = screenFiles.find(f => 
    f.startsWith('index.') && 
    f.endsWith('.js') && 
    !f.endsWith('.map')
  );
  
  if (!screenJsFile) {
    throw new Error(`No JS file found for screen "${screenName}". Build may have failed.`);
  }
  
  // Look for shared directory for vendor bundles
  let vendorJsFile = null;
  let auth0AculJsFile = null;
  let dependenciesJsFile = null;
  const sharedDirPath = path.join(assetsPath, 'shared');
  
  if (fs.existsSync(sharedDirPath)) {
    const sharedFiles = fs.readdirSync(sharedDirPath);
    
    // Look for specific files with our bundling strategy
    // 1. Fixed vendor file (no hash)
    vendorJsFile = sharedFiles.find(f => f === 'vendor.js');
    
    // 2. Auth0 ACUL file (with hash)
    auth0AculJsFile = sharedFiles.find(f => 
      f.startsWith('auth0-acul.') && 
      f.endsWith('.js') && 
      !f.endsWith('.map')
    );
    
    // 3. Dependencies file (with hash)
    dependenciesJsFile = sharedFiles.find(f => 
      f.startsWith('dependencies.') && 
      f.endsWith('.js') && 
      !f.endsWith('.map')
    );
  }
  
  // Find all CSS files to include
  const cssFiles = [];
  
  // Check the assets root for CSS files
  assetFiles.forEach(file => {
    if (file.endsWith('.css')) {
      cssFiles.push({ path: file, location: 'root' });
    }
  });
  
  // Check the screen directory for CSS files
  screenFiles.forEach(file => {
    if (file.endsWith('.css')) {
      cssFiles.push({ path: file, location: screenName });
    }
  });
  
  // Also check the shared directory for CSS files
  if (fs.existsSync(sharedDirPath)) {
    const sharedFiles = fs.readdirSync(sharedDirPath);
    sharedFiles.forEach(file => {
      if (file.endsWith('.css')) {
        cssFiles.push({ path: file, location: 'shared' });
      }
    });
  }
  
  return {
    mainJsFile,
    screenJsFile,
    vendorJsFile,
    auth0AculJsFile,
    dependenciesJsFile,
    cssFiles
  };
}

/**
 * Create head tags configuration for Auth0
 * @param {number} port - The port for assets server
 * @param {string} mainJsFile - Main JS file
 * @param {string} screenJsFile - Screen-specific JS file
 * @param {string} screenName - Screen name
 * @param {string} vendorJsFile - Vendor JS file
 * @param {string} auth0AculJsFile - Auth0 ACUL JS file
 * @param {string} dependenciesJsFile - Dependencies JS file
 * @param {Array} cssFiles - CSS files with location info
 * @returns {Array} - Array of head tag objects
 */
export function createHeadTags(
  port, 
  mainJsFile, 
  screenJsFile, 
  screenName, 
  vendorJsFile, 
  auth0AculJsFile,
  dependenciesJsFile,
  cssFiles
) {
  const headTags = [];
  
  // Add base tag to ensure all relative URLs resolve correctly
  headTags.push({
    tag: "base",
    attributes: {
      href: `http://127.0.0.1:${port}/`
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
  cssFiles.forEach(cssFile => {
    let href;
    
    // Determine the path based on location
    if (cssFile.location === 'root') {
      href = `http://127.0.0.1:${port}/assets/${cssFile.path}`;
    } else if (cssFile.location === screenName) {
      href = `http://127.0.0.1:${port}/assets/${screenName}/${cssFile.path}`;
    } else {
      href = `http://127.0.0.1:${port}/assets/shared/${cssFile.path}`;
    }
    
    headTags.push({
      tag: "link",
      attributes: {
        rel: "stylesheet",
        href
      }
    });
  });
  
  // Loading order for JS files:
  // 1. Vendor (React, etc.) - no hash
  // 2. Dependencies with hash
  // 3. Auth0 ACUL with hash
  // 4. Main entry point
  // 5. Screen-specific bundle
  
  // Add vendor JS file first (if found)
  if (vendorJsFile) {
    headTags.push({
      tag: "script",
      attributes: {
        src: `http://127.0.0.1:${port}/assets/shared/${vendorJsFile}`,
        type: "module"
      }
    });
  }
  
  // Add dependencies JS file if found
  if (dependenciesJsFile) {
    headTags.push({
      tag: "script",
      attributes: {
        src: `http://127.0.0.1:${port}/assets/shared/${dependenciesJsFile}`,
        type: "module"
      }
    });
  }
  
  // Add Auth0 ACUL JS file if found
  if (auth0AculJsFile) {
    headTags.push({
      tag: "script",
      attributes: {
        src: `http://127.0.0.1:${port}/assets/shared/${auth0AculJsFile}`,
        type: "module"
      }
    });
  }
  
  // Add main JS file if found
  if (mainJsFile) {
    headTags.push({
      tag: "script",
      attributes: {
        src: `http://127.0.0.1:${port}/assets/${mainJsFile}`,
        type: "module"
      }
    });
  }
  
  // Add screen-specific JS file
  headTags.push({
    tag: "script",
    attributes: {
      src: `http://127.0.0.1:${port}/assets/${screenName}/${screenJsFile}`,
      type: "module"
    }
  });
  
  return headTags;
} 