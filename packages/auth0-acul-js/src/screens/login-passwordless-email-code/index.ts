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
  LoginPasswordlessEmailCodeMembers,
  ScreenMembersOnLoginPasswordlessEmailCode as ScreenOptions,
  TransactionMembersOnLoginPasswordlessEmailCode as TransactionOptions,
  SubmitCodeOptions,
  SwitchConnectionOptions,
} from '../../../interfaces/screens/login-passwordless-email-code';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { StartResendOptions, ResendControl } from '../../../interfaces/utils/resend-control';

export default class LoginPasswordlessEmailCode extends BaseContext implements LoginPasswordlessEmailCodeMembers {
  static screenIdentifier: string = ScreenIds.LOGIN_PASSWORDLESS_EMAIL_CODE;
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
   * //Creates an instance of LoginPasswordlessEmailCode and calls the method with sample data.
   * import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
   *
   * //Method to continue the login process using email and code.
   * const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();
   * loginPasswordlessEmailCode.submitCode({
   *  email: "test@domain.com";
   *  code: "<string>";
   * });
   */
  async submitCode(payload: SubmitCodeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessEmailCode.screenIdentifier, 'submitCode'],
    };

    await new FormHandler(options).submitData<SubmitCodeOptions>(payload);
  }

  /**
   * Requests a new one-time code for the user's email address.
   *
   * @remarks
   * Submits a form POST with `action: "resend"`. Auth0 responds by rendering this
   * screen again. If a captcha is required, it sends the user back to the `login-id`
   * screen instead (`signup-id` if the user started from signup) to complete the
   * captcha. Either way the browser loads a new page, and the current JavaScript
   * context, including component state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. If the email can't be
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
   * import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
   *
   * const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();
   * loginPasswordlessEmailCode.resendCode();
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessEmailCode.screenIdentifier, 'resendCode'],
    };

    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND });
  }

  /**
   * Creates a resend control manager for handling email code resend operations.
   * 
   * @param options Configuration options for the resend control
   * @returns A ResendControl object with resend functionality and state management
   * @utilityFeature
   * 
   * @example
   * ```typescript
   * import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
   * 
   * const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();
   * const { startResend } = loginPasswordlessEmailCode.resendManager({
   *   timeoutSeconds: 60,
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
      LoginPasswordlessEmailCode.screenIdentifier,
      () => this.resendCode(),
      options
    );
  }

  /**
   * Switches from passwordless email code authentication to a database connection.
   * 
   * @param payload - The connection switch options
   * @param payload.connection - The hardcoded database connection name string (e.g., 'Username-Password-Authentication')
   * 
   * @remarks
   * This method allows users to switch from the current passwordless email authentication 
   * to a traditional database connection that supports username/password authentication.
   * 
   * Common database connection names:
   * - `'Username-Password-Authentication'` - The default Auth0 database connection
   * - Custom database connection names as configured in your Auth0 tenant (e.g., `'my-custom-db'`)
   * 
   * @example
   * ```typescript
   * import LoginPasswordlessEmailCode from "@auth0/auth0-acul-js/login-passwordless-email-code";
   *
   * const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();
   *
   * // Switch to the default database connection (hardcoded connection name)
   * await loginPasswordlessEmailCode.switchConnection({ 
   *   connection: 'Username-Password-Authentication' 
   * });
   * 
   * // Or switch to a custom database connection (hardcoded connection name)
   * await loginPasswordlessEmailCode.switchConnection({ 
   *   connection: 'my-custom-db-connection' 
   * });
   * ```
   */
  async switchConnection(payload: SwitchConnectionOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessEmailCode.screenIdentifier, 'switchConnection'],
    };

    await new FormHandler(options).submitData<SwitchConnectionOptions>({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }
}

export {
  LoginPasswordlessEmailCodeMembers,
  SubmitCodeOptions,
  SwitchConnectionOptions,
  ScreenOptions as ScreenMembersOnLoginPasswordlessEmailCode,
  TransactionOptions as TransactionMembersOnLoginPasswordlessEmailCode,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
