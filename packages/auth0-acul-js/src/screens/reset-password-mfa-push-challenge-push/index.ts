import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { createPollingControl } from '../../utils/create-polling-control';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPushPollingControl, MfaPushPollingOptions, MfaPushPollingError } from '../../../interfaces/common/mfa-push-polling';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordMfaPushChallengePushMembers,
  ScreenMembersOnResetPasswordMfaPushChallengePush as ScreenOptions,
} from '../../../interfaces/screens/reset-password-mfa-push-challenge-push';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

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
   * Allows polling for the push notification challenge to be approved.
   * @param options Optional polling configuration options
   * @returns Control object with polling management methods
   * @example
   * ```typescript
   * import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
   *
   * const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
   * const control = resetPasswordMfaPushChallengePush.pollingManager({
   *   intervalMs: 5000,
   *   onComplete: () => {
   *     console.log('Push notification approved');
   *   },
   *   onError: (error) => {
   *     console.error('Polling failed:', error);
   *   }
   * });
   * // control.stopPolling(); // To stop polling manually
   * ```
   */
  pollingManager(options?: MfaPushPollingOptions): MfaPushPollingControl {
    if (!options) {
      throw new Error('Polling options are required');
    }
    return createPollingControl({
      intervalMs: options.intervalMs,
      onResult: options.onComplete,
      onError: options.onError,
    });
  }
}

export { ResetPasswordMfaPushChallengePushMembers, ScreenOptions as ScreenMembersOnResetPasswordMfaPushChallengePush, MfaPushPollingError };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
