import { UntrustedData } from '../../models/untrusted-data';

import type { UntrustedDataContext } from '../../../interfaces/models/untrusted-data';
import type { UntrustedDataMembersOnMfaEmailChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-email-challenge';

/**
 * Untrusted data override class for the mfa-email-challenge screen
 * Handles remember_device field from submitted form data
 */
export class UntrustedDataOverride extends UntrustedData implements OverrideOptions {
  submittedFormData: OverrideOptions['submittedFormData'];

  /**
   * Creates an instance of UntrustedDataOverride
   * @param untrustedDataContext The untrusted data context from Universal Login
   */
  constructor(untrustedDataContext: UntrustedDataContext | undefined) {
    super(untrustedDataContext);
    this.submittedFormData = UntrustedDataOverride.getSubmittedFormData(untrustedDataContext);
  }

  /**
   * @static
   * @method getSubmittedFormData
   * @description Extracts submitted form data from the untrusted data context with rememberDevice flag
   * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
   * @returns Form data with rememberDevice or null if unavailable
   */
  static getSubmittedFormData(untrustedData: UntrustedDataContext | undefined): OverrideOptions['submittedFormData'] {
    if (!untrustedData?.submitted_form_data) return null;
    const { remember_device, ...rest } = untrustedData?.submitted_form_data || {};
    const submittedFormData: Record<string, string | number | boolean | undefined> = { ...rest };

    if (typeof remember_device === 'boolean') {
      submittedFormData.rememberDevice = remember_device;
    }
    return submittedFormData;
  }
}
