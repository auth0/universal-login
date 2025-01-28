
## reset-password-request screen
```jsx
import React, { useState, useEffect } from 'react';
import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';

const ResetPasswordRequestScreen = () => {
  const [username, setUsername] = useState('');
  const [resetPasswordRequest, setResetPasswordRequest] = useState(null);

  useEffect(() => {
    setResetPasswordRequest(new ResetPasswordRequest());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPasswordRequest.resetPassword({ username });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">
          Reset your password
        </h2>

        <div className="bg-white p-8 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue
              </button>

              <button
                type="button"
                onClick={() => resetPasswordRequest?.backToLogin()}
                className="w-full py-2 px-4 border text-gray-700 rounded-md hover:bg-gray-50"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequestScreen;
```