import { CustomOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, PasskeyCreate, ScreenMembers, PasskeyRead } from '../models/screen';

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    back: string;
  };

  data: {
    passkeys: PasskeyCreate;
  }
}

export interface PasskeyEnrollment extends BaseContext {
  screen: ExtendedScreenContext;
}

export interface ScreenMembersOnPasskeyEnrollment extends ScreenMembers {
  backLink: string | null;
  loginLink: string | null;
  publicKey: PasskeyCreate['public_key'] | null;
}

export interface PasskeyEnrollmentMembers extends BaseMembers {
  screen: ScreenMembersOnPasskeyEnrollment;
  continuePasskeyEnrollment(payload?: CustomOptions): Promise<void>;
  abortPasskeyEnrollment(payload?: CustomOptions): Promise<void>;
}