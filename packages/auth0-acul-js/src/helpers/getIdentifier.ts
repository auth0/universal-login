import { BaseContext } from '../models/base-context';

import type { DBConnection } from '../../interfaces/models/transaction';

type IdentifierType = 'email' | 'phone' | 'username';

export interface Identifier {
  type: IdentifierType;
  required: boolean;
}

/**
 * Type guard to ensure connection is of type DBConnection.
 */
function isDBConnection(conn: unknown): conn is DBConnection {
  return typeof conn === 'object' && conn !== null && 'options' in conn;
}

/**
 * Returns the list of identifiers (email, phone, username) with their required status
 * based on transaction context's connection configuration.
 *
 * @example
 * getIdentifier();
 * // Returns: [{ type: 'email', required: true }, { type: 'username', required: false }]
 */
function getIdentifier(): Identifier[] {
  const context = new BaseContext();
  const transactionContext = context.getContext('transaction');

  if (!transactionContext?.connection) return [];

  const connection = transactionContext.connection;

  // Safely check if it's a DBConnection
  if (!isDBConnection(connection) || !connection.options?.attributes) {
    return [];
  }

  const attributes = connection.options.attributes;
  const identifiers: Identifier[] = [];

  const identifierFields: IdentifierType[] = ['email', 'phone', 'username'];

  for (const field of identifierFields) {
    const attr = attributes[field];
    if (!attr || attr.signup_status === 'inactive') {
      continue;
    }

    identifiers.push({
      type: field,
      required: attr.signup_status === 'required',
    });
  }

  return identifiers;
}

export default getIdentifier;
