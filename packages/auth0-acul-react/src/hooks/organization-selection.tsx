import React, { createContext, useContext, useMemo } from 'react';
import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';

const OrganizationSelectionContext = createContext<OrganizationSelection | null>(null);

export function useOrganizationSelection(): OrganizationSelection {
  return useMemo(() => new OrganizationSelection(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useOrganizationSelection();
  return <OrganizationSelectionContext.Provider value={screen}>{children}</OrganizationSelectionContext.Provider>;
};

export function useCurrentScreen(): OrganizationSelection {
  const screen = useContext(OrganizationSelectionContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/organization-selection';
