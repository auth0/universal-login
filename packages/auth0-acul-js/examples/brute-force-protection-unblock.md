## unblock Account

This methods handles unblocking the account.

```typescript
import BruteForceProtectionUnblock from '@auth0/auth0-acul-js/brute-force-protection-unblock';

const unblockScreen = new BruteForceProtectionUnblock();
unblockScreen.unblockAccount({}).then(() => {
  console.log('Account unblock request submitted successfully.');
}).catch((error) => {
  console.error('Failed to submit account unblock request:', error);
});
```

## React Component Example with TailwindCSS

```tsx
import React, { useState } from 'react';
import BruteForceProtectionUnblock from '@auth0/auth0-acul-js/brute-force-protection-unblock';

const UnblockAccountScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const unblockScreen = new BruteForceProtectionUnblock();

  const handleUnblockAccount = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await unblockScreen.unblockAccount();
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Failed to unblock account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-2/3 p-10 m-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Unblock Account
        </h2>

        {
          error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )
        }

        {
          success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">Account unblocked successfully.</span>
            </div>
          )
        }

        <button
          onClick={handleUnblockAccount}
          disabled={loading}
          className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed w-full"}
        >
          {
            loading ? 'Unblocking...' : 'Unblock Account'
          }
        </button>
      </div>
    </div>
  );
};

export default UnblockAccountScreen;
```