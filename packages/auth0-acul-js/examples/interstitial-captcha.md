## submitCaptcha
This methods handles InterstitialCaptcha related configuration.

```typescript
import InterstitialCaptcha from "@auth0/auth0-acul-js/interstitial-captcha";

const interstitialCaptcha = new InterstitialCaptcha();
interstitialCaptcha.submitCaptcha({
 captcha: "captchaValue",
});

```

## InterstitialCaptcha React Example

```typescript
import React, { useState } from 'react';
import InterstitialCaptcha from '@auth0/auth0-acul-js/interstitial-captcha';

const InterstitialCaptchaScreen: React.FC = () => {
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const interstitialCaptcha = new InterstitialCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!captcha) {
      setError('Captcha is required.');
      return;
    }
    try {
      await interstitialCaptcha.submitCaptcha({ captcha });
      setSuccess(true);
    } catch (err) {
      setError('Invalid captcha. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Interstitial Captcha
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                Captcha
              </label>
              <div className="mt-1">
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  required
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Captcha
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Captcha submitted successfully!</div>}
        </div>
      </div>
    </div>
  );
};

export default InterstitialCaptchaScreen;
```