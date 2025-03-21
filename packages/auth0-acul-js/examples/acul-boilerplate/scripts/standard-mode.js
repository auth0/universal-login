import { getScreenFolders, uploadScreenConfig } from './utils.js';
import { startServers } from './server.js';

// Main function for standard mode
const runStandardMode = async (screenName) => {
  try {
    if (!screenName) {
      throw new Error('Screen name required. Usage: npm run screen:standard <screen-name>');
    }

    console.log(`🚀 Starting in standard mode for ${screenName}`);
    const screens = getScreenFolders();
    
    if (!screens.includes(screenName)) {
      throw new Error(`Screen "${screenName}" not found in src/screens directory`);
    }

    await uploadScreenConfig(screenName, { rendering_mode: "standard" });
    await startServers('standard', screenName);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Start standard mode
const screenName = process.argv[2]?.toLowerCase();
runStandardMode(screenName).catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
}); 