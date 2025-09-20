import { useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { ContextHooks } from '../hooks/context';
import type { MfaPushChallengePushMembers, WithRememberOptions, CustomOptions, MfaPollingOptions, ScreenMembersOnMfaPushChallengePush } from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaPushChallengePushMembers {
  try {
    return getScreen<MfaPushChallengePushMembers>();
  } catch {
    const instance = new MfaPushChallengePush();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaPushChallengePushMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaPushChallengePush = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueMethod = (payload?: WithRememberOptions) => withError(getInstance().continue(payload));
export const resendPushNotification = (payload?: WithRememberOptions) => withError(getInstance().resendPushNotification(payload));
export const enterCodeManually = (payload?: CustomOptions) => withError(getInstance().enterCodeManually(payload));
export const tryAnotherMethod = (payload?: CustomOptions) => withError(getInstance().tryAnotherMethod(payload));

// Utility Hooks
export { useMfaPolling } from '../hooks/utility/polling-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaPushChallengePush
export const useMfaPushChallengePush = (): MfaPushChallengePushMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-push-challenge-push';