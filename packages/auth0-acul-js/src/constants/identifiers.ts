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
 * Form field names for the composite phone submission contract, where the country code is
 * submitted alongside the national number instead of being picked on a separate screen.
 *
 * The `identifier_` prefix is the server-side contract and avoids colliding with the discrete
 * `email` / `username` / `phone_number` fields.
 */
export const TypedFields = {
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
