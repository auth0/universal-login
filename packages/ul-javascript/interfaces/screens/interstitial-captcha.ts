import { z } from 'zod';
import type { BaseMembers } from '../models/base-context';

export interface ContinueWithCaptcha {
  captcha: string;
  [key: string]: string | number;
}

export interface InterstitialCaptchaMembers extends BaseMembers {
  continueWithCaptcha: (data: ContinueWithCaptcha) => void;
}

export const zodSchema = z
  .object({
    state: z.string().optional(),
    password: z.string(),
  })
  .catchall(z.union([z.string(), z.number(), z.boolean(), z.null()]));

export type IFormSchema = z.infer<typeof zodSchema>;
