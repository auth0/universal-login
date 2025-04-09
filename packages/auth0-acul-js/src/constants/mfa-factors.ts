/**
 * MFA Factor Types
 * Constants for available MFA login factor types used across authentication flows
 */
export const MfaLoginFactorEnum = {
  // Push notification factors
  PUSH_NOTIFICATION: 'push-notification' as const,

  // OTP related factors
  OTP: 'otp' as const,

  // SMS related factors
  SMS: 'sms' as const,

  // Phone related factors
  PHONE: 'phone' as const,
  VOICE: 'voice' as const,

  // Email related factors
  EMAIL: 'email' as const,

  // Recovery related factors
  RECOVERY_CODE: 'recovery-code' as const,

  // WebAuthn related factors
  WEBAUTHN_ROAMING: 'webauthn-roaming' as const,
  WEBAUTHN_PLATFORM: 'webauthn-platform' as const,

  // Third-party factors
  DUO: 'duo' as const,
} as const;

/**
 * Type definition for MFA login factor constants
 */
export type MfaLoginFactorType =
  | 'push-notification'
  | 'otp'
  | 'sms'
  | 'phone'
  | 'voice'
  | 'email'
  | 'recovery-code'
  | 'webauthn-roaming'
  | 'webauthn-platform'
  | 'duo';

/**
 * MFA Factor Types
 * Constants for available MFA enroll factor types used across authentication flows
 */
export const MfaEnrollFactorEnum = {
  // Push notification factors
  PUSH_NOTIFICATION: 'push-notification' as const,

  // OTP related factors
  OTP: 'otp' as const,

  // SMS related factors
  SMS: 'sms' as const,

  // Phone related factors
  PHONE: 'phone' as const,
  VOICE: 'voice' as const,

  // WebAuthn related factors
  WEBAUTHN_ROAMING: 'webauthn-roaming' as const,
} as const;

/**
 * Type definition for MFA enroll factor constants
 */
export type MfaEnrollFactorType = 'push-notification' | 'otp' | 'sms' | 'phone' | 'voice' | 'webauthn-roaming';
