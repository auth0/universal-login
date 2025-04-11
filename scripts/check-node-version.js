const fs = require('fs');
const path = require('path');
const semver = require('semver');

const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const required = pkg.engines?.node;
const current = process.version;

if (!required) {
  console.warn('⚠️ No Node version specified in package.json "engines.node" field.');
  process.exit(0);
}

if (!semver.satisfies(current, required)) {
  console.error(`❌ Unsupported Node.js version: ${current}. Required: ${required}`);
  process.exit(1);
} else {
  console.log(`✅ Node.js version ${current} satisfies required: ${required}`);
}
