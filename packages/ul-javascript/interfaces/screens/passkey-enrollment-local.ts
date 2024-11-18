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

export interface PasskeyEnrollmentLocal extends BaseContext {
  screen: ExtendedScreenContext;
}

export interface ContinueWithPasskeyEnrollmentLocal {
  [key: string]: string | number;
}

export interface AbortPasskeyEnrollmentLocal {
  doNotShowAgain?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnPasskeyEnrollmentLocal extends ScreenMembers {
  backLink: string | undefined;
}

export interface PasskeyEnrollmentLocalMembers extends BaseMembers {
  screen: ScreenMembersOnPasskeyEnrollmentLocal;
  continueWithPasskeyEnrollmentLocal: (data: ContinueWithPasskeyEnrollmentLocal) => void;
  abortPasskeyEnrollmentLocal: (data: AbortPasskeyEnrollmentLocal) => void;
}