import { ZodObject } from 'zod';

export interface FormOptions {
  state: string;
  zodSchema: ZodObject<any>
}