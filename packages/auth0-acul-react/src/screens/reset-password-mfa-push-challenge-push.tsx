import { useMemo } from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaPushChallengePushMembers, CustomOptions, ScreenMembersOnResetPasswordMfaPushChallengePush } from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import { MfaPushPollingError } from '@auth0/auth0-acul-js/mfa-push-challenge-push';

let instance: ResetPasswordMfaPushChallengePushMembers | null = null;
const getInstance = (): ResetPasswordMfaPushChallengePushMembers => {
  if (!instance) {
    instance = new ResetPasswordMfaPushChallengePush();
  }
  return instance;
};

const factory = new ContextHooks<ResetPasswordMfaPushChallengePushMembers>(getInstance);

export const {
  useUser,
  useTenant,
  useBranding,
  useClient,
  useOrganization,
  usePrompt,
  useUntrustedData
} = factory;

export const useScreen: () => ScreenMembersOnResetPasswordMfaPushChallengePush = () => useMemo(() => getInstance().screen, []);
export const useTransaction = () => useMemo(() => getInstance().transaction, []);

// Screen methods
export const continueMethod = (payload?: CustomOptions) => getInstance().continue(payload);
export const resendPushNotification = (payload?: CustomOptions) => getInstance().resendPushNotification(payload);
export const enterCodeManually = (payload?: CustomOptions) => getInstance().enterCodeManually(payload);
export const tryAnotherMethod = (payload?: CustomOptions) => getInstance().tryAnotherMethod(payload);
export const usePushPollingManager = (intervalMs: number, onComplete: () => void, onError?: (error: MfaPushPollingError) => void) => getInstance().pollingManager(intervalMs, onComplete, onError);

export type { ScreenMembersOnResetPasswordMfaPushChallengePush, ResetPasswordMfaPushChallengePushMembers } from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';