import { useMemo } from 'react';
import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
import { ContextHooks } from '../hooks/context';
import type { MfaCountryCodesMembers, SelectCountryCodeOptions, CustomOptions, ScreenMembersOnMfaCountryCodes } from '@auth0/auth0-acul-js/mfa-country-codes';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaCountryCodesMembers {
  try {
    return getScreen<MfaCountryCodesMembers>();
  } catch {
    const instance = new MfaCountryCodes();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaCountryCodesMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaCountryCodes = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const selectCountryCode = (payload: SelectCountryCodeOptions) => withError(getInstance().selectCountryCode(payload));
export const goBack = (payload?: CustomOptions) => withError(getInstance().goBack(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaCountryCodes
export const useMfaCountryCodes = (): MfaCountryCodesMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-country-codes';