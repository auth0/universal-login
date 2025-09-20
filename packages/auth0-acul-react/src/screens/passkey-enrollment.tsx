import { useMemo } from 'react';
import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
import { ContextHooks } from '../hooks/context';
import type { PasskeyEnrollmentMembers, CustomOptions, ScreenMembersOnPasskeyEnrollment } from '@auth0/auth0-acul-js/passkey-enrollment';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): PasskeyEnrollmentMembers {
  try {
    return getScreen<PasskeyEnrollmentMembers>();
  } catch {
    const instance = new PasskeyEnrollment();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<PasskeyEnrollmentMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnPasskeyEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continuePasskeyEnrollment = (payload?: CustomOptions) => withError(getInstance().continuePasskeyEnrollment(payload));
export const abortPasskeyEnrollment = (payload?: CustomOptions) => withError(getInstance().abortPasskeyEnrollment(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of PasskeyEnrollment
export const usePasskeyEnrollment = (): PasskeyEnrollmentMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/passkey-enrollment';