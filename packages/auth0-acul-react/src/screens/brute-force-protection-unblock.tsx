import BruteForceProtectionUnblock from '@auth0/auth0-acul-js/brute-force-protection-unblock';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type {
  BruteForceProtectionUnblockMembers,
  CustomOptions,
} from '@auth0/auth0-acul-js/brute-force-protection-unblock';

// Register the singleton instance of BruteForceProtectionUnblock
const instance = registerScreen<BruteForceProtectionUnblockMembers>(BruteForceProtectionUnblock)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<BruteForceProtectionUnblockMembers>(instance);
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
export const unblockAccount = (payload?: CustomOptions) =>
  withError(instance.unblockAccount(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes, useChangeLanguage } from '../hooks';

// Main instance hook. Returns singleton instance of BruteForceProtectionUnblock
export const useBruteForceProtectionUnblock = (): BruteForceProtectionUnblockMembers =>
  useMemo(() => instance, []);
