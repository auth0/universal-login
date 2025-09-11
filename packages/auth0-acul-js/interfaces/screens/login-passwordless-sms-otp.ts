import type { TransactionMembers } from '../../interfaces/models/transaction';
import type { CustomOptions, StartResendOptions, ResendControl } from '../common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers, ScreenContext } from '../models/screen';

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
    phone_number: string;
  };
}

export interface TransactionMembersOnLoginPasswordlessSmsOtp extends TransactionMembers {
  isSignupEnabled: boolean;
}

export interface SubmitOTPOptions {
  username?: string;
  code: string;
  captcha?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface LoginPasswordlessSmsOtpMembers extends BaseMembers {
  screen: ScreenMembersOnLoginPasswordlessSmsOtp;
  transaction: TransactionMembersOnLoginPasswordlessSmsOtp;
  submitOTP(payload: SubmitOTPOptions): Promise<void>;
  resendOTP(payload?: CustomOptions): Promise<void>;
  /**
   * Gets resend functionality with timeout management for this screen
   * @param options Configuration options for resend functionality
   */
  resendManager(options?: StartResendOptions): ResendControl;
}
