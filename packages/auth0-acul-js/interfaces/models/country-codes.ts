export interface AvailableCountryCodeContext {
  code: string;
  label: string;
  dial_code: string;
}

export interface CountryCodesContext {
  available?: AvailableCountryCodeContext[];
  recommended?: string;
}

export interface AvailableCountryCode {
  code: string;
  label: string;
  dialCode: string;
}

/* @namespace CountryCodes */
export interface CountryCodesMembers {
  available: AvailableCountryCode[] | null;
  recommended: string | null;
}
