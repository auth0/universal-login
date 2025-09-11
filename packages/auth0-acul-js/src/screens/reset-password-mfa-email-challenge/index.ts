import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-utils';

import { ScreenOverride } from './screen-override';

import type { CustomOptions, StartResendOptions, ResendControl } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaEmailChallengeMembers,
  ScreenMembersOnResetPasswordMfaEmailChallenge as ScreenOptions,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
} from '../../../interfaces/screens/reset-password-mfa-email-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the reset-password-mfa-email-challenge screen functionality
 */
export default class ResetPasswordMfaEmailChallenge extends BaseContext implements ResetPasswordMfaEmailChallengeMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_EMAIL_CHALLENGE;
  screen: ScreenOptions;

  /**
   * Creates an instance of ResetPasswordMfaEmailChallenge screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues with the email challenge using the provided code.
   * @param payload The options containing the code and rememberDevice flag.
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   *
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * await resetPasswordMfaEmailChallenge.continue({
   *   code: '123456',
   * });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaEmailChallenge.screenIdentifier, 'continue'],
    };
    const submitPayload: Record<string, string | number | boolean> = { ...payload, action: 'default' };

    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Resends the email code.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   *
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * await resetPasswordMfaEmailChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: ResendCodeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaEmailChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND_CODE });
  }

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   *
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * await resetPasswordMfaEmailChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaEmailChallenge.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PICK_AUTHENTICATOR });
  }

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options - Configuration options for resend functionality
   * @param options.timeoutSeconds - Number of seconds to wait before allowing resend (default: 10)
   * @param options.onStatusChange - Callback to receive state updates (remaining seconds, disabled status)
   * @param options.onTimeout - Callback to execute when timeout countdown reaches zero
   * @returns ResendControl object with startResend method
   * 
   * @example
   * ```typescript
   * import ResetPasswordMfaEmailChallenge from '@auth0/auth0-acul-js/reset-password-mfa-email-challenge';
   * 
   * const resetPasswordMfaEmailChallenge = new ResetPasswordMfaEmailChallenge();
   * const { startResend } = resetPasswordMfaEmailChallenge.resendManager({
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
      ResetPasswordMfaEmailChallenge.screenIdentifier,
      () => this.resendCode(),
      options
    );
  }
}

export {
  ResetPasswordMfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
  ScreenOptions as ScreenMembersOnResetPasswordMfaEmailChallenge,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
