import { useMemo } from 'react';
import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
import { ContextHooks } from '../hooks/context-hooks';

import type { RedeemTicketMembers, CustomOptions } from '@auth0/auth0-acul-js/redeem-ticket';
let instance: RedeemTicketMembers | null = null;
const getInstance = (): RedeemTicketMembers => {
  if (!instance) {
    instance = new RedeemTicket();
  }
  return instance;
};

export const useRedeemTicket = (): RedeemTicketMembers => useMemo(() => getInstance(), []);

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

export const useScreen = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload?: CustomOptions) => getInstance().continue(payload);

export type { RedeemTicketMembers } from '@auth0/auth0-acul-js/redeem-ticket';

export type * from '@auth0/auth0-acul-js/redeem-ticket';