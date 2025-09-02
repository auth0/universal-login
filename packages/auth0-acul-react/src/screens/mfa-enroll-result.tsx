import { useMemo } from 'react';
import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaEnrollResultMembers, ScreenMembersOnMfaEnrollResult } from '@auth0/auth0-acul-js/mfa-enroll-result';
let instance: MfaEnrollResultMembers | null = null;
const getInstance = (): MfaEnrollResultMembers => {
  if (!instance) {
    instance = new MfaEnrollResult();
  }
  return instance;
};

export const useMfaEnrollResult = (): MfaEnrollResultMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaEnrollResultMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaEnrollResult = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

export type { ScreenMembersOnMfaEnrollResult, MfaEnrollResultMembers } from '@auth0/auth0-acul-js/mfa-enroll-result';

export type * from '@auth0/auth0-acul-js/mfa-enroll-result';