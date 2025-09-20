import { useMemo } from 'react';
import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
import { ContextHooks } from '../hooks/context';
import type { LoginEmailVerificationMembers, ContinueWithCodeOptions, ResendCodeOptions, StartResendOptions } from '@auth0/auth0-acul-js/login-email-verification';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): LoginEmailVerificationMembers {
  try {
    return getScreen<LoginEmailVerificationMembers>();
  } catch {
    const instance = new LoginEmailVerification();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<LoginEmailVerificationMembers>(getInstance);

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
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const continueWithCode = (payload: ContinueWithCodeOptions) => withError(getInstance().continueWithCode(payload));
export const resendCode = (payload?: ResendCodeOptions) => withError(getInstance().resendCode(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of LoginEmailVerification
export const useLoginEmailVerification = (): LoginEmailVerificationMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/login-email-verification';