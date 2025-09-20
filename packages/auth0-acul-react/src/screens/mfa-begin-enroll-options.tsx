import { useMemo } from 'react';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import { ContextHooks } from '../hooks/context';
import type { MfaBeginEnrollOptionsMembers, MfaEnrollOptions } from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaBeginEnrollOptionsMembers {
  try {
    return getScreen<MfaBeginEnrollOptionsMembers>();
  } catch {
    const instance = new MfaBeginEnrollOptions();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaBeginEnrollOptionsMembers>(getInstance);

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
export const enroll = (payload: MfaEnrollOptions) => withError(getInstance().enroll(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaBeginEnrollOptions
export const useMfaBeginEnrollOptions = (): MfaBeginEnrollOptionsMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-begin-enroll-options';