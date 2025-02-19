export interface FormOptions {
  state: string;
  useBrowserCapabilities?: boolean;
  route?: string;
  analytics?: AnalyticsOptions;
  [key: string]: string | number | boolean | null | undefined | AnalyticsOptions;
}

export interface PostPayloadOptions {
  state: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface AnalyticsOptions {
  screenName?: string;
  methodName?: string;
}
