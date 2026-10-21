import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-control';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaVoiceChallengeMembers,
  ScreenMembersOnResetPasswordMfaVoiceChallenge as ScreenOptions,
  ContinueOptions,
} from '../../../interfaces/screens/reset-password-mfa-voice-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { StartResendOptions, ResendControl } from '../../../interfaces/utils/resend-control';

/**
 * @class ResetPasswordMfaVoiceChallenge
 * @description Class implementing the reset-password-mfa-voice-challenge screen functionality
 */
/**
 * Class implementing the reset-password-mfa-voice-challenge screen functionality.
 */
export default class ResetPasswordMfaVoiceChallenge extends BaseContext implements ResetPasswordMfaVoiceChallengeMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_VOICE_CHALLENGE;
  screen: ScreenOptions;

  /**
   * Creates an instance of ResetPasswordMfaVoiceChallenge screen manager.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues with the voice challenge using the provided code.
   *
   * @param payload - The options containing the code.
   * @returns A promise that resolves when the challenge is submitted.
   *
   * @example
   * ```ts
   * const reset = new ResetPasswordMfaVoiceChallenge();
   * await reset.continue({ code: '123456' });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaVoiceChallenge.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }

  /**
   * Switches to SMS verification.
   *
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the action completes.
   */
  async switchToSms(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaVoiceChallenge.screenIdentifier, 'switchToSms'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.SWITCH_TO_SMS,
    });
  }

  /**
   * Resends the code via voice call.
   *
   * @remarks
   * Submits a form POST with `action: "resend-code"`. Auth0 responds by rendering this
   * screen again, so the browser reloads the page and the current JavaScript context,
   * including component state and timers, is lost.
   *
   * Code after `await resendCode()` may still run, but anything it sets up, such as a
   * "code sent" message or a countdown, is gone after the reload. Server-side errors,
   * such as rate limits, appear in `transaction.errors` on the reloaded page.
   * They don't reject the returned promise.
   *
   * To add a cooldown between resends, use `resendManager()`. It stores its countdown
   * in `localStorage`, so the countdown survives the reload.
   *
   * @param payload - Optional custom parameters to send with the request.
   * @returns A promise that resolves once the form is submitted, before the page
   * reloads. It doesn't confirm that a new code was sent.
   *
   * @example
   * ```typescript
   * import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
   *
   * const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();
   * await resetPasswordMfaVoiceChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaVoiceChallenge.screenIdentifier, 'resendCode'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.RESEND_CODE,
    });
  }

  /**
   * Allows the user to try another MFA method.
   *
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the request is submitted.
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaVoiceChallenge.screenIdentifier, 'tryAnotherMethod'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
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
   * import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';
   * 
   * const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();
   * const { startResend } = resetPasswordMfaVoiceChallenge.resendManager({
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
      ResetPasswordMfaVoiceChallenge.screenIdentifier,
      () => this.resendCode(),
      options
    );
  }
}

export { ResetPasswordMfaVoiceChallengeMembers, ScreenOptions as ScreenMembersOnResetPasswordMfaVoiceChallenge, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
