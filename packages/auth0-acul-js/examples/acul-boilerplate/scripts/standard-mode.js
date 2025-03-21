import { validateScreenName } from './utils/screen-validator.js';
import { startServers } from './server.js';
import { uploadScreenConfig } from './utils/auth0TokenFetch.js';
import { logger } from './utils/logger.js';
import { handleFatalError } from './utils/error-handler.js';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

/**
 * Create settings file for standard mode
 * @param {string} screenName - Name of the screen to configure
 * @returns {Object} - Settings object and path
 */
async function createStandardSettings(screenName) {
  logger.section('Creating Standard Mode Payload');
  
  const spinner = ora({
    text: '📝 Creating payload file...',
    color: 'cyan'
  }).start();

  try {
    // Create payload directory if it doesn't exist
    const payloadDir = path.join(process.cwd(), 'payload');
    if (!fs.existsSync(payloadDir)) {
      fs.mkdirSync(payloadDir);
    }

    // Standard mode is simple - just set rendering_mode to standard
    const settings = {
      rendering_mode: "standard"
    };
    
    // Write settings to file with format screenName.json
    const payloadPath = path.join(payloadDir, `${screenName}.json`);
    fs.writeFileSync(payloadPath, JSON.stringify(settings, null, 2));
    
    spinner.succeed('Standard mode payload created');
    
    return { screenName, settingsPath: payloadPath, settings };
  } catch (error) {
    spinner.fail(`Failed to create payload: ${error.message}`);
    throw new Error(`Failed to create payload: ${error.message}`);
  }
}

/**
 * Main function for standard mode
 * @param {string} screenName - The screen name to run
 */
const runStandardMode = async (screenName) => {
  logger.startupBanner('standard', screenName || 'unknown');
  
  try {
    // Validate screen name
    validateScreenName(screenName, 'standard');
    
    // Create settings file for standard mode
    const { settings } = await createStandardSettings(screenName);
    
    // Upload configuration using token uploader
    await uploadScreenConfig(screenName, settings);
    
    // Start servers
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