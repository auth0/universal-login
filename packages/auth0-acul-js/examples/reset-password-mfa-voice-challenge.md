import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

# Reset Password MFA Voice Challenge Screen

This screen is displayed when the user needs to enter the code sent to their phone via voice call to reset their password.

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

const ResetPasswordMfaVoiceChallengeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [showLinkSms, setShowLinkSms] = useState(false);
  const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();
  const { screen, transaction } = resetPasswordMfaVoiceChallenge;
  const texts = screen?.texts ?? {};

  // Initialize state from screen data
  React.useEffect(() => {
    if (screen?.data?.showLinkSms !== undefined) {
      setShowLinkSms(screen.data.showLinkSms);
    }
  }, [screen?.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPasswordMfaVoiceChallenge.continue({ code });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleSwitchToSms = async () => {
    try {
      await resetPasswordMfaVoiceChallenge.switchToSms();
    } catch (error) {
      console.error('Switch to SMS failed:', error);
    }
  };

  const handleResendCode = async () => {
    try {
      await resetPasswordMfaVoiceChallenge.resendCode();
    } catch (error) {
      console.error('Resend code failed:', error);
    }
  };

  const handleTryAnotherMethod = async () => {
    try {
      await resetPasswordMfaVoiceChallenge.tryAnotherMethod();
    } catch (error) {
      console.error('Try another method failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {texts.title ?? 'Verify Your Identity'}
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          {texts.description ?? `Enter the code sent to your phone number ending in ${screen?.data?.phoneNumber}`}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            id="code"
            name="code"
            type="text"
            required
            placeholder={texts.placeholder ?? 'Enter your code'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          {transaction?.errors?.length && (
            <div className="mb-4 space-y-1">
              {transaction.errors.map((err, index) => (
                <p key={index} className="text-red-600 text-sm">
                  {err.message}
                </p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            {texts.buttonText ?? 'Verify Code'}
          </button>
        </form>

        <div className="flex flex-col space-y-2 text-sm text-center">
          <button
            onClick={handleResendCode}
            className="text-blue-600 hover:underline"
            type="button"
          >
            {texts.resendActionText ?? 'Call Again'}
          </button>
          
          {showLinkSms && (
            <button
              onClick={handleSwitchToSms}
              className="text-blue-600 hover:underline"
              type="button"
            >
              {texts.resendSmsActionText ?? 'Send a text'}
            </button>
          )}
          
          <button
            onClick={handleTryAnotherMethod}
            className="text-blue-600 hover:underline"
            type="button"
          >
            {texts.pickAuthenticatorText ?? 'Try another method'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordMfaVoiceChallengeScreen;
```

## Usage Examples

### Continue with Code

```typescript
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();

resetPasswordMfaVoiceChallenge.continue({
  code: '123456',
});
```

### Switch to SMS

```typescript
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();

resetPasswordMfaVoiceChallenge.switchToSms();
```

### Resend Code

```typescript
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();

resetPasswordMfaVoiceChallenge.resendCode();
```

### Try Another Method

```typescript
import ResetPasswordMfaVoiceChallenge from '@auth0/auth0-acul-js/reset-password-mfa-voice-challenge';

const resetPasswordMfaVoiceChallenge = new ResetPasswordMfaVoiceChallenge();

resetPasswordMfaVoiceChallenge.tryAnotherMethod();
```