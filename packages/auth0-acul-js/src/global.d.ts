declare const __SDK_NAME__: string;
declare const __SDK_VERSION__: string;

// Allow runtime override via globalThis (for wrapper SDKs like React, Vue, Angular)
declare global {
  // eslint-disable-next-line no-var
  var __SDK_NAME__: string | undefined;
  // eslint-disable-next-line no-var
  var __SDK_VERSION__: string | undefined;
}

export {};
