import EmailVerificationResult from '@auth0/auth0-acul-js/email-verification-result';

# Email Verification Result Screen

This screen is displayed after a user attempts to verify their email address. It shows the status of the verification (e.g., success, failure, already verified) and provides a link to proceed to the login page. This screen is primarily informational.

## React Component Example with TailwindCSS

This example demonstrates how to build a UI for the Email Verification Result screen using React and TailwindCSS. It displays the verification status and a button to navigate to the login page.

```tsx
import React from 'react';
import EmailVerificationResult from '@auth0/auth0-acul-js/email-verification-result';

const EmailVerificationResultScreen: React.FC = () => {
  // Instantiate the SDK class for the Email Verification Result screen
  const emailVerificationResultManager = new EmailVerificationResult();
  const { client, screen, transaction, organization } = emailVerificationResultManager;

  // Determine the message and styling based on the verification status
  let statusMessage = 'An unexpected error occurred.';
  let statusColor = 'text-gray-700'; // Default color
  let title = screen.texts?.title ?? 'Email Verification'; // Default title

  const verificationStatus = screen.data?.status;
  const loginLink = screen.loginLink;

  if (verificationStatus === 'success') {
    statusMessage = screen.texts?.descriptionSuccess ?? 'Your email has been successfully verified.';
    statusColor = 'text-green-600';
    title = screen.texts?.titleSuccess ?? 'Verification Successful';
  } else if (verificationStatus === 'failure') {
    statusMessage = screen.texts?.descriptionFailure ?? 'There was an issue verifying your email. Please try again or contact support.';
    statusColor = 'text-red-600';
    title = screen.texts?.titleFailure ?? 'Verification Failed';
  } else if (verificationStatus === 'already_verified') {
    statusMessage = screen.texts?.descriptionAlreadyVerified ?? 'This email address has already been verified.';
    statusColor = 'text-blue-600';
    title = screen.texts?.titleAlreadyVerified ?? 'Email Already Verified';
  }
  // Add more status checks as needed based on actual possible values

  const handleGoToLogin = (): void => {
    if (loginLink) {
      window.location.href = loginLink;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        {client.logoUrl && (
          <img src={client.logoUrl} alt={client.name ?? 'Application Logo'} className="mx-auto h-16 mb-6" />
        )}
        <h1 className={`text-2xl font-semibold mb-4 ${statusColor}`}>
          {title}
        </h1>

        <p className={`text-gray-700 mb-6 ${statusColor}`}>
          {statusMessage}
        </p>

        {organization?.name && (
          <p className="text-sm text-gray-500 mb-2">
            Organization: {organization.displayName || organization.name}
          </p>
        )}

        {transaction.errors && transaction.errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-left" role="alert">
            <strong className="font-bold">Error(s):</strong>
            {transaction.errors.map((err, index) => (
              <p key={`tx-error-${index}`} className="block sm:inline ml-2">{err.message}</p>
            ))}
          </div>
        )}

        {loginLink && (
          <button
            onClick={handleGoToLogin}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            {screen.texts?.buttonText ?? 'Proceed to Login'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationResultScreen;
```

## Usage Examples

### Accessing Screen Information

The EmailVerificationResult screen class provides access to various pieces of context information.

```typescript
import EmailVerificationResult from '@auth0/auth0-acul-js/email-verification-result';

const screenManager = new EmailVerificationResult();

// Access client information
console.log('Client Name:', screenManager.client.name);

// Access organization information (if available)
if (screenManager.organization) {
  console.log('Organization Name:', screenManager.organization.name);
}

// Access prompt information
console.log('Prompt Name:', screenManager.prompt.name);

// Access screen-specific data
const verificationStatus = screenManager.screen.data?.status;
console.log('Verification Status:', verificationStatus);

const loginLink = screenManager.screen.loginLink;
if (loginLink) {
  console.log('Login Link:', loginLink);
  // You can use this link to redirect the user:
  // window.location.href = loginLink;
}

// Access transaction details
console.log('Transaction State:', screenManager.transaction.state);
if (screenManager.transaction.hasErrors && screenManager.transaction.errors) {
  screenManager.transaction.errors.forEach(error => {
    console.error('Transaction Error:', error.message);
  });
}
```
