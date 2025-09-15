import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';

// Create a new instance of the MfaSmsChallenge class
const mfaSmsChallenge = new MfaSmsChallenge();

// Access screen data
const phoneNumber = mfaSmsChallenge.screen.data?.phoneNumber;
const showRememberDevice = mfaSmsChallenge.screen.data?.showRememberDevice;
const showLinkVoice = mfaSmsChallenge.screen.data?.showLinkVoice;

// Access untrustedData to prepopulate form fields
const { rememberDevice } = mfaSmsChallenge.untrustedData.submittedFormData || {};

// Example of submitting the MFA SMS challenge with values from untrustedData
mfaSmsChallenge.continueMfaSmsChallenge({
  code: '123456',
  rememberDevice: rememberDevice || false,
});

// Example of picking a different SMS configuration
mfaSmsChallenge.pickSms();

// Example of resending the code
mfaSmsChallenge.resendCode();

// Example of trying another method
mfaSmsChallenge.tryAnotherMethod();

// Example of getting a call
mfaSmsChallenge.getACall();

## resendManager

```typescript
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';

const mfaSmsChallenge = new MfaSmsChallenge();

function handleStatusChange(remainingSeconds: number, isDisabled: boolean) {
  console.log(`Resend available in ${remainingSeconds}s, disabled: ${isDisabled}`);
}

function handleTimeout() {
  console.log('Resend timeout completed');
}

const resendManager = mfaSmsChallenge.resendManager({
  timeoutSeconds: 15,
  onStatusChange: handleStatusChange,
  onTimeout: handleTimeout,
});

const { startResend } = resendManager;

// Use startResend() to initiate the resend with cooldown
startResend();

```

## React Component Example with TailwindCSS

```jsx
import { useState, useEffect, useMemo } from 'react';
import MfaSmsChallenge from '@auth0/auth0-acul-js/mfa-sms-challenge';

const MfaSmsChallengeScreen = () => {
  const mfaSmsChallenge = useMemo(() => new MfaSmsChallenge(), []);
  const [code, setCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const { phoneNumber, showRememberDevice, showLinkVoice } = mfaSmsChallenge.screen.data || {};

  function handleStatusChange(remainingSeconds: number, isDisabled: boolean) {
    setDisabled(isDisabled);
    setRemainingSeconds(remainingSeconds);
  }

  function handleTimeout() {
    console.log('Resend timeout completed');
  }

  const resendManager = useMemo(
    () =>
      mfaSmsChallenge.resendManager({
        timeoutSeconds: 15,
        onStatusChange: handleStatusChange,
        onTimeout: handleTimeout,
      }),
    [mfaSmsChallenge]
  );

  const { startResend } = resendManager;
  
  // Initialize form values from untrustedData
  useEffect(() => {
    // Use untrustedData to prepopulate form fields if available
    const savedFormData = mfaSmsChallenge.untrustedData.submittedFormData;
    if (savedFormData?.rememberDevice !== undefined) {
      setRememberDevice(savedFormData.rememberDevice);
    }
  }, [mfaSmsChallenge]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await mfaSmsChallenge.continueMfaSmsChallenge({
        code,
        rememberDevice,
      });
    } catch (error) {
      console.error('MFA SMS Challenge failed:', error);
    }
  };

  const handlePickSms = async () => {
    try {
      await mfaSmsChallenge.pickSms();
    } catch (error) {
      console.error('Pick SMS failed:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await startResend();
    } catch (error) {
      console.error('Resend code failed:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await mfaSmsChallenge.tryAnotherMethod();
    } catch (error) {
      console.error('Try another method failed:', error);
    }
  };

  const handleGetACall = async () => {
    try {
      await mfaSmsChallenge.getACall();
    } catch (error) {
      console.error('Get a call failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          MFA SMS Challenge
        </h2>
        {phoneNumber && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the code sent to {phoneNumber}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Code
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

            {showRememberDevice && (
              <div className="flex items-center">
                <input
                  id="rememberDevice"
                  name="rememberDevice"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
                <label
                  htmlFor="rememberDevice"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember this device
                </label>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={handlePickSms}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Pick SMS
            </button>
            <button
              onClick={handleResendCode}
              disabled={disabled}
              className={`w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium mt-2 ${
                disabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' 
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              {disabled ? `Resend code in ${remainingSeconds}s` : 'Resend Code'}
            </button>
            <button
              onClick={handleTryAnotherMethod}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
            >
              Try Another Method
            </button>
            {showLinkVoice && (
              <button
                onClick={handleGetACall}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mt-2"
              >
                Get a Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaSmsChallengeScreen;

```
