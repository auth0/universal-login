import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-utils';

import { ScreenOverride } from './screen-override';

import type { CustomOptions, StartResendOptions, ResendControl } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  ScreenMembersOnResetPasswordMfaSmsChallenge as ScreenOptions,
} from '../../../interfaces/screens/reset-password-mfa-sms-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * This class provides methods to handle the reset-password-mfa-sms-challenge screen.
 * @extends BaseContext
 */
export default class ResetPasswordMfaSmsChallenge extends BaseContext implements ResetPasswordMfaSmsChallengeMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_SMS_CHALLENGE;
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Submits the MFA SMS challenge with the provided code.
   * @param {MfaSmsChallengeOptions} payload - The payload containing the code.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
   *
   * const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
   * await resetPasswordMfaSmsChallenge.continueMfaSmsChallenge({
   *   code: '123456',
   * });
   * ```
   */
  async continueMfaSmsChallenge(payload: MfaSmsChallengeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaSmsChallenge.screenIdentifier, 'continueMfaSmsChallenge'],
    };
    const submitPayload: Record<string, string | number | boolean> = { ...payload, action: 'default' };
    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Submits the action to resend the SMS code.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
   *
   * const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
   * await resetPasswordMfaSmsChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaSmsChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND_CODE });
  }

  /**
   * Submits the action to try another MFA method.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
   *
   * const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
   * await resetPasswordMfaSmsChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaSmsChallenge.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PICK_AUTHENTICATOR });
  }

  /**
   * Submits the action to switch to voice call verification.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
   *
   * const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
   * await resetPasswordMfaSmsChallenge.getACall();
   * ```
   */
  async getACall(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaSmsChallenge.screenIdentifier, 'getACall'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.SWITCH_TO_VOICE });
  }

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options - Configuration options for resend functionality
   * @param options.timeoutSeconds - Number of seconds to wait before allowing resend (default: 10)
   * @param options.onStatusChange - Callback to receive state updates (remaining seconds, disabled status)
   * @param options.onTimeout - Callback to execute when timeout countdown reaches zero
   * @returns ResendControl object with startResend method
   * @category Utility
   * 
   * @example
   * ```typescript
   * import ResetPasswordMfaSmsChallenge from '@auth0/auth0-acul-js/reset-password-mfa-sms-challenge';
   * 
   * const resetPasswordMfaSmsChallenge = new ResetPasswordMfaSmsChallenge();
   * const { startResend } = resetPasswordMfaSmsChallenge.resendManager({
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
      ResetPasswordMfaSmsChallenge.screenIdentifier,
      () => this.resendCode(),
      options
    );
  }
}

export { ResetPasswordMfaSmsChallengeMembers, MfaSmsChallengeOptions, ScreenOptions as ScreenMembersOnResetPasswordMfaSmsChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
