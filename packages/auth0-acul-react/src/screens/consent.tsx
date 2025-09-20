import { useMemo } from 'react';
import Consent from '@auth0/auth0-acul-js/consent';
import { ContextHooks } from '../hooks/context';
import type { ConsentMembers, CustomOptions, ScreenMembersOnConsent } from '@auth0/auth0-acul-js/consent';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): ConsentMembers {
  try {
    return getScreen<ConsentMembers>();
  } catch {
    const instance = new Consent();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<ConsentMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnConsent = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const accept = (payload?: CustomOptions) => withError(getInstance().accept(payload));
export const deny = (payload?: CustomOptions) => withError(getInstance().deny(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of Consent
export const useConsent = (): ConsentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/consent';