import type { UntrustedDataContext, UntrustedDataMembers } from '../../interfaces/models/untrusted-data';

export class UntrustedData implements UntrustedDataMembers {
  submittedFormData: UntrustedDataMembers['submittedFormData'];
  authParams: UntrustedDataMembers['authParams'];

  constructor(untrustedData: UntrustedDataContext | undefined) {
    this.submittedFormData = UntrustedData.getSubmittedFormData(untrustedData);
    this.authParams = UntrustedData.getAuthParams(untrustedData);
  }

  static getSubmittedFormData(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['submittedFormData'] {
    if (!untrustedData?.submitted_form_data) return null;
    return untrustedData?.submitted_form_data ?? null;
  }

  static getAuthParams(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['authParams'] {
    if (!untrustedData?.authorization_params) return null;

    return {
      loginHint: untrustedData?.authorization_params?.login_hint,
      screenHint: untrustedData?.authorization_params?.screen_hint,
      uiLocales: untrustedData?.authorization_params?.ui_locales,
      ext: untrustedData?.authorization_params,
    };
  }
}
