import { useMemo } from 'react';
import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';
import { ContextHooks } from '../hooks/context';
import type { MfaEnrollResultMembers, ScreenMembersOnMfaEnrollResult } from '@auth0/auth0-acul-js/mfa-enroll-result';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaEnrollResultMembers {
  try {
    return getScreen<MfaEnrollResultMembers>();
  } catch {
    const instance = new MfaEnrollResult();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<MfaEnrollResultMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaEnrollResult = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaEnrollResult
export const useMfaEnrollResult = (): MfaEnrollResultMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-enroll-result';