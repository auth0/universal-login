# MFA Enroll Result Screen

This screen is displayed after successful MFA enrollment to show the result.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import MfaEnrollResult from '@auth0/auth0-acul-js/mfa-enroll-result';

const MfaEnrollResultScreen: React.FC = () => {
  const mfaEnrollResult = new MfaEnrollResult();
  const { screen } = mfaEnrollResult;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          { screen.texts?.title ?? 'MFA Enrollment Complete' }
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          { screen.texts?.description ?? 'Your multi-factor authentication has been successfully set up.' }
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-center">
            <svg
              className="h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              { screen.texts?.enrolledDescription ?? 'You have successfully enrolled in multi-factor authentication.' }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaEnrollResultScreen;
```
