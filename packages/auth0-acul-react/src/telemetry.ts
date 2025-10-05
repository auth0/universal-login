/**
 * Telemetry Initialization
 *
 * Sets up SDK telemetry override to ensure the React SDK properly identifies itself
 * when forms are submitted to Auth0, instead of showing the Core JS SDK identity.
 *
 * This must be executed before any Core JS SDK modules are imported.
 */

import pkg from '../package.json';

/**
 * Initialize React SDK telemetry override
 *
 * Sets global variables that the Core JS SDK will check at runtime
 * to determine which SDK name and version to report in telemetry.
 */
export function initializeTelemetry(): void {
  // Set SDK name for telemetry reporting
  // Core JS SDK will check for these globals and use them if present
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  (globalThis as any).__SDK_NAME__ = '@auth0/auth0-acul-react';

  // Set SDK version from package.json
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  (globalThis as any).__SDK_VERSION__ = pkg.version;
}

// Execute telemetry initialization immediately when this module is imported
// This ensures the globals are set before any Core JS SDK code runs
initializeTelemetry();
