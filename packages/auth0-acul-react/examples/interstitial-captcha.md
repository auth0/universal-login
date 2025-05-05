# `interstitial-captcha` Screen

> This screen represents the **InterstitialCaptcha** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useInterstitialCaptchaInstance } from '@auth0/auth0-acul-react/interstitial-captcha';

const screen = useInterstitialCaptchaInstance(); // typed as InterstitialCaptchaMembers

screen.submitCaptcha({ submitCaptcha: 'abc123' });
```

### Partial import
```tsx
import { useInterstitialCaptchaInstance } from '@auth0/auth0-acul-react';

const screen = useInterstitialCaptchaInstance(); // typed as InterstitialCaptchaMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { InterstitialCaptchaProvider, useInterstitialCaptchaContext } from '@auth0/auth0-acul-react/interstitial-captcha';

function App() {
  return (
    <InterstitialCaptchaProvider>
      <ScreenComponent />
    </InterstitialCaptchaProvider>
  );
}

function ScreenComponent() {
  const screen = useInterstitialCaptchaContext(); // typed as InterstitialCaptchaMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { InterstitialCaptchaProvider, useInterstitialCaptchaContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <InterstitialCaptchaProvider>
      <ScreenComponent />
    </InterstitialCaptchaProvider>
  );
}

function ScreenComponent() {
  const screen = useInterstitialCaptchaContext(); // typed as InterstitialCaptchaMembers
  return <div />;
}
```

---
