import type { ZodObject } from 'zod';

export interface FormOptions {
  state: string;
  zodSchema: ZodObject<any>;
  useBrowserCapabilities?: boolean;
  route?: string;
}
