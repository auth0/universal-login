/**
 * A submit payload as accepted by the signup screens, before it is mapped onto the server's
 * typed (composite) phone contract.
 *
 * @example
 * ```ts
 * const payload: TypedPhonePayloadOptions = {
 *   phoneNumber: '4155551234',
 *   phoneCountryCode: 'US',
 *   password: 'P@$$wOrd123!'
 * };
 * ```
 */
export interface TypedPhonePayloadOptions {
  /**
   * The ISO 3166-1 alpha-2 country code for the phone number (e.g. `'US'`, `'IN'`).
   *
   * When present alongside a phone number, the payload is submitted using the typed phone
   * contract and this code is authoritative — the server prefixes the matching dial code
   * rather than inferring one from geolocation.
   */
  phoneCountryCode?: string;

  [key: string]: string | number | boolean | undefined;
}

/**
 * Options describing how a payload's phone field maps onto the typed phone contract.
 *
 * @example
 * ```ts
 * const options: TypedPhoneOptions = { phoneKeys: ['phoneNumber'], legacyKey: 'phone_number' };
 * ```
 */
export interface TypedPhoneOptions {
  /**
   * The payload keys that may carry the phone number, in priority order. The first key holding
   * a non-empty string wins (e.g. `['phoneNumber', 'phone_number']`).
   */
  phoneKeys: string[];

  /**
   * The discrete field name the phone number is submitted as when the typed contract does not
   * apply — that is, when no `phoneCountryCode` was supplied. Defaults to `'phone_number'`.
   */
  legacyKey?: string;
}

/**
 * A submit payload after the typed phone mapping has been applied. Ready to hand to
 * `FormHandler.submitData`, which renders one hidden form field per key.
 */
export type TypedPhoneResult = Record<string, string | number | boolean | undefined>;
