export interface FormOptions {
  state: string;
  telemetry: Array<string>;
  useBrowserCapabilities?: boolean;
  route?: string;
  [key: string]: string | number | boolean | null | undefined | Array<string>;
}

export interface PostPayloadOptions {
  state: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface TelemetryOptions {
  screenName: string;
  methodName: string;
  sdkName: string;
  sdkVersion: string;
}
