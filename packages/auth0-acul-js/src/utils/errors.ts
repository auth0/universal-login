export const Errors = {
  PASSKEY_DATA_UNAVAILABLE: 'Passkey data is unavailable. Please verify if passkeys are enabled in your Auth0 dashboard settings.',
  PASSKEY_PUBLIC_KEY_UNAVAILABLE: 'Public key data is unavailable. Please verify if passkeys are enabled in your Auth0 dashboard settings.',
  PASSKEY_PLATFORM_AUTH_UNAVAILABLE: 'Platform authenticator is not available. Please make sure your device supports WebAuthn.',
  PASSKEY_CREDENTIALS_UNAVAILABLE: 'Unable to retrieve the credential. No credentials found or multiple options detected.',
  PASSKEY_CREATE_FAILED: 'Failed to create credentials',
  PASSKEY_EXPECTED_ASSERTION_RESPONSE: 'Expected AuthenticatorAssertionResponse',
};
