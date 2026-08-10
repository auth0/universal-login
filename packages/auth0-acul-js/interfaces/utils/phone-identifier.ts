/**
 * The subset of a signup payload that {@link normalizePhoneIdentifier} reshapes.
 *
 * Mirrors the index signature of `SignupOptions` on the signup and signup-id screens so the
 * normalized result can be submitted as either without a cast.
 */
export type PhoneIdentifierPayload = Record<string, string | number | boolean | undefined>;

/**
 * The SDK option holding the phone number, which differs per screen: the signup screen exposes
 * `phoneNumber`, signup-id exposes `phone`.
 */
export type PhoneIdentifierField = 'phone' | 'phoneNumber';
