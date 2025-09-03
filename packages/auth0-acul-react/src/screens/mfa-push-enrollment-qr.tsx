import { useMemo } from 'react';
import MfaPushEnrollmentQr from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaPushEnrollmentQrMembers, CustomOptions, ScreenMembersOnMfaPushEnrollmentQr } from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';
let instance: MfaPushEnrollmentQrMembers | null = null;
const getInstance = (): MfaPushEnrollmentQrMembers => {
  if (!instance) {
    instance = new MfaPushEnrollmentQr();
  }
  return instance;
};

export const useMfaPushEnrollmentQr = (): MfaPushEnrollmentQrMembers => useMemo(() => getInstance(), []);

const factory = new ContextHooks<MfaPushEnrollmentQrMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaPushEnrollmentQr = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const pickAuthenticator = (payload?: CustomOptions) => getInstance().pickAuthenticator(payload);

export type { ScreenMembersOnMfaPushEnrollmentQr, MfaPushEnrollmentQrMembers } from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';

export type * from '@auth0/auth0-acul-js/mfa-push-enrollment-qr';