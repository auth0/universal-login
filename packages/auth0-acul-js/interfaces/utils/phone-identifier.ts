/** A signup payload as supplied by the caller, before its phone options are reshaped. */
export interface PhoneIdentifierPayload {
  [key: string]: string | number | boolean | undefined;
}

/**
 * The SDK option holding the phone number, which differs per screen: the signup screen exposes
 * `phoneNumber`, signup-id exposes `phone`.
 */
export type PhoneIdentifierField = 'phone' | 'phoneNumber';

/**
 * A signup payload with its phone options mapped onto the field names the signup endpoint reads.
 * Wider than `SignupOptions`, which no longer describes the mapped result.
 */
export interface NormalizedPhoneIdentifierPayload extends PhoneIdentifierPayload {
  /** The national phone number. Pairs with `identifier_phone_country_code`. */
  identifier_phone?: string;

  /** The ISO 3166-1 alpha-2 country the server prefixes the dial code from. */
  identifier_phone_country_code?: string;

  /** The phone number. Always present when the payload carries one. */
  phone_number?: string;
}
