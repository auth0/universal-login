/**
 * Telemetry initialization for Auth0 ACUL React SDK
 *
 * Sets global variables to identify the React SDK wrapper.
 * The Core JS SDK's FormHandler reads these at runtime.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(globalThis as any).__SDK_NAME__ = '@auth0/auth0-acul-react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(globalThis as any).__SDK_VERSION__ = '0.1.0';
