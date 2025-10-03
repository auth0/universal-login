import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENS_PATH = path.resolve(__dirname, '../src/screens');
const TESTS_PATH = path.resolve(__dirname, '../tests/screens');

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function generateTestFile(screenFileName: string): string {
  const screenName = screenFileName.replace('.tsx', '');
  const pascalName = toPascalCase(screenName);
  const jsImportPath = `@auth0/auth0-acul-js/${screenName}`;
  
  return `import { renderHook } from '@testing-library/react';
import * as ${pascalName}Screen from '../../src/screens/${screenName}';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  SDKUsageError: class SDKUsageError extends Error {},
  UserInputError: class UserInputError extends Error {},
  Auth0ServerError: class Auth0ServerError extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class
jest.mock('${jsImportPath}', () => {
  return jest.fn().mockImplementation(() => ({
    // Mock methods will be defined per test
  }));
}, { virtual: true });

// Mock the instance store
jest.mock('../../src/state/instance-store', () => ({
  registerScreen: jest.fn((Screen) => new Screen()),
}));

// Mock error manager and hooks
jest.mock('../../src/hooks', () => ({
  errorManager: {
    withError: jest.fn((promise) => promise),
  },
  ContextHooks: jest.fn().mockImplementation(() => ({
    useUser: jest.fn(),
    useTenant: jest.fn(),
    useBranding: jest.fn(),
    useClient: jest.fn(),
    useOrganization: jest.fn(),
    usePrompt: jest.fn(),
    useScreen: jest.fn(),
    useTransaction: jest.fn(),
    useUntrustedData: jest.fn(),
  })),
  useCurrentScreen: jest.fn(),
  useErrors: jest.fn(),
  useAuth0Themes: jest.fn(),
}));

describe('${pascalName} Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('exports', () => {
    it('should export all context hooks', () => {
      expect(${pascalName}Screen.useUser).toBeDefined();
      expect(${pascalName}Screen.useTenant).toBeDefined();
      expect(${pascalName}Screen.useBranding).toBeDefined();
      expect(${pascalName}Screen.useClient).toBeDefined();
      expect(${pascalName}Screen.useOrganization).toBeDefined();
      expect(${pascalName}Screen.usePrompt).toBeDefined();
      expect(${pascalName}Screen.useScreen).toBeDefined();
      expect(${pascalName}Screen.useTransaction).toBeDefined();
      expect(${pascalName}Screen.useUntrustedData).toBeDefined();
    });

    it('should export common hooks', () => {
      expect(${pascalName}Screen.useCurrentScreen).toBeDefined();
      expect(${pascalName}Screen.useErrors).toBeDefined();
      expect(${pascalName}Screen.useAuth0Themes).toBeDefined();
    });
  });
});
`;
}

// Ensure tests directory exists
if (!fs.existsSync(TESTS_PATH)) {
  fs.mkdirSync(TESTS_PATH, { recursive: true });
}

// Get all screen files
const screenFiles = fs.readdirSync(SCREENS_PATH)
  .filter(f => f.endsWith('.tsx'))
  .sort();

console.log(`Found ${screenFiles.length} screen files`);

// Generate test files
let created = 0;
let skipped = 0;

for (const screenFile of screenFiles) {
  const testFileName = screenFile.replace('.tsx', '.test.tsx');
  const testFilePath = path.join(TESTS_PATH, testFileName);
  
  // Skip if test already exists
  if (fs.existsSync(testFilePath)) {
    console.log(`Skipped: ${testFileName} (already exists)`);
    skipped++;
    continue;
  }
  
  const testContent = generateTestFile(screenFile);
  fs.writeFileSync(testFilePath, testContent, 'utf8');
  console.log(`Created: ${testFileName}`);
  created++;
}

console.log(`\nSummary:`);
console.log(`  Created: ${created}`);
console.log(`  Skipped: ${skipped}`);
console.log(`  Total: ${screenFiles.length}`);
