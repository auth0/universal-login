import type { IdentifierType } from '../../src/constants';

/**
 * A login payload as supplied by the caller, before its identifier options are mapped for submission.
 * Matches the index signature both screens' `LoginOptions` carry, so either is assignable without a
 * cast.
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
 * Deliberately wider than `LoginOptions`, which no longer describes the mapped result.
 */
export interface NormalizedTypedIdentifierPayload extends TypedIdentifierPayload {
  /** The submitted type. Its presence is the server's signal to read the typed fields at all. */
  identifier_type?: IdentifierType;

  /** The email address, submitted when the type is `email`. */
  identifier_email?: string;

  /** The username, submitted when the type is `username`. */
  identifier_username?: string;

  /** The phone number, submitted when the type is `phone`. */
  identifier_phone?: string;

  /** The ISO 3166-1 alpha-2 country whose dial code the server prefixes. Pairs with `identifier_phone`. */
  identifier_phone_country_code?: string;
}
