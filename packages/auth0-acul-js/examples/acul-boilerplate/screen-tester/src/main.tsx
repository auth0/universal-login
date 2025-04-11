import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.css";

// Component to handle provider setup and redirection
const Auth0ProviderWithRedirectCallback: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  const navigate = useNavigate();

  // Try to use either the new or legacy variable format
  const domain =
    import.meta.env.VITE_AUTH0_DOMAIN ||
    (import.meta.env.AUTH0_CUSTOM_DOMAIN?.toString() || "").replace(
      /^https?:\/\//,
      ""
    );
  const clientId =
    import.meta.env.VITE_AUTH0_CLIENT_ID || import.meta.env.AUTH0_CLIENT_ID;
  const audience =
    import.meta.env.VITE_AUTH0_AUDIENCE || import.meta.env.AUTH0_AUDIENCE;
  const organization =
    import.meta.env.VITE_AUTH0_ORGANIZATION ||
    import.meta.env.AUTH0_ORGANIZATION;
  const redirectUri = window.location.origin + "/callback";

  if (!domain || !clientId) {
    throw new Error("Missing Auth0 domain or client ID environment variables.");
  }

  const onRedirectCallback = (appState?: AppState) => {
    // Use replace to avoid adding the callback URL to history
    navigate(appState?.returnTo || window.location.pathname, { replace: true });
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        ...(audience ? { audience } : {}),
        ...(organization ? { organization } : {}),
      }}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithRedirectCallback>
        <App />
      </Auth0ProviderWithRedirectCallback>
    </Router>
  </React.StrictMode>
);
