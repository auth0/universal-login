import React, { createContext, useContext, useMemo } from 'react';
import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';

const AcceptInvitationContext = createContext<AcceptInvitation | null>(null);

export function useAcceptInvitation(): AcceptInvitation {
  return useMemo(() => new AcceptInvitation(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useAcceptInvitation();
  return <AcceptInvitationContext.Provider value={screen}>{children}</AcceptInvitationContext.Provider>;
};

export function useCurrentScreen(): AcceptInvitation {
  const screen = useContext(AcceptInvitationContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/accept-invitation';
