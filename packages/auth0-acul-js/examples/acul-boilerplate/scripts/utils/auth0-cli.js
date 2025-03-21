/**
 * Auth0 CLI Utilities
 * 
 * Provides functions for Auth0 CLI interactions, including installation verification
 * and screen configuration for both standard and advanced modes.
 */

import { execa } from 'execa';
import ora from 'ora';
import { logger } from './logger.js';
import { execSync } from 'child_process';

/**
 * Checks if Auth0 CLI is installed and accessible
 * @returns {Promise<boolean>} - True if CLI is available, false otherwise
 */
export async function checkAuth0CliInstalled() {
  const spinner = ora({
    text: '🔍 Checking if Auth0 CLI is installed...',
    color: 'cyan'
  }).start();
  
  try {
    const { stdout } = await execa('auth0', ['--version']);
    spinner.succeed(`✅ Auth0 CLI is installed (${stdout.trim()})`);
    return true;
  } catch (error) {
    spinner.fail('❌ Auth0 CLI is not installed or not in PATH');
    logger.error('The Auth0 CLI must be installed to use this script.');
    logger.info('Installation instructions:');
    logger.info('  • Homebrew (macOS/Linux): brew tap auth0/auth0-cli && brew install auth0');
    logger.info('  • Scoop (Windows): scoop bucket add auth0 https://github.com/auth0/scoop-auth0-cli.git && scoop install auth0');
    logger.info('  • Or visit: https://github.com/auth0/auth0-cli');
    return false;
  }
}

/**
 * Opens a browser for Auth0 login if not already logged in
 * @returns {Promise<boolean>} - True if login succeeded or already logged in, false otherwise
 */
export async function ensureAuth0Login() {
  // First check if already logged in
  const loginCheckSpinner = ora({
    text: '🔐 Checking Auth0 CLI login status...',
    color: 'cyan'
  }).start();
  
  try {
    await execa('auth0', ['tenants', 'list']);
    loginCheckSpinner.succeed('✅ Already logged in to Auth0 CLI');
    return true;
  } catch (error) {
    loginCheckSpinner.info('🔑 Auth0 CLI login required');
    
    // Display warning about using development tenant
    logger.warn('⚠️  IMPORTANT: Please use a development tenant for this application.');
    logger.warn('⚠️  Using your production tenant could lead to unintended configuration changes.');
    logger.info('');
    logger.info('A browser window will open for you to log in to Auth0.');
    logger.info('After login, return to this terminal to continue.');
    logger.info('');
    
    // Prompt user to confirm before proceeding
    const confirmSpinner = ora({
      text: '🔐 Press Enter to continue with Auth0 login...',
      color: 'cyan'
    }).start();
    
    // Wait for user to press Enter
    await new Promise(resolve => {
      process.stdin.once('data', () => {
        confirmSpinner.succeed('🔐 Continuing with Auth0 login');
        resolve();
      });
      // Make stdin readable
      process.stdin.setRawMode && process.stdin.setRawMode(true);
      process.stdin.resume();
    });
    
    // Run auth0 login command
    const loginSpinner = ora({
      text: '🌐 Opening browser for Auth0 login...',
      color: 'cyan'
    }).start();
    
    try {
      // Use execSync for this command since it's interactive and opens a browser
      execSync('auth0 login', { stdio: 'inherit' });
      loginSpinner.succeed('✅ Successfully logged in to Auth0');
      return true;
    } catch (error) {
      loginSpinner.fail('❌ Auth0 login failed');
      logger.error('Auth0 login process failed', error);
      return false;
    }
  }
}

/**
 * Checks if user is logged in to Auth0 CLI
 * @returns {Promise<boolean>} - True if logged in, false otherwise
 */
export async function checkAuth0CliLoggedIn() {
  const spinner = ora({
    text: '🔐 Checking Auth0 CLI login status...',
    color: 'cyan'
  }).start();
  
  try {
    await execa('auth0', ['tenants', 'list']);
    spinner.succeed('✅ Auth0 CLI session is active');
    return true;
  } catch (error) {
    spinner.fail('❌ Not logged in to Auth0 CLI');
    logger.info('Please log in using: auth0 login');
    return false;
  }
}

/**
 * Configures a screen in standard mode using Auth0 CLI
 * @param {string} screenName - The screen name to configure
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function configureStandardMode(screenName) {
  logger.section('Configuring Screen with Auth0 CLI');
  
  // Reminder about tenant selection
  logger.warn('⚠️  Configuring screen in the currently selected Auth0 tenant');
  logger.info(`Currently selected tenant: ${await getCurrentTenant()}`);
  
  const spinner = ora({
    text: `🔧 Applying standard mode to '${screenName}' screen...`,
    color: 'cyan'
  }).start();
  
  try {
    // Run Auth0 CLI command to configure screen in standard mode
    await execa('auth0', [
      'universal-login',
      'switch',
      '--prompt', screenName, // The prompt name (e.g., login-id)
      '--screen', screenName, // The screen name (should match prompt)
      '--rendering-mode', 'standard'
    ]);
    
    spinner.succeed(`✅ Successfully configured '${screenName}' screen in standard mode`);
    return true;
  } catch (error) {
    spinner.fail(`❌ Failed to configure '${screenName}' screen`);
    logger.error('Auth0 CLI command failed', error);
    logger.data('Error details', error.stderr || error.message);
    return false;
  }
}

/**
 * Configures a screen in advanced mode using Auth0 CLI
 * @param {string} screenName - The screen name to configure
 * @param {object} config - The advanced mode configuration
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function configureAdvancedMode(screenName, config) {
  // This will be implemented in the next phase
  // For now, this is a placeholder
  logger.warn('Advanced mode with Auth0 CLI not yet implemented');
  return false;
}

/**
 * Gets the currently selected tenant name
 * @returns {Promise<string>} - Tenant name or "Unknown" if not found
 */
async function getCurrentTenant() {
  try {
    const { stdout } = await execa('auth0', ['tenant', 'current']);
    return stdout.trim();
  } catch (error) {
    return "Unknown";
  }
} 