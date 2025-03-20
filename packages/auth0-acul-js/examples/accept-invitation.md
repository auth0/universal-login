import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';

# Accept Invitation Screen

This screen is displayed when a user needs to accept an invitation to an organization.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';

const AcceptInvitationScreen: React.FC = () => {
  const acceptInvitationManager = new AcceptInvitation();
  const { screen } = acceptInvitationManager;

  const handleAcceptInvitation = async () => {
    try {
      await acceptInvitationManager.acceptInvitation();
    } catch (error) {
      console.error('Failed to accept invitation:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Accept Invitation</h2>
        <p className="mb-4">
          You have been invited to join the organization.
        </p>
        <p className="mb-4">
          Inviter: {screen.data?.inviter}
        </p>
        <p className="mb-4">
          Email: {screen.data?.email}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>
      </div>
    </div>
  );
};

export default AcceptInvitationScreen;
```

## Usage Examples

### Accept Invitation

```typescript
import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';

const acceptInvitation = new AcceptInvitation();

// Accept the invitation
await acceptInvitation.acceptInvitation();
```