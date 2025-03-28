import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';

// Create a new instance of the OrganizationSelection class
const organizationSelection = new OrganizationSelection();

// Access screen data
const client = organizationSelection.client;
const organization = organizationSelection.organization;
const prompt = organizationSelection.prompt;
const screen = organizationSelection.screen;
const transaction = organizationSelection.transaction;
const user = organizationSelection.user;

// Example of continuing with an organization name
organizationSelection.continueWithOrganizationName({
  organizationName: 'testOrganizationName',
});

## React Component Example with TailwindCSS

```jsx
import React, { useState } from 'react';
import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';

const OrganizationSelectionScreen = () => {
  const [organizationName, setOrganizationName] = useState('');
  const organizationSelectionManager = new OrganizationSelection();

  const { screen } = organizationSelectionManager;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await organizationSelectionManager.continueWithOrganizationName({
        organizationName,
      });
    } catch (error) {
      console.error('Organization Selection failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          { `${ screen?.texts?.title ?? 'Select Organization' }` }
        </h2>
        <p className="mt-3">{ `${ screen?.texts?.description ?? 'Enter your xxxxx-xxxxxx Organization Name to continue' }`}</p>
      </div>


      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <div className="mt-1">
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                { `${ screen?.texts?.buttonText ?? 'Continue' }` }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSelectionScreen;
```