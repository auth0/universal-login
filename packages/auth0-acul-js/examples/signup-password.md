
## signup
   This methods handles signup-password related screen configuration.
   It allows to proceed with registering signup password along with signup identifers passed in previous screen

```typescript
    import SignupPassword from "@auth0/auth0-acul-js/signup-password";
    
    const signupPasswordManager = new SignupPassword();
    const { transaction, screen } = signupPasswordManager;
    
    //get mandatory & optional identifiers required for signup-password screen to proceed
    const mandatoryIdentifier = transaction.getRequiredIdentifiers(); //eg: email
    const optionalIdentifiers = transaction.getOptionalIdentifiers() //eg: phone
    
    //get signup data submitted on previous screen from previous screen
    const data = screen.data; //eg: email, phone
    
    
    const signupParams = {
     email : data.email,
     phone : data.phone_number,
     password : "********"
    };
    
    signupPasswordManager.signup(signupParams);
```

## skipPassword
   Skips password creation during signup and completes the account with OTP as the primary
   authentication method.

   ### When the skip is available

   `screen.data.showSkipPassword` is `true` only when **all** of the following are true.
   Otherwise it is `false`/`undefined` and the skip control must not be rendered:

   | Requirement | Where it is configured |
   | --- | --- |
   | Flexible Identifiers enabled on the connection | Connection settings |
   | Signups allowed on the connection | Password on signup → **Allow** (`signup_behavior = allow`) |
   | An OTP method enabled on the connection | Email OTP or Phone (SMS) OTP |
   | Password is optional for the connection | Support users without a password → **ON** (`api_behavior = optional`) |
   | User completed OTP verification earlier in this signup | Decided at runtime, per session |

   On skip, the account is created with no password credential; the verified identifier stays
   `email_verified` / `phone_verified`, standard signup Actions still fire, and the user can add
   a password later from My Account.

```typescript
    import SignupPassword from "@auth0/auth0-acul-js/signup-password";

    const signupPasswordManager = new SignupPassword();

    // Only render your "Skip" control when the SDK reports it is available.
    if (signupPasswordManager.screen.data?.showSkipPassword) {
      await signupPasswordManager.skipPassword();
    }
```

## signupPassword Example using validatePassword 

```typescript
import React, { useState } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';
import { Logo } from '../../components/Logo';
import Button from '../../components/Button';

const SignupPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const signupPasswordManager = new SignupPassword();

  const email = signupPasswordManager.screen.data?.email || '';
  const phone = signupPasswordManager.screen.data?.phoneNumber || '';
  const username = signupPasswordManager.screen.data?.username || '';

  const title = signupPasswordManager.screen.texts?.title || '';
  const description = signupPasswordManager.screen.texts?.description || '';

  const { isValid, results } = signupPasswordManager.validatePassword(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!isValid) return;

    try {
      await signupPasswordManager.signup({ email, username, phone, password });
      setSuccess(true);
    } catch {
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="prompt-container">
      <Logo />

      {/* Title Section (inline, not imported) */}
      <div className="title-container">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h1>
        <div>
          <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Form */}
      <div className="input-container">
        <form onSubmit={handleSignup}>
          {email && (
            <div>
              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                disabled
              />
            </div>
          )}


          {username && (
            <div>
              <label>Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                disabled
              />
            </div>
          )}

          {
            phone && (
              <div>
                <label>Phone</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  disabled
                />
              </div>
            )
          }



          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={!isValid && password.length > 0 ? 'error' : ''}
          />

          {/* Password Validation Rules */}

          {password.length > 0 && results.length > 0 && (
            <div className="mt-2 border border-gray-300 rounded p-2 text-sm">
              <p className="text-gray-700 mb-1">Your password must contain:</p>
              <ul className="list-disc ml-4">
                {results.map((rule) => (
                  <li
                    key={rule.code}
                    className={rule.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                  >
                    {rule.label}
                    {rule.items && rule.items.length > 0 && (
                      <ul className="ml-5 list-disc">
                        {rule.items.map((sub) => (
                          <li
                            key={sub.code}
                            className={sub.status === 'valid' ? 'text-green-600' : 'text-gray-700'}
                          >
                            {sub.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Error & Success messages */}
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
      </div>
    </div>
  );
};

export default SignupPasswordScreen;

```
