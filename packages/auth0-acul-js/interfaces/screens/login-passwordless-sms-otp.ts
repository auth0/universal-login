import { CustomOptions } from '../common';
import type { ScreenMembers, ScreenContext } from '../models/screen';
import { TransactionMembers } from '../../interfaces/models/transaction';

export interface ScreenContextOnLoginPasswordlessSmsOtp extends ScreenContext {
  links: {
    edit_identifier: string;
    reset_password: string;
    signup: string;
  };
}
export interface ScreenMembersOnLoginPasswordlessSmsOtp extends ScreenMembers {
  signupLink: string | null;
  resetPasswordLink: string | null;
  backLink: string | null;
  data: {
    username: string;
  }
}

export interface TransactionMembersOnLoginPasswordlessSmsOtp extends TransactionMembers {
  isSignupEnabled: boolean;
}

export interface SubmitOTPOptions {
  username: string;
  otp: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface LoginPasswordlessSmsOtpMembers {
  screen: ScreenMembersOnLoginPasswordlessSmsOtp;
  submitOTP(payload: SubmitOTPOptions): Promise<void>;
  resendOTP(payload?: CustomOptions): Promise<void>;
}
