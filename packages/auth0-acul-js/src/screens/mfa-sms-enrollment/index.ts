import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type {
  MfaSmsEnrollmentMembers,
  MfaSmsEnrollmentOptions,
  ScreenMembersOnMfaSmsEnrollment,
} from '../../../interfaces/screens/mfa-sms-enrollment';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Represents the MFA SMS Enrollment screen.
 */
export default class MfaSmsEnrollment extends BaseContext implements MfaSmsEnrollmentMembers {
  screen: ScreenMembersOnMfaSmsEnrollment;

  /**
   * Initializes a new instance of the MfaSmsEnrollment class.
   */
  constructor() {
    super();
    this.screen = this.getContext('screen') as ScreenMembersOnMfaSmsEnrollment;
  }

  /**
   * Handles the action to pick a country code for SMS enrollment.
   * @param payload Optional custom options to include in the request.
   * @returns A promise that resolves when the action is complete.
   * @example
   * ```typescript
   * import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
   *
   * const mfaSmsEnrollment = new MfaSmsEnrollment();
   * await mfaSmsEnrollment.pickCountryCode();
   * ```
   */
  async pickCountryCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaSmsEnrollment.screenIdentifier, 'pickCountryCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-country-code',
    });
  }

  /**
   * Continues the SMS enrollment process with the provided phone number.
   * @param payload The phone number to use for enrollment.
   * @returns A promise that resolves when the enrollment process is complete.
   * @throws {Error} If the phone number is missing.
   * @example
   * ```typescript
   * import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
   *
   * const mfaSmsEnrollment = new MfaSmsEnrollment();
   * await mfaSmsEnrollment.continueEnrollment({ phone: '1234567890' });
   * ```
   */
  async continueEnrollment(payload: MfaSmsEnrollmentOptions): Promise<void> {
    if (!payload.phone) {
      throw new Error('Phone number is required to continue enrollment.');
    }

    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaSmsEnrollment.screenIdentifier, 'continueEnrollment'],
    };
    await new FormHandler(options).submitData<MfaSmsEnrollmentOptions>({
      ...payload,
      action: 'default',
    });
  }

  /**
   * Handles the action to try another method for MFA.
   * @param payload Optional custom options to include in the request.
   * @returns A promise that resolves when the action is complete.
   * @example
   * ```typescript
   * import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
   *
   * const mfaSmsEnrollment = new MfaSmsEnrollment();
   * await mfaSmsEnrollment.tryAnotherMethod();
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaSmsEnrollment.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}

export { MfaSmsEnrollmentMembers, MfaSmsEnrollmentOptions, ScreenMembersOnMfaSmsEnrollment };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
