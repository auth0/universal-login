import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
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
    };
    await new FormHandler(options).submitData<CustomOptions>(payload || {});
  }

  /**
   * Resends the push notification
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
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'resend',
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
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'enter-otp-code',
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
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}

export { ResetPasswordMfaPushChallengePushMembers, ScreenOptions as ScreenMembersOnResetPasswordMfaPushChallengePush };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
