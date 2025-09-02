import { useMemo } from 'react';
import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';
import { ContextHooks } from '../hooks/context-hooks';

import type { AcceptInvitationMembers, CustomOptions, ScreenMembersOnAcceptInvitation } from '@auth0/auth0-acul-js/accept-invitation';
let instance: AcceptInvitationMembers | null = null;
const getInstance = (): AcceptInvitationMembers => {
  if (!instance) {
    instance = new AcceptInvitation();
  }
  return instance;
};

export const useAcceptInvitation = (): AcceptInvitationMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<AcceptInvitationMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnAcceptInvitation = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const acceptInvitation = (payload?: CustomOptions) => getInstance().acceptInvitation(payload);

export type { ScreenMembersOnAcceptInvitation, AcceptInvitationMembers } from '@auth0/auth0-acul-js/accept-invitation';

export type * from '@auth0/auth0-acul-js/accept-invitation';