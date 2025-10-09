import '@testing-library/jest-dom';

// Cleanup after each test to prevent memory leaks and state pollution
// This is a React testing best practice
afterEach(() => {
  jest.clearAllMocks();
});