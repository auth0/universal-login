##  React Component Example with TailwindCSS

```typescript
import React from 'react';
import ResetPasswordSuccess from '@auth0/auth0-acul-js/reset-password-success';

const ResetPasswordSuccessComponent: React.FC = () => {
  const resetPasswordSuccessManager = new ResetPasswordSuccess();
  const { screen } = resetPasswordSuccessManager;
  const data = screen.texts?.description;

  return (
    <div className="w-[100vw] flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Reset Password Success Screen</h2>
        {data && (
          <div className="mb-4">
            <p>Message: {data}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordSuccessComponent;
```