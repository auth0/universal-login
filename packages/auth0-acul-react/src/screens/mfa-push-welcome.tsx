import { useMemo } from 'react';
import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaPushWelcomeMembers, CustomOptions, ScreenMembersOnMfaPushWelcome } from '@auth0/auth0-acul-js/mfa-push-welcome';
let instance: MfaPushWelcomeMembers | null = null;
const getInstance = (): MfaPushWelcomeMembers => {
  if (!instance) {
    instance = new MfaPushWelcome();
  }
  return instance;
};

export const useMfaPushWelcome = (): MfaPushWelcomeMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaPushWelcomeMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaPushWelcome = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const enroll = (payload?: CustomOptions) => getInstance().enroll(payload);
export const pickAuthenticator = (payload?: CustomOptions) => getInstance().pickAuthenticator(payload);

export type { ScreenMembersOnMfaPushWelcome, MfaPushWelcomeMembers } from '@auth0/auth0-acul-js/mfa-push-welcome';

export type * from '@auth0/auth0-acul-js/mfa-push-welcome';