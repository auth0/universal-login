/**
 * Global type declarations for telemetry override
 * Allows React SDK to override Core JS SDK telemetry
 */
declare global {
  var __SDK_NAME__: string | undefined;
  var __SDK_VERSION__: string | undefined;
}

export {};
