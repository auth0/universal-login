```typescript
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';

const resetPasswordEmail = new ResetPasswordEmail();
resetPasswordEmail.resendEmail();
```

##  React Component Example with TailwindCSS
```jsx
import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';

const ResetPasswordEmailScreen = () => {
  const resetPasswordEmail = new ResetPasswordEmail();


  return (
    <div className="w-[100vw] min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">
          Resend Email
        </h2>

        <div className="bg-white p-8 rounded-lg shadow">
          <form>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => resetPasswordEmail?.resendEmail()}
                className="w-full py-2 px-4 border text-gray-700 rounded-md hover:bg-gray-50"
              >
                Resend Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordEmailScreen;
```


