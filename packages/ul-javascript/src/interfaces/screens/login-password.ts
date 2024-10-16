import { z } from 'zod';
import { BaseContext } from '../../interfaces/models/base-context';
import { ScreenContext, ScreenMembers } from '../../interfaces/models/screen';
import { UntrustedDataContext } from '../../interfaces/models/untrusted-data';

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    signup: string;
    reset_password: string;
    edit_identifier: string;
  };
}

export interface ExtendedUntrustedDataContext extends UntrustedDataContext {
  untrusted_data?: { /* extends UntrustedData */
    submitted_form_data?: { /* this object is opt-in */
      username: string;
      "ulp_{someField}"?: string; // Custom Prompts Fields
    };
  };
}

export interface ScreenMembersOnLoginPassword extends ScreenMembers {
  isSignupEnabled: boolean;
  signupLink: string | undefined;
  resetPasswordLink: string | undefined;
  editIdentifierLink: string | undefined;
}

export interface LoginPassword extends BaseContext{
  screen: ExtendedScreenContext;
  untrusted_data?: ExtendedUntrustedDataContext
};

export interface LoginIdPayloadSchema {
  password: string;
};

export const loginIdPayloadSchema = z.object({
  state: z.string().optional(),
  password: z.string(),
})
.catchall(
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
  ])
);