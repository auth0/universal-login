import { useMemo } from 'react';
import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
import { ContextHooks } from '../hooks/context-hooks';

import type { PasskeyEnrollmentLocalMembers, CustomOptions, AbortEnrollmentOptions, ScreenMembersOnPasskeyEnrollmentLocal } from '@auth0/auth0-acul-js/passkey-enrollment-local';
let instance: PasskeyEnrollmentLocalMembers | null = null;
const getInstance = (): PasskeyEnrollmentLocalMembers => {
  if (!instance) {
    instance = new PasskeyEnrollmentLocal();
  }
  return instance;
};

export const usePasskeyEnrollmentLocal = (): PasskeyEnrollmentLocalMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<PasskeyEnrollmentLocalMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnPasskeyEnrollmentLocal = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continuePasskeyEnrollment = (payload?: CustomOptions) => getInstance().continuePasskeyEnrollment(payload);
export const abortPasskeyEnrollment = (payload: AbortEnrollmentOptions) => getInstance().abortPasskeyEnrollment(payload);

export type { AbortEnrollmentOptions, ScreenMembersOnPasskeyEnrollmentLocal, PasskeyEnrollmentLocalMembers } from '@auth0/auth0-acul-js/passkey-enrollment-local';

export type * from '@auth0/auth0-acul-js/passkey-enrollment-local';