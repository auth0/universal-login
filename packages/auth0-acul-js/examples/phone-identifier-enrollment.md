
## continuePhoneEnrollment

```typescript

import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';

const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();
phoneIdentifierChallenge.continuePhoneEnrollment({
    type:"<text' | 'voice>"
});

```



## returnToPrevious

```typescript
import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';

const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();
phoneIdentifierChallenge.returnToPrevious();

```



## PhoneIdentifierEnrollment React Example

```typescript
import React, { useState } from 'react';
import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';

const PhoneIdentifierEnrollmentScreen: React.FC = () => {
  const [type, setType] = useState('text');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [returned, setReturned] = useState(false);

  const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    try {
      await phoneIdentifierEnrollment.continuePhoneEnrollment({ type });
      setSuccess(true);
    } catch (err) {
      setError('Failed to continue phone enrollment. Please try again.');
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setReturned(false);
    try {
      await phoneIdentifierEnrollment.returnToPrevious();
      setReturned(true);
    } catch (err) {
      setError('Failed to return to previous step. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Phone Identifier Enrollment
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleContinue}>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Enrollment Type
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="text">Text</option>
                <option value="voice">Voice</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue Enrollment
            </button>
          </form>
          <form className="space-y-6 mt-4" onSubmit={handleReturn}>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Previous
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm mt-2">Phone enrollment continued successfully!</div>}
          {returned && <div className="text-blue-600 text-sm mt-2">Returned to previous step.</div>}
        </div>
      </div>
    </div>
  );
};

export default PhoneIdentifierEnrollmentScreen;
```