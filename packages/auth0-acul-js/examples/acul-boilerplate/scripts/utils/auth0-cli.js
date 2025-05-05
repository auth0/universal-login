/**
 * Auth0 CLI Utilities
 * 
 * Provides functions for Auth0 CLI interactions, including installation verification
 * and screen configuration for both standard and advanced modes.
 */

import { execa } from 'execa';
import ora from 'ora';
import { logger, colors } from './logger.js';
import { execSync } from 'child_process';
import { saveAdvancedModeConfig } from './config-generator.js';
import { getPromptNameForScreen } from './screen-mappings.js';

/**
 * Helper function to get user input from stdin
 * @param {string} prompt - Message to display before getting input
 * @param {boolean} isSingleKey - Whether to read a single key press or wait for Enter
 * @returns {Promise<string>} - User input
 */
async function getUserInput(prompt, isSingleKey = false) {
  if (prompt) {
    logger.info(prompt);
  }
  
  return new Promise(resolve => {
    const onData = (data) => {
      const input = data.toString().trim().toLowerCase();
      
      // Clean up event listener and stdin state
      process.stdin.removeListener('data', onData);
      if (process.stdin.isTTY && process.stdin.setRawMode) {
        process.stdin.setRawMode(false);
      }
      process.stdin.pause();
      
      resolve(input);
    };
    
    // Set up stdin for reading
    if (process.stdin.isTTY && process.stdin.setRawMode) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();
    process.stdin.once('data', onData);
    
    // Add newline after key press for single key input
    if (isSingleKey) {
      process.stdout.write('\n');
    }
  });
}

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
    spinner.succeed(`Auth0 CLI is installed (${stdout.trim()})`);
    return true;
  } catch (error) {
    spinner.fail('Auth0 CLI is not installed or not in PATH');
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
  const loginCheckSpinner = ora({
    text: '🔐 Checking Auth0 CLI login status...',
    color: 'cyan'
  }).start();
  
  try {
    await execa('auth0', ['tenants', 'list']);
    loginCheckSpinner.succeed('Already logged in to Auth0 CLI');
    return true;
  } catch (error) {
    loginCheckSpinner.info('🔑 Auth0 CLI login required');
    
    logger.warn('⚠️  IMPORTANT: Please use a development tenant for this application.');
    logger.warn('⚠️  Using your production tenant could lead to unintended configuration changes.');
    logger.info('A browser window will open for you to log in to Auth0.');
    logger.info('After login, return to this terminal to continue.');
    
    // Wait for user input before proceeding
    await getUserInput('Press Enter to continue with Auth0 login...', false);
    
    const loginSpinner = ora({
      text: '🌐 Running Auth0 login...',
      color: 'cyan'
    }).start();
    
    try {
      // Use execSync for this command since it's interactive and opens a browser
      execSync('auth0 login', { 
        stdio: 'inherit',
        encoding: 'utf8'
      });
      loginSpinner.succeed('Successfully logged in to Auth0');
      return true;
    } catch (error) {
      loginSpinner.fail('Auth0 login failed');
      
      if (error.stderr) {
        logger.error(error.stderr);
      } else {
        logger.error(error.message);
      }
      
      logger.info('You can try again by running your auth0 login command again');
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
    const { stdout } = await execa('auth0', ['tenants', 'list']);
    if (!stdout) {
      spinner.fail('Not logged in to Auth0 CLI');
      logger.info('Please log in using: auth0 login');
      process.exit(1);
    }
    spinner.succeed('Auth0 CLI session is active');
    return true;
  } catch (error) {
    spinner.fail('Not logged in to Auth0 CLI');
    logger.info('Please log in using: auth0 login');
    return false;
  }
}

/**
 * Gets all available tenants
 * @returns {Promise<string[]>} - List of available tenant names
 */
async function getAllTenants() {
  try {
    const { stdout } = await execa('auth0', ['tenants', 'list']);
    if (!stdout) {
      return [];
    }
    
    // Parse tenant list output
    const lines = stdout.split('\n');
    return lines
      .filter(line => line.trim() !== '' && !line.includes('TENANT') && !line.includes('---'))
      .map(line => {
        const match = line.includes('→') 
          ? line.match(/→\s+(.+?)$/) 
          : line.match(/\s+(.+?)$/);
        return match && match[1] ? match[1].trim() : null;
      })
      .filter(tenant => tenant !== null);
  } catch (error) {
    return [];
  }
}

/**
 * Gets the currently selected tenant name
 * @returns {Promise<string>} - Tenant name or "Unknown" if not found
 */
async function getCurrentTenant() {
  try {
    // Use 'tenant current' command to get current tenant
    const { stdout } = await execa('auth0', ['tenant', 'current']);
    return stdout.trim();
  } catch (error) {
    // Alternative approach if 'tenant current' fails
    try {
      const { stdout } = await execa('auth0', ['tenants', 'list']);
      const lines = stdout.split('\n');
      const activeTenantLine = lines.find(line => line.includes('→'));
      if (activeTenantLine) {
        const match = activeTenantLine.match(/→\s+(.+?)$/);
        if (match && match[1]) {
          return match[1].trim();
        }
      }
      return "Unknown (unable to determine current tenant)";
    } catch (listError) {
      return "Unknown (not logged in)";
    }
  }
}

/**
 * Gets the currently selected tenant and formats it for display
 * @returns {Promise<string>} - Formatted tenant name for display
 */
export async function getCurrentTenantWithFormatting() {
  const tenantName = await getCurrentTenant();
  return formatTenantName(tenantName);
}

/**
 * Helper function to format tenant name with bright yellow color for visibility
 * @param {string} tenantName - The tenant name to format
 * @returns {string} - Formatted tenant name with ANSI color codes
 */
function formatTenantName(tenantName) {
  return `${colors.bright}${colors.yellow}${tenantName}${colors.reset}`;
}

/**
 * Allows the user to interactively switch to a different tenant
 * @returns {Promise<{ success: boolean, tenant: string|null }>} - Result with success status and selected tenant
 */
export async function switchTenant() {
  logger.section('Auth0 Tenant Selection');
  
  const currentTenant = await getCurrentTenant();
  logger.info(`Current tenant: ${formatTenantName(currentTenant)}`);
  
  const spinner = ora({
    text: '🔄 Opening tenant selection...',
    color: 'cyan'
  }).start();
  
  try {
    // Use execSync for this interactive command
    execSync('auth0 tenants use', { 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    const selectedTenant = await getCurrentTenant();
    spinner.succeed(`Now using tenant: ${formatTenantName(selectedTenant)}`);
    return { success: true, tenant: selectedTenant };
  } catch (error) {
    spinner.fail('Failed to switch tenant');
    
    if (error.stderr) {
      logger.error(error.stderr);
    } else {
      logger.error(error.message);
    }
    
    return { success: false, tenant: null };
  }
}

/**
 * Configures a screen in standard mode using Auth0 CLI
 * @param {string} screenName - The screen name to configure
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function configureStandardMode(screenName) {
  logger.section('Configuring Screen with Auth0 CLI');
  
  // Get current tenant and offer tenant selection
  const currentTenant = await getCurrentTenant();
  logger.info(`Currently selected tenant: ${formatTenantName(currentTenant)}`);
  
  // Store the tenant we'll use (either current or newly selected)
  let tenantToUse = currentTenant;
  
  // Check if we have multiple tenants and offer switching
  const allTenants = await getAllTenants();
  if (allTenants.length > 1) {
    logger.info('Would you like to switch tenants?');
    logger.info('Y - Yes, switch to a different tenant');
    logger.info('N - No, continue with current tenant (or press any other key)');
    
    const response = await getUserInput('', true);
    if (response === 'y') {
      const result = await switchTenant();
      if (result.success && result.tenant) {
        tenantToUse = result.tenant;
      }
    }
  }
  
  const spinner = ora({
    text: `🔧 Applying standard mode to '${screenName}' screen using tenant: ${formatTenantName(tenantToUse)}...`,
    color: 'cyan'
  }).start();
  
  try {
    // Configure screen in standard mode
    await execa('auth0', [
      'universal-login',
      'switch',
      '--tenant', tenantToUse,
      '--prompt', getPromptNameForScreen(screenName),
      '--screen', screenName,
      '--rendering-mode', 'standard'
    ]);
    
    spinner.succeed(`Successfully configured '${screenName}' screen in standard mode on tenant ${formatTenantName(tenantToUse)}`);
    return true;
  } catch (error) {
    spinner.fail(`Auth0 CLI command failed`);
    logger.error(`Error configuring screen '${screenName}' in standard mode`);
    
    if (error.stderr) {
      logger.info('Error details: ' + error.stderr);
    }
    
    // Show command for troubleshooting
    logger.info('Failed command:');
    logger.info(`auth0 universal-login switch --tenant "${tenantToUse}" --prompt "${getPromptNameForScreen(screenName)}" --screen "${screenName}" --rendering-mode standard`);
    
    return false;
  }
}

/**
 * Configures a screen in advanced mode using Auth0 CLI
 * @param {string} screenName - The screen name to configure
 * @param {object} config - The advanced mode configuration
 * @param {boolean} isHmr - If true, skip tenant selection and use current tenant (for HMR)
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function configureAdvancedMode(screenName, config, isHmr = false) {
  if (!isHmr) {
    logger.section('Configuring Screen with Auth0 CLI (Advanced Mode)');
  }
  
  // Get current tenant
  const currentTenant = await getCurrentTenant();
  let tenantToUse = currentTenant;
  
  if (!isHmr) {
    // Get all tenants to check if there's more than one
    const allTenants = await getAllTenants();
    logger.info(`Currently selected tenant: ${formatTenantName(currentTenant)}`);
    
    // Only offer to switch tenants if there are multiple tenants
    if (allTenants.length > 1) {
      logger.info('Would you like to switch tenants?');
      logger.info('Y - Yes, switch to a different tenant');
      logger.info('N - No, continue with current tenant (or press any other key)');
      
      const response = await getUserInput('', true);
      if (response === 'y') {
        const result = await switchTenant();
        if (result.success && result.tenant) {
          tenantToUse = result.tenant;
        }
      }
    }
  } else {
    logger.info(`Using current tenant: ${formatTenantName(currentTenant)} for hot reload`);
  }
  
  try {
    // Save configuration to file
    const settingsFilePath = await saveAdvancedModeConfig(screenName, config);
    
    logger.info(`🔧 ${isHmr ? 'Updating' : 'Applying advanced mode to'} '${screenName}' screen using tenant: ${formatTenantName(tenantToUse)}`);
    logger.info('Auth0 CLI will now configure the screen. If your session has expired, you may be prompted to log in.');
    
    try {
      // Use execSync for interactive CLI command
      execSync(`auth0 ul customize --tenant "${tenantToUse}" --rendering-mode advanced --prompt "${getPromptNameForScreen(screenName)}" --screen "${screenName}" --settings-file "${settingsFilePath}"`, {
        stdio: 'inherit',
        encoding: 'utf8'
      });
      
      logger.success(`Successfully ${isHmr ? 'updated' : 'configured'} '${screenName}' screen in advanced mode on tenant ${formatTenantName(tenantToUse)}`);
      return true;
    } catch (error) {
      logger.error(`Auth0 CLI command failed during configuration`);
      logger.error(`Error ${isHmr ? 'updating' : 'configuring'} screen '${screenName}' in advanced mode.`);
      logger.info('Check the output above for specific errors from the Auth0 CLI.');
      
      // Common troubleshooting tips
      logger.info('Common issues include:');
      logger.info(`  - Expired Auth0 session (run ${colors.cyan}auth0 login${colors.reset})`);
      logger.info('  - Incorrect tenant, screen name, or prompt name.');
      logger.info('  - Issues with the generated settings file.');

      if (!isHmr) {
        logger.info('Failed command:');
        logger.info(`  auth0 ul customize --tenant "${tenantToUse}" --rendering-mode advanced --prompt "${getPromptNameForScreen(screenName)}" --screen "${screenName}" --settings-file "${settingsFilePath}"`);
      }
      
      return false;
    }
  } catch (error) {
    logger.error(`Failed to configure advanced mode: ${error.message}`);
    return false;
  }
}