#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';

/**
 * Unified documentation builder
 * Usage: npm run docs:unified <package-name>
 * Examples:
 *   npm run docs:unified auth0-acul-js
 *   npm run docs:unified auth0-acul-react
 */

const args = process.argv.slice(2);
const packageName = args[0];

if (!packageName) {
  console.error('❌ Package name required!');
  console.log('Usage: npm run docs:unified <package-name>');
  console.log('Examples:');
  console.log('  npm run docs:unified auth0-acul-js');
  console.log('  npm run docs:unified auth0-acul-react');
  process.exit(1);
}

const workspaceName = `packages/${packageName}`;

try {
  // Build the package
  execSync(`npm run build --workspace=${workspaceName}`, { stdio: 'inherit' });

  // Generate docs
  execSync(`npm run docs --workspace=${workspaceName}`, { stdio: 'inherit' });

  // Unify docs
  execSync(`node ./scripts/unify-docs.js --package=${packageName}`, { stdio: 'inherit' });

} catch (error) {
  console.error(`❌ Error building docs for ${packageName}:`, error.message);
  process.exit(1);
}
