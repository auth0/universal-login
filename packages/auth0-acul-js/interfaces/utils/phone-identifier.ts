/**
 * A signup payload as supplied by the caller, before its phone options are reshaped for
 * submission.
 *
 * Matches the index signature `SignupOptions` carries on both the signup and signup-id screens, so
 * either screen's options are assignable here without a cast.
 */
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
 *
 * Deliberately widened from `SignupOptions`: the mapped payload is no longer one, since the
 * camelCase options are gone and the wire fields (`identifier_phone`,
 * `identifier_phone_country_code`, `phone_number`) have taken their place. The known signup fields
 * that were not touched still ride along under the index signature.
 */
export interface NormalizedPhoneIdentifierPayload extends PhoneIdentifierPayload {
  /**
   * The national phone number, submitted with a country. Paired with
   * `identifier_phone_country_code`.
   */
  identifier_phone?: string;

  /** The ISO 3166-1 alpha-2 country the server prefixes the dial code from. */
  identifier_phone_country_code?: string;

  /** The phone number submitted on its own, for the server to derive the country from. */
  phone_number?: string;
}
