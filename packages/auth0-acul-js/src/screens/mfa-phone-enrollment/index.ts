import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPhoneEnrollmentMembers } from '../../../interfaces/screens/mfa-phone-enrollment';

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
   * const [phone, setPhone] = useState('');
   * const [type, setType] = useState<'sms' | 'voice'>('sms');
   * const mfaPhoneEnrollment = new MfaPhoneEnrollment();
   * const handlePickCountryCode = async () => {
   *    await mfaPhoneEnrollment.pickCountryCode();
   * };
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
   * const [phone, setPhone] = useState('');
   * const [type, setType] = useState<'sms' | 'voice'>('sms');
   * const mfaPhoneEnrollment = new MfaPhoneEnrollment();
   * const handleContinueEnrollment = async () => {
   *    await mfaPhoneEnrollment.continueEnrollment({ phone, type });
   * };
   * ```
   */
  async continueEnrollment(payload: { phone: string; type: 'sms' | 'voice' }): Promise<void> {
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
   * const [phone, setPhone] = useState('');
   * const [type, setType] = useState<'sms' | 'voice'>('sms');
   * const mfaPhoneEnrollment = new MfaPhoneEnrollment();
   * const handleTryAnotherMethod = async () => {
   *  await mfaPhoneEnrollment.tryAnotherMethod();
   * };
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

export { MfaPhoneEnrollmentMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
