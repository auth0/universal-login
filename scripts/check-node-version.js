import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Get required version
const required = pkg.engines?.node;
const current = process.version; // like 'v22.13.1'

if (!required) {
  console.warn('⚠️ No Node version specified in package.json "engines.node" field.');
  process.exit(0);
}

// Parse current Node version
const [currentMajor, currentMinor] = current.replace(/^v/, '').split('.').map(Number);

// Clean up required version (remove ^, >=, etc.)
const cleanRequired = required.replace(/^[^\d]*/, ''); // Remove non-digit prefix
const [requiredMajor, requiredMinor] = cleanRequired.split('.').map(Number);

// Now compare
if (currentMajor < requiredMajor || (currentMajor === requiredMajor && currentMinor < requiredMinor)) {
  console.error('===============================================================');
  console.error(`\n❌ Unsupported Node.js version: ${current}. Required: ${required}\n`);
  console.error('===============================================================');
  process.exit(1);
} else {
  console.log(`✅ Node.js version ${current} satisfies required: ${required}`);
}
