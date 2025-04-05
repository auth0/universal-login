import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const HomePage: React.FC = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const screenName = import.meta.env.SCREEN_NAME || 'N/A'; // Read screen name
  const runMode = import.meta.env.RUN_MODE || 'unknown'; // Read run mode

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleLogin = () => {
    // Add organization here if needed from env var
    // const organization = import.meta.env.AUTH0_ORGANIZATION;
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
      // Pass screen context if needed by your flow, otherwise just for display
      // authorizationParams: { screen_hint: screenName } 
    });
  };

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <div>
      <h3>Testing Screen: {screenName}</h3> { /* Display screen name */ }
      <p><i>Mode: {runMode}</i></p> { /* Display run mode */ }
      <hr style={{margin: '10px 0'}} />
      {!isAuthenticated && (
        <button onClick={handleLogin}>Log In</button>
      )}

      {isAuthenticated && (
        <div>
          <h2>Welcome, {user?.name}!</h2>
          <p>Email: {user?.email}</p>
          <button onClick={handleLogout}>Log Out</button>
          <pre style={{
            textAlign: 'left', 
            background: '#282c34', // Dark background
            color: '#abb2bf',      // Lighter text
            padding: '15px', 
            marginTop: '15px',
            borderRadius: '5px',   // Rounded corners
            overflowX: 'auto'      // Handle long lines
          }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default HomePage; 