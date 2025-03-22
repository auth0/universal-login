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
    
    // If we're waiting for a single key press, we'll need to 
    // manually display what key was pressed
    if (isSingleKey) {
      process.stdout.write('\n'); // Add newline after key press
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
    
    // Wait for user input before proceeding
    await getUserInput('Press Enter to continue with Auth0 login...', false);
    
    // Run auth0 login command
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
      loginSpinner.succeed('✅ Successfully logged in to Auth0');
      return true;
    } catch (error) {
      loginSpinner.fail('❌ Auth0 login failed');
      
      // Display a cleaner error without duplication
      if (error.stderr) {
        logger.error(error.stderr);
      } else {
        logger.error(error.message);
      }
      
      // Provide helpful guidance
      logger.info('');
      logger.info('You can try again by:');
      logger.info('1. Then running your auth0 login command again');
      logger.info('');
      
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
      spinner.fail('❌ Not logged in to Auth0 CLI');
      logger.info('Please log in using: auth0 login');
      process.exit(1);
    }
    spinner.succeed('✅ Auth0 CLI session is active');
    return true;
  } catch (error) {
    spinner.fail('❌ Not logged in to Auth0 CLI');
    logger.info('Please log in using: auth0 login');
    return false;
  }
}

/**
 * Gets the currently selected tenant name
 * @returns {Promise<string>} - Tenant name or "Unknown" if not found
 */
