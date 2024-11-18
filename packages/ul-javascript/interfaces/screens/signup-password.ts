import { z } from 'zod';
import type { BaseContext } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { UntrustedDataContext } from '../models/untrusted-data';

interface Screen extends ScreenContext {
  links?: {
    signup?: string;
    reset_password?: string;
  };
}

export interface ScreenMembersOnSignupPassword extends ScreenMembers {
  loginLink: string | undefined;
  editLink: string | undefined;
}

interface UntrustedData extends UntrustedDataContext {
  submitted_form_data?: {
    email?: string;
    phone?: string;
    username?: string;
    [key: `ulp-${string}`]: string;
  };
}

export interface SignupPassword extends BaseContext {
  screen: Screen;
  UntrustedData: UntrustedData;
  captcha?: string;
}

export interface ContinueWithUsernamePassword {
  username: string;
  password: string;
  captcha?: string;
}

export interface ContinueWithEmailPassword {
  email: string;
  password: string;
  captcha?: string;
}

export interface ContinueWithUsernameEmailPassword {
  email: string;
  username: string;
  password: string;
  captcha?: string;
}

export interface SignupPasswordMembers {
  continueWithUsernamePassword: (data: ContinueWithUsernamePassword) => void;
  continueWithEmailPassword: (data: ContinueWithEmailPassword) => void;
  continueWithUsernameEmailPassword: (data: ContinueWithUsernameEmailPassword) => void;
}

export const zodSchema = z
  .object({
    state: z.string().optional(),
    password: z.string(),
  })
  .catchall(z.union([z.string(), z.number(), z.boolean(), z.null()]));

export type IFormSchema = z.infer<typeof zodSchema>;
