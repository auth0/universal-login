import { useMemo } from 'react';
import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
import { ContextHooks } from '../hooks/context-hooks';

import type { PasskeyEnrollmentMembers, CustomOptions, ScreenMembersOnPasskeyEnrollment } from '@auth0/auth0-acul-js/passkey-enrollment';
let instance: PasskeyEnrollmentMembers | null = null;
const getInstance = (): PasskeyEnrollmentMembers => {
  if (!instance) {
    instance = new PasskeyEnrollment();
  }
  return instance;
};

export const usePasskeyEnrollment = (): PasskeyEnrollmentMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<PasskeyEnrollmentMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnPasskeyEnrollment = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continuePasskeyEnrollment = (payload?: CustomOptions) => getInstance().continuePasskeyEnrollment(payload);
export const abortPasskeyEnrollment = (payload?: CustomOptions) => getInstance().abortPasskeyEnrollment(payload);

export type { ScreenMembersOnPasskeyEnrollment, PasskeyEnrollmentMembers } from '@auth0/auth0-acul-js/passkey-enrollment';

export type * from '@auth0/auth0-acul-js/passkey-enrollment';