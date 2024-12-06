import type { UntrustedDataContext, UntrustedDataMembers } from '../../interfaces/models/untrusted-data';

export class UntrustedData implements UntrustedDataMembers {
  private untrustedData: UntrustedDataContext | undefined;

  constructor(untrustedData: UntrustedDataContext | undefined) {
    this.untrustedData = untrustedData;
  }

  getSubmittedFormData(): ReturnType<UntrustedDataMembers['getSubmittedFormData']> {
    if (!this.untrustedData?.submitted_form_data) return null;
    return this.untrustedData?.submitted_form_data ?? null;
  }

  getAuthParams(): ReturnType<UntrustedDataMembers['getAuthParams']> {
    if (!this.untrustedData?.authorization_params) return null;

    return {
      loginHint: this.untrustedData?.authorization_params?.login_hint,
      screenHint: this.untrustedData?.authorization_params?.screen_hint,
      uiLocales: this.untrustedData?.authorization_params?.ui_locales,
      ext: this.untrustedData?.authorization_params,
    };
  }
}
