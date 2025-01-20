```typescript
import React from 'react';
import SignupNew from '@auth0/auth0-acul-js/signup-new';

const SignupNewComponent: React.FC = () => {
  const signupNewManager = new SignupNew();
  const { screen } = signupNewManager;
  const data = screen.data;

  const handleSignup = async () => {
    try {
      await signupNewManager.signup({
        email: 'test@example.com',
        password: 'P@$$wOrd123!',
      });
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Signup New Screen</h2>
        {data && (
          <div className="mb-4">
            <p>Screen Name: {data.name}</p>
            <p>Login Link: {data.loginLink}</p>
          </div>
        )}
        <button
          onClick={handleSignup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupNewComponent;
```