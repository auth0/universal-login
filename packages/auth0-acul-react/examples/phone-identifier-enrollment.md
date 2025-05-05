# `phone-identifier-enrollment` Screen

> This screen represents the **PhoneIdentifierEnrollment** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { usePhoneIdentifierEnrollmentInstance } from '@auth0/auth0-acul-react/phone-identifier-enrollment';

const screen = usePhoneIdentifierEnrollmentInstance(); // typed as PhoneIdentifierEnrollmentMembers

screen.continuePhoneEnrollment({ screen: '<screen>' });


screen.returnToPrevious({ screen: '<screen>' });
```

### Partial import
```tsx
import { usePhoneIdentifierEnrollmentInstance } from '@auth0/auth0-acul-react';

const screen = usePhoneIdentifierEnrollmentInstance(); // typed as PhoneIdentifierEnrollmentMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { PhoneIdentifierEnrollmentProvider, usePhoneIdentifierEnrollmentContext } from '@auth0/auth0-acul-react/phone-identifier-enrollment';

function App() {
  return (
    <PhoneIdentifierEnrollmentProvider>
      <ScreenComponent />
    </PhoneIdentifierEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = usePhoneIdentifierEnrollmentContext(); // typed as PhoneIdentifierEnrollmentMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { PhoneIdentifierEnrollmentProvider, usePhoneIdentifierEnrollmentContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <PhoneIdentifierEnrollmentProvider>
      <ScreenComponent />
    </PhoneIdentifierEnrollmentProvider>
  );
}

function ScreenComponent() {
  const screen = usePhoneIdentifierEnrollmentContext(); // typed as PhoneIdentifierEnrollmentMembers
  return <div />;
}
```

---
