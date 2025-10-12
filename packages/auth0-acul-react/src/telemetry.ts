/**
 * Telemetry initialization for Auth0 ACUL React SDK
 *
 * Sets global telemetry values that the Core SDK will use at runtime.
 * This must run BEFORE any Core SDK screens are imported.
 *
 * Note: __SDK_NAME__ and __SDK_VERSION__ are replaced at build time by rollup
 */

// Set global telemetry values for Core SDK to pick up
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(globalThis as any).__ACUL_SDK_NAME__ = __SDK_NAME__;
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(globalThis as any).__ACUL_SDK_VERSION__ = __SDK_VERSION__;
