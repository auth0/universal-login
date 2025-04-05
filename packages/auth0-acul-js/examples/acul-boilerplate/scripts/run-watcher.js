import { watchAndUpload } from './utils/watcher.js';
import { logger } from './utils/logger.js';

const screen = process.argv[2];
if (!screen) {
  logger.error('Watcher script needs screen name argument.');
  process.exit(1);
}
watchAndUpload(screen).catch(err => {
  logger.error('Error in watcher:', err);
  process.exit(1);
});