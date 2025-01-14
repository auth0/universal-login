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
  submittedFormData: { [key: string]: any } | null;
  authorizationParams: {
    login_hint?: string;
    screen_hint?: string;
    ui_locales?: string;
    [key: `ext-${string}`]: string;
  } | null;
}
