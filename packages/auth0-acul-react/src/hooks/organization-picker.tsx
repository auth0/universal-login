import React, { createContext, useContext, useMemo } from 'react';
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';

const OrganizationPickerContext = createContext<OrganizationPicker | null>(null);

export function useOrganizationPicker(): OrganizationPicker {
  return useMemo(() => new OrganizationPicker(), []);
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screen = useOrganizationPicker();
  return <OrganizationPickerContext.Provider value={screen}>{children}</OrganizationPickerContext.Provider>;
};

export function useCurrentScreen(): OrganizationPicker {
  const screen = useContext(OrganizationPickerContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/organization-picker';
