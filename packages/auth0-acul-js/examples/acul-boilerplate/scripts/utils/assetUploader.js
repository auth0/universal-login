import fs from 'fs';
import path from 'path';
import { CONFIG } from './serverConfig.js';
import { uploadScreenConfig } from './auth0Api.js';

/**
 * Prepares and uploads assets for advanced mode configuration
 * @param {string} screenName - The name of the screen to configure
 */
export const uploadAdvancedConfig = async (screenName) => {
  console.log('\n📦 Preparing assets...');
  
  const distPath = path.join(process.cwd(), 'dist');
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    throw new Error('Dist directory not found. This likely indicates that the build process failed. Check for build errors above.');
  }
  
  const files = fs.readdirSync(distPath);
  
  // Find JS and CSS files with hash patterns
  const jsFiles = files.filter(f => f.match(/^index-[a-z0-9]+\.js$/i));
  const cssFiles = files.filter(f => f.match(/^index-[a-z0-9]+\.css$/i));

  console.log(`Found ${jsFiles.length} JS files and ${cssFiles.length} CSS files`);
  
  // If no JS files found, try looking for non-hashed files as fallback
  if (jsFiles.length === 0) {
    const fallbackJsFiles = files.filter(f => f.endsWith('.js'));
    if (fallbackJsFiles.length > 0) {
      console.log('⚠️ No hashed JS files found, using fallback files. This may indicate a build configuration issue.');
      jsFiles.push(...fallbackJsFiles);
    } else {
      throw new Error('No JavaScript files found in dist directory. Build may have failed. Check for build errors and try again.');
    }
  }

  if (cssFiles.length === 0) {
    console.log('⚠️ No CSS files found. Your application may not be styled correctly.');
  }

  // Create head tags for the Auth0 configuration
  const headTags = [
    ...jsFiles.map(jsFile => ({
      tag: "script",
      attributes: {
        src: `http://127.0.0.1:${CONFIG.port}/${jsFile}`,
        defer: true
      }
    })),
    ...cssFiles.map(cssFile => ({
      tag: "link",
      attributes: {
        rel: "stylesheet",
        href: `http://127.0.0.1:${CONFIG.port}/${cssFile}`
      }
    })),
    {
      tag: "meta",
      attributes: {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }
    }
  ];

  // Upload the configuration to Auth0
  await uploadScreenConfig(screenName, {
    rendering_mode: "advanced",
    context_configuration: [],
    default_head_tags_disabled: false,
    head_tags: headTags
  });
}; 