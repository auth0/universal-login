import type { CountryCodesContext, CountryCodesMembers } from '../../interfaces/models/country-codes';

/**
 * @class CountryCodes
 * @description Provides access to the country codes available for phone number entry,
 * including the recommended default country code for the current context.
 * @implements {CountryCodesMembers}
 */
export class CountryCodes implements CountryCodesMembers {
  /** @property {AvailableCountryCode[] | null} available - List of available country codes with label and dial code */
  available: CountryCodesMembers['available'];

  /** @property {string | null} recommended - The recommended country code (ISO 3166-1 alpha-2), if any */
  recommended: CountryCodesMembers['recommended'];

  /**
   * @constructor
   * @param {CountryCodesContext | undefined} countryCodes - The country codes context from Universal Login
   */
  constructor(countryCodes: CountryCodesContext | undefined) {
    this.available = CountryCodes.getAvailable(countryCodes);
    this.recommended = countryCodes?.recommended ?? null;
  }

  /**
   * @static
   * @method getAvailable
   * @description Extracts and transforms the available country codes from the context
   * @param {CountryCodesContext | undefined} countryCodes - The country codes context
   * @returns {AvailableCountryCode[] | null} Transformed country codes or null if unavailable
   */
  static getAvailable(countryCodes: CountryCodesContext | undefined): CountryCodesMembers['available'] {
    if (!Array.isArray(countryCodes?.available)) return null;

    return countryCodes.available.map((countryCode) => ({
      code: countryCode.code,
      label: countryCode.label,
      dialCode: countryCode.dial_code,
    }));
  }
}
