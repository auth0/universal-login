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
 * Form field names for the typed identifier submission contract, where the identifier is submitted
 * together with the type it represents instead of the server inferring the type from the value.
 *
 * The `identifier_` prefix is the server-side contract and avoids colliding with the discrete
 * `email` / `username` / `phone_number` fields.
 *
 * `TYPE` is the version signal: the server only reads the other fields when it is present, so a
 * typed submission must always carry it. `PHONE_COUNTRY_CODE` additionally selects the composite
 * phone contract, where the country is submitted alongside the national number instead of being
 * picked on a separate screen.
 *
 * The signup and signup-id screens read only `PHONE` and `PHONE_COUNTRY_CODE`; they ignore `TYPE`,
 * `EMAIL` and `USERNAME`. All five apply on login and login-id.
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
