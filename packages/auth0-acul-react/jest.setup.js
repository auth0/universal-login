// React testing requires @testing-library/jest-dom for enhanced matchers
// Core SDK doesn't need this, but React packages do for proper DOM testing
// Jest setup files must use require() even with useESM: true and ESM preset
require('@testing-library/jest-dom');


globalThis.__SDK_NAME__ = global.__SDK_NAME__ || '@auth0/auth0-acul-react';
globalThis.__SDK_VERSION__ = global.__SDK_VERSION__ || '0.1.0';

// Cleanup after each test to prevent memory leaks and state pollution
// This is a React testing best practice
afterEach(() => {
  jest.clearAllMocks();
});