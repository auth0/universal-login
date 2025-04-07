import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  ScreenMembersOnResetPasswordMfaSmsChallenge as ScreenOptions,
} from '../../../interfaces/screens/reset-password-mfa-sms-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import { FormActions } from '../../../src/constants';

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
}

export { ResetPasswordMfaSmsChallengeMembers, MfaSmsChallengeOptions, ScreenOptions as ScreenMembersOnResetPasswordMfaSmsChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
