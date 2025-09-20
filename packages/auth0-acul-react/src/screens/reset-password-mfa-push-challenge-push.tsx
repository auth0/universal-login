import { useMemo } from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import { ContextHooks } from '../hooks/context';
import type { ResetPasswordMfaPushChallengePushMembers, CustomOptions, MfaPollingOptions, ScreenMembersOnResetPasswordMfaPushChallengePush } from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ResetPasswordMfaPushChallengePushMembers {
  try {
    return getScreen<ResetPasswordMfaPushChallengePushMembers>();
  } catch {
    const instance = new ResetPasswordMfaPushChallengePush();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ResetPasswordMfaPushChallengePushMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

// Context hooks
export const useScreen: () => ScreenMembersOnResetPasswordMfaPushChallengePush = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload?: CustomOptions) => withError(getInstance().continue(payload));
export const resendPushNotification = (payload?: CustomOptions) => withError(getInstance().resendPushNotification(payload));
export const enterCodeManually = (payload?: CustomOptions) => withError(getInstance().enterCodeManually(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Utility Hooks
export { useMfaPolling } from '../hooks/utility/polling-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of ResetPasswordMfaPushChallengePush
export const useResetPasswordMfaPushChallengePush = (): ResetPasswordMfaPushChallengePushMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';