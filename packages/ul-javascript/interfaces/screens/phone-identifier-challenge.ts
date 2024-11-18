import { z } from 'zod';
import type { BaseContext, BaseMembers } from '../models/base-context';

export interface IPhoneIdentifierChallenge extends BaseContext {}
export interface ContinueWithCode {
  code: string;
  captcha?: string;
  [key: string]: string | undefined;
}

export interface ContinueWithCall {
  [key: string]: string;
}

export interface ResendCode {
  [key: string]: string;
}

export interface GoBack {
  [key: string]: string;
}

export interface PhoneIdentifierChallengeMembers extends BaseMembers{
  continueWithCode(data: ContinueWithCode): Promise<void>;
  continueWithCall(data: ContinueWithCall): Promise<void>;
  resendCode(data: ResendCode): Promise<void>;
  goBack(data: GoBack): Promise<void>;
}

export const zodSchema = z
  .object({
    state: z.string().optional(),
    code: z.string().optional(),
    action: z.enum(['default', 'resend']),
  })
  .catchall(z.union([z.string(), z.number(), z.boolean(), z.null()]));

export type IFormSchema = z.infer<typeof zodSchema>;
