import React, { createContext, useContext, useMemo } from 'react';
import EmailIdentifierChallenge from '@auth0/auth0-acul-js/email-identifier-challenge';

const EmailIdentifierChallengeContext = createContext<EmailIdentifierChallenge | null>(null);

export function useEmailIdentifierChallenge(): EmailIdentifierChallenge {
  return useMemo(() => new EmailIdentifierChallenge(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useEmailIdentifierChallenge();
  return <EmailIdentifierChallengeContext.Provider value={screen}>{children}</EmailIdentifierChallengeContext.Provider>;
};

export function useCurrentScreen(): EmailIdentifierChallenge {
  const screen = useContext(EmailIdentifierChallengeContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/email-identifier-challenge';
