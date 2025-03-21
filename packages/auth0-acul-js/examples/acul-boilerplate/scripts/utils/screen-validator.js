import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

/**
 * Gets a list of available screen folders from the src/screens directory
 * @returns {string[]} - Array of screen names in lowercase
 */
export const getScreenFolders = () => {
  try {
    return fs.readdirSync(path.join(process.cwd(), 'src', 'screens'), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name.toLowerCase());
  } catch (error) {
    logger.error('Error reading screens folder', error);
    return [];
  }
};

/**
 * Validates that a screen name exists and is valid
 * @param {string} screenName - The name of the screen to validate
 * @param {string} mode - The mode (standard or advanced) being used
 * @throws {Error} - If screen name is invalid or not found
 * @returns {boolean} - Returns true if valid
 */
export const validateScreenName = (screenName, mode) => {
  if (!screenName) {
    throw new Error(`Screen name required. Usage: npm run screen:${mode} <screen-name>`);
  }

  const screens = getScreenFolders();
  
  if (!screens.includes(screenName)) {
    throw new Error(`Screen "${screenName}" not found in src/screens directory. Available screens: ${screens.join(', ')}`);
  }
  
  logger.info(`Starting in ${mode} mode for screen: ${screenName}`);
  return true;
}; 