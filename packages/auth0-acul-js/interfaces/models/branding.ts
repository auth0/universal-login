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

/**
 * How the identifier fields are laid out on the login and signup screens.
 *
 * - `'unified'`: a single input accepting any enabled identifier.
 * - `'separate'`: one input per enabled identifier.
 */
export type LoginDisplay = 'unified' | 'separate';

/**
 * How much of an already-entered phone number is revealed when it is displayed back to the user.
 *
 * - `'show_all'`: the full number, country code included.
 * - `'hide_country_code'`: the national digits only.
 * - `'mask_digits'`: the digits obscured.
 */
export type PhoneMasking = 'show_all' | 'hide_country_code' | 'mask_digits';

/**
 * How a phone number is formatted for display.
 *
 * - `'regional'`: the national convention for the number's country.
 * - `'international'`: the international form, dial code included.
 */
export type PhoneFormatting = 'regional' | 'international';

export interface ThemeIdentifiersContext {
  login_display?: LoginDisplay;
  otp_autocomplete?: boolean;
  phone_display?: {
    masking?: PhoneMasking;
    formatting?: PhoneFormatting;
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
  loginDisplay?: LoginDisplay;
  otpAutocomplete?: boolean;
  phoneDisplay?: {
    masking?: PhoneMasking;
    formatting?: PhoneFormatting;
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
