import type { UntrustedDataContext, UntrustedDataMembers } from '../../interfaces/models/untrusted-data';

/**
 * @class UntrustedData
 * @description Provides access to untrusted data that may be supplied by the client or other external sources.
 * @implements {UntrustedDataMembers}
 */
export class UntrustedData implements UntrustedDataMembers {
  /** @property {Record<string, string | number | boolean | undefined> | null} submittedFormData - Form data submitted by the user */
  submittedFormData: UntrustedDataMembers['submittedFormData'];
  
  /** @property {Record<string, string> | null} authorizationParams - Authorization parameters from the request */
  authorizationParams: UntrustedDataMembers['authorizationParams'];

  /**
   * @constructor
   * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
   */
  constructor(untrustedData: UntrustedDataContext | undefined) {
    this.submittedFormData = UntrustedData.getSubmittedFormData(untrustedData);
    this.authorizationParams = UntrustedData.getAuthorizationParams(untrustedData);
  }

  /**
   * @static
   * @method getSubmittedFormData
   * @description Extracts submitted form data from the untrusted data context
   * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
   * @returns {Record<string, string | number | boolean | undefined> | null} Submitted form data or null if unavailable
   */
  static getSubmittedFormData(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['submittedFormData'] {
    if (!untrustedData?.submitted_form_data) return null;
    return untrustedData?.submitted_form_data ?? null;
  }

  /**
   * @static
   * @method getAuthorizationParams
   * @description Extracts authorization parameters from the untrusted data context
   * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
   * @returns {Record<string, string> | null} Authorization parameters or null if unavailable
   */
  static getAuthorizationParams(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['authorizationParams'] {
    if (!untrustedData?.authorization_params) return null;

    return {
      login_hint: untrustedData?.authorization_params?.login_hint,
      screen_hint: untrustedData?.authorization_params?.screen_hint,
      ui_locales: untrustedData?.authorization_params?.ui_locales,
      ...untrustedData?.authorization_params,
    };
  }
}