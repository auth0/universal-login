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
 * Reads an option only when it holds a string, so a caller's stray number or boolean is treated as
 * absent rather than submitted as an identifier.
 */
function readOption(payload: TypedIdentifierPayload, key: string): string | undefined {
  const value = payload[key];
  return typeof value === 'string' ? value : undefined;
}

/** Narrows an arbitrary option value to a supported identifier type. */
function isIdentifierType(value: unknown): value is IdentifierType {
  return typeof value === 'string' && (ALL_IDENTIFIERS as string[]).includes(value);
}

/**
 * Maps the identifier and `identifierType` onto the login endpoint's field names: `identifier_type`,
 * the `identifier_*` field for that type, and `identifier_phone_country_code` for phone. The server
 * then reads the value as that type instead of inferring one from its shape, and collapses it back
 * onto `username` internally.
 *
 * The identifier stays denormalized on the way in — one value, its type named separately — which
 * mirrors how the endpoint models it. Callers name that value `identifier`, which pairs with
 * `identifierType`; `username` is its original spelling and still accepted, so `identifier` wins when
 * both are supplied. Either way the value goes out as `username`, the only identifier field the
 * endpoint reads and the only one a tenant without typed processing sees.
 *
 * Degrades to that untyped contract, leaving the payload as supplied, when `identifierType` names no
 * supported type, and for `'phone'` with no country code — a typed phone suppresses the server's own
 * prefixing, so it would go out with no dial code and match no user.
 *
 * @param payload - The login payload as supplied by the caller.
 * @returns A new payload using the server's field names. Wider than `LoginOptions`.
 */
export function normalizeTypedIdentifier(
  payload: TypedIdentifierPayload
): NormalizedTypedIdentifierPayload {
  const identifierType = payload.identifierType;
  const phoneCountryCode = readOption(payload, 'phoneCountryCode');
  const identifier = readOption(payload, 'identifier') ?? readOption(payload, 'username');

  // None of these is a field the endpoint reads: `identifier` is submitted as `username`, and the
  // other two become `identifier_type` and `identifier_phone_country_code` on the typed path.
  // Removed so a payload never carries both spellings of the same value.
  const rest = { ...payload };
  delete rest.identifier;
  delete rest.identifierType;
  delete rest.phoneCountryCode;
  if (identifier !== undefined) rest.username = identifier;

  // No type named, so submit untyped and let the server infer one from the value's shape.
  if (!isIdentifierType(identifierType)) return rest;

  // `identifier_type` suppresses the server's own prefixing, and the typed path prefixes nothing
  // without a country — the number would be submitted with no dial code and match no user.
  if (identifierType === Identifiers.PHONE && !phoneCountryCode?.trim()) return rest;

  return {
    ...rest,
    [TypedFields.TYPE]: identifierType,
    [FIELD_BY_IDENTIFIER_TYPE[identifierType]]: identifier ?? '',
    ...(identifierType === Identifiers.PHONE
      ? { [TypedFields.PHONE_COUNTRY_CODE]: phoneCountryCode?.trim() }
      : {}),
  };
}
