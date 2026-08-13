import type { IdentifierType } from '../../src/constants';

/**
 * A login payload as supplied by the caller, before its identifier options are reshaped for
 * submission.
 *
 * Matches the index signature `LoginOptions` carries on both the login and login-id screens, so
 * either screen's options are assignable here without a cast. `username` is optional here but
 * required on both `LoginOptions`, which is the stricter side of the assignment.
 */
export interface TypedIdentifierPayload {
  /** The identifier value, whatever type it represents. */
  username?: string;

  /** The type `username` holds. Its presence selects the typed contract. */
  identifierType?: IdentifierType;

  /** The ISO 3166-1 alpha-2 country for a phone identifier. Required when the type is `phone`. */
  phoneCountryCode?: string;

  [key: string]: string | number | boolean | undefined;
}

/**
 * A login payload with its identifier options mapped onto the field names the login endpoint reads.
 *
 * Deliberately widened from `LoginOptions`: the mapped payload is no longer one, since the
 * camelCase options are gone and the wire fields have taken their place. The known login fields
 * that were not touched still ride along under the index signature.
 */
export interface NormalizedTypedIdentifierPayload extends TypedIdentifierPayload {
  /**
   * The type the submitted identifier represents. The server treats its presence as the signal to
   * read the typed fields at all, so it is never omitted from a typed submission.
   */
  identifier_type?: IdentifierType;

  /** The email address, submitted when the type is `email`. */
  identifier_email?: string;

  /** The username, submitted when the type is `username`. */
  identifier_username?: string;

  /** The phone number, submitted when the type is `phone`. */
  identifier_phone?: string;

  /**
   * The ISO 3166-1 alpha-2 country the server prefixes the dial code from. Paired with
   * `identifier_phone`.
   */
  identifier_phone_country_code?: string;
}
