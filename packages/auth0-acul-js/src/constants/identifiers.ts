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
 * Form field names for the server's typed (composite) identifier contract. The `identifier_`
 * prefix keeps these distinct from the legacy discrete fields in {@link Fields}, which the
 * server continues to accept.
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
