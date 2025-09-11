import { FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-utils';

import { ScreenOverride } from './screen-override';
import { UntrustedDataOverride } from './untrusted-data-overrider';

import type { CustomOptions, StartResendOptions, ResendControl } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { UntrustedDataContext } from '../../../interfaces/models/untrusted-data';
import type {
  MfaVoiceChallengeMembers,
  ScreenMembersOnMfaVoiceChallenge as ScreenOptions,
  MfaVoiceChallengeContinueOptions,
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
   *   rememberDevice: true
   * });
   * ```
   */
  async continue(payload: MfaVoiceChallengeContinueOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceChallenge.screenIdentifier, 'default'],
    };

    const { rememberDevice, ...restPayload } = payload || {};
    const submitPayload: Record<string, string | number | boolean> = { ...restPayload, action: FormActions.DEFAULT };

    if (rememberDevice) {
      submitPayload.rememberBrowser = true;
    }
    await new FormHandler(options).submitData(submitPayload);
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

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options - Configuration options for resend functionality
   * @param options.timeoutSeconds - Number of seconds to wait before allowing resend (default: 10)
   * @param options.onStatusChange - Callback to receive state updates (remaining seconds, disabled status)
   * @param options.onTimeout - Callback to execute when timeout countdown reaches zero
   * @returns ResendControl object with startResend method
   * 
   * @example
   * ```typescript
   * import MfaVoiceChallenge from '@auth0/auth0-acul-js/mfa-voice-challenge';
   * 
   * const mfaVoiceChallenge = new MfaVoiceChallenge();
   * const { startResend } = mfaVoiceChallenge.resendManager({
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
      MfaVoiceChallenge.screenIdentifier,
      () => this.resendCode(),
      options
    );
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
