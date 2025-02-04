import type { DBConnection, UsernamePolicy, PasswordPolicy, TransactionContext } from '../../interfaces/models/transaction';
import type { TransactionMembersOnLoginId } from '../../interfaces/screens/login-id';
import type { TransactionMembersOnSignupId } from '../../interfaces/screens/signup-id';

/**
 * Checks if signup is enabled for the current connection.
 */
export function isSignupEnabled(transaction: TransactionContext): boolean {
  return transaction?.connection?.options?.signup_enabled === true;
}

/**
 * Checks if forgot password is enabled.
 */
export function isForgotPasswordEnabled(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.forgot_password_enabled === true;
}

/**
 * Checks if passkeys are enabled in the current connection.
 */
export function isPasskeyEnabled(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.authentication_methods?.passkeys?.enabled ?? false;
}

/**
 * Determines if a username is required for authentication.
 */
export function isUsernameRequired(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.username_required ?? false;
}

/**
 * Retrieves the username policy from the transaction context.
 */
export function getUsernamePolicy(transaction: TransactionContext): UsernamePolicy | null {
  const connection = transaction?.connection as DBConnection;
  const validation = connection?.options?.attributes?.username?.validation;

  if (!validation) return null;

  return {
    maxLength: validation.max_length,
    minLength: validation.min_length,
    allowedFormats: {
      usernameInEmailFormat: validation.allowed_types?.email ?? false,
      usernameInPhoneFormat: validation.allowed_types?.phone_number ?? false,
    },
  };
}

/**
 * Retrieves the password policy from the transaction context.
 */
export function getPasswordPolicy(transaction: TransactionContext): PasswordPolicy | null {
  const connection = transaction?.connection as DBConnection;
  const passwordPolicy = connection?.options?.authentication_methods?.password;

  if (!passwordPolicy) return null;

  return {
    minLength: passwordPolicy.min_length,
    policy: passwordPolicy.policy as PasswordPolicy['policy'],
  };
}

/**
 * Returns the allowed identifiers (email, username, phone) based on the connection settings.
 */
export function getAllowedIdentifiers(transaction: TransactionContext): TransactionMembersOnLoginId['allowedIdentifiers'] {
  const connection = transaction?.connection as DBConnection;
  if (!connection?.options?.attributes) return null;

  return extractIdentifiersByStatus(connection, ['required', 'optional']);
}

/**
 * Returns the required identifiers for signup (email, username, phone).
 */
export function getRequiredIdentifiers(transaction: TransactionContext): TransactionMembersOnSignupId['requiredIdentifiers'] {
  return extractIdentifiersByStatus(transaction?.connection as DBConnection, ['required']);
}

/**
 * Returns the optional identifiers for signup (email, username, phone).
 */
export function getOptionalIdentifiers(transaction: TransactionContext): TransactionMembersOnSignupId['optionalIdentifiers'] {
  return extractIdentifiersByStatus(transaction?.connection as DBConnection, ['optional']);
}

/**
 * Extracts identifiers based on their signup status.
 */
function extractIdentifiersByStatus(
  connection: DBConnection | undefined,
  statuses: ('required' | 'optional')[],
): ('email' | 'username' | 'phone')[] | null {
  if (!connection?.options?.attributes) return null;

  return Object.entries(connection.options.attributes)
    .filter(([, value]) => value.signup_status && statuses.includes(value.signup_status as 'required' | 'optional'))
    .map(([key]) => key as 'email' | 'username' | 'phone').length > 0
    ? Object.entries(connection.options.attributes)
        .filter(([, value]) => value.signup_status && statuses.includes(value.signup_status as 'required' | 'optional'))
        .map(([key]) => key as 'email' | 'username' | 'phone')
    : null;
}
