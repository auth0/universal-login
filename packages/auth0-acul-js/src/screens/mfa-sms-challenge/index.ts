import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaSmsChallengeMembers,
  MfaSmsChallengeOptions,
  ScreenMembersOnMfaSmsChallenge as ScreenOptions,
} from '../../../interfaces/screens/mfa-sms-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * This class provides methods to handle the mfa-sms-challenge screen.
 * @extends BaseContext
 */
export default class MfaSmsChallenge extends BaseContext implements MfaSmsChallengeMembers {
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Submits the MFA SMS challenge with the provided code and rememberBrowser option.
   * @param {MfaSmsChallengeOptions} payload - The payload containing the code and rememberBrowser option.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
   *
   * const mfaSmsChallenge = new MfaSmsChallenge();
   * await mfaSmsChallenge.continueMfaSmsChallenge({
   *   code: '123456',
   *   rememberBrowser: true,
   * });
   * ```
   */
  async continueMfaSmsChallenge(payload: MfaSmsChallengeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };

    const submitPayload: Record<string, string | number | boolean> = { ...payload, action: 'default' };

    if (payload.rememberBrowser) {
      submitPayload.rememberBrowser = 'true';
    }

    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Submits the action to pick a different SMS configuration, if available.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
   *
   * const mfaSmsChallenge = new MfaSmsChallenge();
   * await mfaSmsChallenge.pickSms();
   * ```
   */
  async pickSms(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'pick-sms' });
  }

  /**
   * Submits the action to resend the SMS code.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
   *
   * const mfaSmsChallenge = new MfaSmsChallenge();
   * await mfaSmsChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'resend-code' });
  }

  /**
   * Submits the action to try another MFA method.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
   *
   * const mfaSmsChallenge = new MfaSmsChallenge();
   * await mfaSmsChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'pick-authenticator' });
  }

  /**
   * Submits the action to switch to voice call verification.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';
   *
   * const mfaSmsChallenge = new MfaSmsChallenge();
   * await mfaSmsChallenge.getACall();
   * ```
   */
  async getACall(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'switch-to-voice' });
  }
}

export { MfaSmsChallengeMembers, MfaSmsChallengeOptions, ScreenOptions as ScreenMembersOnMfaSmsChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
