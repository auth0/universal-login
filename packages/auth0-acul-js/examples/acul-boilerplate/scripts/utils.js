import net from 'net';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configuration
export const CONFIG = {
  port: 3032,
  apiPort: 3001
};

// Token storage - simple, no expiration tracking
let cachedToken = null;

// Check if port is available
export const isPortInUse = async (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
};

// Get auth token for API calls
export const getAuthToken = async (forceRefresh = false) => {
  // Use cached token if available and not forcing refresh
  if (cachedToken && !forceRefresh) {
    return cachedToken;
  }

  const requiredVars = ['AUTH0_M2M_DOMAIN', 'AUTH0_M2M_CLIENT_ID', 'AUTH0_M2M_CLIENT_SECRET'];
  const missingVars = requiredVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }

  const url = `${process.env.AUTH0_M2M_DOMAIN}/oauth/token`;
  const body = {
    client_id: process.env.AUTH0_M2M_CLIENT_ID,
    client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
    audience: process.env.AUTH0_M2M_AUDIENCE,
    grant_type: 'client_credentials'
  };

  console.log('\n🔑 Fetching Auth0 token...');
  
  try {
    const response = await axios.post(url, body, {
      headers: { 'content-type': 'application/json' }
    });

    if (!response.data?.access_token) {
      throw new Error('Invalid response: Missing access token');
    }

    // Store the token
    cachedToken = response.data.access_token;
    console.log('✅ Auth token received');
    
    return cachedToken;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

// Upload screen configuration to Auth0
export const uploadScreenConfig = async (screenName, config) => {
  try {
    console.log(`\n📤 Uploading ${config.rendering_mode} mode configuration for ${screenName}`);
    
    // Get token (use cached if available)
    let token = await getAuthToken();
    const domain = process.env.AUTH0_ISSUER_BASE_URL;
    const url = `${domain}/api/v2/prompts/${screenName}/screen/${screenName}/rendering`;
    
    try {
      await axios.patch(url, config, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Configuration uploaded for ${screenName}`);
    } catch (error) {
      // If we get a 401 Unauthorized, the token might have expired
      if (error.response && error.response.status === 401) {
        console.log('🔄 Auth token expired, refreshing...');
        
        // Force token refresh
        token = await getAuthToken(true);
        
        // Try again with a fresh token
        await axios.patch(url, config, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`✅ Configuration uploaded for ${screenName} with refreshed token`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    throw new Error(`Failed to upload configuration: ${error.message}`);
  }
};

// Get available screen folders
export const getScreenFolders = () => {
  try {
    return fs.readdirSync(path.join(process.cwd(), 'src', 'screens'), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name.toLowerCase());
  } catch (error) {
    console.error('❌ Error reading screens folder:', error.message);
    return [];
  }
};

// Upload assets for advanced mode
export const uploadAdvancedConfig = async (screenName) => {
  console.log('\n📦 Preparing assets...');
  
  const distPath = path.join(process.cwd(), 'dist');
  const files = fs.readdirSync(distPath);
  const jsFiles = files.filter(f => f.endsWith('.js'));
  const cssFiles = files.filter(f => f.endsWith('.css'));

  console.log(`Found ${jsFiles.length} JS files and ${cssFiles.length} CSS files`);

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

  await uploadScreenConfig(screenName, {
    rendering_mode: "advanced",
    context_configuration: [],
    default_head_tags_disabled: false,
    head_tags: headTags
  });
}; 