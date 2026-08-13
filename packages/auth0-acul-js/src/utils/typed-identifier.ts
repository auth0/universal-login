import { ALL_IDENTIFIERS, Identifiers, TypedFields } from '../constants/identifiers';

import type {
  NormalizedTypedIdentifierPayload,
  TypedIdentifierPayload,
} from '../../interfaces/utils/typed-identifier';
import type { IdentifierType } from '../constants/identifiers';

/**
 * The submitted field that carries the identifier, per type. Phone is absent because it also needs
 * the country code, so it is handled separately.
 */
const FIELD_BY_IDENTIFIER_TYPE = {
  [Identifiers.EMAIL]: TypedFields.EMAIL,
  [Identifiers.USERNAME]: TypedFields.USERNAME,
  [Identifiers.PHONE]: TypedFields.PHONE,
} as const;

/**
 * Narrows an arbitrary option value to a supported identifier type.
 */
function isIdentifierType(value: unknown): value is IdentifierType {
  return typeof value === 'string' && (ALL_IDENTIFIERS as string[]).includes(value);
}

/**
 * Reshapes a login payload's identifier options into the fields the login endpoint expects.
 *
 * Which contract applies is decided by whether the caller supplies `identifierType`:
 *
 * - With `identifierType`: the typed contract. The value in `username` is submitted under the field
 *   for that type (`identifier_email`, `identifier_username` or `identifier_phone`) alongside
 *   `identifier_type`, and the server stops inferring a type from the value's shape. For `phone`,
 *   a `phoneCountryCode` is submitted as `identifier_phone_country_code` and the server prefixes
 *   that country's dial code, so `username` should be the national number without one.
 * - Without `identifierType`: the legacy contract. `username` is submitted on its own and the
 *   server infers what it is.
 *
 * `username` is deliberately left on a typed payload rather than moved. The server overwrites it
 * from the typed field when typed processing is enabled, so it is redundant there — but when a
 * tenant has not enabled typed processing the server ignores the typed fields entirely, and a
 * payload without `username` would then be rejected for a missing identifier. Keeping it makes an
 * unflagged tenant degrade to the legacy contract instead of failing.
 *
 * An unrecognized `identifierType` degrades to the legacy contract, matching how
 * `normalizePhoneIdentifier` treats a blank country code. The camelCase options are always removed
 * so a payload never carries both spellings.
 *
 * @param payload - The login payload as supplied by the caller.
 * @returns A new payload with the identifier options mapped onto the server's field names. The
 * return type is wider than `LoginOptions` by design, since the mapped payload no longer carries
 * the camelCase options that type describes.
 */
export function normalizeTypedIdentifier(
  payload: TypedIdentifierPayload
): NormalizedTypedIdentifierPayload {
  const { identifierType, phoneCountryCode, ...rest } = payload;

  // Not a typed submission. Drop phoneCountryCode all the same: without a type the server reads no
  // country code on these screens, and leaving it in would submit an unread field.
  if (!isIdentifierType(identifierType)) return rest;

  const identifier = typeof rest.username === 'string' ? rest.username : '';

  if (identifierType === Identifiers.PHONE) {
    const country = typeof phoneCountryCode === 'string' ? phoneCountryCode.trim() : '';

    return {
      ...rest,
      [TypedFields.TYPE]: identifierType,
      [TypedFields.PHONE]: identifier,
      // Omitted when blank: on the typed contract an empty country code would have the server
      // prefix nothing, whereas omitting it lets the server derive the country itself.
      ...(country ? { [TypedFields.PHONE_COUNTRY_CODE]: country } : {}),
    };
  }

  return {
    ...rest,
    [TypedFields.TYPE]: identifierType,
    [FIELD_BY_IDENTIFIER_TYPE[identifierType]]: identifier,
  };
}
