import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';

# Organization Picker Screen

This screen allows the user to select an organization to log in to, or to skip organization selection and proceed with their personal account.

## React Component Example with TailwindCSS

```tsx
import React from 'react';
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';

const OrganizationPickerScreen: React.FC = () => {
  const organizationPicker = new OrganizationPicker();
  const { screen, user } = organizationPicker;

  const handleSelectOrganization = async (organizationId: string) => {
    try {
      await organizationPicker.selectOrganization({ organization: organizationId, state: organizationPicker.transaction.state });
    } catch (error) {
      console.error('Failed to select organization:', error);
    }
  };

  const handleSkipOrganization = async () => {
    try {
      await organizationPicker.skipOrganizationSelection();
    } catch (error) {
      console.error('Failed to skip organization selection:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">{ `${ screen.texts?.title ?? 'Choose an Organization' }` }</h2>
        <p>{ `${ user.email } ${ screen.texts?.loggedInText ?? 'is used as a personal account and is a part of multiple organizations.' }` } </p>
        {
          user.organizations ? (
            <ul className="mb-4">
              {user.organizations.map((org) => (
                <li key={org.organizationId} className="py-2">
                  <button
                    onClick={() => handleSelectOrganization(org.organizationId ?? '')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {org.displayName || org.organizationName}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No organizations available.</p>
          )
        }
        <button
          onClick={handleSkipOrganization}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          { `${ screen?.texts?.continueTextB2C ?? 'Continue with Personal Account' }` }
        </button>
      </div>
    </div>
  );
};

export default OrganizationPickerScreen;
```

## Usage Examples

### Select Organization

```typescript
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';

const organizationPicker = new OrganizationPicker();

// Select an organization
await organizationPicker.selectOrganization({
  organization: 'org_1234567890123456',
  state: organizationPicker.transaction.state
});
```

### Skip Organization Selection

```typescript
import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';

const organizationPicker = new OrganizationPicker();

// Skip organization selection
await organizationPicker.skipOrganizationSelection();
```