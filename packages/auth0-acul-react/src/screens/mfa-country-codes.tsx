import { useMemo } from 'react';
import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaCountryCodesMembers, SelectCountryCodeOptions, CustomOptions, ScreenMembersOnMfaCountryCodes } from '@auth0/auth0-acul-js/mfa-country-codes';
let instance: MfaCountryCodesMembers | null = null;
const getInstance = (): MfaCountryCodesMembers => {
  if (!instance) {
    instance = new MfaCountryCodes();
  }
  return instance;
};

export const useMfaCountryCodes = (): MfaCountryCodesMembers => useMemo(() => getInstance(), []);

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

export const useScreen: () => ScreenMembersOnMfaCountryCodes = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const selectCountryCode = (payload: SelectCountryCodeOptions) => getInstance().selectCountryCode(payload);
export const goBack = (payload?: CustomOptions) => getInstance().goBack(payload);

export type { ScreenMembersOnMfaCountryCodes, SelectCountryCodeOptions, MfaCountryCodesMembers } from '@auth0/auth0-acul-js/mfa-country-codes';

export type * from '@auth0/auth0-acul-js/mfa-country-codes';