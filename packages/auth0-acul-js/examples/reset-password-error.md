```js 
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';
const resetPasswordError = new ResetPasswordError();

const { screen } = resetPasswordError;
const data = screen.texts?.description;
console.log(data);
```


##  React Component Example with TailwindCSS

```typescript
import React from 'react';
import ResetPasswordError from '@auth0/auth0-acul-js/reset-password-error';

const ResetPasswordErrorComponent: React.FC = () => {
  const resetPasswordSuccessManager = new ResetPasswordError();
  const { screen } = resetPasswordErrorManager;
  const data = screen.texts?.description;

  return (
    <div className="w-[100vw] flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Reset Password Error Screen</h2>
        {data && (
          <div className="mb-4">
            <p>Screen Name: {data.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordErrorComponent;
```
