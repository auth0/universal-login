import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { createPollingControl }  from '../../utils/create-polling-control.js';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaPushChallengePushMembers,
  ScreenMembersOnResetPasswordMfaPushChallengePush as ScreenOptions,
} from '../../../interfaces/screens/reset-password-mfa-push-challenge-push';
import type { FormOptions } from '../../../interfaces/utils/form-handler';
import type { MfaPushPollingControl, MfaPollingOptions } from '../../../interfaces/utils/polling-control';

/**
 * Class representing the reset-password-mfa-push-challenge-push screen functionality
 * This screen is shown when a push notification has been sent to the user's device during password reset
 */
export default class ResetPasswordMfaPushChallengePush extends BaseContext implements ResetPasswordMfaPushChallengePushMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_MFA_PUSH_CHALLENGE_PUSH;
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
   * import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
   *
   * const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
   * await resetPasswordMfaPushChallengePush.continue();
   * ```
   */
  async continue(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaPushChallengePush.screenIdentifier, 'continue'],
    };
    await new FormHandler(options).submitData<CustomOptions>(payload || {});
  }

  /**
   * Re-sends the push notification
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
   *
   * const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
   * await resetPasswordMfaPushChallengePush.resendPushNotification();
   * ```
   */
  async resendPushNotification(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaPushChallengePush.screenIdentifier, 'resendPushNotification'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: FormActions.RESEND,
    });
  }

  /**
   * Switches to entering the verification code manually
   * @param payload Optional custom options to include with the request
   * @example
   * ```typescript
   * import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
   *
   * const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
   * await resetPasswordMfaPushChallengePush.enterCodeManually();
   * ```
   */
  async enterCodeManually(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaPushChallengePush.screenIdentifier, 'enterCodeManually'],
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
   * import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
   *
   * const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
   * await resetPasswordMfaPushChallengePush.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [ResetPasswordMfaPushChallengePush.screenIdentifier, 'tryAnotherMethod'],
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
   * @category Utility
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
  pollingManager(options: MfaPollingOptions = {}): MfaPushPollingControl {
    return createPollingControl(options);
  }
}

export {
  ResetPasswordMfaPushChallengePushMembers,
  ScreenOptions as ScreenMembersOnResetPasswordMfaPushChallengePush,
  MfaPollingOptions,
  MfaPushPollingControl,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
