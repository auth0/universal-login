import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  MfaPushChallengePushMembers,
  WithRememberOptions,
  CustomOptions,
} from '@auth0/auth0-acul-js/mfa-push-challenge-push';

// Register the singleton instance of MfaPushChallengePush
const instance = registerScreen<MfaPushChallengePushMembers>(MfaPushChallengePush)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<MfaPushChallengePushMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Submit functions
export const continueMethod = (payload?: WithRememberOptions) =>
  withError(instance.continue(payload));
export const resendPushNotification = (payload?: WithRememberOptions) =>
  withError(instance.resendPushNotification(payload));
export const enterCodeManually = (payload?: CustomOptions) =>
  withError(instance.enterCodeManually(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Utility Hooks
export { useMfaPolling } from '../hooks/utility/polling-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of MfaPushChallengePush
export const useMfaPushChallengePush = (): MfaPushChallengePushMembers =>
  useMemo(() => instance, []);
