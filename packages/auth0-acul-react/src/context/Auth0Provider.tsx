import React, { createContext, useContext, useMemo } from 'react';
import { getCurrentScreen } from '@auth0/auth0-acul-js';
import { ScreenMap } from '../utils/screen-map';

const ScreenContext = createContext<any>(null);

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
  const screenInstance = useMemo(() => {
    const screenKey = getCurrentScreen(); // "login-id"
    const className = screenKey ? toPascalCase(screenKey) : null;

    if (!className || !(className in ScreenMap)) {
      throw new Error(`Screen class not found for: ${screenKey}`);
    }

    const ScreenClass = ScreenMap[className];
    return new ScreenClass();
  }, []);

  return (
    <ScreenContext.Provider value={screenInstance}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useCurrentScreen = () => {
  const ctx = useContext(ScreenContext);
  if (!ctx) {
    throw new Error('useCurrentScreen must be used within an <Auth0Provider>');
  }
  return ctx;
};
