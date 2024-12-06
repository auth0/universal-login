export interface UntrustedDataContext {
  submitted_form_data?: {
    [key: string]: string | undefined;
    [key: `ulp_${string}`]: string | undefined;
  };
  authorization_params?: {
    login_hint?: string;
    screen_hint?: string;
    ui_locales?: string;
    [key: `ext-${string}`]: string;
  };
}

export interface UntrustedDataMembers {
  getSubmittedFormData(): { [key: string]: any } | null;
  getAuthParams(): {
    loginHint: string | undefined;
    screenHint: string | undefined;
    uiLocales: string | undefined;
    ext: { [key: string]: string } | undefined;
  } | null;
}
