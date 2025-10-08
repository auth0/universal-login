/**
 * Telemetry initialization for Auth0 ACUL React SDK
 *
 * Sets global variables to identify the React SDK wrapper.
 * The Core JS SDK's FormHandler reads these at runtime.
 *
 * Note: __SDK_NAME__ and __SDK_VERSION__ are replaced at build time by rollup
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(globalThis as any).__SDK_NAME__ = __SDK_NAME__;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(globalThis as any).__SDK_VERSION__ = __SDK_VERSION__;
