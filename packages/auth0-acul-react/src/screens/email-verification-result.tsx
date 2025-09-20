import { useMemo } from 'react';
import EmailVerificationResult from '@auth0/auth0-acul-js/email-verification-result';
import { ContextHooks } from '../hooks/context';
import type { EmailVerificationResultMembers, ScreenMembersOnEmailVerificationResult } from '@auth0/auth0-acul-js/email-verification-result';
import { useErrors, useAuth0Themes } from '../hooks/common';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): EmailVerificationResultMembers {
  try {
    return getScreen<EmailVerificationResultMembers>();
  } catch {
    const instance = new EmailVerificationResult();
    setScreen(instance);
    return instance;
  }
};
const factory = new ContextHooks<EmailVerificationResultMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnEmailVerificationResult = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of EmailVerificationResult
export const useEmailVerificationResult = (): EmailVerificationResultMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/email-verification-result';