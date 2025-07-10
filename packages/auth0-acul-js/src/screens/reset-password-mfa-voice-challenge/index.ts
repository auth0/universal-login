import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaVoiceChallengeMembers,
  ScreenMembersOnResetPasswordMfaVoiceChallenge as ScreenOptions,
  ContinueOptions,
} from '../../../interfaces/screens/reset-password-mfa-voice-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

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
   * @param payload - Optional custom options to include with the request.
   * @returns A promise that resolves when the code is resent.
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
}

export { ResetPasswordMfaVoiceChallengeMembers, ScreenOptions as ScreenMembersOnResetPasswordMfaVoiceChallenge, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
