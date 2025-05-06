import path from 'path';
import fs from 'fs';

const initCwd = process.env.INIT_CWD;

// Safety check
if (!initCwd) {
  console.error('\n🚫 INIT_CWD not available. Cannot verify install location.\n');
  process.exit(1);
}

// Path to the user's starting package.json
const rootPackageJsonPath = path.resolve(initCwd, 'package.json');

// Read and parse package.json
let rootPackageName;
try {
  const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf-8'));
  rootPackageName = rootPackageJson.name;
} catch (e) {
  console.error('\n🚫 Failed to read package.json at INIT_CWD. Cannot verify install location.\n');
  process.exit(1);
}

// Check if correct root project
if (rootPackageName !== 'universal-login') {
  console.error('===============================================================');
  console.error('\n🚫 Do not run `npm install` inside this package.');
  console.error('👉 Please run `npm install` from the root of the mono-repo.\n');
  console.error('===============================================================');
  process.exit(1);
}

// Otherwise silently succeed
process.exit(0);
