import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-control';

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
  SwitchConnectionOptions,
} from '../../../interfaces/screens/login-passwordless-sms-otp';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { StartResendOptions, ResendControl } from '../../../interfaces/utils/resend-control';

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

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options - Configuration options for resend functionality
   * @param options.timeoutSeconds - Number of seconds to wait before allowing resend (default: 10)
   * @param options.onStatusChange - Callback to receive state updates (remaining seconds, disabled status)
   * @param options.onTimeout - Callback to execute when timeout countdown reaches zero
   * @returns ResendControl object with startResend method
   * @utilityFeature
   * 
   * @example
   * ```typescript
   * import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
   * 
   * const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
   * const { startResend } = loginPasswordlessSmsOtp.resendManager({
   *   timeoutSeconds: 15,
   *   onStatusChange: (remainingSeconds, isDisabled) => {
   *     console.log(`Resend available in ${remainingSeconds}s, disabled: ${isDisabled}`);
   *   },
   *   onTimeout: () => {
   *     console.log('Resend is now available');
   *   }
   * });
   * 
   * // Call startResend when user clicks resend button
   * startResend();
   * ```
   */
  resendManager(options?: StartResendOptions): ResendControl {
    return createResendControl(
      LoginPasswordlessSmsOtp.screenIdentifier,
      () => this.resendOTP(),
      options
    );
  }

  /**
   * @remarks
   * This method handles switching from SMS OTP to a DB connection.
   * The connection parameter should be a DB connection name (e.g. 'Username-Password-Authentication').
   *
   * @example
   * import LoginPasswordlessSmsOtp from "@auth0/auth0-acul-js/login-passwordless-sms-otp";
   *
   * const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
   *
   * // Function to handle connection switching
   * const handleSwitchConnection = (connectionName: string) => {
   *   loginPasswordlessSmsOtp.switchConnection({ connection: connectionName });
   * };
   *
   * // Switch to different connection strategies
   * handleSwitchConnection('Username-Password-Authentication'); // Switch to login-password based authentication
   */
  async switchConnection(payload: SwitchConnectionOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessSmsOtp.screenIdentifier, 'switchConnection'],
    };

    await new FormHandler(options).submitData<SwitchConnectionOptions>({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }
}

export {
  LoginPasswordlessSmsOtpMembers,
  SubmitOTPOptions,
  SwitchConnectionOptions,
  ScreenOptions as ScreenMembersOnLoginPasswordlessSmsOtp,
  TransactionOptions as TransactionMembersOnLoginPasswordlessSmsOtp,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
