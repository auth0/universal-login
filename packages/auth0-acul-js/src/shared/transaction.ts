import type {
  DBConnection,
  UsernamePolicy,
  PasswordPolicy,
  TransactionContext,
} from "../../interfaces/models/transaction";
import type { TransactionMembersOnLoginId } from "../../interfaces/screens/login-id";
import type { TransactionMembersOnSignupId } from "../../interfaces/screens/signup-id";
import type { IdentifierType } from "../../src/constants";

/**
 * Checks if signup is enabled for the current connection.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns True if signup is enabled, false otherwise
 */
export function isSignupEnabled(transaction: TransactionContext): boolean {
  return transaction?.connection?.options?.signup_enabled === true;
}

/**
 * Checks if forgot password is enabled for the current database connection.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns True if forgot password is enabled, false otherwise
 */
export function isForgotPasswordEnabled(
  transaction: TransactionContext
): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.forgot_password_enabled === true;
}

/**
 * Checks if passkeys are enabled in the current connection configuration.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns True if passkeys are enabled, false otherwise
 */
export function isPasskeyEnabled(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.authentication_methods?.passkey?.enabled ?? false;
}

/**
 * Determines if a username is required for authentication based on connection settings.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns True if username is required, false otherwise
 */
export function isUsernameRequired(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.username_required ?? false;
}

/**
 * Retrieves the username policy configuration from the transaction context.
 * This includes settings like minimum/maximum length and allowed formats.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns The username policy object or null if not defined
 */
export function getUsernamePolicy(
  transaction: TransactionContext
): UsernamePolicy | null {
  const connection = transaction?.connection as DBConnection;
  const validation = connection?.options?.attributes?.username?.validation;

  if (validation) {
    return {
      maxLength: validation.max_length,
      minLength: validation.min_length,
      allowedFormats: {
        usernameInEmailFormat: validation.allowed_types?.email ?? false,
        usernameInPhoneFormat: validation.allowed_types?.phone_number ?? false,
      },
    };
  }

  const legacyValidation = connection?.options?.validation?.username;

  if (legacyValidation) {
    return {
      maxLength: legacyValidation.max_length,
      minLength: legacyValidation.min_length
    };
  }

  return null;

}

/**
 * Retrieves the password policy configuration from the transaction context.
 * This includes properties like minimum length and complexity requirements.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns The password policy object or null if not defined
 */
export function getPasswordPolicy(
  transaction: TransactionContext
): PasswordPolicy | null {
  const connection = transaction?.connection as DBConnection;
  const passwordPolicy = connection?.options?.authentication_methods?.password;

  if (!passwordPolicy) return null;

  return {
    minLength: passwordPolicy.min_length,
    policy: passwordPolicy.policy as PasswordPolicy["policy"],
    passwordSecurityInfo: passwordPolicy.password_security_info?.map(
      (record) =>
        record.status === "valid"
          ? { ...record, isValid: true }
          : { ...record, isValid: false }
    ),
  };
}

/**
 * Returns the allowed identifiers (email, username, phone) based on the connection settings.
 * This includes both required and optional identifier types.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns An array of allowed identifier types or null if none are defined
 */
export function getAllowedIdentifiers(
  transaction: TransactionContext
): TransactionMembersOnLoginId["allowedIdentifiers"] | null {
  const connection = transaction?.connection as DBConnection | undefined;

  if (!connection) return null;

  const { attributes, username_required } = connection.options || {};

  if (attributes && Object.keys(attributes).length > 0) {
    return extractIdentifiersByStatus(connection, ["required", "optional"]);
  }

  if (username_required) {
    return ['email', 'username'];
  }

  return ['email'];
}

/**
 * Returns only the required identifiers for signup flow based on connection settings.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns An array of required identifier types or null if none are defined
 */
export function getRequiredIdentifiers(
  transaction: TransactionContext
): TransactionMembersOnSignupId["requiredIdentifiers"] {
  return extractIdentifiersByStatus(transaction?.connection as DBConnection, [
    "required",
  ]);
}

/**
 * Returns only the optional identifiers for signup flow based on connection settings.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns An array of optional identifier types or null if none are defined
 */
export function getOptionalIdentifiers(
  transaction: TransactionContext
): TransactionMembersOnSignupId["optionalIdentifiers"] {
  return extractIdentifiersByStatus(transaction?.connection as DBConnection, [
    "optional",
  ]);
}

/**
 * Checks if the connection supports flexible identifiers.
 * A connection supports flexible identifiers if it has attributes configured.
 *
 * @param transaction - The transaction context from Universal Login
 * @returns True if flexible identifiers are supported, false otherwise
 */
export function hasFlexibleIdentifier(
  transaction: TransactionContext
): boolean {
  const connection = transaction.connection as DBConnection;
  return connection?.options?.attributes ? true : false;
}

/**
 * Helper function that extracts identifiers based on their signup status.
 * Used internally by getAllowedIdentifiers, getRequiredIdentifiers, and getOptionalIdentifiers.
 *
 * @param connection - The database connection object
 * @param statuses - Array of statuses to filter by ('required' or 'optional')
 * @returns Array of matching identifier types or null if none are found
 */
function extractIdentifiersByStatus(
  connection: DBConnection | undefined,
  statuses: ("required" | "optional")[]
): IdentifierType[] | null {
  if (!connection) return null;

  const { attributes, username_required } = connection.options || {};

  if (!attributes || Object.keys(attributes).length === 0) {
    return username_required ? ['email', 'username'] : ['email'];
  }

  const filteredIdentifiers = Object.entries(attributes)
    .filter(
      ([, value]) =>
        value.signup_status &&
        statuses.includes(value.signup_status as "required" | "optional")
    )
    .map(([key]) => key as IdentifierType);

  return filteredIdentifiers.length > 0 ? filteredIdentifiers : null;
}

