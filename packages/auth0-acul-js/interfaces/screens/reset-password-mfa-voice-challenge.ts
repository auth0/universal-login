import type { CustomOptions } from '../../interfaces/common';
import type { BaseMembers } from '../models/base-context';
import type { ScreenMembers } from '../models/screen';

/**
 * Interface for the screen data specific to reset-password-mfa-voice-challenge screen.
 */
export interface ScreenMembersOnResetPasswordMfaVoiceChallenge extends ScreenMembers {
  data: {
    /**
     * The phone number to send the voice call to.
     */
    phoneNumber: string;

    /**
     * Whether to show the link to switch to SMS verification.
     */
    showLinkSms?: boolean;
  } | null;
}

/**
 * Payload for the `continue()` method on ResetPasswordMfaVoiceChallengeMembers.
 */
export interface ContinueOptions extends CustomOptions {
  /**
   * The OTP code entered by the user.
   */
  code: string;
}

/**
 * Interface defining the available methods and properties for the reset-password-mfa-voice-challenge screen.
 */
export interface ResetPasswordMfaVoiceChallengeMembers extends BaseMembers {
  screen: ScreenMembersOnResetPasswordMfaVoiceChallenge;

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
  continue(payload: ContinueOptions): Promise<void>;

  /**
   * Switches to SMS verification.
   *
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the action completes.
   */
  switchToSms(payload?: CustomOptions): Promise<void>;

  /**
   * Re-sends the code via voice call.
   *
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the code is resent.
   */
  resendCode(payload?: CustomOptions): Promise<void>;

  /**
   * Allows the user to try another MFA method.
   *
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the request is submitted.
   */
  tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
