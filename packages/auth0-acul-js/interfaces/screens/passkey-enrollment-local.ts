import { CustomOptions } from '../common';
import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, PasskeyCreate, ScreenMembers } from '../models/screen';

export interface ExtendedScreenContext extends ScreenContext {
  links: {
    back: string;
  };

  payload: {
    passkeys: PasskeyCreate;
  }
}

export interface PasskeyEnrollmentLocal extends BaseContext {
  screen: ExtendedScreenContext;
}

export interface AbortEnrollmentOptions {
  doNotShowAgain?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnPasskeyEnrollmentLocal extends ScreenMembers {
  publicKey: PasskeyCreate['public_key'] | null;
}

export interface PasskeyEnrollmentLocalMembers extends BaseMembers {
  screen: ScreenMembersOnPasskeyEnrollmentLocal;
  continuePasskeyEnrollment(payload?: CustomOptions): Promise<void>;
  abortPasskeyEnrollment(payload: AbortEnrollmentOptions): Promise<void>;
}