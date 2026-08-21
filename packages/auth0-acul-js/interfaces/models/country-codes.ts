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
  /** ISO 3166-1 alpha-2, e.g. `"US"`. Submitted as `phoneCountryCode`. Not unique across the list. */
  code: string;
  /** The country name, localized to the render locale. */
  label: string;
  /** The dial code with its leading plus, e.g. `"+1"`. Display only. */
  dialCode: string;
}

/* @namespace CountryCodes */
export interface CountryCodesMembers {
  /**
   * Countries available for phone entry, sorted by localized `label`. `null` unless the screen's
   * rendering configuration asks for them: `{ "context_configuration": ["country_codes"] }`.
   *
   * `code` is not unique — a country with several dial codes contributes one entry per code — so key a
   * rendered list on `code` and `dialCode` together. Only `code` is submitted, so those entries are not
   * independently selectable.
   */
  available: AvailableCountryCode[] | null;
  /** ISO 3166-1 alpha-2 code to preselect, not an index into `available`. `null` when unresolved. */
  recommended: string | null;
}
