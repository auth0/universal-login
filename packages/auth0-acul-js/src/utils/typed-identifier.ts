import { TypedFields } from '../constants/identifiers';

import type {
  TypedPhoneOptions,
  TypedPhonePayloadOptions,
  TypedPhoneResult,
} from '../../interfaces/utils/typed-identifier';

/**
 * Maps a phone number and its country code onto the server's typed (composite) phone contract,
 * submitting them as the separate `identifier_phone` and `identifier_phone_country_code` fields.
 *
 * The submitted country code is authoritative: the server prefixes the matching dial code onto
 * the digits, so the caller passes national digits only and never a dial code. When no country
 * code is supplied the typed contract does not apply, and the phone number is submitted as the
 * discrete field named by `legacyKey` — leaving the server to resolve the country itself.
 *
 * @param payload - The caller's submit payload, of type {@link TypedPhonePayloadOptions}.
 * @param options - {@link TypedPhoneOptions}
 * @returns The payload to submit, carrying either the typed fields or the discrete phone field.
 * The input payload is not mutated.
 *
 * @example
 * ```ts
 * applyTypedPhone(
 *   { phoneNumber: '4155551234', phoneCountryCode: 'US', password: 'P@$$wOrd123!' },
 *   { phoneKeys: ['phoneNumber'] }
 * );
 * // => { password: 'P@$$wOrd123!', identifier_phone: '4155551234', identifier_phone_country_code: 'US' }
 * ```
 */
export function applyTypedPhone(
  payload: TypedPhonePayloadOptions,
  options: TypedPhoneOptions
): TypedPhoneResult {
  const { phoneKeys, legacyKey = 'phone_number' } = options;
  const { phoneCountryCode, ...rest } = payload;

  const phoneKey = phoneKeys.find((key) => typeof rest[key] === 'string' && rest[key].trim());
  if (!phoneKey) return rest;

  const phoneDigits = (rest[phoneKey] as string).trim();
  const countryCode = phoneCountryCode?.trim() ?? '';

  // Remove the caller-facing key so it is not submitted alongside the field the server expects.
  // `FormHandler.submitData` renders a hidden input for every payload key.
  delete rest[phoneKey];

  if (!countryCode) {
    return { ...rest, [legacyKey]: phoneDigits };
  }

  return {
    ...rest,
    [TypedFields.PHONE]: phoneDigits,
    [TypedFields.PHONE_COUNTRY_CODE]: countryCode,
  };
}
