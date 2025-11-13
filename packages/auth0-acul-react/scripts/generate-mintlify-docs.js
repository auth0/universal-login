#!/usr/bin/env node

/**
 * Mintlify Documentation Generation Pipeline
 * 
 * Orchestrates the complete workflow to convert TypeDoc output to Mintlify-compatible MDX
 * with ParamField components.
 * 
 * Pipeline:
 * 1. convert-typedoc-to-mintlify.js - Converts TypeDoc markdown to Mintlify MDX
 * 2. consolidate-screens.js - Consolidates screen documentation
 * 3. consolidate-types.js - Consolidates class documentation
 * 4. consolidate-interfaces.js - Consolidates interface documentation
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Scripts to run in order
const scripts = [
  {
    name: 'convert-typedoc-to-mintlify.js',
    description: 'Converting TypeDoc markdown to Mintlify MDX format...'
  },
  {
    name: 'consolidate-screens.js',
    description: 'Consolidating screen documentation...'
  },
  {
    name: 'consolidate-types.js',
    description: 'Consolidating class documentation...'
  },
  {
    name: 'consolidate-interfaces.js',
    description: 'Consolidating interface documentation...'
  },
  {
    name: 'flatten-structure.js',
    description: 'Flattening directory structure...'
  },
  {
    name: 'fix-links-after-flatten.js',
    description: 'Fixing links after directory flattening...'
  },
  {
    name: 'generate-navigation.js',
    description: 'Generating navigation.json structure...'
  }
];

/**
 * Run a script and return a promise
 */
function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: process.cwd()
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Script exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Main pipeline
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  Mintlify Documentation Generation Pipeline                ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const startTime = Date.now();
  let completed = 0;

  for (const script of scripts) {
    console.log(`\n📍 Step ${completed + 1}/${scripts.length}: ${script.description}`);
    console.log('─'.repeat(60));

    try {
      const scriptPath = path.join(__dirname, 'utils', script.name);
      await runScript(scriptPath);
      completed++;
    } catch (error) {
      console.error(`\n❌ Error running ${script.name}:`);
      console.error(error.message);
      process.exit(1);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '═'.repeat(60));
  console.log('✅ Pipeline Complete!');
  console.log('═'.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`  • Scripts executed: ${completed}/${scripts.length}`);
  console.log(`  • Duration: ${duration}s`);
  console.log(`\n📁 Generated documentation located in:`);
  console.log(`  docs/customize/login-pages/advanced-customizations/reference/react-sdk/\n`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
