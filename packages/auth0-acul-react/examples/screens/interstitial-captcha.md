---
title: interstitial-captcha
sidebar_label: InterstitialCaptcha
---

# `interstitial-captcha`

This screen represents **InterstitialCaptcha**.  
_Placeholder description — customize this for your team._

---

## 🔹 Hook Usage: `useInterstitialCaptcha()`

This gives you a new `InterstitialCaptcha` instance:

```tsx
import { useInterstitialCaptcha } from '@auth0/auth0-acul-react/interstitial-captcha';

const screen = useInterstitialCaptcha();
screen.login({ username: 'user', password: '***' });
```

---

## 🔹 Provider Usage

Use context to share the instance across components.

```tsx
import {
  Auth0Provider,
  useCurrentScreen
} from '@auth0/auth0-acul-react/interstitial-captcha';

<Auth0Provider>
  <LoginForm />
</Auth0Provider>
```

```tsx
const screen = useCurrentScreen(); // typed as InterstitialCaptcha
```

---

## 🔹 Interface Usage

```ts
import type {
  InterstitialCaptchaOptions,
  InterstitialCaptchaProperties,
  InterstitialCaptchaScreenData
} from '@auth0/auth0-acul-react/interstitial-captcha';
```

> These types are re-exported from `auth0-acul-js/interstitial-captcha`

---

## ✅ Summary

- `useInterstitialCaptcha()`: creates a new instance
- `Auth0Provider`: shares the instance via React context
- `useCurrentScreen()`: access context instance
- All interfaces are available for typing support
