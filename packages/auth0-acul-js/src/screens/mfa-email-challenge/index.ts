import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { UntrustedDataOverride } from './untrusted-data-overrider';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { UntrustedDataContext } from '../../../interfaces/models/untrusted-data';
import type {
  MfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
  ScreenMembersOnMfaEmailChallenge as ScreenOptions,
  UntrustedDataMembersOnMfaEmailChallenge as UntrustedDataOptions,
} from '../../../interfaces/screens/mfa-email-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-email-challenge screen functionality
 * This screen is shown when a user needs to verify their email during MFA
 */
export default class MfaEmailChallenge extends BaseContext implements MfaEmailChallengeMembers {
  static screenIdentifier: string = ScreenIds.MFA_EMAIL_CHALLENGE;
  screen: ScreenOptions;
  untrustedData: UntrustedDataOptions;

  /**
   * Creates an instance of MfaEmailChallenge screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const untrustedDataContext = this.getContext('untrusted_data') as UntrustedDataContext;
    this.screen = new ScreenOverride(screenContext);
    this.untrustedData = new UntrustedDataOverride(untrustedDataContext);
  }

  /**
   * Continues with the email challenge using the provided code
   * @param payload The options containing the code and rememberDevice flag
   * @example
   * ```typescript
   * import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
   *
   * const mfaEmailChallenge = new MfaEmailChallenge();
   * await mfaEmailChallenge.continue({
   *   code: '123456',
   *   rememberDevice: true
   * });
   * ```
   */
  async continue(payload: ContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaEmailChallenge.screenIdentifier, 'continue'],
    };
    const { rememberDevice = false, ...restPayload } = payload || {};
    const submitPayload: Record<string, string | number | boolean> = { ...restPayload, action: 'default' };
    if (rememberDevice) {
      submitPayload.rememberBrowser = 'true';
    }
    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Resends the email code
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
   *
   * const mfaEmailChallenge = new MfaEmailChallenge();
   * await mfaEmailChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: ResendCodeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaEmailChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.RESEND_CODE,
    });
  }

  /**
   * Allows the user to try another MFA method
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
   *
   * const mfaEmailChallenge = new MfaEmailChallenge();
   * await mfaEmailChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaEmailChallenge.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }

  /**
   * Submits the action to pick a different Email configuration, if available.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaEmailChallenge from '@auth0/auth0-acul-js/mfa-email-challenge';
   *
   * const mfaEmailChallenge = new MfaEmailChallenge();
   * await mfaEmailChallenge.pickEmail();
   * ```
   */
  async pickEmail(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaEmailChallenge.screenIdentifier, 'pickEmail'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.PICK_EMAIL });
  }
}

export {
  MfaEmailChallengeMembers,
  ContinueOptions,
  ResendCodeOptions,
  TryAnotherMethodOptions,
  ScreenOptions as ScreenMembersOnMfaEmailChallenge,
  UntrustedDataOptions as UntrustedDataMembersOnMfaEmailChallenge,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
