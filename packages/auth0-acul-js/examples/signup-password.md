
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
    const data = transaction.screen.getScreenData(); //eg: email, phone
    
    
    const signupParams = {
     email : data.email,
     phone : data.phone_number,
     password : "********"
    };
    
    signupPasswordManager.signup(signupParams);
```

## signupPassword Example using validatePassword 

```typescript
import React, { useState } from 'react';
import SignupPassword from '@auth0/auth0-acul-js/signup-password';

const SignupPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [passwordErrors, setPasswordErrors] = useState<Array<{ code: string; message: string }>>([]);

  const signupPasswordManager = new SignupPassword();

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // ✅ Use validatePassword from the instance
    const { isValid, errors } = signupPasswordManager.validatePassword(password);

    if (!isValid) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors([]);

    try {
      await signupPasswordManager.signup({
        email,
        phone,
        password,
      });
      setSuccess(true);
    } catch {
      setError('Signup failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up with password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${
                  passwordErrors.length ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
              />
              {/* Show validation errors if any */}
              {passwordErrors.length > 0 && (
                <ul className="text-red-500 text-sm mt-1 list-disc list-inside">
                  {passwordErrors.map((err) => (
                    <li key={err.code}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && (
              <div className="text-green-600 text-sm">
                Signup successful! Please check your email to verify your account.
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
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

export default SignupPasswordScreen;
```
