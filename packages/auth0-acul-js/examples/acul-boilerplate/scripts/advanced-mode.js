import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { validateScreenName } from './utils/screen-validator.js';
import { startServers } from './server.js';
import { uploadAdvancedConfig } from './utils/assetUploader.js';
import { logger } from './utils/logger.js';
import { handleFatalError } from './utils/error-handler.js';
import ora from 'ora';

/**
 * Run a command as a promise
 */
const runCommand = (command, args) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, FORCE_COLOR: "true" }
    });
    
    let stdout = '';
    let stderr = '';
    
    proc.stdout.on('data', data => {
      stdout += data.toString();
    });
    
    proc.stderr.on('data', data => {
      stderr += data.toString();
    });
    
    proc.on('close', code => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`Command failed with exit code ${code}: ${stderr}`));
      }
    });
    
    proc.on('error', err => {
      reject(new Error(`Failed to start command: ${err.message}`));
    });
  });
};

/**
 * Clean the dist directory before building
 */
async function cleanDist() {
  const distPath = path.join(process.cwd(), 'dist');
  
  if (fs.existsSync(distPath)) {
    const spinner = ora({
      text: '🧹 Cleaning previous build artifacts...',
      color: 'cyan'
    }).start();
    
    try {
      const removeDir = (dirPath) => {
        if (fs.existsSync(dirPath)) {
          fs.readdirSync(dirPath).forEach((file) => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
              removeDir(curPath);
            } else {
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(dirPath);
        }
      };
      
      removeDir(distPath);
      spinner.succeed('Previous build artifacts cleaned');
    } catch (error) {
      spinner.warn(`Could not clean dist directory: ${error.message}, continuing with build`);
    }
  }
}

/**
 * Build the application
 */
async function buildApp() {
  logger.section('Building Application');
  await cleanDist();
  
  const spinner = ora({
    text: '🔨 Building application...',
    color: 'cyan'
  }).start();

  try {
    await runCommand('npm', ['run', 'build']);
    spinner.succeed('Application built successfully');
  } catch (error) {
    spinner.fail(`Build failed: ${error.message}`);
    throw new Error(`Build failed: ${error.message}`);
  }
}

/**
 * Main function for advanced mode
 */
const runAdvancedMode = async (screenName) => {
  logger.startupBanner('advanced', screenName || 'unknown');

  try {
    validateScreenName(screenName, 'advanced');
    await buildApp();
    await uploadAdvancedConfig(screenName);
    await startServers('advanced', screenName);
  } catch (error) {
    handleFatalError(error, 'Error running advanced mode');
  }
};

// Get screen name from command line arguments
const screenName = process.argv[2]?.toLowerCase();
runAdvancedMode(screenName); 