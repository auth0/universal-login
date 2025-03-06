import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  PhoneChallengeOptions,
  ScreenMembersOnPhoneIdentifierChallenge as ScreenOptions,
  PhoneIdentifierChallengeMembers,
} from '../../../interfaces/screens/phone-identifier-challenge';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class PhoneIdentifierChallenge extends BaseContext implements PhoneIdentifierChallengeMembers {
  static screenIdentifier: string = 'phone-identifier-challenge';
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
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'resend-code' });
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
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'back-action' });
  }
}

export { PhoneIdentifierChallengeMembers, PhoneChallengeOptions, ScreenOptions as ScreenMembersOnPhoneIdentifierChallenge };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
