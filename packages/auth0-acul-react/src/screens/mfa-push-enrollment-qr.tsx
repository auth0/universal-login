import { useMemo } from 'react';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import { ContextHooks } from '../hooks/context';
import type { MfaPushEnrollmentQrMembers, CustomOptions, ScreenMembersOnMfaPushEnrollmentQr } from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): MfaPushEnrollmentQrMembers {
  try {
    return getScreen<MfaPushEnrollmentQrMembers>();
  } catch {
    const instance = new MfaPushEnrollmentQr();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<MfaPushEnrollmentQrMembers>(getInstance);

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
export const useScreen: () => ScreenMembersOnMfaPushEnrollmentQr = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Submit functions
export const pickAuthenticator = (payload?: CustomOptions) => withError(getInstance().pickAuthenticator(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of MfaPushEnrollmentQr
export const useMfaPushEnrollmentQr = (): MfaPushEnrollmentQrMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';