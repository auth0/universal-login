import { ALL_IDENTIFIERS, Identifiers, TypedFields } from '../constants/identifiers';

import type {
  NormalizedTypedIdentifierPayload,
  TypedIdentifierPayload,
} from '../../interfaces/utils/typed-identifier';
import type { IdentifierType } from '../constants/identifiers';

/**
 * The submitted field that carries the identifier, per type. Mirrors the server's own
 * `ACTIVE_FIELD_BY_TYPE`, which covers all three types — that is the field the server validates as
 * the identifier and reads the value from. Phone is submitted in its own branch below because it
 * carries an additional country code, which the server reads separately from this field.
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
 * With `identifierType`, the value in `username` is also submitted as `identifier_email`,
 * `identifier_username` or `identifier_phone` alongside `identifier_type`, and the server reads it as
 * that type rather than guessing from its shape. `phone` additionally needs a `phoneCountryCode`,
 * whose dial code the server prefixes, so `username` should be the national number without one.
 *
 * Everything else degrades to the legacy contract, where `username` is submitted alone and the server
 * infers the type: no `identifierType`, an unrecognized one, or a `phone` with no country code, which
 * the typed path would otherwise leave unprefixed. `username` is kept on typed payloads for the same
 * reason — a tenant without typed processing enabled ignores the typed fields. Fields already passed
 * under the server's own names are forwarded untouched; the camelCase options are always removed.
 *
 * @param payload - The login payload as supplied by the caller.
 * @returns A new payload with the identifier options mapped onto the server's field names. Wider
 * than `LoginOptions`, which no longer describes the mapped result.
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

    // `identifier_type` suppresses the server's own country-code prefixing, and the typed path
    // prefixes nothing when the country is blank or unrecognized — the number would be submitted
    // with no dial code and match no user. Fall back to the contract that still derives a country.
    if (!country) return rest;

    return {
      ...rest,
      [TypedFields.TYPE]: identifierType,
      [FIELD_BY_IDENTIFIER_TYPE[identifierType]]: identifier,
      [TypedFields.PHONE_COUNTRY_CODE]: country,
    };
  }

  return {
    ...rest,
    [TypedFields.TYPE]: identifierType,
    [FIELD_BY_IDENTIFIER_TYPE[identifierType]]: identifier,
  };
}
