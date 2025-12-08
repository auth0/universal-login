import LoginPasswordlessEmailCode from '@auth0/auth0-acul-js/login-passwordless-email-code';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  LoginPasswordlessEmailCodeMembers,
  SubmitCodeOptions,
  CustomOptions,
  SwitchConnectionOptions,
} from '@auth0/auth0-acul-js/login-passwordless-email-code';

// Register the singleton instance of LoginPasswordlessEmailCode
const instance = registerScreen<LoginPasswordlessEmailCodeMembers>(LoginPasswordlessEmailCode)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<LoginPasswordlessEmailCodeMembers>(instance);
export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useScreen,
  useTransaction,
  useUntrustedData,
} = factory;

// Submit functions
export const submitCode = (payload: SubmitCodeOptions) => withError(instance.submitCode(payload));
export const resendCode = (payload?: CustomOptions) => withError(instance.resendCode(payload));
export const switchConnection = (payload: SwitchConnectionOptions) =>
  withError(instance.switchConnection(payload));

// Utility Hooks
export { useResend } from '../hooks/utility/resend-manager';

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of LoginPasswordlessEmailCode
export const useLoginPasswordlessEmailCode = (): LoginPasswordlessEmailCodeMembers =>
  useMemo(() => instance, []);
