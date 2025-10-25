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
import type { StartResendOptions, ResendControl } from  '../../../interfaces/utils/resend-control';

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
   * @example
   * import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
   *
   * const loginPasswordlessEmailCode = new LoginPasswordlessEmailCode();
   * loginPasswordlessEmailCode.switchConnection({ connection: "sms" });
   */
  async switchConnection(payload: SwitchConnectionOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [LoginPasswordlessEmailCode.screenIdentifier, 'switchConnection'],
    };

    await new FormHandler(options).submitData<SwitchConnectionOptions>(payload);
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
