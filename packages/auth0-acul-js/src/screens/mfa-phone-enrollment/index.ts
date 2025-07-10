import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPhoneEnrollmentMembers, ContinueOptions } from '../../../interfaces/screens/mfa-phone-enrollment';

/**
 * Class implementing the mfa-phone-enrollment screen functionality.
 * This screen allows users to enroll using a phone number for MFA.
 */
export default class MfaPhoneEnrollment extends BaseContext implements MfaPhoneEnrollmentMembers {
  static screenIdentifier: string = ScreenIds.MFA_PHONE_ENROLLMENT;

  /**
   * Creates an instance of the MfaPhoneEnrollment screen.
   */
  constructor() {
    super();
  }

  /**
   * Navigates to the country code selection screen.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
   * const mfaPhoneEnrollmentManager = new MfaPhoneEnrollment();
   * async function handlePickCountryCode() {
   *  try {
   *    await mfaPhoneEnrollmentManager.pickCountryCode();
   *    console.log('Country code selection successful.');
   *  } catch (error) {
   *    console.error('Error selecting country code:', error);
   *  }
   * }
   */
  async pickCountryCode(payload?: CustomOptions): Promise<void> {
    const options = {
      state: this.transaction.state,
      telemetry: [MfaPhoneEnrollment.screenIdentifier, 'pickCountryCode'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-country-code',
    });
  }

  /**
   * Continues the enrollment process with the provided phone number and type (SMS or voice).
   * @param payload The phone number and type (SMS or voice).
   * @example
   * ```typescript
   * import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
   * const mfaPhoneEnrollmentManager = new MfaPhoneEnrollment();
   * async function handleContinueEnrollment() {
   *  try {
   *    await mfaPhoneEnrollmentManager.continueEnrollment({
   *      phone: '+1234567890',
   *      type: 'sms', // or 'voice'
   *    });
   *    console.log('Phone enrollment continued successfully.');
   *  } catch (error) {
   *    console.error('Error continuing phone enrollment:', error);
   *  }
   * }
   * ```
   */
  async continueEnrollment(payload: ContinueOptions): Promise<void> {
    const options = {
      state: this.transaction.state,
      telemetry: [MfaPhoneEnrollment.screenIdentifier, 'continueEnrollment'],
    };
    await new FormHandler(options).submitData({
      ...payload,
      action: 'default',
    });
  }

  /**
   * Allows the user to try another MFA method.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
   * const mfaPhoneEnrollmentManager = new MfaPhoneEnrollment();
   * async function handleTryAnotherMethod() {
   *  try {
   *    await mfaPhoneEnrollmentManager.tryAnotherMethod(); 
   *    console.log('Switched to another authentication method.');
   *   } catch (error) { 
   *  console.error('Error switching authenticator method:', error);
   *  }
   * }
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options = {
      state: this.transaction.state,
      telemetry: [MfaPhoneEnrollment.screenIdentifier, 'tryAnotherMethod'],
    };
    await new FormHandler(options).submitData<CustomOptions>({
      ...payload,
      action: 'pick-authenticator',
    });
  }
}

export { MfaPhoneEnrollmentMembers, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
