import '@testing-library/jest-dom';

// Extend global types for SDK name and version
declare global {
  var __SDK_NAME__: string;
  var __SDK_VERSION__: string;
}

// Set SDK name and version
globalThis.__SDK_NAME__ = global.__SDK_NAME__ || '@auth0/auth0-acul-react';
globalThis.__SDK_VERSION__ = global.__SDK_VERSION__ || '0.1.0';

// Cleanup after each test to prevent memory leaks and state pollution
// This is a React testing best practice
afterEach(() => {
  jest.clearAllMocks();
});