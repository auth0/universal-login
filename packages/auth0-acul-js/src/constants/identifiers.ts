/**
 * Constants for identifier types used throughout the application
 */
export const Identifiers = {
  EMAIL: 'email' as const,
  USERNAME: 'username' as const,
  PHONE: 'phone' as const,
} as const;

/**
 * Type representing valid identifier values
 */
export type IdentifierType = 'phone' | 'email' | 'username';

/**
 * Array of all available identifiers
 */
export const ALL_IDENTIFIERS: IdentifierType[] = [Identifiers.EMAIL, Identifiers.USERNAME, Identifiers.PHONE];
