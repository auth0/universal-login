#!/usr/bin/env node

// Node.js built-in modules
import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

// Third-party modules
import ora from 'ora';

// Local modules
import { validateScreenName } from './utils/screen-validator.js';
import { logger } from './utils/index.js';
import { handleFatalError } from './utils/error-handler.js';
import { createAdvancedModeConfig } from './utils/config-generator.js';
import { 
  checkAuth0CliInstalled, 
  checkAuth0CliLoggedIn, 
  configureAdvancedMode 
} from './utils/auth0-cli.js';
import { fileURLToPath } from 'url';
import { startAdvancedEnv } from './dev-environment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main function for advanced mode
 * @param {string} screenName - The screen name to run
 */
const runAdvancedMode = async (screenName) => {
  let exitCode = 0; // Default to success
  try {
    logger.startupBanner('advanced', screenName || 'unknown');

    // 1. Validate the screen name
    validateScreenName(screenName, 'advanced');
    
    // 2. Build the application
    await buildApp();
    
    // 3. Check Auth0 CLI requirements
    const isCliInstalled = await checkAuth0CliInstalled();
    if (!isCliInstalled) {
      // Error logged in checkAuth0CliInstalled
      throw new Error('Auth0 CLI not installed'); // Throw to exit via catch
    }
    
    const isLoggedIn = await checkAuth0CliLoggedIn();
    if (!isLoggedIn) {
      // Error logged in checkAuth0CliLoggedIn
      throw new Error('Auth0 CLI login required'); // Throw to exit via catch
    }
    
    // 4. Configure using Auth0 CLI
    const configSuccess = await configureWithAuth0Cli(screenName);
    if (!configSuccess) {
      logger.info('Exiting due to configuration failure.');
      throw new Error('Configuration failed'); // Throw to exit via catch
    }

    // 5. Start the development environment (concurrently)
    await startAdvancedEnv(screenName);

  } catch (error) {
    // Check if the error indicates graceful shutdown (Ctrl+C)
    const isGracefulExit = 
        error?.signal === 'SIGINT' || 
        error?.signal === 'SIGTERM' || 
        (Array.isArray(error) && error.every(e => e.killed || e.exitCode === null || e.exitCode === 0)); // Check concurrently's error array

    if (isGracefulExit) {
      logger.info('\nAdvanced mode process terminated.');
      // Exit code remains 0 for graceful termination
    } else {
      // Skip error reporting for build errors that were already reported in buildApp
      // We check if the error has a details property which indicates it was processed in buildApp
      if (!error.details) {
        logger.error('An error occurred during advanced mode execution:');
        if(Array.isArray(error)) {
          // Error likely from concurrently library
          error.forEach(e => logger.error(`  [${e.command?.name || 'Process'}]: ${e.message?.split('\n')[0]}`)); // Log first line
        } else {
          // Log other errors (e.g., from config steps)
          logger.error(`  ${error.message}`);
        }
      }
      exitCode = 1; // Set exit code to 1 for errors
    }
  } finally {
      process.exit(exitCode);
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
  
  if (configSuccess) {
    logger.success(`Screen '${screenName}' configured in advanced mode using Auth0 CLI`);
  }
  
  return configSuccess;
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
    spinner.fail('Build failed');
    
    // Display build errors if available
    if (error.details && error.details.length > 0) {
      error.details.forEach(detail => {
        logger.error(`${detail}`);
      });
      // Don't rethrow - we've displayed the errors already
      process.exit(1);
    } else {
      // For other errors, throw to be caught by the main try/catch
      throw error;
    }
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
    let outputText = '';
    let errorLines = [];
    
    const proc = spawn(command, args, {
      stdio: 'pipe',
      shell: false,
      env: { ...process.env, FORCE_COLOR: "true" }
    });
    
    // Collect stdout without displaying
    proc.stdout.on('data', (data) => {
      const text = data.toString();
      outputText += text;
      
      // Check for errors in stdout and collect them
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.includes('error TS') || line.includes('Error:')) {
          errorLines.push(line.trim());
        }
      }
    });
    
    // Collect stderr and display only errors
    proc.stderr.on('data', (data) => {
      const text = data.toString();
      outputText += text;
      
      // Display stderr content as it's likely to be errors
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.trim()) {
          errorLines.push(line.trim());
        }
      }
    });
    
    proc.on('close', code => {
      // Check output for error indicators
      const hasErrors = 
        outputText.includes('error TS') || 
        outputText.includes('Error:') ||
        (outputText.includes('Found ') && outputText.includes(' error')) ||
        errorLines.length > 0;
      
      if (code !== 0 || hasErrors) {
        // Create error object with detailed information
        const error = new Error('TypeScript compilation failed');
        error.details = [...new Set(errorLines)]; // Attach unique errors for the caller to use
        reject(error);
      } else {
        resolve();
      }
    });
    
    proc.on('error', err => {
      reject(new Error(`Failed to start command: ${err.message}`));
    });
  });
};

// Reinstate the simple top-level SIGINT handler
process.on('SIGINT', () => {
});

// Get screen name from command line arguments
const screenName = process.argv[2]?.toLowerCase();

// Start the process
runAdvancedMode(screenName);