import { useMemo } from 'react';
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaDetectBrowserCapabilitiesMembers, CustomOptions } from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
let instance: MfaDetectBrowserCapabilitiesMembers | null = null;
const getInstance = (): MfaDetectBrowserCapabilitiesMembers => {
  if (!instance) {
    instance = new MfaDetectBrowserCapabilities();
  }
  return instance;
};

export const useMfaDetectBrowserCapabilities = (): MfaDetectBrowserCapabilitiesMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaDetectBrowserCapabilitiesMembers>(getInstance);

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
export const detectCapabilities = (payload: CustomOptions) => getInstance().detectCapabilities(payload);

export type { MfaDetectBrowserCapabilitiesMembers } from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';

export type * from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';