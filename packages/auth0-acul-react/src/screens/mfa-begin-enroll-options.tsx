import { useMemo } from 'react';
import MfaBeginEnrollOptions from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaBeginEnrollOptionsMembers, MfaEnrollOptions } from '@auth0/auth0-acul-js/mfa-begin-enroll-options';
let instance: MfaBeginEnrollOptionsMembers | null = null;
const getInstance = (): MfaBeginEnrollOptionsMembers => {
  if (!instance) {
    instance = new MfaBeginEnrollOptions();
  }
  return instance;
};

export const useMfaBeginEnrollOptions = (): MfaBeginEnrollOptionsMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaBeginEnrollOptionsMembers>(getInstance);

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
export const enroll = (payload: MfaEnrollOptions) => getInstance().enroll(payload);

export type { MfaEnrollOptions, MfaBeginEnrollOptionsMembers } from '@auth0/auth0-acul-js/mfa-begin-enroll-options';

export type * from '@auth0/auth0-acul-js/mfa-begin-enroll-options';