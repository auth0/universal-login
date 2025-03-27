import React, { createContext, useContext } from 'react';

// @ts-ignore
const UniversalLoginContext = createContext(window.universal_login_context);

export const Auth0Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    //@ts-ignore
    <UniversalLoginContext.Provider value={window.universal_login_context}>
      {children}
    </UniversalLoginContext.Provider>
  );
};

export const useUniversalLoginContext = () => useContext(UniversalLoginContext);
