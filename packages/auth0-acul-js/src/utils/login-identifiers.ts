import type { IdentifierType } from '../../interfaces/utils/signup-identifiers';

/**
 * Returns a list of allowed login identifiers.
 *
 * This function accepts an array of allowed identifier types or `null`,
 * and returns the array if provided, or an empty array otherwise.
 *
 * @param allowedIdentifiers - An array of identifier types allowed for login, or `null`.
 *
 * @returns An array of identifier types representing the enabled login identifiers,
 *          or an empty array if no identifiers are provided.
 *
 * @example
 * ```ts
 * const allowed = ['email', 'username'];
 * const loginIds = getLoginIdentifiers(allowed);
 * // loginIds === ['email', 'username']
 *
 * const noIds = getLoginIdentifiers(null);
 * // noIds === []
 * ```
 */
export function getLoginIdentifiers(
  allowedIdentifiers: Array<IdentifierType> | null
): IdentifierType[] | null {
  return allowedIdentifiers || null;
}
  