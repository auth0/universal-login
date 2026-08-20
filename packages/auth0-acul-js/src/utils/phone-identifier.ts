import { TypedFields } from '../constants/identifiers';

import type {
  NormalizedPhoneIdentifierPayload,
  PhoneIdentifierField,
  PhoneIdentifierPayload,
} from '../../interfaces/utils/phone-identifier';

/**
 * Maps a signup payload's phone options onto the fields the signup endpoint reads.
 *
 * `phone_number` is always submitted. A `phoneCountryCode` additionally sends
 * `identifier_phone` + `identifier_phone_country_code`, letting the server prefix the dial code
 * from the given country instead of deriving one itself.
 *
 * @param payload - The signup payload as supplied by the caller.
 * @param phoneField - The key holding the phone number (`phoneNumber` on signup, `phone` on signup-id).
 * @returns A new payload, unchanged when it carries no phone number.
 */
export function normalizePhoneIdentifier(
  payload: PhoneIdentifierPayload,
  phoneField: PhoneIdentifierField
): NormalizedPhoneIdentifierPayload {
  const phoneNumber = payload[phoneField];
  const { phoneCountryCode, ...rest } = payload;

  // No number to map. phoneCountryCode still goes, since alone it identifies nothing.
  if (typeof phoneNumber !== 'string' || !phoneNumber.trim()) return rest;

  delete rest[phoneField];

  if (typeof phoneCountryCode === 'string' && phoneCountryCode.trim()) {
    return {
      ...rest,
      phone_number: phoneNumber,
      [TypedFields.PHONE]: phoneNumber,
      [TypedFields.PHONE_COUNTRY_CODE]: phoneCountryCode,
    };
  }

  return { ...rest, phone_number: phoneNumber };
}
