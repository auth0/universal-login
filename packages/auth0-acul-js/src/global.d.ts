// These are used when the SDK is running standalone
declare const __SDK_NAME__: string;
declare const __SDK_VERSION__: string;

// Allow runtime override via globalThis (for wrapper SDKs like React)
// Wrapper SDKs can set these to override the build-time constants
declare global {
  // Using 'var' is required for global augmentation in TypeScript
  var __SDK_NAME__: string | undefined;
  var __SDK_VERSION__: string | undefined;
}

export {};
