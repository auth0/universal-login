import { BaseContext } from '../models/base-context';

import type { IdentifierType } from '../../interfaces/models/screen';
import type { DBConnection } from '../../interfaces/models/transaction';


/**
 * Type guard to ensure connection is of type DBConnection.
 */
function isDBConnection(conn: unknown): conn is DBConnection {
  return typeof conn === 'object' && conn !== null && 'options' in conn;
}

/**
 * Returns a list of active identifiers for login
 * (e.g., ['email', 'username']) based on `identifier_active` flag.
 */
function getActiveIdentifiers(): IdentifierType[] {
  const context = new BaseContext();
  const transactionContext = context.getContext('transaction');

  if (!transactionContext?.connection) return [];

  const connection = transactionContext.connection;

  // Safely check if it's a DBConnection
  if (!isDBConnection(connection) || !connection.options?.attributes) {
    return [];
  }

  const attributes = connection.options.attributes;
  const identifierFields: IdentifierType[] = ['email', 'phone', 'username'];
  const activeIdentifiers: IdentifierType[] = [];

  for (const field of identifierFields) {
    const attr = attributes[field];
    if (attr?.identifier_active === true) {
      activeIdentifiers.push(field);
    }
  }

  return activeIdentifiers;
}

export default getActiveIdentifiers;
