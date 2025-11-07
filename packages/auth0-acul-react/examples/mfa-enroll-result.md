# `mfa-enroll-result`

The `mfa-enroll-result` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `mfa-enroll-result` screen.

### 1. Create the Component

Create a component file (e.g., `MfaEnrollResult.tsx`) and add the following code:

```tsx
import React from 'react';
import { useMfaEnrollResult } from '@auth0/auth0-acul-react/mfa-enroll-result';

const MfaEnrollResultScreen: React.FC = () => {
  const { screen } = useMfaEnrollResult();

  // Determine message and styling based on enrollment status
  let title = screen.texts?.title ?? 'MFA Enrollment';
  console.log(screen)
  let description = screen.texts?.description ?? 'Your multi-factor authentication status.';
  let iconComponent = null;
  let textColorClass = 'text-gray-900';
  let iconColorClass = 'text-gray-500';
  
  // Use data.status to determine the enrollment result
  const enrollmentStatus = screen.data?.status;
  
  if (enrollmentStatus === 'success') {
    title = screen.texts?.titleSuccess ?? 'MFA Enrollment Complete';
    description = screen.texts?.descriptionSuccess ?? 'Your multi-factor authentication has been successfully set up.';
    textColorClass = 'text-green-700';
    iconColorClass = 'text-green-500';
    iconComponent = (
      <svg
        className={`h-12 w-12 ${iconColorClass}`}
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
    );
  } else if (enrollmentStatus === 'failure') {
    title = screen.texts?.titleFailure ?? 'MFA Enrollment Failed';
    description = screen.texts?.descriptionFailure ?? 'There was a problem setting up your multi-factor authentication.';
    textColorClass = 'text-red-700';
    iconColorClass = 'text-red-500';
    iconComponent = (
      <svg
        className={`h-12 w-12 ${iconColorClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  } else if (enrollmentStatus === 'already-enrolled') {
    title = screen.texts?.titleAlreadyEnrolled ?? 'Already Enrolled';
    description = screen.texts?.alreadyEnrolledDescription ?? 'Two-factor Verification has Already Been Enabled.';
    textColorClass = 'text-blue-700';
    iconColorClass = 'text-blue-500';
    iconComponent = (
      <svg
        className={`h-12 w-12 ${iconColorClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  } else if (enrollmentStatus === 'already-used') {
    title = screen.texts?.alreadyUsedTitle ?? 'Already Used';
    description = screen.texts?.alreadyUsedDescription ?? 'This link has already been used. Please get a new link to enroll with Multi-factor Authentication.';
    textColorClass = 'text-orange-700';
    iconColorClass = 'text-orange-500';
    iconComponent = (
      <svg
        className={`h-12 w-12 ${iconColorClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  } else {
    // Default or unknown status
    iconComponent = (
      <svg
        className={`h-12 w-12 ${iconColorClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`mt-6 text-center text-3xl font-extrabold ${textColorClass}`}>
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {description}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center justify-center">
            {iconComponent}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {screen.texts?.badgeAltText && (
                <span className="block mt-2">{screen.texts.badgeAltText}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfaEnrollResultScreen;
```

### 2. How It Works

1.  **Imports**: We import `useMfaEnrollResult` and various context hooks from the dedicated `@auth0/auth0-acul-react/mfa-enroll-result` entry point.
2.  **Hooks**:
    *   `useMfaEnrollResult()`: Provides the core screen object with methods like `submit()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submit(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
