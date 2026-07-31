export interface BrandingContext {
  settings?: {
    colors?: {
      primary?: string;
      page_background?:
        | string
        | {
            type: string;
            start: string;
            end: string;
            angle_deg: number;
          };
    };
    favicon_url?: string;
    logo_url?: string;
    font?: {
      url: string;
    };
  };
  themes?: {
    default: {
      borders: Record<string, string | boolean | number>;
      colors: Record<string, string>;
      displayName: string;
      fonts: Record<string, string | boolean | object>;
      page_background: Record<string, string>;
      widget: Record<string, string | number>;
      identifiers?: ThemeIdentifiersContext;
    };
  };
}

export interface ThemeIdentifiersContext {
  login_display?: string;
  otp_autocomplete?: boolean;
  phone_display?: {
    masking?: string;
    formatting?: string;
  };
}

export interface BrandingSettings {
  colors?: {
    primary?: string;
    pageBackground?:
      | string
      | {
          type: string;
          start: string;
          end: string;
          angleDegree: number;
        };
  };
  faviconUrl?: string;
  logoUrl?: string;
  fontUrl?: string;
}

export interface ThemeIdentifiers {
  loginDisplay?: string;
  otpAutocomplete?: boolean;
  phoneDisplay?: {
    masking?: string;
    formatting?: string;
  };
}

export interface BrandingThemes {
  default: {
    borders: Record<string, string | boolean | number>;
    colors: Record<string, string>;
    displayName: string;
    fonts: Record<string, string | boolean | object>;
    pageBackground: Record<string, string>;
    widget: Record<string, string | number>;
    identifiers?: ThemeIdentifiers;
  };
}

/* @namespace Client */
export interface BrandingMembers {
  settings: BrandingSettings | null;
  themes: BrandingThemes | null;
}
