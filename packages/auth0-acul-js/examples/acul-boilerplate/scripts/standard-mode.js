// Core imports
import { validateScreenName } from './utils/screen-validator.js';
import { startServers } from './server.js';
import { logger } from './utils/logger.js';
import { handleFatalError } from './utils/error-handler.js';
import { 
  checkAuth0CliInstalled, 
  checkAuth0CliLoggedIn, 
  configureStandardMode 
} from './utils/auth0-cli.js';

/**
 * Main function for standard mode
 * @param {string} screenName - The screen name to run
 */
const runStandardMode = async (screenName) => {
  logger.startupBanner('standard', screenName || 'unknown');
  
  try {
    // Validate screen name
    validateScreenName(screenName, 'standard');
    
    // Check if Auth0 CLI is installed
    const isCliInstalled = await checkAuth0CliInstalled();
    if (!isCliInstalled) {
      throw new Error('Auth0 CLI is required but not installed');
    }
    
    // Check if user is logged in to Auth0 CLI
    const isLoggedIn = await checkAuth0CliLoggedIn();
    if (!isLoggedIn) {
      throw new Error('Please login to Auth0 CLI using: auth0 login');
    }
    
    // Configure the screen in standard mode using Auth0 CLI
    const configSuccess = await configureStandardMode(screenName);
    if (!configSuccess) {
      throw new Error(`Failed to configure screen '${screenName}' with Auth0 CLI`);
    }
    
    logger.success(`Screen '${screenName}' configured in standard mode`);
    
    // Start development servers
    await startServers('standard', screenName);
  } catch (error) {
    // Use our specialized error handler to provide helpful instructions
    handleFatalError(error, 'Error running standard mode');
  }
};

// Get screen name from command line arguments
const screenName = process.argv[2]?.toLowerCase();

// Start the process
runStandardMode(screenName); 