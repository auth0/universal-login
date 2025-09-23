import { ConnectionStrategy } from '../constants';

import type { Identifier, IdentifierType } from '../../interfaces/utils/get-enabled-identifiers';

const passwordlessStrategyToIdentifier: Record<string, IdentifierType> = {
  email: 'email',
  sms: 'phone',
};

/**
 * Returns a list of enabled identifiers (email, phone, or username), each with its `required` status,
 * based on the given required and optional identifiers, and the connection strategy.
 *
 * @param requiredIdentifiers - An array of identifier types (e.g., `['email', 'phone']`) marked as required.
 * @param optionalIdentifiers - An array of identifier types marked as optional.
 * @param connectionStrategy - The connection strategy string (e.g., `'email'`, `'sms'`, `'auth0'`, etc.).
 *
 * @returns An array of `Identifier` objects, where each contains a `type` (identifier type)
 * and a `required` flag indicating whether it is mandatory for signup.
 *
 */
export function getSignupIdentifiers(
  requiredIdentifiers: Array<IdentifierType>,
  optionalIdentifiers: Array<IdentifierType>,
  connectionStrategy: string | null
): Identifier[] {
  // Handle passwordless strategy
  if (connectionStrategy === ConnectionStrategy.EMAIL || connectionStrategy === ConnectionStrategy.SMS) {
    const identifierType = passwordlessStrategyToIdentifier[connectionStrategy];
    return [
      {
        type: identifierType,
        required: true, // Passwordless identifiers are always required
      },
    ];
  }

  const requiredMapped: Identifier[] = requiredIdentifiers?.map((type) => ({
    type,
    required: true,
  })) ?? [];

  const optionalMapped: Identifier[] = optionalIdentifiers?.map((type) => ({
    type,
    required: false,
  })) ?? [];

  return [...requiredMapped, ...optionalMapped];
}
