import type { CustomOptions } from '../common';
import type { ClientMembers } from '../models/client';
import type { OrganizationMembers } from '../models/organization';
import type { PromptMembers } from '../models/prompt';
import type { ScreenMembers } from '../models/screen';
import type { TransactionMembers } from '../models/transaction';

# Redeem Ticket Screen

This screen is displayed when a user needs to redeem a ticket.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';

const RedeemTicketScreen: React.FC = () => {
  const redeemTicketManager = new RedeemTicket();
  const { screen, transaction } = redeemTicketManager;
  const texts = screen?.texts ?? {};
  const prompt = screen?.data?.prompt;

  const getDescription = () => {
    switch (prompt) {
      case 'email-verification':
        return texts.descriptionEmailVerify ?? 'Click Continue to Verify Your Email';
      case 'passwordless-auth':
        return texts.descriptionPasswordlessVerify ?? 'Click Continue to Sign In';
      case 'mfa-enrollment':
        return texts.description ?? 'Click Continue to Enroll in Multi-Factor Authentication';
      default:
        return texts.description ?? 'Click Continue to proceed';
    }
  };

  const handleContinue = async () => {
    try {
      await redeemTicketManager.continue();
    } catch (error) {
      console.error('Failed to continue:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          {texts.pageTitle ?? 'Redeem Ticket'}
        </h2>
        <p className="text-sm text-gray-700 mb-6">
          {getDescription()}
        </p>

        {transaction?.errors?.length && (
          <div className="mb-4 space-y-1">
            {transaction.errors.map((err, index) => (
              <p key={index} className="text-red-600 text-sm">
                {err.message}
              </p>
            ))}
          </div>
        )}

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleContinue}
        >
          {texts.buttonText ?? 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default RedeemTicketScreen;
```

## Usage Examples

### Continue

```typescript
import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';

const redeemTicket = new RedeemTicket();

// Continue with the default action
await redeemTicket.continue();
```