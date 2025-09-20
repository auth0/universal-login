import { useMemo } from 'react';
import MfaLoginOptions from '@auth0/auth0-acul-js/mfa-login-options';
import { ContextHooks } from '../hooks/context';
import type { MfaLoginOptionsMembers, LoginEnrollOptions, ScreenMembersOnMfaLoginOptions } from '@auth0/auth0-acul-js/mfa-login-options';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaLoginOptionsMembers {
  try {
    return getScreen<MfaLoginOptionsMembers>();
  } catch {
    const instance = new MfaLoginOptions();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaLoginOptionsMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaLoginOptions = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const enroll = (payload: LoginEnrollOptions) => withError(getInstance().enroll(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaLoginOptions
export const useMfaLoginOptions = (): MfaLoginOptionsMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-login-options';