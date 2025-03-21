import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { uploadAdvancedConfig } from './utils.js';

// Track last build time to avoid duplicate builds
let lastBuildTime = 0;
const BUILD_COOLDOWN = 2000; // 2 seconds cooldown between builds

// Watch source files and handle changes
export const watchAndUpload = async (screenName) => {
  const srcPath = path.join(process.cwd(), 'src');
  const screenPath = path.join(srcPath, 'screens', screenName);
  
  let debounceTimer;
  let isProcessing = false;
  let pendingChanges = new Set();
  
  console.log(`\n👀 Watching for changes in src directory...`);
  
  // Set up recursive watchers
  const setupWatcher = (dirPath) => {
    try {
      // Watch the directory
      fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
        if (!filename) return;
        
        // Check if it's a valid file type
        if (filename.endsWith('.ts') || filename.endsWith('.tsx') || filename.endsWith('.css')) {
          // Add to pending changes
          pendingChanges.add(filename);
          
          if (debounceTimer) clearTimeout(debounceTimer);
          
          // Only process if not already processing
          if (!isProcessing) {
            debounceTimer = setTimeout(async () => {
              try {
                isProcessing = true;
                
                // Skip if we just built recently
                const now = Date.now();
                if (now - lastBuildTime < BUILD_COOLDOWN) {
                  console.log('⏱️ Skipping build - too soon after last build');
                  pendingChanges.clear();
                  isProcessing = false;
                  return;
                }
                
                const changesList = Array.from(pendingChanges).join(', ');
                console.log(`\n📝 Changes detected in: ${changesList}`);
                pendingChanges.clear();
                
                console.log('🔨 Building...');
                execSync('npm run build', { stdio: 'inherit' });
                lastBuildTime = Date.now();
                console.log('✅ Build completed');
                
                await uploadAdvancedConfig(screenName);
                console.log('✨ Changes deployed successfully\n');
              } catch (error) {
                console.error('❌ Build failed:', error.message);
              } finally {
                isProcessing = false;
                
                // If more changes accumulated during processing, trigger another build
                if (pendingChanges.size > 0) {
                  console.log('🔄 Processing additional changes...');
                  debounceTimer = setTimeout(() => {
                    isProcessing = false;
                  }, 100);
                }
              }
            }, 300);
          }
        }
      });
      
      console.log(`Watching ${path.relative(process.cwd(), dirPath)}`);
    } catch (error) {
      console.error(`❌ Error setting up watcher for ${dirPath}:`, error.message);
    }
  };
  
  // Set up watchers for the screen directory and its subdirectories
  setupWatcher(screenPath);
  
  // Also watch component directories that might be used by the screen
  const componentsPath = path.join(srcPath, 'components');
  if (fs.existsSync(componentsPath)) {
    setupWatcher(componentsPath);
  }
  
  // Watch styles directory if it exists
  const stylesPath = path.join(srcPath, 'styles');
  if (fs.existsSync(stylesPath)) {
    setupWatcher(stylesPath);
  }
}; 