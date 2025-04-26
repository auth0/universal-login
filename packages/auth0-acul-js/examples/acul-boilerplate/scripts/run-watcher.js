import { watchAndUpload } from './utils/watcher.js';
import { logger } from './utils/logger.js';

const screen = process.argv[2];
if (!screen) {
  logger.error('Watcher script needs screen name argument.');
  process.exit(1);
}

let cleanupWatcher = () => {}; // Placeholder for cleanup
let isShuttingDown = false; // Flag to prevent multiple shutdowns

// Start watching and store the cleanup function
watchAndUpload(screen)
  .then(cleanup => {
    cleanupWatcher = cleanup; // Store the actual cleanup function
  })
  .catch(err => {
    logger.error('Error initializing watcher:', err);
    process.exit(1);
  });

// Handle termination signals
const handleShutdown = (signal) => {
  if (isShuttingDown) return; // Prevent running cleanup multiple times
  isShuttingDown = true;
  try {
      cleanupWatcher(); // Call the stored cleanup function
      // Let the process exit naturally after cleanup
  } catch (cleanupError) {
      logger.error('Error during watcher cleanup:', cleanupError);
      // Exit with error code if cleanup fails
      process.exit(1); 
  }
  // Do not call process.exit(0) here
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));