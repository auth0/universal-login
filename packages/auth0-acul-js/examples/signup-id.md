
## signup
This methods handles signup-id related configuration.
It allows to signup new users via different identifiers

```typescript
    import SignupId from "@auth0/auth0-acul-js/signup-id";
    const signupIdManager = new SignupId();

    //get mandatory & optional identifiers required for signup
    const { transaction } = signupIdManager;
    const mandatoryIdentifier = transaction.getRequiredIdentifiers(); // eg: email
    const optionalIdentifiers = transaction.getOptionalIdentifiers() // eg: phone

    /* Based on mandatory & optional identifiers users can render corresponding field on signup-id screen */

    const signupParams = {
        email : "testEmail",
        phone : "+91923456789"
    }

    signupIdManager.signup(signupParams);
    
```

## socialSignup

```typescript
    import SignupId from "@auth0/auth0-acul-js/signup-id";
    
    const signupIdManager = new SignupId();
    const { transaction } = signupIdManager;
    
    //get social connections
    const socialConnection = transaction.getAlternateConnections(); //eg: "google-oauth2"
    const signupParams = {
     connection : socialConnection[0].name, // "google-oauth2"
    };
    
    signupIdManager.federatedSignup(signupParams);
   
```

## signupId Example

```typescript
import React, { useState } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';

const SignupIdScreen = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const signupIdManager = new SignupId();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Email is required.');
      return;
    }

    try {
      await signupIdManager.signup({
        email,
        phone,
      });
      setSuccess(true);
    } catch (error) {
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone (optional)
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm">
                Signup successful! Please check your email to verify your account.
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupIdScreen;
```