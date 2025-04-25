import { UntrustedData } from '../../models/untrusted-data';

import type { UntrustedDataContext } from '../../../interfaces/models/untrusted-data';
import type { UntrustedDataMembersOnMfaPushChallengePush as OverrideOptions } from '../../../interfaces/screens/mfa-push-challenge-push';

/**
 * Untrusted data override class for the mfa-push-challenge-push screen
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

    return {
      rememberDevice: untrustedData.submitted_form_data?.remember_device as boolean,
    };
  }
}
