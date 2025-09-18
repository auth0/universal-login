import { useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { ContextHooks } from '../hooks/context-hooks';
import { getScreen, setScreen } from '../state/instance-store';
import { useMfaPollingManager } from '../hooks/utility-hooks/polling-manager';

import type { MfaPushChallengePushMembers, WithRememberOptions, CustomOptions, ScreenMembersOnMfaPushChallengePush } from '@auth0/auth0-acul-js/mfa-push-challenge-push';

function getInstance(): MfaPushChallengePushMembers {
  try {
    return getScreen<MfaPushChallengePushMembers>();
  } catch {
    const inst = new MfaPushChallengePush();
    setScreen(inst);
    return inst;
  }
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

export { useMfaPollingManager };

export type { ScreenMembersOnMfaPushChallengePush, UntrustedDataMembersOnMfaPushChallengePush, WithRememberOptions, MfaPushChallengePushMembers } from '@auth0/auth0-acul-js/mfa-push-challenge-push';

export type * from '@auth0/auth0-acul-js/mfa-push-challenge-push';