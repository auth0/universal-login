import { useMemo } from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
import { ContextHooks } from '../hooks/context';
import type { MfaPushWelcomeMembers, CustomOptions, ScreenMembersOnMfaPushWelcome } from '@auth0/auth0-acul-js/mfa-push-welcome';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaPushWelcomeMembers {
  try {
    return getScreen<MfaPushWelcomeMembers>();
  } catch {
    const instance = new MfaPushWelcome();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaPushWelcomeMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaPushWelcome = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const enroll = (payload?: CustomOptions) => withError(getInstance().enroll(payload));
export const pickAuthenticator = (payload?: CustomOptions) => withError(getInstance().pickAuthenticator(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaPushWelcome
export const useMfaPushWelcome = (): MfaPushWelcomeMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-push-welcome';