import type { CustomOptions } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

export interface MfaSmsEnrollmentOptions {
  action?: 'pick-country-code' | 'default' | 'pick-authenticator';
  phone?: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenMembersOnMfaSmsEnrollment extends ScreenMembers {
  data: {
    phone?: string;
  } | null;
}

export interface MfaSmsEnrollmentMembers extends BaseMembers {
  screen: ScreenMembersOnMfaSmsEnrollment;
  pickCountryCode(payload?: CustomOptions): Promise<void>;
  continueEnrollment(payload: { phone: string; captcha?: string }): Promise<void>;
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
