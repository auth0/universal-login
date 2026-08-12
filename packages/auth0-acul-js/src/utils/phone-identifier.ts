import { TypedFields } from '../constants/identifiers';

import type {
  NormalizedPhoneIdentifierPayload,
  PhoneIdentifierField,
  PhoneIdentifierPayload,
} from '../../interfaces/utils/phone-identifier';

/**
 * Reshapes a signup payload's phone options into the fields the signup endpoint expects.
 *
 * Two submission contracts exist, and which one applies is decided by whether the caller supplies
 * `phoneCountryCode`:
 *
 * - With `phoneCountryCode`: the composite contract. The number and the country are submitted
 *   together as `identifier_phone` + `identifier_phone_country_code`, and the submitted country is
 *   authoritative: the server prefixes the dial code from it rather than re-deriving one from the
 *   digits or from geo-IP. Use this when rendering a country dropdown next to the number field.
 * - Without `phoneCountryCode`: the discrete contract. The number is submitted as `phone_number`
 *   and the server derives the country itself, matching the historical `pickCountryCode()` flow.
 *
 * The camelCase SDK option is always removed so a payload never carries both spellings.
 *
 * @param payload - The signup payload as supplied by the caller.
 * @param phoneField - The payload key holding the phone number for this screen (`phoneNumber` on
 * signup, `phone` on signup-id).
 * @returns A new payload with the phone options mapped onto the server's field names. Returned
 * unchanged when it carries no phone number. The return type is wider than `SignupOptions` by
 * design, since the mapped payload no longer carries the camelCase options that type describes.
 */
export function normalizePhoneIdentifier(
  payload: PhoneIdentifierPayload,
  phoneField: PhoneIdentifierField
): NormalizedPhoneIdentifierPayload {
  const phoneNumber = payload[phoneField];
  const { phoneCountryCode, ...rest } = payload;

  // Nothing to map. Drop phoneCountryCode all the same: on its own it identifies no number, and
  // leaving it in would submit an unread field.
  if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) return rest;

  delete rest[phoneField];

  if (typeof phoneCountryCode === 'string' && phoneCountryCode.trim()) {
    return {
      ...rest,
      [TypedFields.PHONE]: phoneNumber,
      [TypedFields.PHONE_COUNTRY_CODE]: phoneCountryCode,
    };
  }

  return { ...rest, phone_number: phoneNumber };
}
