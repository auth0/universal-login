export interface FormOptions {
  state: string;
  useBrowserCapabilities?: boolean;
  route?: string;
}

export interface PostPayloadOptions {
  state: string;
  [key: string]: string | number | boolean | null | undefined;
}
