import { useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { ContextHooks } from '../hooks/context-hooks';

import type { MfaPushChallengePushMembers, WithRememberOptions, CustomOptions, ScreenMembersOnMfaPushChallengePush } from '@auth0/auth0-acul-js/mfa-push-challenge-push';
let instance: MfaPushChallengePushMembers | null = null;
const getInstance = (): MfaPushChallengePushMembers => {
  if (!instance) {
    instance = new MfaPushChallengePush();
  }
  return instance;
};
export interface MfaPushPollingError {
  status: number;
  responseText: string;
}

const factory = new ContextHooks<MfaPushChallengePushMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnMfaPushChallengePush = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload?: WithRememberOptions) => getInstance().continue(payload);
export const resendPushNotification = (payload?: WithRememberOptions) => getInstance().resendPushNotification(payload);
export const enterCodeManually = (payload?: CustomOptions) => getInstance().enterCodeManually(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const usePollingManager = (intervalMs: number, onComplete: () => void, onError?: (error: MfaPushPollingError) => void) => getInstance().pollingManager(intervalMs, onComplete, onError);

export type { ScreenMembersOnMfaPushChallengePush, UntrustedDataMembersOnMfaPushChallengePush, WithRememberOptions, MfaPushChallengePushMembers } from '@auth0/auth0-acul-js/mfa-push-challenge-push';

export type * from '@auth0/auth0-acul-js/mfa-push-challenge-push';