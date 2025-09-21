import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import { useMemo } from 'react';

import { errorManager } from '../hooks/common/errors';
import { ContextHooks } from '../hooks/context';
import { registerScreen } from '../state/instance-store';

import type {
  ResetPasswordMfaPushChallengePushMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

// Register the singleton instance of ResetPasswordMfaPushChallengePush
const instance = registerScreen<ResetPasswordMfaPushChallengePushMembers>(
  ResetPasswordMfaPushChallengePush
)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<ResetPasswordMfaPushChallengePushMembers>(instance);
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
export const continueMethod = (payload?: CustomOptions) => withError(instance.continue(payload));
export const resendPushNotification = (payload?: CustomOptions) =>
  withError(instance.resendPushNotification(payload));
export const enterCodeManually = (payload?: CustomOptions) =>
  withError(instance.enterCodeManually(payload));
export const tryAnotherMethod = (payload?: CustomOptions) =>
  withError(instance.tryAnotherMethod(payload));

// Utility Hooks
export { useMfaPolling } from '../hooks/utility/polling-manager';

// Common hooks
export {
  useCurrentScreen,
  useErrors,
  useAuth0Themes,
  type UseErrorOptions,
  type UseErrorsResult,
  type ErrorsResult,
  type ErrorKind,
} from '../hooks/common';

// Main instance hook. Returns singleton instance of ResetPasswordMfaPushChallengePush
export const useResetPasswordMfaPushChallengePush = (): ResetPasswordMfaPushChallengePushMembers =>
  useMemo(() => instance, []);

// Export all types from the core SDK for this screen
