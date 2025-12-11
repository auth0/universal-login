import BruteForceProtectionUnblockFailure from '@auth0/auth0-acul-js/brute-force-protection-unblock-failure';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { BruteForceProtectionUnblockFailureMembers } from '@auth0/auth0-acul-js/brute-force-protection-unblock-failure';

// Register the singleton instance of BruteForceProtectionUnblockFailure
const instance = registerScreen<BruteForceProtectionUnblockFailureMembers>(
  BruteForceProtectionUnblockFailure
)!;

// Context hooks
const factory = new ContextHooks<BruteForceProtectionUnblockFailureMembers>(instance);
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

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of BruteForceProtectionUnblockFailure
export const useBruteForceProtectionUnblockFailure =
  (): BruteForceProtectionUnblockFailureMembers => useMemo(() => instance, []);
