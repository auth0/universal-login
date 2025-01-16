import type { DBConnection, UsernamePolicy, PasswordPolicy, TransactionContext } from '../../interfaces/models/transaction';
import type { TransactionMembersOnLoginId } from '../../interfaces/screens/login-id';
import type { TransactionMembersOnSignupId } from '../../interfaces/screens/signup-id';

export function isSignupEnabled(transaction: TransactionContext): boolean {
  const connection = transaction?.connection;
  return connection?.options?.signup_enabled === true;
}

export function isForgotPasswordEnabled(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.forgot_password_enabled === true;
}

export function isPasskeyEnabled(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;
  return connection?.options?.authentication_methods?.passkey?.enabled ?? false;
}

export function isUsernameRequired(transaction: TransactionContext): boolean {
  const connection = transaction?.connection as DBConnection;

  return connection?.options?.username_required ?? false;
}

export function getUsernamePolicy(transaction: TransactionContext): UsernamePolicy | null {
  const connection = transaction?.connection as DBConnection;

  if (!connection?.options?.attributes?.username?.validation) return null;
  const { validation } = connection.options.attributes.username;

  return {
    maxLength: validation.max_length,
    minLength: validation.min_length,
    allowedFormats: {
      usernameInEmailFormat: validation.allowed_types.email,
      usernameInPhoneFormat: validation.allowed_types.phone_number,
    },
  };
}

export function getPasswordPolicy(transaction: TransactionContext): PasswordPolicy | null {
  const connection = transaction?.connection as DBConnection;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!connection?.options?.authentication_methods?.password) return null;
  const { password } = connection.options.authentication_methods;

  // eslint-disable-next-line  @typescript-eslint/strict-boolean-expressions
  if (!password?.policy && !password?.min_length) return null;

  return {
    ...password,
    minLength: password.min_length,
    policy: password.policy as PasswordPolicy['policy'],
  };
}

export function getAllowedIdentifiers(transaction: TransactionContext): TransactionMembersOnLoginId['allowedIdentifiers'] {
  const identifiers: TransactionMembersOnLoginId['allowedIdentifiers'] = [];
  const connection = transaction?.connection as DBConnection;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!connection?.options?.attributes) return null;

  const { email, username, phone } = connection.options.attributes;
  const requiredStatusList = ['required', 'optional'];
  const identifiersList = ['email', 'username', 'phone'];

  [email, username, phone].forEach((attribute, index) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (attribute?.signup_status && requiredStatusList.includes(attribute.signup_status)) {
      identifiers.push(identifiersList[index] as 'email' | 'username' | 'phone');
    }
  });

  return identifiers.length > 0 ? identifiers : null;
}

export function getRequiredIdentifiers(transaction: TransactionContext): TransactionMembersOnSignupId['requiredIdentifiers'] {
  return getIdentifiersByStatus(transaction, 'required');
}

export function getOptionalIdentifiers(transaction: TransactionContext): TransactionMembersOnSignupId['optionalIdentifiers'] {
  return getIdentifiersByStatus(transaction, 'optional');
}

function getIdentifiersByStatus(transaction: TransactionContext, status: 'required' | 'optional'): ('email' | 'username' | 'phone')[] | null {
  const connection = transaction?.connection as DBConnection;
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!connection?.options?.attributes) return null;

  const identifiers = Object.entries(connection.options.attributes)
    .filter(([, value]) => value.signup_status === status)
    .map(([key]) => key as 'email' | 'username' | 'phone');

  return identifiers.length > 0 ? identifiers : null;
}
