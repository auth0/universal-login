import { UntrustedDataContext, UntrustedDataMembers } from "../interfaces/models/untrusted-data";

export class UntrustedData implements UntrustedDataMembers {
  protected untrustedData: UntrustedDataContext | undefined;

  constructor(untrustedData: UntrustedDataContext | undefined) {
    this.untrustedData = untrustedData;
  }

  get submittedFormData(): UntrustedDataMembers["submittedFormData"] {
    return this.untrustedData?.submitted_form_data;
  }

  get authParams(): UntrustedDataMembers["authParams"] {
    return {
      loginHint: this.untrustedData?.authorization_params?.login_hint,
      screenHint: this.untrustedData?.authorization_params?.screen_hint,
      uiLocales: this.untrustedData?.authorization_params?.ui_locales,
      ext: this.untrustedData?.authorization_params // TODO: Filter out known keys
    };
  }
}