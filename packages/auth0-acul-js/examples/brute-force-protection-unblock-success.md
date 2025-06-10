import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

## Submit OTP Code

```typescript
import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
bruteForceProtectionUnblockSuccess.submitOTPCode({
  otp: '123456',
  mfa_token: 'some_mfa_token',
});
```

## Resend Code

```typescript
import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
bruteForceProtectionUnblockSuccess.resendCode({
  mfa_token: 'some_mfa_token',
});
```

## Cancel MFA

```typescript
import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
bruteForceProtectionUnblockSuccess.cancelMFA({
  mfa_token: 'some_mfa_token',
});
```

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

const BruteForceProtectionUnblockSuccessScreen: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
  const mfaToken = bruteForceProtectionUnblockSuccess.transaction.state; // Replace with actual mfa_token retrieval

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp) {
      setError('Please enter the OTP code.');
      return;
    }

    try {
      await bruteForceProtectionUnblockSuccess.submitOTPCode({
        otp,
        mfa_token: mfaToken || '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit OTP code.');
    }
  };

  const handleResendCode = async () => {
    setError('');
    try {
      await bruteForceProtectionUnblockSuccess.resendCode({
        mfa_token: mfaToken || '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to resend code.');
    }
  };

  const handleCancelMFA = async () => {
    setError('');
    try {
      await bruteForceProtectionUnblockSuccess.cancelMFA({
        mfa_token: mfaToken || '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to cancel MFA.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Brute Force Protection
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the OTP code sent to your device to unblock.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                Submit OTP
              </button>
            </div>
          </form>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={handleResendCode}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Resend Code
            </button>
            <button
              type="button"
              onClick={handleCancelMFA}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel MFA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BruteForceProtectionUnblockSuccessScreen;
```