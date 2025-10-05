// Build-time constants injected by Rollup
// These are used when the SDK is running standalone
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __SDK_NAME__: string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare const __SDK_VERSION__: string;

// Allow runtime override via globalThis (for wrapper SDKs like React, Vue, Angular)
// Wrapper SDKs can set these to override the build-time constants
declare global {
  // Using 'var' is required for global augmentation in TypeScript
  /* eslint-disable no-var, @typescript-eslint/no-unused-vars */
  var __SDK_NAME__: string | undefined;
  var __SDK_VERSION__: string | undefined;
  /* eslint-enable no-var, @typescript-eslint/no-unused-vars */
}

export {};
