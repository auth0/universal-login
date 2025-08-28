/**
 * Represents the types of user identifiers that can be used during signup.
 *
 * - `'email'`: The user will provide an email address.
 * - `'phone'`: The user will provide a phone number.
 * - `'username'`: The user will choose a username.
 *
 * This type is typically used in identity selection or signup flows
 * to define which identifiers are enabled and how they behave.
 *
 * @example
 * ```ts
 * const type: IdentifierType = 'email';
 * ```
 */
export type IdentifierType = 'email' | 'phone' | 'username';

/**
 * Describes a configured identifier field (e.g. email, phone, or username)
 * for use in a signup form or authentication flow.
 *
 * @example
 * ```ts
 * const emailIdentifier: Identifier = {
 *   type: 'email',
 *   required: true
 * };
 * ```
 */
export interface Identifier {
  /**
   * The type of identifier, such as `'email'`, `'phone'`, or `'username'`.
   *
   * @see IdentifierType
   */
  type: IdentifierType;

  /**
   * Whether this identifier is required for signup.
   */
  required: boolean;
}
