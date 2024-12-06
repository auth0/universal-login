import { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenData, ScreenMembers } from '../models/screen';

export interface ScreenDataOptions extends ScreenData {
  messageType?: 'text' | 'voice';
  phone?: 'string';
}

export interface ScreenMembersOnPhoneIdentifierEnrollment extends ScreenMembers {
  getScreenData(): {
    messageType?: 'text' | 'voice';
    phone?: 'string';
  } | null;
  editIdentifierLink: string | null;
}

export interface PhoneEnrollmentOptions {
  type: 'text' | 'voice';
  [key: string]: string | number | boolean;
}

export interface PhoneIdentifierEnrollmentMembers extends BaseMembers {
  screen: ScreenMembersOnPhoneIdentifierEnrollment,
  continuePhoneEnrollment(payload: PhoneEnrollmentOptions): Promise<void>;
  returnToPrevious(payload?: CustomOptions): Promise<void>;
}
