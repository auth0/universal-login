import { ALL_IDENTIFIERS, Identifiers, TypedFields } from '../constants/identifiers';

import type {
  NormalizedTypedIdentifierPayload,
  TypedIdentifierPayload,
} from '../../interfaces/utils/typed-identifier';
import type { IdentifierType } from '../constants/identifiers';

/** The field carrying the identifier, per type. Mirrors the server's own `ACTIVE_FIELD_BY_TYPE`. */
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
 * Maps the identifier options onto the login endpoint's own field names: `identifier_type` plus the
 * `identifier_*` field for that type, and `identifier_phone_country_code` for phone. The server then
 * reads the value as that type instead of inferring one from its shape.
 *
 * Degrades to the legacy contract — `username` alone, type inferred — for no or unrecognized
 * `identifierType`, and for a `phone` with no country code, which the typed path would leave
 * unprefixed. `username` is always kept: a tenant without typed processing reads only it.
 *
 * @param payload - The login payload as supplied by the caller.
 * @returns A new payload using the server's field names. Wider than `LoginOptions`.
 */
export function normalizeTypedIdentifier(
  payload: TypedIdentifierPayload
): NormalizedTypedIdentifierPayload {
  const { identifierType, phoneCountryCode, ...rest } = payload;

  // Not typed. phoneCountryCode goes too: with no type, nothing reads it.
  if (!isIdentifierType(identifierType)) return rest;

  const identifier = typeof rest.username === 'string' ? rest.username : '';

  if (identifierType === Identifiers.PHONE) {
    const country = typeof phoneCountryCode === 'string' ? phoneCountryCode.trim() : '';

    // `identifier_type` suppresses the server's own prefixing, and the typed path prefixes nothing
    // without a country — the number would be submitted with no dial code and match no user.
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
