/**
 * Screen to Prompt Name Mappings
 * 
 * This file contains mappings between Auth0 ACUL screen names and their corresponding
 * prompt names used by the Auth0 CLI.
 * 
 * When configuring screens in Auth0, the `--screen` parameter specifies which screen to configure,
 * while the `--prompt` parameter specifies which prompt category it belongs to.
 */

/**
 * Mapping of screen names to their corresponding prompt names
 * Key: Screen name used in Auth0 ACUL
 * Value: Prompt name to be used with Auth0 CLI
 */
export const screenToPromptMap = {
  "email-identifier-challenge": "email-identifier-challenge",
  "interstitial-captcha": "captcha",
  "login-id": "login-id",
  "login-password": "login-password",
  "login-passwordless-email-code": "login-passwordless",
  "login-passwordless-sms-otp": "login-passwordless",
  "passkey-enrollment": "passkeys",
  "passkey-enrollment-local": "passkeys",
  "phone-identifier-challenge": "phone-identifier-challenge",
  "phone-identifier-enrollment": "phone-identifier-enrollment",
  "signup-id": "signup-id",
  "signup-password": "signup-password",
  "login": "login",
  "reset-password": "reset-password",
  "reset-password-email": "reset-password",
  "reset-password-error": "reset-password",
  "reset-password-request": "reset-password",
  "reset-password-success": "reset-password",
  "signup": "signup",
  "mfa-begin-enroll-options": "mfa",
  "mfa-country-codes": "mfa-sms",
  "mfa-detect-browser-capabilities": "mfa",
  "mfa-email-challenge": "mfa-email",
  "mfa-email-list": "mfa-email",
  "mfa-enroll-result": "mfa",
  "mfa-login-options": "mfa",
  "mfa-push-challenge-push": "mfa-push",
  "mfa-push-enrollment-qr": "mfa-push",
  "mfa-push-list": "mfa-push",
  "mfa-push-welcome": "mfa-push",
  "mfa-sms-challenge": "mfa-sms",
  "mfa-sms-enrollment": "mfa-sms",
  "mfa-sms-list": "mfa-sms",
  "accept-invitation": "invitation",
  "mfa-otp-challenge": "mfa-otp",
  "mfa-otp-enrollment-code": "mfa-otp",
  "mfa-otp-enrollment-qr": "mfa-otp",
  "organization-picker": "organizations",
  "organization-selection": "organizations",
  "reset-password-mfa-email-challenge": "reset-password",
  "reset-password-mfa-otp-challenge": "reset-password",
  "reset-password-mfa-push-challenge-push": "reset-password",
  "reset-password-mfa-sms-challenge": "reset-password",
  "device-code-activation": "device-flow",
  "device-code-activation-allowed": "device-flow",
  "device-code-activation-denied": "device-flow",
  "device-code-confirmation": "device-flow",
  "mfa-phone-challenge": "mfa-phone",
  "mfa-phone-enrollment": "mfa-phone",
  "mfa-voice-challenge": "mfa-voice",
  "mfa-voice-enrollment": "mfa-voice",
  "reset-password-mfa-phone-challenge": "reset-password",
  "reset-password-mfa-voice-challenge": "reset-password",
  "mfa-recovery-code-challenge": "mfa-recovery-code",
  "mfa-recovery-code-enrollment": "mfa-recovery-code",
  "reset-password-mfa-recovery-code-challenge": "reset-password",
  "redeem-ticket": "common",
  "mfa-recovery-code-challenge-new-code": "mfa-recovery-code",
  "consent": "consent",
  "customized-consent": "customized-consent",
  "email-otp-challenge": "email-otp-challenge",
  "email-verification-result": "email-verification",
  "login-email-verification": "login-email-verification",
  "logout": "logout",
  "logout-aborted": "logout",
  "logout-complete": "logout",
  "mfa-webauthn-change-key-nickname": "mfa-webauthn",
  "mfa-webauthn-enrollment-success": "mfa-webauthn",
  "mfa-webauthn-error": "mfa-webauthn",
  "mfa-webauthn-not-available-error": "mfa-webauthn",
  "mfa-webauthn-platform-challenge": "mfa-webauthn",
  "mfa-webauthn-platform-enrollment": "mfa-webauthn",
  "mfa-webauthn-roaming-challenge": "mfa-webauthn",
  "mfa-webauthn-roaming-enrollment": "mfa-webauthn",
  "reset-password-mfa-webauthn-platform-challenge": "reset-password",
  "reset-password-mfa-webauthn-roaming-challenge": "reset-password",
  "brute-force-protection-unblock": "brute-force-protection",
  "brute-force-protection-unblock-failure": "brute-force-protection",
  "brute-force-protection-unblock-success": "brute-force-protection"
};

/**
 * Gets the prompt name for a given screen name from the mapping
 * @param {string} screenName - The screen name
 * @returns {string} - The corresponding prompt name or the screen name itself if not found
 */
export function getPromptNameForScreen(screenName) {
  return screenToPromptMap[screenName] || screenName;
}