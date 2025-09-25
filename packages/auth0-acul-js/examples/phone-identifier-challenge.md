
## submitPhoneChallenge

```typescript

import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
phoneIdentifierChallenge.submitPhoneChallenge({
    code:"dummyCode"
});

```


## resendCode

```typescript
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
phoneIdentifierChallenge.resendCode();

```



## returnToPrevious

```typescript
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const phoneIdentifierChallenge = new PhoneIdentifierChallenge();
phoneIdentifierChallenge.returnToPrevious();

```


## resendManager

```typescript
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const phoneIdentifierChallenge = new PhoneIdentifierChallenge();

function handleStatusChange(remainingSeconds: number) {
  console.log('Remaining seconds:', remainingSeconds);
}

function handleTimeout() {
  console.log('Resend timeout completed');
}

const resendManager = phoneIdentifierChallenge.resendManager({
  timeoutSeconds: 15,
  onStatusChange: handleStatusChange,
  onTimeout: handleTimeout,
});

const { startResend } = resendManager;

// Use startResend() to initiate the resend with cooldown
startResend();

```


## PhoneIdentifierChallenge React Example

```typescript
import React, { useState, useMemo } from 'react';
import PhoneIdentifierChallenge from '@auth0/auth0-acul-js/phone-identifier-challenge';

const PhoneIdentifierChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resent, setResent] = useState(false);
  const [returned, setReturned] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const phoneIdentifierChallenge = useMemo(() => new PhoneIdentifierChallenge(), []);

  function handleStatusChange(remainingSeconds: number) {
    setDisabled(remainingSeconds > 0);
  }

  function handleTimeout() {
  console.log('Resend timeout completed');
  }

  const resendManager = useMemo(
    () =>
      phoneIdentifierChallenge.resendManager({
        timeoutSeconds: 15,
        onStatusChange: handleStatusChange,
        onTimeout: handleonTimeout,
      }),
    [phoneIdentifierChallenge]
  );

  const { startResend } = resendManager;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);
    setReturned(false);

    if (!code) {
      setError('Code is required.');
      return;
    }
    try {
      await phoneIdentifierChallenge.submitPhoneChallenge({ code });
      setSuccess(true);
    } catch {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await startResend();
      setResent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to resend code.');
    }
  };

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setResent(false);
    setReturned(false);

    try {
      await phoneIdentifierChallenge.returnToPrevious();
      setReturned(true);
    } catch {
      setError('Failed to return to previous step. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Phone Identifier Challenge
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Challenge
            </button>
          </form>
          {/* ✅ Resend with cooldown */}
          <form className="space-y-6 mt-4" onSubmit={handleResend}>
            <button
              type="submit"
              disabled={disabled}
              className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium 
                ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}
              `}
            >
              {disabled ? `Resend limit has been reached` : 'Resend Code'}
            </button>
          </form>
          <form className="space-y-6 mt-4" onSubmit={handleReturn}>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Return to Previous
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Challenge submitted successfully!</div>}
          {resent && <div className="text-blue-600 text-sm mt-2">Code resent to your phone.</div>}
          {returned && <div className="text-blue-600 text-sm mt-2">Returned to previous step.</div>}
        </div>
      </div>
    </div>
  );
};

export default PhoneIdentifierChallengeScreen;
```