// Core imports
import { validateScreenName } from './utils/screen-validator.js';
import { logger } from './utils/logger.js';
import { handleFatalError } from './utils/error-handler.js';
import { 
  checkAuth0CliInstalled, 
  checkAuth0CliLoggedIn, 
  configureStandardMode 
} from './utils/auth0-cli.js';
import { startStandardEnv } from './dev-environment.js';

/**
 * Main function for standard mode
 * @param {string} screenName - The screen name to run
 */
const runStandardMode = async (screenName) => {
  logger.startupBanner('standard', screenName || 'unknown');
  
  try {
    validateScreenName(screenName, 'standard');
    const isCliInstalled = await checkAuth0CliInstalled();
    if (!isCliInstalled) throw new Error('Auth0 CLI is required but not installed');
    const isLoggedIn = await checkAuth0CliLoggedIn();
    if (!isLoggedIn) throw new Error('Please login to Auth0 CLI using: auth0 login');
    const configSuccess = await configureStandardMode(screenName);
    if (!configSuccess) throw new Error(`Failed to configure screen '${screenName}' with Auth0 CLI`);
    logger.success(`Screen '${screenName}' configured in standard mode`);

    await startStandardEnv(screenName);

  } catch (error) {
    if (!(error?.isCanceled || error?.exitCode === null)) {
      handleFatalError(error, 'Error running standard mode');
    }
    process.exit(0);
  }
};

const screenName = process.argv[2]?.toLowerCase();
runStandardMode(screenName); 