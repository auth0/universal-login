import type { BaseContext, BaseMembers } from '../models/base-context';
import type { ScreenContext, PasskeyCreate, ScreenMembers } from '../models/screen';

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

export interface ContinueWithPasskeyEnrollment {
  [key: string]: string | number;
}

export interface AbortPasskeyEnrollment {
  [key: string]: string | number;
}

export interface ScreenMembersOnPasskeyEnrollment extends ScreenMembers {
  backLink: string | undefined;
}

export interface PasskeyEnrollmentMembers extends BaseMembers {
  screen: ScreenMembersOnPasskeyEnrollment;
  continueWithPasskeyEnrollment: (data: ContinueWithPasskeyEnrollment) => void;
  abortPasskeyEnrollment: (data: AbortPasskeyEnrollment) => void;
}