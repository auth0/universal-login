import { validateScreenName } from './utils/screenManager.js';
import { uploadScreenConfig } from './utils/auth0Api.js';
import { startServers } from './server.js';

// Main function for standard mode
const runStandardMode = async (screenName) => {
  try {
    validateScreenName(screenName, 'standard');
    await uploadScreenConfig(screenName, { rendering_mode: "standard" });
    await startServers('standard', screenName);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Start standard mode
const screenName = process.argv[2]?.toLowerCase();
runStandardMode(screenName); 