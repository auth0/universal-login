# `login-passwordless-sms-otp` Screen

> This screen represents the **LoginPasswordlessSmsOtp** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useLoginPasswordlessSmsOtpInstance } from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

const screen = useLoginPasswordlessSmsOtpInstance(); // typed as LoginPasswordlessSmsOtpMembers

screen.submitOTP({ screen: '<screen>' });


screen.resendOTP({ screen: '<screen>' });
```

### Partial import
```tsx
import { useLoginPasswordlessSmsOtpInstance } from '@auth0/auth0-acul-react';

const screen = useLoginPasswordlessSmsOtpInstance(); // typed as LoginPasswordlessSmsOtpMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { LoginPasswordlessSmsOtpProvider, useLoginPasswordlessSmsOtpContext } from '@auth0/auth0-acul-react/login-passwordless-sms-otp';

function App() {
  return (
    <LoginPasswordlessSmsOtpProvider>
      <ScreenComponent />
    </LoginPasswordlessSmsOtpProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginPasswordlessSmsOtpContext(); // typed as LoginPasswordlessSmsOtpMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { LoginPasswordlessSmsOtpProvider, useLoginPasswordlessSmsOtpContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <LoginPasswordlessSmsOtpProvider>
      <ScreenComponent />
    </LoginPasswordlessSmsOtpProvider>
  );
}

function ScreenComponent() {
  const screen = useLoginPasswordlessSmsOtpContext(); // typed as LoginPasswordlessSmsOtpMembers
  return <div />;
}
```

---
