
## React Component Example with TailwindCSS

```tsx
import React, { useState, useEffect, useRef } from 'react';
import Signup from '@auth0/auth0-acul-js/signup';

const SignupScreen: React.FC = () => {
  const signupManager = new Signup();
  const { transaction, screen } = signupManager;

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const captchaRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Array<{ code: string; message: string }>>([]);
  const [isValid, setIsValid] = useState(true);
  const [identifiers, setIdentifiers] = useState<Array<{ type: string; required: boolean }>>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const ids = signupManager.getEnabledIdentifiers();
    setIdentifiers(ids ?? []);
  }, []);

  const getValue = (ref: React.RefObject<HTMLInputElement>) => ref.current?.value?.trim() ?? '';

  const handleSignupClick = async () => {
    const email = getValue(emailRef);
    const username = getValue(usernameRef);
    const phoneNumber = getValue(phoneNumberRef);
    const password = getValue(passwordRef);
    const captcha = getValue(captchaRef);

    const { isValid, errors } = signupManager.validatePassword(password);
    setIsValid(isValid);
    setErrors(errors);

    if (!isValid) return;

    try {
      await signupManager.signup({ email, username, phone: phoneNumber, password, captcha });
    } catch {
      setErrorMessage('Signup failed. Please check your inputs.');
    }
  };

  const handleSocialSignup = async (connection: string) => {
    try {
      await signupManager.federatedSignup({ connection });
    } catch {
      setErrorMessage('Social signup failed. Please try again.');
    }
  };

  const renderIdentifierField = (
    type: 'email' | 'username' | 'phone',
    label: string,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const identifier = identifiers.find((id) => id.type === type);
    if (!identifier) return null;

    const inputType = type === 'phone' ? 'tel' : type === 'email' ? 'email' : 'text';
    const id = type === 'phone' ? 'phoneNumber' : type;

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}{' '}
          {identifier.required ? (
            <span className="text-red-500">*</span>
          ) : (
            <span className="text-gray-500 text-sm">(optional)</span>
          )}
        </label>
        <div className="mt-1">
          <input
            id={id}
            name={id}
            type={inputType}
            ref={ref}
            required={identifier.required}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Signup</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {renderIdentifierField('email', 'Email', emailRef)}
            {renderIdentifierField('username', 'Username', usernameRef)}
            {renderIdentifierField('phone', 'Phone', phoneNumberRef)}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  required
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    !isValid ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {!isValid && (
                <ul className="text-red-500 text-sm list-disc list-inside mt-1">
                  {errors.map((err) => (
                    <li key={err.code}>{err.message}</li>
                  ))}
                </ul>
              )}
            </div>

            {screen?.isCaptchaAvailable && (
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                  Captcha
                </label>
                <div className="captcha-container mt-1">
                  <img src={screen?.captchaImage ?? ''} alt="Captcha" className="mb-2" />
                  <input
                    type="text"
                    id="captcha"
                    ref={captchaRef}
                    placeholder="Enter the captcha"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            )}

            {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

            <div>
              <button
                type="button"
                onClick={handleSignupClick}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          {transaction.alternateConnections?.length > 0 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {transaction.alternateConnections.map((connection) => (
                  <button
                    key={connection.name}
                    onClick={() => handleSocialSignup(connection.name)}
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

export default SignupScreen;
```