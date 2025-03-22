// Node.js built-in modules
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Third-party modules
import ora from 'ora';

// Local modules
import { validateScreenName } from './utils/screen-validator.js';
import { startServers } from './server.js';
import { logger } from './utils/logger.js';
import { handleFatalError } from './utils/error-handler.js';
import { createAdvancedModeConfig } from './utils/config-generator.js';
import { 
  checkAuth0CliInstalled, 
  checkAuth0CliLoggedIn, 
  configureAdvancedMode 
} from './utils/auth0-cli.js';

/**
 * Main function for advanced mode
 * @param {string} screenName - The screen name to run
 */
const runAdvancedMode = async (screenName) => {
  logger.startupBanner('advanced', screenName || 'unknown');

  try {
    // 1. Validate the screen name
    validateScreenName(screenName, 'advanced');
    
    // 2. Build the application
    await buildApp();
    
    // 3. Check Auth0 CLI requirements
    const isCliInstalled = await checkAuth0CliInstalled();
    if (!isCliInstalled) {
      throw new Error('Auth0 CLI is required but not installed');
    }
    
    const isLoggedIn = await checkAuth0CliLoggedIn();
    if (!isLoggedIn) {
      throw new Error('Please login to Auth0 CLI using: auth0 login');
    }
    
    // 4. Configure using Auth0 CLI
    await configureWithAuth0Cli(screenName);
    
    // 5. Start development servers
    await startServers('advanced', screenName);
  } catch (error) {
    handleFatalError(error, 'Error running advanced mode');
  }
};

/**
 * Configure advanced mode using Auth0 CLI
 * @param {string} screenName - The screen name to configure
 */
async function configureWithAuth0Cli(screenName) {
  logger.section('Auth0 CLI Configuration');

  // Generate the advanced mode configuration
  const advancedConfig = await createAdvancedModeConfig(screenName);
  
  // Configure the screen using Auth0 CLI
  const configSuccess = await configureAdvancedMode(screenName, advancedConfig);
  if (!configSuccess) {
    throw new Error(`Auth0 CLI command failed to configure screen '${screenName}' in advanced mode. Please fix the issue before continuing.`);
  }
  
  logger.success(`Screen '${screenName}' configured in advanced mode using Auth0 CLI`);
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

// Get screen name from command line arguments
const screenName = process.argv[2]?.toLowerCase();

// Start the process
runAdvancedMode(screenName); 