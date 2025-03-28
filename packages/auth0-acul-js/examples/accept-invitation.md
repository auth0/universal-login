import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';

# Accept Invitation Screen

This screen is displayed when a user needs to accept an invitation to an organization.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import AcceptInvitation from '@auth0/auth0-acul-js/accept-invitation';

const AcceptInvitationScreen: React.FC = () => {
  const acceptInvitationManager = new AcceptInvitation();
  const { screen, transaction } = acceptInvitationManager;

  const handleAcceptInvitation = async () => {
    await acceptInvitationManager.acceptInvitation();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4"> {screen?.texts?.title ?? "You've Been Invited!"} </h2>
        <p className="mb-4">
          {screen?.texts?.description ?? 'XXXXXX has invited you (XXXXXXX) to join Second XXXXXX on XXXXXX.'}
        </p>
        <p className="mb-4">
          Inviter: {screen.data?.inviter}
        </p>
        <p className="mb-4">
          Email: {screen.data?.email}
        </p>
        <button
          className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAcceptInvitation}
        >
          Accept Invitation
        </button>

        {transaction?.errors?.length && (
          <div className="mt-2 mb-4">
            {transaction?.errors.map((err, index) => (
              <p key={index} className="text-red-500">
                {err.message}
              </p>
            ))}
          </div>
        )}
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