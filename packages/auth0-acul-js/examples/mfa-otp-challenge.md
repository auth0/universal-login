import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';

# MFA OTP Challenge Screen

This screen is displayed when the user needs to enter the code sent to their authenticator app during MFA.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from "react";
import MfaOtpChallenge from "@auth0/auth0-acul-js/mfa-otp-challenge";

const MfaOtpChallengeScreen: React.FC = () => {
  const [code, setCode] = useState("");
  const [rememberBrowser, setRememberBrowser] = useState(false);
  const [error, setError] = useState("");

  const mfaOtpChallenge = new MfaOtpChallenge();
  const {
    screen: { texts, data },
    transaction,
  } = mfaOtpChallenge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await mfaOtpChallenge.continue({
        code,
        rememberBrowser,
      });
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      console.error(err);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaOtpChallenge.tryAnotherMethod();
    } catch (err) {
      setError("Failed to try another method. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {texts?.title ?? "Verify Your Identity"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {texts?.description ??
            "Check your preferred one-time password application for a code."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                {texts?.codePlaceholder ?? "Enter your one-time code"}
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  placeholder={
                    texts?.codePlaceholder ?? "Enter your one-time code"
                  }
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {transaction?.errors?.length && (
              <div className="text-red-600 text-sm mt-2">
                {transaction.errors.map((err, index) => (
                  <p key={index}>{err.message}</p>
                ))}
              </div>
            )}

            {data?.showRememberDevice && (
              <div className="flex items-center">
                <input
                  id="rememberBrowser"
                  name="rememberBrowser"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberBrowser}
                  onChange={(e) => setRememberBrowser(e.target.checked)}
                />
                <label
                  htmlFor="rememberBrowser"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {texts?.rememberMeText ?? "Remember this browser for 30 days"}
                </label>
              </div>
            )}

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Code
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex justify-between">
              <button
                onClick={handleTryAnotherMethod}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {texts?.pickAuthenticatorText ?? "Try Another Method"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaOtpChallengeScreen;

```

## Usage Examples

### Continue with Code

```typescript
import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';

const mfaOtpChallenge = new MfaOtpChallenge();

mfaOtpChallenge.continue({
  code: '123456',
  rememberBrowser: true,
});
```

### Try Another Method

```typescript
import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';

const mfaOtpChallenge = new MfaOtpChallenge();

mfaOtpChallenge.tryAnotherMethod();
```