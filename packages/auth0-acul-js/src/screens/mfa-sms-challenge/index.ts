import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
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
import { FormActions } from '../../../src/constants';

/**
 * This class provides methods to handle the mfa-sms-challenge screen.
 * @extends BaseContext
 */
export default class MfaSmsChallenge extends BaseContext implements MfaSmsChallengeMembers {
  static screenIdentifier: string = ScreenIds.MFA_SMS_CHALLENGE;
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
      telemetry: [MfaSmsChallenge.screenIdentifier, 'continueMfaSmsChallenge'],
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
      telemetry: [MfaSmsChallenge.screenIdentifier, 'pickSms'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PICK_SMS });
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
      telemetry: [MfaSmsChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND_CODE });
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
      telemetry: [MfaSmsChallenge.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PICK_AUTHENTICATOR });
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
      telemetry: [MfaSmsChallenge.screenIdentifier, 'getACall'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.SWITCH_TO_VOICE });
  }
}

export { MfaSmsChallengeMembers, MfaSmsChallengeOptions, ScreenOptions as ScreenMembersOnMfaSmsChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
