import { useMemo } from 'react';
import ResetPasswordMfaPushChallengePush from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';
import { ContextHooks } from '../hooks/context-hooks';

import type { ResetPasswordMfaPushChallengePushMembers, CustomOptions, ScreenMembersOnResetPasswordMfaPushChallengePush, MfaPushPollingOptions } from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

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
export const usePushPollingManager = (options?: MfaPushPollingOptions) => getInstance().pollingManager(options);

export type { ScreenMembersOnResetPasswordMfaPushChallengePush, ResetPasswordMfaPushChallengePushMembers } from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';

export type * from '@auth0/auth0-acul-js/reset-password-mfa-push-challenge-push';