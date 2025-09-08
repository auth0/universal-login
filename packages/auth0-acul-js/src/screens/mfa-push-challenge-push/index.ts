import { ScreenIds, FormActions } from '../../constants';
import { mfaPushPolling }  from '../../helpers/startMfaPushPolling.js';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { UntrustedDataOverride } from './untrusted-data-overrider';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { UntrustedDataContext } from '../../../interfaces/models/untrusted-data';
import type { MfaPushPollingControl } from '../../../interfaces/screens/mfa-push-challenge-push';
import type {
  MfaPushChallengePushMembers,
  WithRememberOptions,
  ScreenMembersOnMfaPushChallengePush as ScreenOptions,
  UntrustedDataMembersOnMfaPushChallengePush as UntrustedDataOptions,
} from '../../../interfaces/screens/mfa-push-challenge-push';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-push-challenge-push screen functionality
 * This screen is shown when a user needs to confirm a push notification during MFA
 */
export default class MfaPushChallengePush extends BaseContext implements MfaPushChallengePushMembers {
  static screenIdentifier: string = ScreenIds.MFA_PUSH_CHALLENGE_PUSH;
  screen: ScreenOptions;
  untrustedData: UntrustedDataOptions;

  /**
   * Creates an instance of MfaPushChallengePush screen manager
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const untrustedDataContext = this.getContext('untrusted_data') as UntrustedDataContext;
    this.screen = new ScreenOverride(screenContext);
    this.untrustedData = new UntrustedDataOverride(untrustedDataContext);
  }

  /**
   * Continues with the push notification challenge
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * const mfaPushChallengePush = new MfaPushChallengePush();
   * await mfaPushChallengePush.continue();
   * ```
   */
  async continue(payload?: WithRememberOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushChallengePush.screenIdentifier, 'continue'],
    };

    const { rememberDevice, ...restPayload } = payload || {};
    const submitPayload: Record<string, string | number | boolean> = { ...restPayload, action: FormActions.CONTINUE };

    if (rememberDevice) {
      submitPayload.rememberBrowser = true;
    }
    await new FormHandler(options).submitData(submitPayload);
  }

  /**
   * Resends the push notification
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * const mfaPushChallengePush = new MfaPushChallengePush();
   * await mfaPushChallengePush.resendPushNotification();
   * ```
   */
  async resendPushNotification(payload?: WithRememberOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushChallengePush.screenIdentifier, 'resendPushNotification'],
    };
    const { rememberDevice = false, ...restPayload } = payload || {};
    await new FormHandler(options).submitData<WithRememberOptions>({
      rememberBrowser: rememberDevice ? 'true' : undefined,
      ...restPayload,
      action: FormActions.RESEND,
    });
  }

  /**
   * Switches to entering the verification code manually
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * const mfaPushChallengePush = new MfaPushChallengePush();
   * await mfaPushChallengePush.enterCodeManually();
   * ```
   */
  async enterCodeManually(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushChallengePush.screenIdentifier, 'enterCodeManually'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.ENTER_OTP_CODE,
    });
  }

  /**
   * Allows trying another authentication method
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * const mfaPushChallengePush = new MfaPushChallengePush();
   * await mfaPushChallengePush.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushChallengePush.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }

  /**
   * Starts polling the MFA push challenge endpoint.
   * Calls the provided callback when the polling condition is met.
   * Optionally handles polling errors via onError callback.
   * 
   * @param intervalMs Polling interval in milliseconds
   * @param onComplete Callback function called when polling condition is met
   * @param onError Optional callback called on polling error (receives error object)
   * @returns Polling control object with stop/start/running
   * @example
   * ```typescript
   * const control = mfaPushChallengePush.startMfaPushPolling(
   *   5000,
   *   () => { mfaPushChallengePush.continue(); },
   *   (error) => { console.error('Polling error:', error); }
   * );
   * control.stop(); // To stop polling manually
   * ```
   */
  startMfaPushPolling(
    intervalMs: number,
    onComplete: () => void,
    onError?: (error: { status: number; responseText: string }) => void
  ): MfaPushPollingControl {
    return mfaPushPolling({
      intervalMs,
      onResult: onComplete,
      onError,
    });
  }
}

export {
  MfaPushChallengePushMembers,
  WithRememberOptions,
  ScreenOptions as ScreenMembersOnMfaPushChallengePush,
  UntrustedDataOptions as UntrustedDataMembersOnMfaPushChallengePush,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';