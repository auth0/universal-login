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

/** The type the caller asked for, the value to submit as it, and whether a discrete option named it. */
interface ResolvedIdentifier {
  type: IdentifierType;
  value: string;
  fromDiscreteOption: boolean;
}

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
 * Decides which type to submit the identifier as, or `null` when no option names one — the payload
 * then goes out untyped and the server infers the type from the value's shape.
 *
 * Ordered, most specific first; first match wins. That order also picks between several filled
 * options, which are ignored rather than rejected — throwing would turn a payload the previous
 * contract submitted into a rejected promise.
 *  1. A filled `email` or `phone` — each names its own type, and beats a blank sibling.
 *  2. A filled `username` — names no type, so `identifierType` decides. Typing it by default would
 *     make every caller passing an email through it submit `identifier_type: 'username'`.
 *  3. A blank `email` or `phone` — still selects its type, earning `identifier-required` naming the
 *     empty field. A blank `phone` with no country code degrades to untyped instead, since a typed
 *     phone with no dial code matches no user.
 *  4. `identifierType` with no value — submits the type with an empty identifier.
 */
function resolveIdentifier(
  email: string | undefined,
  phone: string | undefined,
  username: string | undefined,
  identifierType: unknown
): ResolvedIdentifier | null {
  if (email?.trim()) return { type: Identifiers.EMAIL, value: email, fromDiscreteOption: true };
  if (phone?.trim()) return { type: Identifiers.PHONE, value: phone, fromDiscreteOption: true };

  if (username?.trim()) {
    if (!isIdentifierType(identifierType)) return null;
    return { type: identifierType, value: username, fromDiscreteOption: false };
  }

  if (email !== undefined) return { type: Identifiers.EMAIL, value: email, fromDiscreteOption: true };
  if (phone !== undefined) return { type: Identifiers.PHONE, value: phone, fromDiscreteOption: true };

  if (!isIdentifierType(identifierType)) return null;
  return { type: identifierType, value: username ?? '', fromDiscreteOption: false };
}

/**
 * Maps the identifier options onto the login endpoint's field names: `identifier_type`, the
 * `identifier_*` field for that type, and `identifier_phone_country_code` for phone. The server then
 * reads the value as that type instead of inferring one from its shape.
 *
 * Degrades to the legacy contract — `username` alone, type inferred — when no option names a type,
 * and for a `phone` with no country code, which the typed path would leave unprefixed. `username` is
 * always kept: a tenant without typed processing reads only it.
 *
 * More than one identifier is a caller mistake; it resolves by the precedence in
 * {@link resolveIdentifier} and warns rather than throwing.
 *
 * @param payload - The login payload as supplied by the caller.
 * @returns A new payload using the server's field names. Wider than `LoginOptions`.
 */
export function normalizeTypedIdentifier(
  payload: TypedIdentifierPayload
): NormalizedTypedIdentifierPayload {
  const email = readOption(payload, 'email');
  const phone = readOption(payload, 'phone');
  const username = readOption(payload, 'username');
  const phoneCountryCode = readOption(payload, 'phoneCountryCode');

  // Login submits a single identifier, unlike signup, which legitimately collects several at once.
  // Only a genuine mistake reaches here: a screen passing every option it renders leaves the
  // inactive ones blank, and blanks do not count.
  const filled = (
    [
      ['email', email],
      ['phone', phone],
      ['username', username],
    ] as const
  ).filter(([, value]) => value?.trim());

  if (filled.length > 1) {
    console.warn(
      `Login submits a single identifier, but ${filled.map(([name]) => name).join(', ')} all hold a value. ` +
        'Submitting the first by precedence (email, then phone, then username) and ignoring the rest.'
    );
  }

  // The endpoint reads none of these under their SDK names: the resolved value is submitted as the
  // `identifier_*` field for its type instead. Removed so a payload never carries both spellings.
  const rest = { ...payload };
  delete rest.email;
  delete rest.phone;
  delete rest.identifierType;
  delete rest.phoneCountryCode;

  const resolved = resolveIdentifier(email, phone, username, payload.identifierType);

  // No option names a type, so submit untyped and let the server infer it. Neither `email` nor
  // `phone` can reach here — either would have resolved a type.
  if (!resolved) return rest;

  // A discrete option's value is copied into `username`, which remains the legacy carrier: a tenant
  // without typed processing reads only that field. A `username` of its own is already in `rest`.
  const carrier = resolved.fromDiscreteOption ? { username: resolved.value } : {};

  // `identifier_type` suppresses the server's own prefixing, and the typed path prefixes nothing
  // without a country — the number would be submitted with no dial code and match no user.
  if (resolved.type === Identifiers.PHONE && !phoneCountryCode?.trim()) {
    return { ...rest, ...carrier };
  }

  return {
    ...rest,
    ...carrier,
    [TypedFields.TYPE]: resolved.type,
    [FIELD_BY_IDENTIFIER_TYPE[resolved.type]]: resolved.value,
    ...(resolved.type === Identifiers.PHONE
      ? { [TypedFields.PHONE_COUNTRY_CODE]: phoneCountryCode?.trim() }
      : {}),
  };
}
