import { FormActions } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaOtpChallengeMembers,
  ContinueOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnMfaOtpChallenge as ScreenOptions,
} from '../../../interfaces/screens/mfa-otp-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-otp-challenge screen functionality
 * This screen is shown when a user needs to enter an OTP code during MFA
 */
export default class MfaOtpChallenge extends BaseContext implements MfaOtpChallengeMembers {
  static screenIdentifier: string = ScreenIds.MFA_OTP_CHALLENGE;
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaOtpChallenge screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues with the OTP challenge using the provided code
   * @param payload The options containing the code and rememberDevice flag
   * @example
   * ```typescript
   * import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
   *
   * const mfaOtpChallenge = new MfaOtpChallenge();
   * await mfaOtpChallenge.continue({
   *   code: '123456',
   *   rememberBrowser: true
   * });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpChallenge.screenIdentifier, 'continue'],
    };

    const submitPayload: Record<string, string | number | boolean> = { ...payload, action: 'default' };

    if (payload.rememberBrowser) {
      submitPayload.rememberBrowser = 'true';
    }

    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Allows the user to try another MFA method
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
   *
   * const mfaOtpChallenge = new MfaOtpChallenge();
   * await mfaOtpChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaOtpChallenge.screenIdentifier, 'tryAnotherMethod'],
    };

    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PICK_AUTHENTICATOR });
  }
}

export { MfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenOptions as ScreenMembersOnMfaOtpChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
