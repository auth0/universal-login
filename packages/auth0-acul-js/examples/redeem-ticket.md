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
  const { screen, transaction, client, organization, prompt } = redeemTicketManager;

  const handleContinue = async () => {
    try {
      await redeemTicketManager.continue();
    } catch (error) {
      console.error('Failed to continue:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Redeem Ticket</h2>
        <p className="mb-4">Client ID: {client.id}</p>
        <p className="mb-4">Client Name: {client.name}</p>
        {organization?.id && <p className="mb-4">Organization ID: {organization.id}</p>}
        <p className="mb-4">Prompt Name: {prompt.name}</p>
        <p className="mb-4">Transaction State: {transaction.state}</p>
        <p className="mb-4">Screen Name: {screen.name}</p>
        <button
          className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleContinue}
        >
          Continue
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