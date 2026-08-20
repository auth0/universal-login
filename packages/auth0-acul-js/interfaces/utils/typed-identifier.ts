import type { IdentifierType } from '../../src/constants';

/**
 * The identifier to login with, under either of its names. Exactly one is required: `identifier`,
 * which pairs with `identifierType`, or `username`, its original spelling, which remains accepted so
 * existing callers keep working. Supplying both is not an error — `identifier` wins.
 *
 * @remarks
 * Shared by the `login` and `login-id` screens, whose `LoginOptions` each intersect it with their own
 * remaining fields.
 */
export type LoginIdentifierOptions =
  | { identifier: string; username?: string }
  | { username: string; identifier?: string };

/**
 * A login payload as supplied by the caller, before its identifier options are mapped for submission.
 * Matches the index signature both screens' `LoginOptions` carry, so either is assignable without a
 * cast.
 */
export interface TypedIdentifierPayload {
  /**
   * The identifier, whatever its type; `identifierType` names what it holds. Submitted as
   * `username`, the only identifier field the endpoint reads.
   */
  identifier?: string;

  /** The identifier's original spelling, still accepted. Superseded by `identifier`. */
  username?: string;

  /**
   * The type `username` holds. Its absence submits the payload untyped, with the server inferring
   * the type from the value's shape.
   */
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
