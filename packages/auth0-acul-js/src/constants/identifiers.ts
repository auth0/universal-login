/**
 * Constants for identifier types used throughout the application
 */
export const Identifiers = {
  EMAIL: 'email' as const,
  USERNAME: 'username' as const,
  PHONE: 'phone' as const,
} as const;

export const Fields = {
  EMAIL: 'email' as const,
  USERNAME: 'username' as const,
  PHONE: 'phone' as const,
  PASSWORD: 'password' as const
}

/**
 * Server field names for the typed identifier contract, where the identifier is submitted with the
 * type it represents instead of the server inferring it from the value. `TYPE` is the signal: the
 * server reads the other fields only when it is present.
 *
 * All five apply on login and login-id; signup and signup-id read only `PHONE` and
 * `PHONE_COUNTRY_CODE`.
 */
export const TypedFields = {
  TYPE: 'identifier_type' as const,
  EMAIL: 'identifier_email' as const,
  USERNAME: 'identifier_username' as const,
  PHONE: 'identifier_phone' as const,
  PHONE_COUNTRY_CODE: 'identifier_phone_country_code' as const,
} as const;

/**
 * Type representing valid identifier values
 */
export type IdentifierType = 'phone' | 'email' | 'username';

/**
 * Array of all available identifiers
 */
export const ALL_IDENTIFIERS: IdentifierType[] = [Identifiers.EMAIL, Identifiers.USERNAME, Identifiers.PHONE];
