import { z } from 'zod';
import { BaseContext, BaseMembers } from '../../interfaces/models/base-context';
import { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';
import { UntrustedDataContext } from '../../interfaces/models/untrusted-data';

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
  };
}

export interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  submitted_form_data?: { /* this object is opt-in */
    username: string;
    "ulp_{someField}"?: string; // Custom Prompts Fields
  }
}

export interface LoginId extends BaseContext{
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext
};

export interface ScreenMembersOnLoginId extends ScreenMembers {
  isSignupEnabled: boolean;
  signupLink: string | undefined;
  passwordResetLink: string | undefined;
}

export interface LoginIdMembers extends BaseMembers {
  screen: ScreenMembersOnLoginId;
  submitForm: (event: Event) => void;
  submitData: (data: LoginIdPayloadSchema) => void;
  submitFederatedLoginForm: (event: Event) => void;
  submitFederatedLoginData: (data: FederatedPayloadSchema) => void;
  submitPasskey: (data: PasskeyPayloadSchema) => void;
}

export interface LoginIdPayloadSchema {
  username: string;
};

export interface PasskeyPayloadSchema {
  passkey: string;
};

export interface FederatedPayloadSchema {
  connection: string;
};

// ZOD schemas
export const loginIdPayloadSchema = z.object({
  state: z.string().optional(),
  username: z.string(),
}).catchall(
  z.union(
    [
      z.string(),
      z.number(),
      z.boolean(),
      z.null()
    ]
  ) 
);

export const passkeyPayloadSchema = z.object({
  state: z.string().optional(),
  passkey: z.string(),
});

export const federatedPayloadSchema = z.object({
  state: z.string().optional(),
  connection: z.string()
});