async function getCurrentTenant() {
  try {
    // Use 'tenant current' instead of 'tenants use' to avoid interactive prompt
    const { stdout } = await execa('auth0', ['tenant', 'current']);
    return stdout.trim();
  } catch (error) {
    // Try alternative approach if 'tenant current' fails
    try {
      // Use 'tenants list' and look for the active tenant (marked with →)
      const { stdout } = await execa('auth0', ['tenants', 'list']);
      const lines = stdout.split('\n');
      // Find the line with the arrow character (→) indicating current tenant
      const activeTenantLine = lines.find(line => line.includes('→'));
      if (activeTenantLine) {
        // Extract tenant name from the line
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
  logger.info(''); 
  
  const spinner = ora({
    text: '🔄 Opening tenant selection...',
    color: 'cyan'
  }).start();
  
  try {
    // Use execSync for this command since it's interactive
    execSync('auth0 tenants use', { 
      stdio: 'inherit',
      encoding: 'utf8'
    });
    
    const selectedTenant = await getCurrentTenant();
    spinner.succeed(`✅ Now using tenant: ${formatTenantName(selectedTenant)}`);
    return { success: true, tenant: selectedTenant };
  } catch (error) {
    spinner.fail('❌ Failed to switch tenant');
    
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
  
  // Show current tenant and offer to switch
  const currentTenant = await getCurrentTenant();
  logger.warn('Configuring screen in the currently selected Auth0 tenant');
  logger.info(`Currently selected tenant: ${formatTenantName(currentTenant)}`);
  
  // Store the tenant we'll use (either current or newly selected)
  let tenantToUse = currentTenant;
  
  // Offer to switch tenants
  logger.info('');
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
  
  const spinner = ora({
    text: `🔧 Applying standard mode to '${screenName}' screen using tenant: ${formatTenantName(tenantToUse)}...`,
    color: 'cyan'
  }).start();
  
  try {
    // Run Auth0 CLI command to configure screen in standard mode with tenant specified
    const { stdout, stderr } = await execa('auth0', [
      'universal-login',
      'switch',
      '--tenant', tenantToUse,
      '--prompt', screenName, // The prompt name (e.g., login-id)
      '--screen', screenName, // The screen name (should match prompt)
      '--rendering-mode', 'standard'
    ]);
    
    // Log verbose output if available for debugging purposes
    if (stdout) {
      logger.data('Command output', stdout);
    }
    
    spinner.succeed(`✅ Successfully configured '${screenName}' screen in standard mode on tenant ${formatTenantName(tenantToUse)}`);
    return true;
  } catch (error) {
    spinner.fail(`❌ Auth0 CLI command failed`);
    
    // Enhanced error reporting with structured information
    logger.error(`Error configuring screen '${screenName}' in standard mode`);
    
    // Provide more detailed error information for troubleshooting
    if (error.stderr) {
      logger.data('Command error details', error.stderr);
    } else if (error.message) {
      logger.data('Error details', error.message);
    }
    
    // Include the exact command that failed for easier troubleshooting
    logger.info('Failed command:');
    logger.info(`auth0 universal-login switch --tenant "${tenantToUse}" --prompt "${screenName}" --screen "${screenName}" --rendering-mode standard`);
    
    // Add specific guidance based on common error patterns
    if (error.stderr && error.stderr.includes('Not logged in')) {
      logger.info('');
      logger.info('Your Auth0 session appears to have expired. You can:');
      logger.info('1. Run the command again to trigger a new login');
      logger.info('2. Manually run: auth0 login');
      logger.info('');
    } else if (error.stderr && error.stderr.includes('not found')) {
      logger.info('');
      logger.info('The screen or prompt may not exist in your tenant. You can:');
      logger.info('1. Check that the screen name is correct');
      logger.info('2. Verify that you have the correct tenant selected');
      logger.info('');
    }
    
    return false;
  }
}

/**
 * Configures a screen in advanced mode using Auth0 CLI
 * @param {string} screenName - The screen name to configure
 * @param {object} config - The advanced mode configuration with head_tags and context_configuration
 * @param {boolean} isHmr - If true, skip tenant selection and use current tenant (for HMR)
 * @returns {Promise<boolean>} - True if successful, false otherwise
 */
export async function configureAdvancedMode(screenName, config, isHmr = false) {
  if (!isHmr) {
    logger.section('Configuring Screen with Auth0 CLI (Advanced Mode)');
  }
  
  // Get current tenant
  const currentTenant = await getCurrentTenant();
  
  // Store the tenant we'll use (either current or newly selected)
  let tenantToUse = currentTenant;
  
  // If not in HMR mode, show current tenant and offer to switch
  if (!isHmr) {
    logger.warn('Configuring screen in the currently selected Auth0 tenant');
    logger.info(`Currently selected tenant: ${formatTenantName(currentTenant)}`);
    
    // Offer to switch tenants
    logger.info('');
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
  } else {
    // In HMR mode, just use current tenant and be less verbose
    logger.info(`Using current tenant: ${formatTenantName(currentTenant)} for hot reload`);
  }
  
  try {
    // Save the configuration to a settings file
    const settingsFilePath = await saveAdvancedModeConfig(screenName, config);
    
    // Now run the Auth0 CLI command to apply the settings
    const cliSpinner = ora({
      text: `🔧 ${isHmr ? 'Updating' : 'Applying advanced mode to'} '${screenName}' screen using tenant: ${formatTenantName(tenantToUse)}...`,
      color: 'cyan'
    }).start();
    
    try {
      // Run Auth0 CLI command to configure screen in advanced mode with tenant specified
      const { stdout, stderr } = await execa('auth0', [
        'ul',
        'customize',
        '--tenant', tenantToUse,
        '--rendering-mode', 'advanced',
        '--prompt', screenName,
        '--screen', screenName,
        '--settings-file', settingsFilePath
      ]);
      
      // Log verbose output if available for debugging purposes
      if (stdout && !isHmr) {
        logger.data('Command output', stdout);
      }
      
      cliSpinner.succeed(`✅ Successfully ${isHmr ? 'updated' : 'configured'} '${screenName}' screen in advanced mode on tenant ${formatTenantName(tenantToUse)}`);
      return true;
    } catch (error) {
      cliSpinner.fail(`❌ Auth0 CLI command failed`);
      
      // Enhanced error reporting with structured information
      logger.error(`Error ${isHmr ? 'updating' : 'configuring'} screen '${screenName}' in advanced mode`);
      
      // Provide more detailed error information for troubleshooting
      if (error.stderr) {
        logger.data('Command error details', error.stderr);
      } else if (error.message) {
        logger.data('Error details', error.message);
      }
      
      // In HMR mode, keep error messages concise
      if (!isHmr) {
        // Include the exact command that failed for easier troubleshooting
        logger.info('Failed command:');
        logger.info(`auth0 ul customize --tenant "${tenantToUse}" --rendering-mode advanced --prompt "${screenName}" --screen "${screenName}" --settings-file "${settingsFilePath}"`);
        
        // Add helpful guidance based on the error
        if (error.stderr && error.stderr.includes('Not logged in')) {
          logger.info('');
          logger.info('Your Auth0 session appears to have expired. You can:');
          logger.info('1. Run the command again to trigger a new login');
          logger.info('2. Manually run: auth0 login');
          logger.info('');
        } else if (error.stderr && error.stderr.includes('not found')) {
          logger.info('');
          logger.info('The screen or prompt may not exist in your tenant. You can:');
          logger.info('1. Check that the screen name is correct');
          logger.info('2. Verify that you have the correct tenant selected');
          logger.info('');
        }
      }
      
      return false;
    }
  } catch (error) {
    logger.error(`❌ Failed to configure advanced mode: ${error.message}`);
    return false;
  }
} 