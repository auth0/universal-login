import { z } from 'zod';
import type { BaseContext } from '../../interfaces/models/base-context';
import type { ScreenMembers } from '../../interfaces/models/screen';

export interface ILinks {
  [key: string]: string;
  signup: string;
  reset_password: string;
}

export interface IScreen {
  name: string;
  links?: ILinks;
  captcha?: any;
}

export interface IUntrustedData {
  submitted_form_data?: {
    email?: string;
    phone?: string;
    username?: string;
  };
}

export interface ILoginPasswordlessEmailCode extends BaseContext {
  screen: IScreen;
  untrusted_data?: IUntrustedData;
}

export interface ScreenMembersOverride extends ScreenMembers {}

export interface ContinueWithEmailCode {
  email: string;
  code: string | number;
}

export interface ContinueWithResendCode {
  email: string;
}

export interface LoginPasswordlessEmailCodeMembers {
  continueWithEmailCode(data: ContinueWithEmailCode): Promise<void>;
  continueWithResendCode(data: ContinueWithResendCode): Promise<void>;
}

export const zodSchema = z
  .object({
    state: z.string().optional(),
    code: z.string().optional(),
    action: z.enum(['default', 'resend']),
  })
  .catchall(z.union([z.string(), z.number(), z.boolean(), z.null()]));

export type IFormSchema = z.infer<typeof zodSchema>;
