import type { UntrustedDataContext, UntrustedDataMembers } from '../../interfaces/models/untrusted-data';

export class UntrustedData implements UntrustedDataMembers {
  submittedFormData: UntrustedDataMembers['submittedFormData'];
  authorizationParams: UntrustedDataMembers['authorizationParams'];

  constructor(untrustedData: UntrustedDataContext | undefined) {
    this.submittedFormData = UntrustedData.getSubmittedFormData(untrustedData);
    this.authorizationParams = UntrustedData.getAuthorizationParams(untrustedData);
  }

  static getSubmittedFormData(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['submittedFormData'] {
    if (!untrustedData?.submitted_form_data) return null;
    return untrustedData?.submitted_form_data ?? null;
  }

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
