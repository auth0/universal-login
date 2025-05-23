### React Component Example with TailwindCSS

```tsx
import React, { useEffect } from 'react';
import LogoutComplete from '@auth0/auth0-acul-js/logout-complete';

const LogoutCompleteScreen: React.FC = () => {
  const logoutComplete = new LogoutComplete();
  const { screen, transaction: { errors } } = logoutComplete;
  const texts = screen.texts ?? {};

  // Update the document title if provided by the spec
  useEffect(() => {
    if (texts.pageTitle) {
      document.title = texts.pageTitle;
    }
  }, [texts.pageTitle]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full h-[300px] max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {texts.eventTitle ?? 'You have successfully logged out.'}
        </h1>

        {texts.userSalute && (
          <p className="text-sm text-gray-600 mb-2">
            {texts.userSalute}
          </p>
        )}

        {errors?.length && (
          <div className="mt-2 space-y-1 text-left">
            {errors.map((error, idx) => (
              <p key={idx} className="text-red-600 text-sm">
                {error.message}
              </p>
            ))}
          </div>
        )}

        {/* Auth0 badge/link */}
        {texts.badgeUrl && (
          <div className="mt-6">
            <a
              href={texts.badgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:underline"
            >
              {texts.badgeAltText ?? 'Auth0'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutCompleteScreen;
```