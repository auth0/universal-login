
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
    const socialConnection = transaction.alternateConnections; //eg: "google-oauth2"
    const signupParams = {
     connection : socialConnection[0].name, // "google-oauth2"
    };
    
    signupIdManager.federatedSignup(signupParams);
   
```

## signupId Example

```typescript
import React, { useState, useEffect } from 'react';
import SignupId from '@auth0/auth0-acul-js/signup-id';
import { Logo } from '../../components/Logo';
import Button from '../../components/Button';

const SignupIdScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [identifiers, setIdentifiers] = useState<Array<{ type: string; required: boolean }>>([]);

  const signupIdManager = new SignupId();

  const title = signupIdManager.screen.texts?.title || '';
  const description = signupIdManager.screen.texts?.description || '';
  const federatedConnections = signupIdManager.transaction.alternateConnections ?? [];
  const links = signupIdManager.screen.links ?? {};

  const { isValid, errors } = signupIdManager.validateUsername(username);


  useEffect(() => {
    const enabledIds = signupIdManager.getSignupIdentifiers();
    setIdentifiers(enabledIds ?? []);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const emailRequired = identifiers.find((id) => id.type === 'email')?.required;
    const phoneRequired = identifiers.find((id) => id.type === 'phone')?.required;
    const usernameRequired = identifiers.find((id) => id.type === 'username')?.required;

    if (emailRequired && !email) {
      setError('Email is required.');
      return;
    }
    if (phoneRequired && !phone) {
      setError('Phone number is required.');
      return;
    }
    if (usernameRequired && !username) {
      setError('Username is required.');
      return;
    }

    if(!isValid){
      setError(errors[0].message);
      return;
    }

    try {
      await signupIdManager.signup({
        email,
        phone,
        username,
      });
      setSuccess(true);
    } catch {
      setError('Signup failed. Please try again later.');
    }
  };

  const handleFederatedSignup = (connectionName: string) => {
    signupIdManager.federatedSignup({ connection: connectionName });
  };

  return (
    <div className="prompt-container">
      <Logo />
      {/* Title Section */}
      <div className="title-container">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h1>
        <div>
          <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="input-container">
        <form onSubmit={handleSignup}>
          {/* Email */}
          {identifiers.find((id) => id.type === 'email') && (
            <div>
              <label>Email {identifiers.find((id) => id.type === 'email')?.required && '*'}</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {/* Phone */}
          {identifiers.find((id) => id.type === 'phone') && (
            <div>
              <label>Phone {identifiers.find((id) => id.type === 'phone')?.required && '*'}</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {/* Username */}
          {identifiers.find((id) => id.type === 'username') && (
            <div>
              <label>Username {identifiers.find((id) => id.type === 'username')?.required && '*'}</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`input-field ${username && !isValid ? 'border-red-500' : 'border-gray-300'
                  }`}
              />

              {username.length > 0 && errors.length > 0 && (
                <ul className="mt-1 text-sm text-red-500">
                  {errors.map((err, i) => (
                    <li key={i}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Error & Success Messages */}
          {error && (
            <div className="error-container">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="success-message">
              Signup successful! Please check your email to verify your account.
            </div>
          )}

          {/* Submit Button */}
          <div className="button-container">
            <Button onClick={() => handleSignup}>
              Sign Up
            </Button>
          </div>
        </form>

        {/* Login Link */}
        {links?.login && (
          <div className="mt-6 text-center text-sm">
            <span>
              Already have an account?
            </span>
            <a
              href={links.loginLink}
              className="text-indigo-600 hover:underline"
            >
              Log in
            </a>
          </div>
        )}
        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google login */}
        {federatedConnections.length > 0 && federatedConnections.map((conn: any) => (
          <button
            key={conn.name}
            onClick={() => handleFederatedSignup(conn.name)}
            className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {/* <img src="/google-icon.svg" alt="" className="h-4 w-4" /> */}
            Continue with {conn.options?.display_name || conn.name}
          </button>
        ))}

      </div>
    </div>
  );
};

export default SignupIdScreen;

```