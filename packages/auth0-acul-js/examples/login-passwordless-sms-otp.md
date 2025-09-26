
## submitOTP

```typescript

//Creates an instance of LoginPasswordlessSmsOtp and calls the method with sample data.
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';
const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();

loginPasswordlessSmsOtp.submitOTP({
    username: "test@domain.com";
    otp: "testOTP";
});

```


## resendOTP

```typescript

import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();
loginPasswordlessSmsOtp.resendOTP();

```


## resendManager

```typescript
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

const loginPasswordlessSmsOtp = new LoginPasswordlessSmsOtp();

function handleStatusChange(remainingSeconds: number, isDisabled: boolean) {
  console.log(`Resend available in ${remainingSeconds}s, disabled: ${isDisabled}`);
}

function handleTimeout() {
  console.log('Resend timeout completed');
}

const resendManager = loginPasswordlessSmsOtp.resendManager({
  timeoutSeconds: 15,
  onStatusChange: handleStatusChange,
  onTimeout: handleTimeout,
});

const { startResend } = resendManager;

// Use startResend() to initiate the resend with cooldown
startResend();

```

## LoginPasswordlessSmsOtp React Example

```typescript
import React, { useState, useMemo } from 'react';
import LoginPasswordlessSmsOtp from '@auth0/auth0-acul-js/login-passwordless-sms-otp';

const LoginPasswordlessSmsOtpScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const loginPasswordlessSmsOtp = useMemo(() => new LoginPasswordlessSmsOtp(), []);

  function handleStatusChange(remainingSeconds: number, isDisabled: boolean) {
    setDisabled(isDisabled);
    setRemainingSeconds(remainingSeconds);
  }

  function handleTimeout() {
    console.log('Resend timeout completed');
  }

  const resendManager = useMemo(
    () =>
      loginPasswordlessSmsOtp.resendManager({
        timeoutSeconds: 15,
        onStatusChange: handleStatusChange,
        onTimeout: handleTimeout,
      }),
    [loginPasswordlessSmsOtp]
  );

  const { startResend } = resendManager;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username || !otp) {
      setError('Username and OTP are required.');
      return;
    }

    try {
      await loginPasswordlessSmsOtp.submitOTP({ username, otp });
      setSuccess(true);
    } catch (err) {
      setError('Invalid OTP or username. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      await startResend();
    } catch (err) {
      setError('Failed to resend OTP. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Continue with SMS OTP
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
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
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">Login successful!</div>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex-1 mr-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={disabled}
                className={`flex-1 ml-2 py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  disabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' 
                    : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
                }`}
              >
                {disabled ? `Resend OTP in ${remainingSeconds}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPasswordlessSmsOtpScreen;
```