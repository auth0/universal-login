#!/usr/bin/env node

/**
 * Generate documentation for all SDKs
 * This script calls the generate-mintlify-docs.js scripts in both
 * the JS SDK and React SDK packages
 *
 * Usage: node scripts/generate-all-docs.js
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const scripts = [
  {
    name: 'JS SDK',
    path: path.resolve(projectRoot, 'packages/auth0-acul-js/scripts/generate-mintlify-docs.js'),
  },
  {
    name: 'React SDK',
    path: path.resolve(projectRoot, 'packages/auth0-acul-react/scripts/generate-mintlify-docs.js'),
  },
];

async function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function generateAllDocs() {
  console.log('🚀 Generating documentation for all SDKs...\n');

  for (const script of scripts) {
    console.log(`\n📦 Generating ${script.name} documentation...`);
    console.log('='.repeat(50));
    try {
      await runScript(script.path);
      console.log(`\n✅ ${script.name} documentation generated successfully!\n`);
    } catch (error) {
      console.error(`\n❌ Error generating ${script.name} documentation:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n'.repeat(2));
  console.log('═'.repeat(50));
  console.log('✨ All documentation generated successfully!');
  console.log('═'.repeat(50));
  console.log('\nGenerated documentation locations:');
  console.log('  📁 JS SDK: /docs/customize/login-pages/advanced-customizations/reference/js-sdk/');
  console.log('  📁 React SDK: /docs/customize/login-pages/advanced-customizations/reference/react-sdk/');
  console.log('\nNavigation files:');
  console.log('  📄 JS SDK: /docs/customize/login-pages/advanced-customizations/reference/js-sdk/navigation.json');
  console.log('  📄 React SDK: /docs/customize/login-pages/advanced-customizations/reference/react-sdk/navigation.json');
}

generateAllDocs().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
