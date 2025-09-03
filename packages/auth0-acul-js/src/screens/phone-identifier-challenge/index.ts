import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';
import { createResendControl } from '../../utils/resend-utils';

import { ScreenOverride } from './screen-override';

import type { CustomOptions, StartResendOptions, ResendControl } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  PhoneChallengeOptions,
  ScreenMembersOnPhoneIdentifierChallenge as ScreenOptions,
  PhoneIdentifierChallengeMembers,
} from '../../../interfaces/screens/phone-identifier-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class PhoneIdentifierChallenge extends BaseContext implements PhoneIdentifierChallengeMembers {
  static screenIdentifier: string = ScreenIds.PHONE_IDENTIFIER_CHALLENGE;
  screen: ScreenOptions;

  constructor() {
    super();

    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @example
   * import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
   *
   * const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
   * phoneIdentifierChallenge.submitPhoneChallenge({
   *     code: "<string>"
   * });
   */
  async submitPhoneChallenge(payload: PhoneChallengeOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [PhoneIdentifierChallenge.screenIdentifier, 'submitPhoneChallenge'],
    };
    await new FormHandler(options).submitData<PhoneChallengeOptions>(payload);
  }

  /**
   * @example
   * import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
   *
   * const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
   * phoneIdentifierChallenge.resendCode();
   */
  async resendCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [PhoneIdentifierChallenge.screenIdentifier, 'resendCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.RESEND_CODE });
  }

  /**
   * @example
   * import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
   *
   * const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
   * phoneIdentifierChallenge.returnToPrevious();
   */
  async returnToPrevious(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [PhoneIdentifierChallenge.screenIdentifier, 'returnToPrevious'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.BACK });
  }

  /**
   * Gets resend functionality with timeout management for this screen
   * @param options - Configuration options for resend functionality
   * @param options.timeoutSeconds - Number of seconds to wait before allowing resend (default: 10)
   * @param options.resendCallback - Optional custom callback function to execute on resend
   * @returns Object containing disabled state, remaining time, and callback function
   * 
   * @example
   * import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';
   *
   * const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
   * const resendControl = phoneIdentifierChallenge.startResend({ timeoutSeconds: 40 });
   * if (!resendControl.disabled) {
   *   await resendControl.callback();
   * }
   */
  startResend(options?: StartResendOptions): ResendControl {
    return createResendControl(
      PhoneIdentifierChallenge.screenIdentifier,
      () => this.resendCode(),
      options || {}
    );
  }
}

export { PhoneIdentifierChallengeMembers, PhoneChallengeOptions, ScreenOptions as ScreenMembersOnPhoneIdentifierChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
