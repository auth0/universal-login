import { getScreenFolders, uploadAdvancedConfig } from './utils.js';
import { startServers } from './server.js';

// Main function for advanced mode
const runAdvancedMode = async (screenName) => {
  try {
    if (!screenName) {
      throw new Error('Screen name required. Usage: npm run screen:advanced <screen-name>');
    }

    console.log(`🚀 Starting in advanced mode for ${screenName}`);
    const screens = getScreenFolders();
    
    if (!screens.includes(screenName)) {
      throw new Error(`Screen "${screenName}" not found in src/screens directory`);
    }

    // Upload advanced configuration (includes setting rendering_mode to "advanced")
    await uploadAdvancedConfig(screenName);
    
    await startServers('advanced', screenName);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Start advanced mode
const screenName = process.argv[2]?.toLowerCase();
runAdvancedMode(screenName).catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
}); 