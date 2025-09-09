# Login Screen Examples

## Basic Login with Username/Password

```typescript
import Login from '@auth0/auth0-acul-js/login';

const loginManager = new Login();

// Handle form submission and error handling
const errors = loginManager.getErrors();
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await loginManager.login({
      username: 'user@example.com',
      password: 'myPassword123'
    });
  } catch (error) {
    console.error('Login failed:', error);
  }
};

return (
    <div>
      {/* Render the login ID screen content */}
      <button onclick={handleLogin}>Continue<button>
      {loginIdManager.transaction.hasErrors && errors && (
        // A custom React component that renders a <div> with error details
        <ErrorMessages errors={errors} />
      )}
  )
```

## Login with Social Provider

```typescript
import Login from '@auth0/auth0-acul-js/login';

const loginManager = new Login();

// Handle social login
const handleSocialLogin = async (connection: string) => {
  try {
    await loginManager.federatedLogin({
      connection: connection // e.g. 'google-oauth2'
    });
  } catch (error) {
    console.error('Social login failed:', error);
  }
};
```

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import Login from '@auth0/auth0-acul-js/login';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const loginManager = new Login();
  const { transaction } = loginManager;
  const activeIdentifiers = useMemo(() => loginManager.getActiveIdentifiers(), []);

  const getIdentifierLabel = () => {
    if (activeIdentifiers?.length === 1) return `Enter your ${activeIdentifiers[0]}`;
    return `Enter your ${activeIdentifiers?.join(" or ")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await loginManager.login({
        username,
        password
      });
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };
  
  const handleSocialLogin = async (connection: string) => {
    try {
      await loginManager.federatedLogin({ connection });
    } catch (error) {
      setError('Social login failed. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {getIdentifierLabel()}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder= {getIdentifierLabel()}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {transaction.alternateConnections && transaction.alternateConnections.length > 0 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {transaction.alternateConnections.map((connection) => (
                  <button
                    key={connection.name}
                    onClick={() => handleSocialLogin(connection.name)}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {connection.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
```