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
   * Requests a new one-time code for the user's phone number.
   *
   * @remarks
   * Submits a form POST with `action: "resend"`. Auth0 responds by rendering this
   * screen again. If a captcha is required, it sends the user back to the `login-id`
   * screen instead (`signup-id` if the user started from signup) to complete the
   * captcha. Either way the browser loads a new page, and the current JavaScript
   * context, including component state and timers, is lost.
   *
   * Code after `await resendOTP()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. If the SMS can't be
   * sent, for example because of a rate limit, Auth0 renders this screen again without
   * an error. Only extensibility errors (such as an error from an Action) and
   * unexpected failures appear in `transaction.errors` on the reloaded page. The
   * returned promise doesn't reject.
   *
   * To add a cooldown between resends, use `resendManager()`. It stores its countdown
   * in `localStorage`, so the countdown survives the reload.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the new page
   * loads. It doesn't confirm that a new code was sent.
   *
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
   * Switches from passwordless SMS OTP authentication to a database connection.
   * 
   * @param payload - The connection switch options
   * @param payload.connection - The hardcoded database connection name string (e.g., 'Username-Password-Authentication')
   * 
   * @remarks
   * This method allows users to switch from the current passwordless SMS authentication 
   * to a traditional database connection that supports username/password authentication.
   * 
   * Common database connection names:
   * - `'Username-Password-Authentication'` - The default Auth0 database connection
   * - Custom database connection names as configured in your Auth0 tenant (e.g., `'my-custom-db'`)
   *
   * @example
   * import LoginPasswordlessSmsOtp from "@auth0/auth0-acul-js/login-passwordless-sms-otp";
   *
   * const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
   *
   * // Function to handle connection switching (pass hardcoded connection name)
   * const handleSwitchConnection = (connectionName: string) => {
   *   loginPasswordlessSmsOtp.switchConnection({ connection: connectionName });
   * };
   *
   * // Switch to different connection strategies (using hardcoded DB connection name)
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
