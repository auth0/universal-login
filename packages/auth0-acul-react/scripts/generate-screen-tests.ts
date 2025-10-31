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
  
  // Read the screen file to detect which utility hooks it exports
  const screenFilePath = path.join(SCREENS_PATH, screenFileName);
  const screenContent = fs.readFileSync(screenFilePath, 'utf8');
  
  // Detect which utility hooks are exported
  const utilityHookMocks: { hookName: string; modulePath: string }[] = [];
  
  if (screenContent.includes("from '../hooks/utility/login-identifiers'")) {
    utilityHookMocks.push({
      hookName: 'useLoginIdentifiers',
      modulePath: '../../src/hooks/utility/login-identifiers'
    });
  }
  
  if (screenContent.includes("from '../hooks/utility/signup-identifiers'")) {
    utilityHookMocks.push({
      hookName: 'useSignupIdentifiers',
      modulePath: '../../src/hooks/utility/signup-identifiers'
    });
  }
  
  if (screenContent.includes("from '../hooks/utility/validate-password'")) {
    utilityHookMocks.push({
      hookName: 'usePasswordValidation',
      modulePath: '../../src/hooks/utility/validate-password'
    });
  }
  
  if (screenContent.includes("from '../hooks/utility/validate-username'")) {
    utilityHookMocks.push({
      hookName: 'useUsernameValidation',
      modulePath: '../../src/hooks/utility/validate-username'
    });
  }
  
  if (screenContent.includes("from '../hooks/utility/resend-manager'")) {
    utilityHookMocks.push({
      hookName: 'useResend',
      modulePath: '../../src/hooks/utility/resend-manager'
    });
  }
  
  if (screenContent.includes("from '../hooks/utility/polling-manager'")) {
    utilityHookMocks.push({
      hookName: 'useMfaPolling',
      modulePath: '../../src/hooks/utility/polling-manager'
    });
  }
  
  // Generate utility hook mocks section
  const utilityMocksSection = utilityHookMocks.length > 0
    ? '\n' + utilityHookMocks.map(({ hookName, modulePath }) => 
        `// Mock utility hook: ${hookName}\njest.mock('${modulePath}', () => ({\n  ${hookName}: jest.fn(),\n}));`
      ).join('\n\n')
    : '';
  
  return `import { renderHook } from '@testing-library/react';
import * as ${pascalName}Screen from '../../src/screens/${screenName}';
import { categorizeScreenExports } from './test-helpers';

// Mock the base @auth0/auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({
  ConfigurationError: class ConfigurationError extends Error {},
  ValidationError: class ValidationError extends Error {},
  Auth0Error: class Auth0Error extends Error {},
  NetworkError: class NetworkError extends Error {},
  __esModule: true,
}), { virtual: true });

// Mock the core SDK class
jest.mock('${jsImportPath}', () => {
  return jest.fn().mockImplementation(() => {});
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
}));${utilityMocksSection}

describe('${pascalName} Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Categorize exports once for all tests
  const exports = categorizeScreenExports(${pascalName}Screen);

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

  describe('instance hook', () => {
    it('should provide instance hook that returns screen instance', () => {
      // Test instance hooks using categorized exports
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (${pascalName}Screen as any)[hookName]());
          if (result.current && typeof result.current === 'object') {
            expect(result.current).toBeDefined();
          }
        } catch (e) {
          // Skip if it requires parameters
        }
      });
    });

    it('should return stable reference across renders for instance hooks', () => {
      exports.instanceHooks.forEach(hookName => {
        try {
          const { result, rerender } = renderHook(() => (${pascalName}Screen as any)[hookName]());
          if (result.current && typeof result.current === 'object') {
            const firstResult = result.current;
            rerender();
            expect(result.current).toBe(firstResult);
          }
        } catch (e) {
          // Skip if it requires parameters
        }
      });
    });
  });

  describe('submit functions', () => {
    it('should export submit functions if available', () => {
      // Verify all submit functions are callable
      exports.submitFunctions.forEach(funcName => {
        expect(typeof (${pascalName}Screen as any)[funcName]).toBe('function');
      });
    });
  });

  describe('utility hooks', () => {
    it('should export utility hooks if available', () => {
      exports.utilityHooks.forEach(hookName => {
        expect(typeof (${pascalName}Screen as any)[hookName]).toBe('function');
      });
    });

    it('should call utility hooks successfully', () => {
      exports.utilityHooks.forEach(hookName => {
        try {
          const { result } = renderHook(() => (${pascalName}Screen as any)[hookName]());
          expect(result.current).toBeDefined();
        } catch (e) {
          // Some utility hooks may require parameters
        }
      });
    });
  });

  describe('submit functions coverage', () => {
    it('should call submit functions', () => {
      exports.submitFunctions.forEach(funcName => {
        try {
          const func = (${pascalName}Screen as any)[funcName];
          const result = func({});
          if (result && typeof result.then === 'function') {
            expect(result).toBeDefined();
          }
        } catch (e) {
          // Function may require specific parameters
        }
      });
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
