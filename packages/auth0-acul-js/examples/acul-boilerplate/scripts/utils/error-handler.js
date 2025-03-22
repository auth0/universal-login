/**
 * Error Handler Utility
 * 
 * Provides specialized error handling and actionable instructions
 * for common issues that may occur during development.
 */

import chalk from 'chalk';
import { CONFIG } from './server-config.js';
import { logger } from './logger.js';
import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Known error types that we can provide helpful instructions for
 */
const ERROR_TYPES = {
  PORT_CONFLICT: 'port_conflict',
  BUILD_FAILURE: 'build_failure',
  UPLOAD_FAILURE: 'upload_failure',
  INVALID_SCREEN: 'invalid_screen',
  NODE_VERSION: 'node_version',
  UNKNOWN: 'unknown'
};

/**
 * Check if .nvmrc file exists and get the required Node.js version
 * @returns {string|null} - The required Node.js version or null if .nvmrc doesn't exist
 */
const getNvmrcVersion = () => {
  try {
    const nvmrcPath = path.join(process.cwd(), '.nvmrc');
    if (fs.existsSync(nvmrcPath)) {
      const version = fs.readFileSync(nvmrcPath, 'utf8').trim();
      return version;
    }
  } catch (error) {
    // Silently fail and return null if any issues occur reading the file
  }
  return null;
};

/**
 * Get platform-appropriate nvm/Node.js instructions
 * @returns {object} - Object with nvm commands and information
 */
const getNvmInstructions = () => {
  const currentPlatform = getCurrentPlatform();
  const requiredVersion = getNvmrcVersion();
  
  if (!requiredVersion) {
    return { 
      hasNvmrc: false,
      npmInstall: 'npm install'
    };
  }
  
  // nvm instructions vary slightly by platform
  if (currentPlatform === 'windows') {
    return {
      hasNvmrc: true,
      version: requiredVersion,
      useNvm: `nvm use ${requiredVersion}`,
      installNode: `nvm install ${requiredVersion}`,
      npmInstall: `nvm use ${requiredVersion} && npm install`,
      nvmInstallInstructions: 'Install nvm-windows from https://github.com/coreybutler/nvm-windows'
    };
  } else {
    // macOS or Linux
    return {
      hasNvmrc: true,
      version: requiredVersion,
      useNvm: `nvm use`,  // Just 'nvm use' will read from .nvmrc
      installNode: `nvm install`,  // Just 'nvm install' will read from .nvmrc
      npmInstall: `nvm use && npm install`,
      nvmInstallInstructions: 'Install nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash'
    };
  }
};

/**
 * Determine the current platform
 * @returns {string} - 'windows', 'macos', 'linux', or 'unknown'
 */
const getCurrentPlatform = () => {
  const platform = os.platform().toLowerCase();
  
  // Use exact matching rather than includes to avoid darwin matching 'win'
  if (platform === 'win32') {
    return 'windows';
  } else if (platform === 'darwin') {
    return 'macos';
  } else if (platform === 'linux') {
    return 'linux';
  }
  
  return 'unknown';
};

/**
 * Identify the type of error based on its message or properties
 * @param {Error} error - The error to identify
 * @returns {string} - The identified error type
 */
const identifyErrorType = (error) => {
  const message = error.message.toLowerCase();
  
  if (message.includes('port') && message.includes('in use')) {
    return ERROR_TYPES.PORT_CONFLICT;
  } else if (message.includes('build failed')) {
    return ERROR_TYPES.BUILD_FAILURE;
  } else if (message.includes('failed to upload') || message.includes('configuration')) {
    return ERROR_TYPES.UPLOAD_FAILURE;
  } else if (message.includes('screen') && message.includes('not found')) {
    return ERROR_TYPES.INVALID_SCREEN;
  } else if (message.includes('node') && message.includes('version')) {
    return ERROR_TYPES.NODE_VERSION;
  }
  
  return ERROR_TYPES.UNKNOWN;
};

/**
 * Extract port number from error message
 * @param {string} errorMessage - The error message
 * @returns {number|null} - The extracted port number or null if not found
 */
