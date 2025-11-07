# `reset-password-error`

The `reset-password-error` screen is used to handle [purpose of the screen].

## ⚛️ React Example

This example demonstrates how to build a React component for the `reset-password-error` screen.

### 1. Create the Component

Create a component file (e.g., `ResetPasswordError.tsx`) and add the following code:

```tsx
import React from "react";
import { Logo } from "../../components/Logo";
import { useScreen } from "@auth0/auth0-acul-react/reset-password-error";

const ResetPasswordErrorScreen: React.FC = () => {
  const screenTexts = useScreen();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20">
            <Logo />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-red-700">
          {screenTexts.texts?.title || "Password Reset Error"}
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          {screenTexts.texts?.description || "There was an error resetting your password. Please try again or contact support."}
        </p>

      </div>
    </div>
  );
};

export default ResetPasswordErrorScreen;
```

### 2. How It Works

1.  **Imports**: We import `useResetPasswordError` and various context hooks from the dedicated `@auth0/auth0-acul-react/reset-password-error` entry point.
2.  **Hooks**:
    *   `useResetPasswordError()`: Provides the core screen object with methods like `submit()`.
    *   Context hooks like `useUser()` and `useTenant()` provide read-only data about the current state.
3.  **State Management**: `useState` is used to manage form state, such as loading indicators and error messages.
4.  **Form Submission**:
    *   The `handleSubmit` function calls `screen.submit(payload)`.
    *   You must replace the empty `payload` object with the actual data from your form inputs.
    *   The core SDK will handle the API request and subsequent redirection on success.
    *   Errors are caught and can be displayed to the user.
