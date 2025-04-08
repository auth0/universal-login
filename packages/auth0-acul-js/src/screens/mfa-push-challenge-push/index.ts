import { FormActions } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  MfaPushChallengePushMembers,
  ScreenMembersOnMfaPushChallengePush as ScreenOptions,
  WithRememberOptions,
} from '../../../interfaces/screens/mfa-push-challenge-push';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-push-challenge-push screen functionality
 * This screen is shown when a push notification has been sent to the user's device
 */
export default class MfaPushChallengePush extends BaseContext implements MfaPushChallengePushMembers {
  static screenIdentifier: string = ScreenIds.MFA_PUSH_CHALLENGE_PUSH;
  screen: ScreenOptions;

  /**
   * Creates an instance of MfaPushChallengePush screen manager
   */
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
   * const mfaPushChallengePush = new MfaPushChallengePush();
   * await mfaPushChallengePush.continue();
   * ```
   */
  async continue(payload?: WithRememberOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaPushChallengePush.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData<WithRememberOptions>({
      rememberDevice: payload?.rememberDevice ?? false,
      ...payload,
      action: FormActions.CONTINUE,
    });
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
    await new FormHandler(options).submitData<WithRememberOptions>({
      rememberDevice: payload?.rememberDevice ?? false,
      ...payload,
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
}

export { MfaPushChallengePushMembers, WithRememberOptions, ScreenOptions as ScreenMembersOnMfaPushChallengePush };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