const extractPortFromError = (errorMessage) => {
  const match = errorMessage.match(/port (\d+)/i);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Get platform-specific instructions for resolving port conflicts
 * @param {number} port - The port that's in conflict
 * @param {string} serviceName - The name of the service using that port
 * @returns {string[]} - Array of instructions
 */
const getPortConflictInstructions = (port, serviceName) => {
  const currentPlatform = getCurrentPlatform();
  const isCorePort = port === CONFIG.port || port === CONFIG.apiPort || port === 3000;
  
  const instructions = [
    chalk.yellow(`\n${chalk.bold("Port Conflict Resolution Instructions:")}`),
    chalk.white(`Port ${chalk.bold(port)} required by ${chalk.bold(serviceName)} is already in use.`),
    `\nYou have a few options to resolve this issue:`
  ];

  // Option 1: Find and stop the process using that port (platform-specific)
  instructions.push(
    chalk.bold("\n1. Find and stop the process using that port:")
  );
  
  // Show commands based on the current platform
  if (currentPlatform === 'macos' || currentPlatform === 'linux') {
    instructions.push(
      `   ${chalk.gray(`lsof -i :${port} | grep LISTEN`)}`,
      `   ${chalk.gray(`kill -9 <PID>`)}`
    );
  } else if (currentPlatform === 'windows') {
    instructions.push(
      `   ${chalk.gray(`netstat -ano | findstr :${port}`)}`,
      `   ${chalk.gray(`taskkill /F /PID <PID>`)}`
    );
  } else {
    // For unknown platforms, show both sets of commands
    instructions.push(
      `   ${chalk.cyan("• For macOS/Linux:")}`,
      `     ${chalk.gray(`lsof -i :${port} | grep LISTEN`)}`,
      `     ${chalk.gray("kill -9 <PID>")}`,
      `   ${chalk.cyan("• For Windows:")}`,
      `     ${chalk.gray(`netstat -ano | findstr :${port}`)}`,
      `     ${chalk.gray("taskkill /F /PID <PID>")}`
    );
  }

  // Option 2: Change the port configuration
  if (isCorePort) {
    const configFile = 'scripts/utils/server-config.js';
    
    instructions.push(
      chalk.bold("\n2. Modify the port configuration:"),
      `   Edit ${chalk.cyan(configFile)} to change the port number`,
      `   ${chalk.gray(`// Example: Change CONFIG.port from ${port} to another value`)}`
    );
    
    // Add platform-specific instructions for editing files
    if (currentPlatform === 'macos') {
      instructions.push(`   ${chalk.gray(`open -e ${configFile}`)}`);
    } else if (currentPlatform === 'windows') {
      instructions.push(`   ${chalk.gray(`notepad ${configFile}`)}`);
    } else if (currentPlatform === 'linux') {
      instructions.push(`   ${chalk.gray(`nano ${configFile}`)} or ${chalk.gray(`vi ${configFile}`)}`);
    }
    
    // For Next.js port, add specific instructions
    if (port === 3000) {
      instructions.push(
        `   ${chalk.gray(`// For Next.js app, edit the package.json in nextjs-quickstart/`)}`
      );
    }
  }

  // Option 3: Wait and try again later
  instructions.push(
    chalk.bold("\n3. Wait and try again:"),
    `   The process using this port might be temporary and could release it soon.\n`
  );

  return instructions;
};

/**
 * Get platform-specific instructions for build failures
 * @returns {string[]} - Array of instructions
 */
const getBuildFailureInstructions = () => {
  const currentPlatform = getCurrentPlatform();
  const nvmInfo = getNvmInstructions();
  
  const instructions = [
    chalk.yellow(`\n${chalk.bold("Build Failure Resolution Instructions:")}`),
    "1. Check for TypeScript or compilation errors in your code",
    "2. Ensure you have all required dependencies installed"
  ];
  
  // Node version check
  if (nvmInfo.hasNvmrc) {
    instructions.push(
      `   ${chalk.cyan(`Project requires Node.js version: ${nvmInfo.version}`)}`,
      `   ${chalk.gray(nvmInfo.useNvm)}`,
      `   ${chalk.gray(nvmInfo.npmInstall)}`
    );
  } else {
    // Standard npm install command
    instructions.push(`   ${chalk.gray("npm install")}`);
  }
  
  // Platform-specific node_modules clearing command with nvm awareness
  if (currentPlatform === 'windows') {
    instructions.push(
      "3. Try clearing node_modules and reinstalling",
      `   ${chalk.gray("rmdir /s /q node_modules")}`
    );
  } else {
    instructions.push(
      "3. Try clearing node_modules and reinstalling",
      `   ${chalk.gray("rm -rf node_modules")}`
    );
  }
  
  // Add install command with nvm awareness
  instructions.push(`   ${chalk.gray(nvmInfo.npmInstall)}`);
  
  // Platform-specific disk space check command
  if (currentPlatform === 'windows') {
    instructions.push("4. Check for disk space issues", `   ${chalk.gray("wmic logicaldisk get deviceid, freespace, size")}`);
  } else if (currentPlatform === 'macos' || currentPlatform === 'linux') {
    instructions.push("4. Check for disk space issues", `   ${chalk.gray("df -h")}`);
  } else {
    instructions.push("4. Check for disk space issues");
  }
  
  // Build command with nvm awareness
  if (nvmInfo.hasNvmrc) {
    instructions.push(`5. Run the build command manually with correct Node version: ${chalk.gray(`${nvmInfo.useNvm} && npm run build`)} for more detailed error output\n`);
  } else {
    instructions.push(`5. Run the build command manually: ${chalk.gray("npm run build")} for more detailed error output\n`);
  }
  
  return instructions;
};

/**
 * Get instructions for Node.js version mismatch errors
 * @returns {string[]} - Array of instructions
 */
const getNodeVersionInstructions = () => {
  const nvmInfo = getNvmInstructions();
  const currentPlatform = getCurrentPlatform();
  
  const instructions = [
    chalk.yellow(`\n${chalk.bold("Node.js Version Resolution Instructions:")}`),
  ];
  
  if (nvmInfo.hasNvmrc) {
    instructions.push(
      `This project requires Node.js version: ${chalk.cyan(nvmInfo.version)}`,
      `Current Node.js version: ${chalk.yellow(process.version)}\n`
    );
    
    instructions.push(chalk.bold("Option 1: Use nvm (Node Version Manager)"));
    
    // Check if nvm is installed and available
    instructions.push(
      `1. Install nvm if not already installed:`,
      `   ${chalk.gray(nvmInfo.nvmInstallInstructions)}`
    );
    
    // Instructions for using nvm
    instructions.push(
      `2. Install the required Node.js version:`,
      `   ${chalk.gray(nvmInfo.installNode)}`,
      `3. Switch to the required Node.js version:`,
      `   ${chalk.gray(nvmInfo.useNvm)}`,
      `4. Run the original command again\n`
    );
    
    instructions.push(chalk.bold("Option 2: Install Node.js directly"));
    
    // Direct install links based on platform
    if (currentPlatform === 'macos') {
      instructions.push(
        `1. Download Node.js ${nvmInfo.version} from ${chalk.cyan(`https://nodejs.org/download/release/v${nvmInfo.version}.0/node-v${nvmInfo.version}.0.pkg`)}`,
        `2. Run the installer and follow the instructions`
      );
    } else if (currentPlatform === 'windows') {
      instructions.push(
        `1. Download Node.js ${nvmInfo.version} from ${chalk.cyan(`https://nodejs.org/download/release/v${nvmInfo.version}.0/node-v${nvmInfo.version}.0-x64.msi`)}`,
        `2. Run the installer and follow the instructions`
      );
    } else {
      instructions.push(
        `1. Download Node.js ${nvmInfo.version} from ${chalk.cyan(`https://nodejs.org/download/release/v${nvmInfo.version}.0/`)}`,
        `2. Install using your package manager or from source`
      );
    }
  } else {
    instructions.push(
      "No .nvmrc file found in this project. Using Node.js version:",
      chalk.yellow(process.version),
      "\nIf you're experiencing Node.js version related issues, consider:",
      "1. Checking package.json for 'engines' field to identify required Node.js version",
      "2. Installing a different Node.js version if needed",
      "3. Creating an .nvmrc file to specify a version for this project"
    );
  }
  
  return instructions;
};

/**
 * Get available screens by scanning the src/screens directory
 * @returns {string[]} - Array of available screen names
 */
const getAvailableScreens = () => {
  const screensPath = path.join(process.cwd(), 'src', 'screens');
  
  if (!fs.existsSync(screensPath)) {
    return [];
  }
  
  try {
    return fs.readdirSync(screensPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    return [];
  }
};

/**
 * Get platform-specific instructions for upload failures
 * @returns {string[]} - Array of instructions
 */
const getUploadFailureInstructions = () => {
  const currentPlatform = getCurrentPlatform();
  const nvmInfo = getNvmInstructions();
  
  const instructions = [
    chalk.yellow(`\n${chalk.bold("Upload Failure Resolution Instructions:")}`),
    "1. Check your Auth0 credentials in .env.local"
  ];
  
  // Platform-specific file opening command
  if (currentPlatform === 'macos') {
    instructions.push(`   ${chalk.gray("open -e .env.local")}`);
  } else if (currentPlatform === 'windows') {
    instructions.push(`   ${chalk.gray("notepad .env.local")}`);
  } else if (currentPlatform === 'linux') {
    instructions.push(`   ${chalk.gray("nano .env.local")} or ${chalk.gray("vi .env.local")}`);
  }
  
  instructions.push(
    "2. Verify your Auth0 account permissions and rate limits",
    "3. Check your network connection"
  );
  
  // Platform-specific network test command
  if (currentPlatform === 'windows') {
    instructions.push(`   ${chalk.gray("ping auth0.com")}`);
  } else {
    instructions.push(`   ${chalk.gray("ping -c 4 auth0.com")}`);
  }
  
  // Build command with nvm awareness
  if (nvmInfo.hasNvmrc) {
    instructions.push(
      "4. The Auth0 service might be experiencing issues - check status.auth0.com",
      `5. Try rebuilding and uploading manually: ${chalk.gray(`${nvmInfo.useNvm} && npm run build`)}\n`
    );
  } else {
    instructions.push(
      "4. The Auth0 service might be experiencing issues - check status.auth0.com",
      `5. Try rebuilding and uploading manually: ${chalk.gray("npm run build")}\n`
    );
  }
  
  return instructions;
};

/**
 * Get platform-specific instructions for invalid screen errors
 * @returns {string[]} - Array of instructions
 */
const getInvalidScreenInstructions = () => {
  const availableScreens = getAvailableScreens();
  const currentPlatform = getCurrentPlatform();
  const nvmInfo = getNvmInstructions();
  
  const instructions = [
    chalk.yellow(`\n${chalk.bold("Invalid Screen Resolution Instructions:")}`),
    "1. Check the name of the screen you provided matches a directory in src/screens/"
  ];
  
  // Platform-specific directory listing command
  if (currentPlatform === 'windows') {
    instructions.push(`   ${chalk.gray("dir src\\screens")}`);
  } else {
    instructions.push(`   ${chalk.gray("ls -la src/screens")}`);
  }
  
  instructions.push("2. Ensure the screen has an index.tsx file");
  
  if (availableScreens.length > 0) {
    let runCommand = `npm run screen:advanced <screen-name>`;
    if (nvmInfo.hasNvmrc) {
      runCommand = `${nvmInfo.useNvm} && ${runCommand}`;
    }
    
    instructions.push(
      chalk.bold("\nAvailable screens:"),
      ...availableScreens.map(screen => `  • ${chalk.green(screen)}`),
      `\nTry running: ${chalk.gray(runCommand)}`
    );
  } else {
    instructions.push(
      "3. No screens were found in the src/screens directory",
      "4. Create a new screen directory with an index.tsx file"
    );
  }
  
  return instructions;
};

/**
 * Handle specific error types with helpful instructions
 * @param {Error} error - The error to handle
 * @param {string} context - The context in which the error occurred
 * @returns {void}
 */
export function handleErrorWithInstructions(error, context = '') {
  const errorType = identifyErrorType(error);
  let instructions = [];

  // Log the error with appropriate header based on context
  logger.error(`${context ? `${context}: ` : ''}${error.message}`);
  
  // Provide specific instructions based on error type
  switch (errorType) {
    case ERROR_TYPES.PORT_CONFLICT:
      const port = extractPortFromError(error.message);
      // Extract service name from error message
      const serviceMatch = error.message.match(/required by ([^)]+)/);
      const serviceName = serviceMatch ? serviceMatch[1].trim() : 'a service';
      
      if (port) {
        instructions = getPortConflictInstructions(port, serviceName);
      }
      break;
      
    case ERROR_TYPES.BUILD_FAILURE:
      instructions = getBuildFailureInstructions();
      break;
      
    case ERROR_TYPES.UPLOAD_FAILURE:
      instructions = getUploadFailureInstructions();
      break;
      
    case ERROR_TYPES.INVALID_SCREEN:
      instructions = getInvalidScreenInstructions();
      break;
      
    case ERROR_TYPES.NODE_VERSION:
      instructions = getNodeVersionInstructions();
      break;
      
    default:
      // For unknown errors, provide general debugging suggestions that are platform-specific
      const currentPlatform = getCurrentPlatform();
      const nvmInfo = getNvmInstructions();
      
      instructions = [
        chalk.yellow(`\n${chalk.bold("Troubleshooting Suggestions:")}`),
        "1. Check if pre-requisites are installed and configured correctly. Ex: Custom Domain, Auth0 CLI, etc.",
        "2. Check the logs above for specific error details",
        "3. Ensure all environment variables are properly set"
      ];
      
      // Platform-specific environment variable commands
      if (currentPlatform === 'windows') {
        instructions.push(`   ${chalk.gray("set")}`);
      } else {
        instructions.push(`   ${chalk.gray("env")}`);
      }
      
      instructions.push("4. Check your network connection");
      
      // Platform-specific network test command
      if (currentPlatform === 'windows') {
        instructions.push(`   ${chalk.gray("ping auth0.com")}`);
      } else {
        instructions.push(`   ${chalk.gray("ping -c 4 auth0.com")}`);
      }
      
      // Add Node.js version info
      if (nvmInfo.hasNvmrc) {
        instructions.push(
          `5. Ensure you're using the correct Node.js version (${chalk.cyan(nvmInfo.version)})`,
          `   ${chalk.gray(nvmInfo.useNvm)}`
        );
        instructions.push("6. Try running with NODE_ENV=development for more verbose logging");
      } else {
        instructions.push(
          "5. Try running with NODE_ENV=development for more verbose logging",
          "6. Check for recent changes that might have introduced this issue\n" 
        );
      }
      break;
  }
  
  // Print instructions
  instructions.forEach(line => console.log(line));
  
  // Return a standardized exit code based on error type
  return getExitCode(errorType);
}

/**
 * Determine an appropriate exit code based on error type
 * @param {string} errorType - The type of error
 * @returns {number} - The exit code to use
 */
function getExitCode(errorType) {
  switch (errorType) {
    case ERROR_TYPES.PORT_CONFLICT:
      return 10;
    case ERROR_TYPES.BUILD_FAILURE:
      return 11;
    case ERROR_TYPES.UPLOAD_FAILURE:
      return 12;
    case ERROR_TYPES.INVALID_SCREEN:
      return 13;
    case ERROR_TYPES.NODE_VERSION:
      return 14;
    default:
      return 1;
  }
}

/**
 * Main error handling wrapper for the advanced mode process
 * @param {Error} error - The error that occurred
 * @param {string} context - Context in which the error occurred
 */
export function handleFatalError(error, context) {
  const exitCode = handleErrorWithInstructions(error, context);
  
  // Always exit with appropriate code for fatal errors
  process.exit(exitCode);
} 