import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ScreenMembersOnLoginPasswordlessSmsOtp as ScreenOptions,
  TransactionMembersOnLoginPasswordlessSmsOtp as TransactionOptions,
  LoginPasswordlessSmsOtpMembers,
  SubmitOTPOptions,
} from '../../../interfaces/screens/login-passwordless-sms-otp';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class LoginPasswordlessSmsOtp extends BaseContext implements LoginPasswordlessSmsOtpMembers {
  static screenIdentifier: string = ScreenIds.LOGIN_PASSWORDLESS_SMS_OTP;
  screen: ScreenOptions;
  transaction: TransactionOptions;

  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContext;
    const transactionContext = this.getContext('transaction') as TransactionContext;

    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }

  /**
   * @example
   * import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
   * const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
   *
   * loginPasswordlessSmsOtp.submitOTP({
   *     username: "test@domain.com";
   *     code: "<string>";
   * });
   */
  async submitOTP(payload: SubmitOTPOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessSmsOtp.screenIdentifier, 'submitOTP'],
    };
    await new FormHandler(options).submitData<SubmitOTPOptions>({ ...payload, action: FormActions.DEFAULT });
  }

  /**
   * @example
   * import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
   *
   * const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
   * loginPasswordlessSmsOtp.resendOTP();
   */
  async resendOTP(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessSmsOtp.screenIdentifier, 'resendOTP'],
    };

    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND });
  }
}

export {
  LoginPasswordlessSmsOtpMembers,
  SubmitOTPOptions,
  ScreenOptions as ScreenMembersOnLoginPasswordlessSmsOtp,
  TransactionOptions as TransactionMembersOnLoginPasswordlessSmsOtp,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
