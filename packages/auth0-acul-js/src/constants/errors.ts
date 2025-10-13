export const Errors = {
  LOGIN_MISSING_OPTIONS: 'Login options are required.',
  LOGIN_USERNAME_REQUIRED: 'Login options must include the "username" field.',
  PASSKEY_DATA_UNAVAILABLE: 'Passkey data is unavailable. Please verify if passkeys are enabled in your Auth0 dashboard settings.',
  PASSKEY_PUBLIC_KEY_UNAVAILABLE: 'Public key data is unavailable. Please verify if passkeys are enabled in your Auth0 dashboard settings.',
  PASSKEY_PLATFORM_AUTH_UNAVAILABLE: 'Platform authenticator is not available. Please make sure your device supports WebAuthn.',
  PASSKEY_CREDENTIALS_UNAVAILABLE: 'Unable to retrieve the credential. No credentials found or multiple options detected.',
  PASSKEY_CREATE_FAILED: 'Failed to create credentials',
  PASSKEY_EXPECTED_ASSERTION_RESPONSE: 'Expected AuthenticatorAssertionResponse',
  PASSKEY_AUTOCOMPLETE_REGISTRATION_FAILED: 'Passkey autocomplete registration failed',
};

export const USERNAME_ERROR_MESSAGES = {
  REQUIRED: 'Username is required.',
  TOO_SHORT: (min: number): string => `Username must be at least ${min} characters long.`,
  TOO_LONG: (max: number): string => `Username must be no more than ${max} characters.`,
  EMAIL_NOT_ALLOWED: 'Usernames in email format are not allowed.',
  PHONE_NOT_ALLOWED: 'Usernames in phone number format are not allowed.',
};

export const USERNAME_ERROR_CODES = {
  REQUIRED: 'username-required',
  TOO_SHORT: 'username-too-short',
  TOO_LONG: 'username-too-long',
  EMAIL_NOT_ALLOWED: 'username-email-not-allowed',
  PHONE_NOT_ALLOWED: 'username-phone-not-allowed',
};