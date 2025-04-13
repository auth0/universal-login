import React, { createContext, useContext, useMemo } from 'react';
import MfaDetectBrowserCapabilities from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';

const MfaDetectBrowserCapabilitiesContext = createContext<MfaDetectBrowserCapabilities | null>(null);

export function useMfaDetectBrowserCapabilities(): MfaDetectBrowserCapabilities {
  return useMemo(() => new MfaDetectBrowserCapabilities(), []);
}

export const Auth0AculProvider = ({ children }: { children: React.ReactNode }) => {
  const screen = useMfaDetectBrowserCapabilities();
  return <MfaDetectBrowserCapabilitiesContext.Provider value={screen}>{children}</MfaDetectBrowserCapabilitiesContext.Provider>;
};

export function useCurrentScreen(): MfaDetectBrowserCapabilities {
  const screen = useContext(MfaDetectBrowserCapabilitiesContext);
  if (!screen) {
    throw new Error('useCurrentScreen must be used within an <Auth0AculProvider>');
  }
  return screen;
}

export type * from '@auth0/auth0-acul-js/mfa-detect-browser-capabilities';
