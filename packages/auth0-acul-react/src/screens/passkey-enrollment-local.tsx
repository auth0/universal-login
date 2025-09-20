import { useMemo } from 'react';
import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
import { ContextHooks } from '../hooks/context';
import type { PasskeyEnrollmentLocalMembers, CustomOptions, AbortEnrollmentOptions, ScreenMembersOnPasskeyEnrollmentLocal } from '@auth0/auth0-acul-js/passkey-enrollment-local';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): PasskeyEnrollmentLocalMembers {
  try {
    return getScreen<PasskeyEnrollmentLocalMembers>();
  } catch {
    const instance = new PasskeyEnrollmentLocal();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<PasskeyEnrollmentLocalMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnPasskeyEnrollmentLocal = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continuePasskeyEnrollment = (payload?: CustomOptions) => withError(getInstance().continuePasskeyEnrollment(payload));
export const abortPasskeyEnrollment = (payload: AbortEnrollmentOptions) => withError(getInstance().abortPasskeyEnrollment(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of PasskeyEnrollmentLocal
export const usePasskeyEnrollmentLocal = (): PasskeyEnrollmentLocalMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/passkey-enrollment-local';