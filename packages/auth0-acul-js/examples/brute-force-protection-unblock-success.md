```typescript
import BruteForceProtectionUnblockSuccess from '@auth0/auth0-acul-js/brute-force-protection-unblock-success';

const BruteForceProtectionUnblockSuccessManager = new BruteForceProtectionUnblockSuccess();
const { screen } = BruteForceProtectionUnblockSuccessManager;

const BruteForceProtectionUnblockSuccessScreen = () => {
  return (
    <div className="w-[100vw] flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Brute Force Protection Unblock Success Screen</h2>
        <div className="mb-4">
          <p>The account has been unblocked successfully.</p>
        </div>
      </div>
    </div>
  );
};

export default BruteForceProtectionUnblockSuccessScreen;
```