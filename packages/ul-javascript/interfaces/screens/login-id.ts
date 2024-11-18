import { z } from 'zod';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { UntrustedDataContext } from '../models/untrusted-data';

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
  };
}

export interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: {
    /* this object is opt-in */ username: string;
    'ulp_{someField}'?: string; // Custom Prompts Fields
  };
}

export interface LoginId extends BaseContext {
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext;
}

export interface ScreenMembersOnLoginId extends ScreenMembers {
  isSignupEnabled: boolean;
  signupLink: string | undefined;
  passwordResetLink: string | undefined;
}

export interface ContinueWithUsername {
  username: string;
  captcha?: string;
}

export interface ContinueWithFederatedLogin {
  connection: string;
}

export interface ContinueWithPasskey {
  [key: string]: string | number;
}

export interface ContinueWithCaptcha {
  email: string;
  captcha: string;
}

export interface ContinueWithCountryCode {
  [key: string]: string | number;
}

export interface LoginIdMembers extends BaseMembers {
  screen: ScreenMembersOnLoginId;
  // submitForm: (event: Event) => void;
  continueWithUsername: (data: ContinueWithUsername) => void;
  continueWithFederatedLogin: (data: ContinueWithFederatedLogin) => void;
  continueWithPasskey: (data: ContinueWithPasskey) => void;
  // continueWithCaptcha: (data: ContinueWithCaptcha) => void;
  continueWithCountryCode: (data: ContinueWithCountryCode) => void;
}


// ZOD schemas
export const loginIdPayloadSchema = z
  .object({
    state: z.string().optional(),
    username: z.string(),
  })
  .catchall(z.union([z.string(), z.number(), z.boolean(), z.null()]));

export const passkeyPayloadSchema = z.object({
  state: z.string().optional(),
  passkey: z.string(),
});

export const federatedPayloadSchema = z.object({
  state: z.string().optional(),
  connection: z.string(),
});
