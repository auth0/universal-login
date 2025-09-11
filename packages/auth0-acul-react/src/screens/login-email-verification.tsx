import { useMemo } from 'react';
import LoginEmailVerification from '@auth0/auth0-acul-js/login-email-verification';
import { ContextHooks } from '../hooks/context-hooks';
import { resendManager } from '../hooks/utility-hooks';
import type { UseResendParams, UseResendReturn } from '../interfaces/common';

import type { LoginEmailVerificationMembers, ContinueWithCodeOptions, ResendCodeOptions } from '@auth0/auth0-acul-js/login-email-verification';
let instance: LoginEmailVerificationMembers | null = null;
const getInstance = (): LoginEmailVerificationMembers => {
  if (!instance) {
    instance = new LoginEmailVerification();
  }
  return instance;
};

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
export const useResend = (payload?: UseResendParams): UseResendReturn => {
  const screenInstance = useMemo(() => getInstance(), []);
  return resendManager(screenInstance, payload);
};

export type { ResendCodeOptions, LoginEmailVerificationMembers } from '@auth0/auth0-acul-js/login-email-verification';

export type * from '@auth0/auth0-acul-js/login-email-verification';