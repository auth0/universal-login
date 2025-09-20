import { useMemo } from 'react';
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import { ContextHooks } from '../hooks/context';
import type { MfaDetectBrowserCapabilitiesMembers, CustomOptions } from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaDetectBrowserCapabilitiesMembers {
  try {
    return getScreen<MfaDetectBrowserCapabilitiesMembers>();
  } catch {
    const instance = new MfaDetectBrowserCapabilities();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
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

// Context hooks
export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const detectCapabilities = (payload: CustomOptions) => withError(getInstance().detectCapabilities(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaDetectBrowserCapabilities
export const useMfaDetectBrowserCapabilities = (): MfaDetectBrowserCapabilitiesMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';