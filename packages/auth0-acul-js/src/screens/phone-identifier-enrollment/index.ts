import { FormActions } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  PhoneIdentifierEnrollmentMembers,
  ScreenMembersOnPhoneIdentifierEnrollment as ScreenOptions,
  PhoneEnrollmentOptions,
} from '../../../interfaces/screens/phone-identifier-enrollment';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class PhoneIdentifierEnrollment extends BaseContext implements PhoneIdentifierEnrollmentMembers {
  static screenIdentifier: string = ScreenIds.PHONE_IDENTIFIER_ENROLLMENT;
  screen: ScreenOptions;

  constructor() {
    super();

    const screenContext = super.getContext('screen') as ScreenContext;

    this.screen = new ScreenOverride(screenContext);
  }

  /**
   * @example
   * import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
   *
   * const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();
   * phoneIdentifierChallenge.continuePhoneEnrollment({
   *     type: "<text' | 'voice>"
   * });
   */
  async continuePhoneEnrollment(payload: PhoneEnrollmentOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [PhoneIdentifierEnrollment.screenIdentifier, 'continuePhoneEnrollment'],
    };
    await new FormHandler(options).submitData<PhoneEnrollmentOptions>(payload);
  }

  /**
   * @example
   * import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
   *
   * const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();
   * phoneIdentifierChallenge.returnToPrevious();
   */
  async returnToPrevious(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [PhoneIdentifierEnrollment.screenIdentifier, 'returnToPrevious'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.BACK });
  }
}

export { PhoneIdentifierEnrollmentMembers, PhoneEnrollmentOptions, ScreenOptions as ScreenMembersOnPhoneIdentifierEnrollment };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
