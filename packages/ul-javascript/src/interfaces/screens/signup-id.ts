import { z } from 'zod';
import { BaseContext } from '../../interfaces/models/base-context';

import { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';
import { UntrustedDataContext } from '../../interfaces/models/untrusted-data';

interface ExtendedScreenContext extends ScreenContext {
  links: {
    login: string;
  };
}

interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: { /* this object is opt-in */
    email?: string;
    phone?: string;
    username?: string;
    "ulp_{someField}"?: string; // Custom Prompts Fields
  };
}

export interface ScreenMembersOnSignupId extends ScreenMembers {
  loginLink: string | undefined;
}

export interface SignupId extends BaseContext {
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext
};

export interface SignupIdPayloadSchema {
  email: string;
};

export interface PasskeyPayloadSchema {
  passkey: string;
};

export interface FederatedPayloadSchema {
  connection: string;
};


export const signupIdPayloadSchema = z.object({
  state: z.string().optional(),
  email: z.string(),
})
.catchall(
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
  ])
);

export const passkeyPayloadSchema = z.object({
  state: z.string().optional(),
  passkey: z.string(),
});

export const federatedPayloadSchema = z.object({
  state: z.string().optional(),
  connection: z.string()
});


