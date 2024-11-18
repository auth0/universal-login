import { z } from 'zod';
import type { BaseContext } from '../models/base-context';

import type { ScreenContext, ScreenMembers } from '../models/screen';
import type { UntrustedDataContext } from '../models/untrusted-data';

interface ExtendedScreenContext extends ScreenContext {
  links: {
    login: string;
  };
}

interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: {
    /* this object is opt-in */ email?: string;
    phone?: string;
    username?: string;
    'ulp_{someField}'?: string; // Custom Prompts Fields
  };
}

export interface ScreenMembersOnSignupId extends ScreenMembers {
  loginLink: string | undefined;
}

export interface SignupId extends BaseContext {
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext;
}

export interface ContinueWithEmail {
  email: string;
  captcha?: string;
}

export interface ContinueWithUsername {
  username: string;
  captcha?: string;
}

export interface ContinueEmailAndUsername {
  email: string;
  username: string;
  captcha?: string;
}

export interface ContinueWithEmailUsernameAndPhone {
  email: string;
  username: string;
  phone_number: string;
  captcha?: string;
}

export interface ContinueWithFederatedConnection {
  connection: string;
}

export interface SignupIdMembers {
  screen: ScreenMembersOnSignupId;
  continueWithEmail: (data: ContinueWithEmail) => void;
  continueWithUsername: (data: ContinueWithUsername) => void;
  continueEmailAndUsername: (data: ContinueEmailAndUsername) => void;
  continueWithFederatedConnection: (data: ContinueWithFederatedConnection) => void;
  continueWithEmailUsernameAndPhone: (data: ContinueWithEmailUsernameAndPhone) => void;
}

export const signupIdPayloadSchema = z
  .object({
    state: z.string().optional(),
    email: z.string(),
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
