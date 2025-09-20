import { useMemo } from 'react';
import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
import { ContextHooks } from '../hooks/context';
import type { RedeemTicketMembers, CustomOptions } from '@auth0/auth0-acul-js/redeem-ticket';
import { useErrors, useAuth0Themes } from '../hooks/common';
import { errorManager } from '../hooks/common/errors';

import { setScreen, getScreen } from '../state/instance-store';

function getInstance(): RedeemTicketMembers {
  try {
    return getScreen<RedeemTicketMembers>();
  } catch {
    const instance = new RedeemTicket();
    setScreen(instance);
    return instance;
  }
};

const { withError } = errorManager;
const factory = new ContextHooks<RedeemTicketMembers>(getInstance);

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
export const continueMethod = (payload?: CustomOptions) => withError(getInstance().continue(payload));

// Common hooks
export { useErrors, useAuth0Themes };

// Main instance hook. Returns singleton instance of RedeemTicket
export const useRedeemTicket = (): RedeemTicketMembers => useMemo(() => getInstance(), []);

// Export all types from the core SDK for this screen
export type * from '@auth0/auth0-acul-js/redeem-ticket';