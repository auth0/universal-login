import { useMemo } from 'react';
import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
import { ContextHooks } from '../hooks/context-hooks';
import { useResend } from '../hooks/utility-hooks/resend-manager';
import { setScreen, getScreen } from '../state/instance-store';

import type { LoginEmailVerificationMembers, ContinueWithCodeOptions, ResendCodeOptions } from '@auth0/auth0-acul-js/login-email-verification';
function getInstance(): LoginEmailVerification {
  try {
    return getScreen<LoginEmailVerification>();
  } catch {
    const inst = new LoginEmailVerification();
    setScreen(inst);
    return inst;
  }
}

export const useLoginEmailVerification = (): LoginEmailVerificationMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueWithCode = (payload: ContinueWithCodeOptions) => getInstance().continueWithCode(payload);
export const resendCode = (payload?: ResendCodeOptions) => getInstance().resendCode(payload);

// Resend hook
export { useResend };

export type { ResendCodeOptions, LoginEmailVerificationMembers } from '@auth0/auth0-acul-js/login-email-verification';

export type * from '@auth0/auth0-acul-js/login-email-verification';