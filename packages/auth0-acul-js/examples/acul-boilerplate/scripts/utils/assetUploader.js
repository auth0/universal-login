import fs from 'fs';
import path from 'path';
import { CONFIG } from './serverConfig.js';
import { uploadScreenConfig } from './auth0TokenFetch.js';

/**
 * Prepares and uploads assets for advanced mode configuration
 * @param {string} screenName - The name of the screen to configure
 */
export const uploadAdvancedConfig = async (screenName) => {
  console.log('\n📦 Preparing assets...');
  
  // Validate and locate all required assets
  const { 
    mainJsFile, 
    screenJsFile, 
    vendorJsFile, 
    jsxRuntimeFile, 
    cssFiles 
  } = findAssets(screenName);
  
  // Log found assets
  logFoundAssets(mainJsFile, screenJsFile, screenName, vendorJsFile, jsxRuntimeFile, cssFiles);
  
  // Create head tags configuration
  const headTags = createHeadTags(
    CONFIG.port, 
    mainJsFile, 
    screenJsFile, 
    screenName, 
    vendorJsFile, 
    jsxRuntimeFile, 
    cssFiles
  );

  // Log and upload configuration
  console.log(`Uploading configuration for screen: ${screenName}`);
  console.log('Head tags configuration:');
  console.log(JSON.stringify(headTags, null, 2));
  
  // Upload configuration to Auth0
  await uploadScreenConfig(screenName, {
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
  });
};

/**
 * Find all required assets for the screen
 * @param {string} screenName - The name of the screen
 * @returns {Object} - Object containing all found assets
 */
function findAssets(screenName) {
  const distPath = path.join(process.cwd(), 'dist');
  const assetsPath = path.join(distPath, 'assets');
  
  console.log(`Looking for assets in ${assetsPath}`);
  
  // Validate directories exist
  if (!fs.existsSync(distPath)) {
    throw new Error('Dist directory not found. Build process may have failed.');
  }
  
  if (!fs.existsSync(assetsPath)) {
    throw new Error('Assets directory not found. Build process may have failed.');
  }
  
  // Check for screen-specific directory
  const screenDirPath = path.join(assetsPath, screenName);
  console.log(`Looking for screen directory at ${screenDirPath}`);
  
  if (!fs.existsSync(screenDirPath)) {
    throw new Error(`Screen directory for "${screenName}" not found. Build may have failed or screen name is incorrect.`);
  }
  
  // Get all files in the assets directory
  const assetFiles = fs.readdirSync(assetsPath);
  console.log(`Found asset files: ${assetFiles.join(', ')}`);
  
  // Find main JS file in the assets root - look for any JS file in the root that's not a map file
  const mainJsFile = assetFiles.find(f => 
    f.endsWith('.js') && 
    !f.endsWith('.map') && 
    !fs.statSync(path.join(assetsPath, f)).isDirectory()
  );
  console.log(`Found main JS file: ${mainJsFile || 'None'}`);
  
  // Find screen-specific JS file in the screen directory
  const screenFiles = fs.readdirSync(screenDirPath);
  console.log(`Found screen files: ${screenFiles.join(', ')}`);
  
  // Try to find any JS file that's not a map file
  const screenJsFile = screenFiles.find(f => 
    f.endsWith('.js') && 
    !f.endsWith('.map')
  );
  console.log(`Found screen JS file: ${screenJsFile || 'None'}`);
  
  // Find shared assets
  const sharedDirPath = path.join(assetsPath, 'shared');
  const sharedFiles = fs.existsSync(sharedDirPath) ? fs.readdirSync(sharedDirPath) : [];
  console.log(`Found shared files: ${sharedFiles.join(', ')}`);
  
  // Find vendor JS file in shared directory
  const vendorJsFile = sharedFiles.find(f => 
    f.startsWith('vendor.') && 
    f.endsWith('.js') && 
    !f.endsWith('.map')
  );
  console.log(`Found vendor JS file: ${vendorJsFile || 'None'}`);
  
  // Find jsx-runtime file in shared directory
  const jsxRuntimeFile = sharedFiles.find(f => 
    f.startsWith('jsx-runtime.') && 
    f.endsWith('.js') && 
    !f.endsWith('.map')
  );
  console.log(`Found jsx-runtime file: ${jsxRuntimeFile || 'None'}`);
  
  // Find CSS files in shared directory
  const cssFiles = sharedFiles.filter(f => f.match(/^.*\.css$/i));
  console.log(`Found ${cssFiles.length} CSS files: ${cssFiles.join(', ')}`);
  
  // Validate required files
  if (!screenJsFile) {
    throw new Error(`Screen JavaScript file for "${screenName}" not found. Build may have failed.`);
  }
  
  return {
    mainJsFile,
    screenJsFile,
    vendorJsFile,
    jsxRuntimeFile,
    cssFiles
  };
}

/**
 * Log found assets to console
 */
function logFoundAssets(mainJsFile, screenJsFile, screenName, vendorJsFile, jsxRuntimeFile, cssFiles) {
  console.log(`Found main JS file: ${mainJsFile || 'None'}`);
  console.log(`Found screen JS file: ${screenJsFile ? path.join(screenName, screenJsFile) : 'None'}`);
  console.log(`Found vendor JS file: ${vendorJsFile ? path.join('shared', vendorJsFile) : 'None'}`);
  console.log(`Found jsx-runtime file: ${jsxRuntimeFile ? path.join('shared', jsxRuntimeFile) : 'None'}`);
  console.log(`Found ${cssFiles.length} CSS files`);
}

/**
 * Create head tags configuration for Auth0
 * @returns {Array} - Array of head tag objects
 */
function createHeadTags(port, mainJsFile, screenJsFile, screenName, vendorJsFile, jsxRuntimeFile, cssFiles) {
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
  
  // Add CSS files first
  cssFiles.forEach(cssFile => {
    headTags.push({
      tag: "link",
      attributes: {
        rel: "stylesheet",
        href: `http://127.0.0.1:${port}/assets/shared/${cssFile}`
      }
    });
  });
  
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
  
  // Add jsx-runtime file if found
  if (jsxRuntimeFile) {
    headTags.push({
      tag: "script",
      attributes: {
        src: `http://127.0.0.1:${port}/assets/shared/${jsxRuntimeFile}`,
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
  } else {
    console.warn('Warning: Main JavaScript file not found. Application initialization may fail.');
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