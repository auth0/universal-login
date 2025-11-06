import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
import { useMemo } from 'react';

import { ContextHooks } from '../hooks';
import { errorManager } from '../hooks';
import { registerScreen } from '../state/instance-store';

import type { RedeemTicketMembers, CustomOptions } from '@auth0/auth0-acul-js/redeem-ticket';

// Register the singleton instance of RedeemTicket
const instance = registerScreen<RedeemTicketMembers>(RedeemTicket)!;

// Error wrapper
const { withError } = errorManager;

// Context hooks
const factory = new ContextHooks<RedeemTicketMembers>(instance);
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
export const continueMethod = (payload?: CustomOptions) => withError(instance.continue(payload));

// Common hooks
export { useCurrentScreen, useErrors, useAuth0Themes } from '../hooks';

// Main instance hook. Returns singleton instance of RedeemTicket
export const useRedeemTicket = (): RedeemTicketMembers => useMemo(() => instance, []);
