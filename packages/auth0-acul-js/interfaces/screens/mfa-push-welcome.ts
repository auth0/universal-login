import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

export interface MfaPushWelcomeOptions {
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnMfaPushWelcome extends ScreenMembers {
  screen: {
    name: string;
    links: {
      ios: string;
      android: string;
    };
  };
}

export interface MfaPushWelcomeMembers extends BaseMembers {
  screen: ScreenMembersOnMfaPushWelcome;
  enroll(payload?: CustomOptions): Promise<void>;
  pickAuthenticator(payload?: CustomOptions): Promise<void>;
}
