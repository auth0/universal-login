import { execSync } from 'child_process';
import { validateScreenName } from './utils/screenManager.js';
import { uploadAdvancedConfig } from './utils/assetUploader.js';
import { startServers } from './server.js';

// Main function for advanced mode
const runAdvancedMode = async (screenName) => {
  try {
    validateScreenName(screenName, 'advanced');

    // Perform initial build
    console.log('🔨 Performing initial build...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Initial build completed');

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
runAdvancedMode(screenName); 