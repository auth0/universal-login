import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createPollingControl } from "../../utils/polling-control.js";

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaPushEnrollmentQrMembers,
  WithRememberOptions,
  ScreenMembersOnMfaPushEnrollmentQr as ScreenOptions,
} from '../../../interfaces/screens/mfa-push-enrollment-qr';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { MfaPushPollingControl, MfaPollingOptions } from '../../../interfaces/utils/polling-control';

/**
 * Class implementing the mfa-push-enrollment-qr screen functionality
 */
export default class MfaPushEnrollmentQr extends BaseContext implements MfaPushEnrollmentQrMembers {
  static screenIdentifier: string = ScreenIds.MFA_PUSH_ENROLLMENT_QR;
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * Continues with the push notification challenge
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * const mfaPushEnrollmentQr = new MfaPushEnrollmentQr();
   * await mfaPushEnrollmentQr.continue();
   * ```
   */
  async continue(payload?: WithRememberOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushEnrollmentQr.screenIdentifier, "continue"],
    };

    const { rememberDevice, ...restPayload } = payload || {};
    const submitPayload: Record<string, string | number | boolean> = {
      ...restPayload,
      action: FormActions.CONTINUE,
    };

    if (rememberDevice) {
      submitPayload.rememberBrowser = true;
    }
    await new FormHandler(options).submitData(submitPayload);
  }
  /**
   * Navigates to the authenticator selection screen.
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
   *
   * const mfaPushEnrollmentQr = new MfaPushEnrollmentQr();
   * await mfaPushEnrollmentQr.pickAuthenticator();
   * ```
   */
  async pickAuthenticator(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushEnrollmentQr.screenIdentifier, 'pickAuthenticator'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }
  
/**
   * Starts and manages polling for an MFA push challenge.
   *
   * Creates a polling session that repeatedly checks the MFA push challenge endpoint
   * at the specified interval until the challenge is approved or an error occurs.
   * When the approval condition is met, the provided
   * {@link MfaPollingOptions.onCompleted | onCompleted} callback is invoked and
   * polling stops automatically.
   *
   * Use the returned {@link MfaPushPollingControl} to start, stop, or check the
   * status of the polling process at any time.
   *
   * @param options - {@link MfaPollingOptions | Configuration options} for the polling process:
   * - `intervalMs` — Optional polling interval in milliseconds (defaults to SDK’s internal value, typically 5000 ms).
   * - `onCompleted` — Optional callback fired when the MFA push is successfully approved.
   * - `onError` — Optional callback fired when a polling error occurs, receiving an {@link ULError}.
   *
   * @returns A {@link MfaPushPollingControl} instance exposing:
   * - `startPolling()` — Starts or resumes polling.
   * - `stopPolling()` — Cancels polling immediately.
   * - `isRunning()` — Indicates whether polling is currently active.
   * 
   * @utilityFeature
   *
   * @example
   * ```ts
   * // Start polling every 5 seconds until the push challenge is approved
   * const control = mfaPushChallengePush.pollingManager({
   *   intervalMs: 5000,
   *   onCompleted: () => mfaPushChallengePush.continue(),
   *   onError: (error) => console.error('Polling error:', error),
   * });
   *
   * // Later, cancel polling if needed
   * control.stopPolling();
   * ```
   *
   * @remarks
   * - HTTP 429 (rate limit) responses are handled internally: polling automatically
   *   waits until the rate limit resets before retrying.
   * - Safe to call `startPolling()` multiple times; it has no effect if already running.
   */
  pollingManager(options: MfaPollingOptions): MfaPushPollingControl {
    return createPollingControl(options);
  }
}

export { 
  MfaPushEnrollmentQrMembers,
  WithRememberOptions, 
  ScreenOptions as ScreenMembersOnMfaPushEnrollmentQr, 
  MfaPollingOptions,
  MfaPushPollingControl
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
