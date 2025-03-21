import { execSync, spawn } from 'child_process';
import net from 'net';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import { watch } from 'fs/promises';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configuration
const CONFIG = {
  port: 3032,
  apiPort: 3001,
  command: process.argv[2] || 'standard',
  screenName: process.argv[3]?.toLowerCase() || null
};

// Check if port is available
const isPortInUse = async (port) => {
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
const getAuthToken = async () => {
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

  console.log('\n🔑 Getting Auth0 token...');
  
  try {
    const response = await axios.post(url, body, {
      headers: { 'content-type': 'application/json' }
    });

    if (!response.data?.access_token) {
      throw new Error('Invalid response: Missing access token');
    }

    console.log('✅ Auth token received');
    return response.data.access_token;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

// Upload screen configuration to Auth0
const uploadScreenConfig = async (screenName, config) => {
  try {
    console.log(`\n📤 Uploading ${config.rendering_mode} mode configuration for ${screenName}`);
    
    const token = await getAuthToken();
    const domain = process.env.AUTH0_ISSUER_BASE_URL;
    const url = `${domain}/api/v2/prompts/${screenName}/screen/${screenName}/rendering`;
    
    await axios.patch(url, config, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Configuration uploaded for ${screenName}`);
  } catch (error) {
    throw new Error(`Failed to upload configuration: ${error.message}`);
  }
};

// Get available screen folders
const getScreenFolders = () => {
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
const uploadAdvancedConfig = async (screenName) => {
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

// Watch source files and handle changes
const watchAndUpload = async (screenName) => {
  const srcPath = path.join(process.cwd(), 'src');
  let debounceTimer;
  let isProcessing = false;
  
  try {
    const watcher = watch(srcPath, { recursive: true });
    console.log('\n👀 Watching for changes in src directory...');
    
    for await (const event of watcher) {
      if (isProcessing) continue;
      
      const isValidFile = event.filename && (
        event.filename.endsWith('.ts') || 
        event.filename.endsWith('.tsx') || 
        event.filename.endsWith('.css')
      );

      if (isValidFile) {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(async () => {
          try {
            isProcessing = true;
            console.log(`\n📝 Changes detected in: ${event.filename}`);
            
            console.log('🔨 Building...');
            execSync('npm run build', { stdio: 'inherit' });
            console.log('✅ Build completed');
            
            await uploadAdvancedConfig(screenName);
            console.log('✨ Changes deployed successfully\n');
          } catch (error) {
            console.error('❌ Build failed:', error.message);
          } finally {
            isProcessing = false;
          }
        }, 300);
      }
    }
  } catch (error) {
    console.error('❌ Watch error:', error.message);
  }
};

// Start development servers
const startServers = async () => {
  // Check ports
  console.log('\n🔍 Checking port availability...');
  const portsToCheck = [CONFIG.port, CONFIG.apiPort];
  for (const port of portsToCheck) {
    if (await isPortInUse(port)) {
      throw new Error(`Port ${port} is already in use`);
    }
  }
  console.log('✅ Ports available');

  // Start servers
  console.log('\n🚀 Starting development servers...');
  const servers = {
    serve: spawn('npm', ['run', 'serve'], { 
      stdio: 'inherit', 
      shell: true,
      env: { ...process.env, FORCE_COLOR: true }
    }),
    next: spawn('npm', ['run', 'dev'], {
      cwd: path.resolve(process.cwd(), 'nextjs-quickstart'),
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_COLOR: true }
    })
  };

  // Start file watcher for advanced mode
  if (CONFIG.command === 'advanced' && CONFIG.screenName) {
    watchAndUpload(CONFIG.screenName);
  }

  // Handle graceful shutdown
  process.once('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    Object.values(servers).forEach(server => server.kill('SIGTERM'));
    process.exit(0);
  });
};

// Main function
const manageServer = async () => {
  try {
    if (CONFIG.command === 'standard') {
      if (!CONFIG.screenName) {
        throw new Error('Screen name required. Usage: npm run screen:standard <screen-name>');
      }

      console.log(`🚀 Starting in standard mode for ${CONFIG.screenName}`);
      const screens = getScreenFolders();
      
      if (!screens.includes(CONFIG.screenName)) {
        throw new Error(`Screen "${CONFIG.screenName}" not found in src/screens directory`);
      }

      await uploadScreenConfig(CONFIG.screenName, { rendering_mode: "standard" });
      
    } else if (CONFIG.command === 'advanced') {
      if (!CONFIG.screenName) {
        throw new Error('Screen name required. Usage: npm run screen:advanced <screen-name>');
      }

      console.log(`🚀 Starting in advanced mode for ${CONFIG.screenName}`);
      const screens = getScreenFolders();
      
      if (!screens.includes(CONFIG.screenName)) {
        throw new Error(`Screen "${CONFIG.screenName}" not found in src/screens directory`);
      }

      await uploadScreenConfig(CONFIG.screenName, { rendering_mode: "advanced" });
      await uploadAdvancedConfig(CONFIG.screenName);
    } else {
      throw new Error('Invalid command. Use "standard" or "advanced"');
    }

    await startServers();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Start server
manageServer().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});