import { ScreenIds, FormActions } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { MfaVoiceEnrollmentMembers } from '../../../interfaces/screens/mfa-voice-enrollment';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the mfa-voice-enrollment screen functionality.
 */
export default class MfaVoiceEnrollment extends BaseContext implements MfaVoiceEnrollmentMembers {
  static screenIdentifier: string = ScreenIds.MFA_VOICE_ENROLLMENT;

  /**
   * Creates an instance of MfaVoiceEnrollment screen manager.
   */
  constructor() {
    super();
  }

  /**
   * Continues with the default action.
   * @param {CustomOptions} [payload] - Optional payload.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
   * const mfaVoiceEnrollmentManager = new MfaVoiceEnrollment();
   * const handleContinueEnrollment = async () => {
   *  try {
   *    await mfaVoiceEnrollmentManager.continue({
   *      phone: '+1234567890',
   *      // Add any optional CustomOptions here if needed 
   *    });
   *    console.log('Voice enrollment continued successfully.');
   *  } catch (error) {
   *    console.error('Error continuing voice enrollment:', error);
   *  }
   * };
   * ```
   */
  async continue(payload: { phone: string } & CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceEnrollment.screenIdentifier, 'continue'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }

  /**
   * Allows trying another authentication method
   * @param {CustomOptions} [payload] - Optional payload.
   * @example
   * ```typescript
   * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
   * const mfaVoiceEnrollment = new MfaVoiceEnrollment();
   * const handleTryAnotherMethod = async () => {
   *  await mfaVoiceEnrollment.tryAnotherMethod();
   * };
   * ```
   */
  async tryAnotherMethod(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceEnrollment.screenIdentifier, 'tryAnotherMethod'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.PICK_AUTHENTICATOR,
    });
  }

  /**
   * Allows picking a country code for the phone number
   * @param {CustomOptions} [payload] - Optional payload.
   * @example
   * ```typescript
   * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
   * const mfaVoiceEnrollment = new MfaVoiceEnrollment();
   * const handlePickCountryCode = async () => {
   *  await mfaVoiceEnrollment.selectPhoneCountryCode();
   * };
   * ```
   */
  async selectPhoneCountryCode(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [MfaVoiceEnrollment.screenIdentifier, 'selectPhoneCountryCode'],
    };

    await new FormHandler(options).submitData({
      ...payload,
      action: FormActions.PICK_COUNTRY_CODE,
    });
  }
}

export { MfaVoiceEnrollmentMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
