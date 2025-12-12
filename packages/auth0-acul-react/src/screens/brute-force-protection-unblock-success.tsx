import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { BruteForceProtectionUnblockSuccessMembers } from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

// Register the singleton instance of BruteForceProtectionUnblockSuccess
const instance = registerScreen<BruteForceProtectionUnblockSuccessMembers>(
  BruteForceProtectionUnblockSuccess
)!;

// Context hooks
const factory = new ContextHooks<BruteForceProtectionUnblockSuccessMembers>(instance);
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

// Main instance hook. Returns singleton instance of BruteForceProtectionUnblockSuccess
export const useBruteForceProtectionUnblockSuccess =
  (): BruteForceProtectionUnblockSuccessMembers => useMemo(() => instance, []);
