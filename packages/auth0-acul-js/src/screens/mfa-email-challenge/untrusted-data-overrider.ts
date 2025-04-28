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
  constructor(untrustedDataContext: UntrustedDataContext) {
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
  static getSubmittedFormData(untrustedDataContext: UntrustedDataContext): OverrideOptions['submittedFormData'] {
    const submittedFormData = UntrustedData.getSubmittedFormData(untrustedDataContext);
    if (!submittedFormData) return null;
    const { remember_device, ...rest } = submittedFormData;
    return {
      ...rest,
      rememberDevice: (remember_device ?? false) as boolean,
    };
  }
}
