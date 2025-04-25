import { FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { UntrustedDataOverride } from './untrusted-data-overrider';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { UntrustedDataContext } from '../../../interfaces/models/untrusted-data';
import type {
  MfaVoiceChallengeMembers,
  ScreenMembersOnMfaVoiceChallenge as ScreenOptions,
  ContinueOptions as MfaVoiceChallengeContinueOptions,
  UntrustedDataMembersOnMfaVoiceChallenge as UntrustedDataOptions,
} from '../../../interfaces/screens/mfa-voice-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * MFA Voice Challenge screen implementation.
 *
 * This screen is displayed when a user needs to verify their identity using a voice call
 * as part of a multi-factor authentication flow.
 */
export default class MfaVoiceChallenge extends BaseContext implements MfaVoiceChallengeMembers {
  /**
   * Screen-specific properties and data.
   */
  screen: ScreenOptions;
  untrustedData: UntrustedDataOptions;
  /**
   * Creates an instance of MfaVoiceChallenge.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const untrustedDataContext = this.getContext('untrusted_data') as UntrustedDataContext;
    this.screen = new ScreenOverride(screenContext);
    this.untrustedData = new UntrustedDataOverride(untrustedDataContext);
  }

  /**
   * Submits the voice verification code to validate the MFA challenge.
   *
   * @param payload - Object containing the verification code and optional parameters
   * @returns Promise that resolves when the code is successfully validated
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.continue({
   *   code: '123456',
   *   rememberBrowser: true
   * });
   * ```
   */
  async continue(payload: MfaVoiceChallengeContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceChallenge.screenIdentifier, 'default'],
    };

    const formPayload = {
      ...payload,
      action: FormActions.DEFAULT,
      rememberBrowser: payload.rememberBrowser ? 'true' : undefined,
    };

    await new FormHandler(options).submitData(formPayload);
  }

  /**
   * Navigates to the screen for selecting a different phone number.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when navigation is complete
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.pickPhone();
   * ```
   */
  async pickPhone(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceChallenge.screenIdentifier, 'pickPhone'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_PHONE,
    });
  }

  /**
   * Switches to SMS verification method instead of voice call.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when switching is complete
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.switchToSms();
   * ```
   */
  async switchToSms(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceChallenge.screenIdentifier, 'switchToSms'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.SWITCH_TO_SMS,
    });
  }

  /**
   * Requests a new voice call with a verification code.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when the new code is sent
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.resendCode();
   * ```
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceChallenge.screenIdentifier, 'resendCode'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.RESEND_CODE,
    });
  }

  /**
   * Navigates to the screen for selecting an alternative MFA method.
   *
   * @param payload - Optional custom parameters
   * @returns Promise that resolves when navigation is complete
   *
   * @example
   * ```typescript
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * mfaVoiceChallenge.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceChallenge.screenIdentifier, 'pickAuthenticator'],
    };

    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
}

export {
  MfaVoiceChallengeMembers,
  ScreenOptions as ScreenMembersOnMfaVoiceChallenge,
  MfaVoiceChallengeContinueOptions,
  UntrustedDataOptions as UntrustedDataMembersOnMfaVoiceChallenge,
};

export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
