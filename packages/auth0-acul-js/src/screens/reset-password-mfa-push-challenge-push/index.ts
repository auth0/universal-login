import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { createPollingControl }  from '../../utils/create-polling-control.js';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { MfaPushPollingControl, MfaPushPollingError } from '../../../interfaces/screens/mfa-push-challenge-push';
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
   * @param intervalMs Polling interval in milliseconds
   * @param onComplete Callback function to be called when polling is completed
   * @example
   * ```typescript
   * import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
   *
   * const resetPasswordMfaPushChallengePush = new ResetPasswordMfaPushChallengePush();
   * resetPasswordMfaPushChallengePush.pollingManager(5000, (rememberDevice) => {
   *   console.log('Push notification approved. Remember device:', rememberDevice);
   * });
   * ```
   */
  pollingManager(
    intervalMs: number,
    onComplete: () => void,
    onError?: (error: MfaPushPollingError) => void
  ): MfaPushPollingControl {
    return createPollingControl({
      intervalMs,
      onResult: onComplete,
      onError,
    });
  }
}

export { ResetPasswordMfaPushChallengePushMembers, ScreenOptions as ScreenMembersOnResetPasswordMfaPushChallengePush };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
