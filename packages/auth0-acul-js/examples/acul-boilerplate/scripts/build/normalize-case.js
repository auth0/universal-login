#!/usr/bin/env node

/**
 * This script ensures consistent directory casing across different environments.
 * It's needed because macOS filesystems are case-insensitive by default,
 * while Linux (CI) filesystems are case-sensitive.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current script
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');
const screensDir = path.resolve(rootDir, 'src/screens');

console.log('Normalizing directory case for screens...');

// Exit if screens directory doesn't exist
if (!fs.existsSync(screensDir)) {
  console.error(`Screens directory not found: ${screensDir}`);
  process.exit(1);
}

// Map of expected directory names (all lowercase)
const expectedDirectories = [
  'login',
  'login-id',
  'login-password'
];

// Get actual directory names
const actualDirectories = fs.readdirSync(screensDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('Current screen directories:', actualDirectories);

// Check for case mismatches and try to fix them
for (const expectedDir of expectedDirectories) {
  const foundDir = actualDirectories.find(
    dir => dir.toLowerCase() === expectedDir.toLowerCase()
  );
  
  if (!foundDir) {
    console.log(`WARNING: Directory '${expectedDir}' not found`);
    continue;
  }
  
  if (foundDir !== expectedDir) {
    console.log(`Case mismatch detected: '${foundDir}' should be '${expectedDir}'`);
    
    // Two-step rename for case-insensitive filesystems
    const tempName = `${foundDir}_temp_${Date.now()}`;
    const sourcePath = path.join(screensDir, foundDir);
    const tempPath = path.join(screensDir, tempName);
    const targetPath = path.join(screensDir, expectedDir);
    
    try {
      // Check if both the capitalized and lowercase versions appear to exist
      // (happens on case-insensitive filesystems like macOS)
      const bothExist = actualDirectories.includes(foundDir) && 
                       actualDirectories.includes(expectedDir);
                       
      if (bothExist) {
        console.log(`Both '${foundDir}' and '${expectedDir}' appear to exist on a case-insensitive filesystem. Skipping rename.`);
        continue;
      }
      
      console.log(`Renaming '${sourcePath}' to '${targetPath}' via temp name '${tempName}'`);
      fs.renameSync(sourcePath, tempPath);
      fs.renameSync(tempPath, targetPath);
      console.log(`Successfully renamed to '${expectedDir}'`);
    } catch (error) {
      console.error(`Error renaming directory: ${error.message}`);
    }
  }
}

console.log('Directory case normalization complete.'); 