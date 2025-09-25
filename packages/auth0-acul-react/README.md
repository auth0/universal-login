# @auth0/auth0-acul-react

React wrapper and hooks for building custom [Auth0 Universal Login](https://auth0.com/docs/customize/universal-login-pages) pages.

**Key Features:**
- 🎣 **React hooks** for each authentication screen
- 📦 **Tree-shakable imports** - import only what you need
- 🔷 **Full TypeScript support** with IntelliSense
- ⚡ **Lightweight** - built on top of `@auth0/auth0-acul-js`

## Installation

```bash
npm install @auth0/auth0-acul-react
```

## Usage

Import hooks for specific authentication screens:

```tsx
import { useLoginId } from '@auth0/auth0-acul-react/login-id';
import { useSignupId } from '@auth0/auth0-acul-react/signup-id';
import { useResetPassword } from '@auth0/auth0-acul-react/reset-password';

function LoginPage() {
  const loginScreen = useLoginId();
  
  const handleLogin = async (identifier: string) => {
    try {
      await loginScreen.login({ identifier });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin(formData.get('email') as string);
    }}>
      <input name="email" type="email" placeholder="Enter your email" />
      <button type="submit">Continue</button>
    </form>
  );
}
```

### Available Screens

Common authentication screens include:

- `login-id`, `login-password`, `login`
- `signup-id`, `signup-password`, `signup`
- `reset-password`, `reset-password-request`
- `mfa-otp-challenge`, `mfa-sms-challenge`
- `organization-selection`, `consent`

Each screen provides typed hooks and interfaces for full type safety.

## Documentation

- [API Reference](https://auth0.github.io/universal-login/auth0-acul-react/)
- [Examples](./examples/)
- [Core JS SDK](https://npmjs.com/package/@auth0/auth0-acul-js)

## Related Packages

- [`@auth0/auth0-acul-js`](https://npmjs.com/package/@auth0/auth0-acul-js) - Core JavaScript SDK

---

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png"   width="150">
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.auth0.com/website/sdks/logos/auth0_dark_mode.png" width="150">
    <img alt="Auth0 Logo" src="https://cdn.auth0.com/website/sdks/logos/auth0_light_mode.png" width="150">
  </picture>
</p>
<p align="center">Auth0 is an easy to implement, adaptable authentication and authorization platform. To learn more checkout <a href="https://auth0.com/why-auth0">Why Auth0?</a></p>
<p align="center">
This project is licensed under the MIT license. See the <a href="https://github.com/auth0/auth0.js/blob/master/LICENSE"> LICENSE</a> file for more info.</p>