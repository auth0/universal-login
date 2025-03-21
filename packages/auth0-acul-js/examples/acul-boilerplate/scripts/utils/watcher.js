import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';
import { uploadAdvancedConfig } from './assetUploader.js';
import { logger } from './logger.js';

// Configuration for file watching
const CONFIG = {
  BUILD_COOLDOWN: 5000, // 5 seconds cooldown between builds
  DEBOUNCE_DELAY: 300,  // 300ms debounce delay
  FILE_EXTENSIONS: ['.ts', '.tsx', '.css', '.json']
};

/**
 * Watch source files and trigger rebuilds on changes
 * @param {string} screenName - The screen being watched
 * @returns {Function} - Cleanup function to stop watching
 */
export const watchAndUpload = async (screenName) => {
  const srcPath = path.join(process.cwd(), 'src');
  const screenPath = path.join(srcPath, 'screens', screenName);
  
  // State management
  let lastBuildTime = 0;
  let debounceTimer;
  let isProcessing = false;
  let pendingChanges = new Set();
  let watcher = null;
  
  logger.info(`👀 Watching for changes in screen: ${screenName}`);

  /**
   * Run build process asynchronously 
   * @returns {Promise<boolean>} - Whether build succeeded
   */
  const runBuild = () => {
    return new Promise((resolve) => {
      logger.info('🔨 Building...');
      
      // Use spawn instead of execSync for better cross-platform support
      const buildProcess = spawn('npm', ['run', 'build'], { 
        stdio: 'pipe',
        shell: true, // Required for npm commands to work consistently across platforms
        env: { ...process.env, FORCE_COLOR: "true" }
      });
      
      // Capture and log stdout/stderr
      buildProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
      });
      
      buildProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
      });
      
      buildProcess.on('close', (code) => {
        if (code === 0) {
          logger.success('Build completed');
          resolve(true);
        } else {
          logger.error(`Build failed with code ${code}`);
          resolve(false);
        }
      });
    });
  };
  
  /**
   * Process changes with debouncing and cooldown
   */
  const processChanges = async () => {
    if (isProcessing) return;
    
    try {
      isProcessing = true;
      
      const now = Date.now();
      if (now - lastBuildTime < CONFIG.BUILD_COOLDOWN) {
        logger.info('⏱️ Skipping build (cooldown period)');
        pendingChanges.clear();
        isProcessing = false;
        
        // Reset debounce timer after cooldown expires
        const remainingCooldown = CONFIG.BUILD_COOLDOWN - (now - lastBuildTime);
        setTimeout(() => {
          lastBuildTime = 0; // Reset the cooldown after it expires
          logger.info('Cooldown period reset');
        }, remainingCooldown);
        
        return;
      }
      
      if (pendingChanges.size === 0) {
        isProcessing = false;
        return;
      }
      
      const changesList = Array.from(pendingChanges).join(', ');
      logger.info(`📝 Changes detected in: ${changesList}`);
      pendingChanges.clear();
      
      const buildSuccess = await runBuild();
      lastBuildTime = Date.now();
      
      if (buildSuccess) {
        await uploadAdvancedConfig(screenName);
        logger.success('Changes deployed successfully');
      }
    } catch (error) {
      logger.error('Error during build process', error);
    } finally {
      isProcessing = false;
      
      if (pendingChanges.size > 0) {
        setTimeout(processChanges, CONFIG.DEBOUNCE_DELAY);
      }
    }
  };
  
  // Set up directories to watch
  const watchDirs = [
    screenPath,                           // Screen-specific directory
    path.join(srcPath, 'components'),     // Shared components
    path.join(srcPath, 'styles'),         // Styles
    path.join(srcPath, 'utils')           // Utilities
  ];
  
  // Filter out non-existent directories
  const validDirs = watchDirs.filter(dir => {
    const exists = fs.existsSync(dir);
    if (!exists) {
      logger.warn(`Directory does not exist: ${path.relative(process.cwd(), dir)}`);
    }
    return exists;
  });
  
  if (validDirs.length === 0) {
    logger.warn('No valid directories to watch. Make sure the screen and component directories exist.');
    return () => {}; // Return empty cleanup function
  }
  
  // Set up chokidar watcher - more reliable cross-platform solution than fs.watch
  watcher = chokidar.watch(validDirs, {
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 100
    }
  });
  
  // Log what directories are being watched
  validDirs.forEach(dir => {
    logger.info(`👀 Watching ${path.relative(process.cwd(), dir)}`);
  });
  
  // Handle all relevant file events
  watcher.on('all', (event, filePath) => {
    // Only consider add and change events on relevant file types
    if ((event === 'add' || event === 'change') && 
        CONFIG.FILE_EXTENSIONS.some(ext => filePath.endsWith(ext))) {
      
      // Get relative path for better logging
      const relativePath = path.relative(process.cwd(), filePath);
      
      // Add to pending changes
      pendingChanges.add(relativePath);
      
      // Debounce the build process
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(processChanges, CONFIG.DEBOUNCE_DELAY);
    }
  });
  
  watcher.on('error', error => {
    logger.error('Watcher error', error);
  });
  
  // Return cleanup function
  return () => {
    logger.warn('Stopping file watchers');
    if (watcher) {
      watcher.close();
    }
    clearTimeout(debounceTimer);
  };
}; 