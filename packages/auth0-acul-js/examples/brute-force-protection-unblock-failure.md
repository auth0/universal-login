```typescript
import BruteForceProtectionUnblockFailure from '@auth0/auth0-acul-js/brute-force-protection-unblock-failure';

const bruteForceProtectionUnblockFailure = new BruteForceProtectionUnblockFailure();

const { screen } = bruteForceProtectionUnblockFailure;
const errorType = screen.data?.errorType;

console.log(errorType);
```

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import BruteForceProtectionUnblockFailure from '@auth0/auth0-acul-js/brute-force-protection-unblock-failure';

const BruteForceProtectionUnblockFailureScreen: React.FC = () => {
  const bruteForceProtectionUnblockFailure = new BruteForceProtectionUnblockFailure();
  const { screen } = bruteForceProtectionUnblockFailure;
  const errorType = screen.data?.errorType;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Brute Force Protection</h2>
        <p className="text-gray-700 text-base">
          {errorType ? `Error Type: ${errorType}` : 'Unknown Error'}
        </p>
      </div>
    </div>
  );
};

export default BruteForceProtectionUnblockFailureScreen;
```