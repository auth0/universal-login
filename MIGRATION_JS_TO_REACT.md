# Migration Guide: JavaScript SDK to React SDK

This guide helps you migrate from `@auth0/auth0-acul-js` to `@auth0/auth0-acul-react` for building Advanced Customization for Universal Login screens with React.

## Table of Contents

- [Overview](#overview)
- [Key Differences](#key-differences)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
- [Migration Steps](#migration-steps)
- [Screen-by-Screen Examples](#screen-by-screen-examples)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Overview

The React SDK is built on top of the JavaScript SDK but provides a React-friendly API with:
- **React Hooks** for accessing context and utilities
- **Automatic error handling** with error state management
- **Type-safe** function exports
- **Better state synchronization** with React components

### When to Migrate

Consider migrating if you:
- Are building with React (18.0.0+)
- Want cleaner integration with React component lifecycle
- Need built-in error state management
- Prefer hooks-based architecture over class instances

---

## Key Differences

### JavaScript SDK
```javascript
import LoginId from '@auth0/auth0-acul-js/login-id';

// Create instance
const loginIdManager = new LoginId();

// Access context
const { transaction, screen } = loginIdManager;

// Call methods on instance
await loginIdManager.login({ username: 'user@example.com' });

// Manual error handling
const errors = loginIdManager.getErrors();
```

### React SDK
```tsx
import { 
  useTransaction, 
  useScreen, 
  login 
} from '@auth0/auth0-acul-react/login-id';

// Use hooks in component
const transaction = useTransaction();
const screen = useScreen();

// Call exported functions
await login({ username: 'user@example.com' });

// Built-in error hook
const { hasError, errors, dismiss } = useErrors();
```

---

## Installation

### 1. Uninstall JavaScript SDK
```bash
npm uninstall @auth0/auth0-acul-js
```

### 2. Install React SDK
```bash
npm install @auth0/auth0-acul-react
```

### 3. Verify Peer Dependencies
```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

---

## Core Concepts

### Instance vs. Hooks

| JavaScript SDK | React SDK | Description |
|---------------|-----------|-------------|
| `new LoginId()` | `useLoginId()` | Get screen instance (rarely needed) |
| `loginIdManager.transaction` | `useTransaction()` | Access transaction context |
| `loginIdManager.screen` | `useScreen()` | Access screen context |
| `loginIdManager.user` | `useUser()` | Access user context |
| `loginIdManager.tenant` | `useTenant()` | Access tenant context |
| `loginIdManager.branding` | `useBranding()` | Access branding context |
| `loginIdManager.client` | `useClient()` | Access client context |
| `loginIdManager.organization` | `useOrganization()` | Access organization context |
| `loginIdManager.prompt` | `usePrompt()` | Access prompt context |

### Method Calls vs. Function Exports

| JavaScript SDK | React SDK |
|---------------|-----------|
| `await loginIdManager.login(payload)` | `await login(payload)` |
| `await loginIdManager.federatedLogin(payload)` | `await federatedLogin(payload)` |
| `await loginIdManager.passkeyLogin()` | `await passkeyLogin()` |
| `await signupIdManager.signup(payload)` | `await signup(payload)` |

### Error Handling

**JavaScript SDK:**
```javascript
const loginIdManager = new LoginId();
const errors = loginIdManager.getErrors();

if (loginIdManager.transaction.hasErrors) {
  // Handle errors manually
}
```

**React SDK:**
```tsx
import { useErrors } from '@auth0/auth0-acul-react/login-id';

const { hasError, errors, dismiss } = useErrors();

// Errors automatically sync with component state
{hasError && <ErrorDisplay errors={errors} onDismiss={dismiss} />}
```

---

## Migration Steps

### Step 1: Update Imports

**Before (JavaScript SDK):**
```javascript
import LoginId from '@auth0/auth0-acul-js/login-id';
import SignupId from '@auth0/auth0-acul-js/signup-id';
```

**After (React SDK):**
```tsx
import { 
  useTransaction, 
  useScreen, 
  login, 
  federatedLogin 
} from '@auth0/auth0-acul-react/login-id';

import { 
  useTransaction, 
  useScreen, 
  signup, 
  federatedSignup 
} from '@auth0/auth0-acul-react/signup-id';
```

### Step 2: Remove Instance Creation

**Before:**
```javascript
const loginIdManager = new LoginId();
const { transaction, screen } = loginIdManager;
```

**After:**
```tsx
const transaction = useTransaction();
const screen = useScreen();
```

### Step 3: Replace Method Calls with Function Calls

**Before:**
```javascript
await loginIdManager.login({ username: 'user@example.com' });
```

**After:**
```tsx
await login({ username: 'user@example.com' });
```

### Step 4: Update Error Handling

**Before:**
```javascript
const errors = loginIdManager.getErrors();
if (loginIdManager.transaction.hasErrors) {
  // Display errors
}
```

**After:**
```tsx
const { hasError, errors, dismiss } = useErrors();
if (hasError) {
  // Display errors
}
```

### Step 5: Update Utility Functions

**Before:**
```javascript
const activeIdentifiers = loginIdManager.transaction.getActiveIdentifiers();
```

**After:**
```tsx
import { useLoginIdentifiers } from '@auth0/auth0-acul-react/login-id';

const activeIdentifiers = useLoginIdentifiers();
```

---

## Screen-by-Screen Examples

### Login ID Screen

#### JavaScript SDK (Before)

```javascript
import LoginId from '@auth0/auth0-acul-js/login-id';
import { useState, useEffect } from 'react';

const LoginIdScreen = () => {
  const [loginIdManager] = useState(() => new LoginId());
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      await loginIdManager.login({ username });
    } catch (err) {
      setErrors([err.message]);
    }
  };

  const handleFederatedLogin = async (connection) => {
    try {
      await loginIdManager.federatedLogin({ connection });
    } catch (err) {
      setErrors([err.message]);
    }
  };

  const { transaction, screen } = loginIdManager;
  const connections = transaction.alternateConnections || [];

  return (
    <div>
      <h1>{screen.texts?.title}</h1>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      
      {connections.map((conn) => (
        <button key={conn.name} onClick={() => handleFederatedLogin(conn.name)}>
          {conn.displayName}
        </button>
      ))}
      
      {errors.length > 0 && <div>{errors.join(', ')}</div>}
    </div>
  );
};
```

#### React SDK (After)

```tsx
import { 
  useTransaction, 
  useScreen, 
  useErrors,
  useLoginIdentifiers,
  login, 
  federatedLogin,
  passkeyLogin
} from '@auth0/auth0-acul-react/login-id';
import { useState } from 'react';

const LoginIdScreen: React.FC = () => {
  const transaction = useTransaction();
  const screen = useScreen();
  const { hasError, errors, dismiss } = useErrors();
  const activeIdentifiers = useLoginIdentifiers();
  
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    await login({ username });
  };

  const handleFederatedLogin = async (connection: string) => {
    await federatedLogin({ connection });
  };

  const handlePasskeyLogin = async () => {
    await passkeyLogin();
  };

  const connections = transaction.alternateConnections || [];

  return (
    <div>
      <h1>{screen.texts?.title}</h1>
      
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        placeholder={`Enter your ${activeIdentifiers?.join(' or ')}`}
      />
      <button onClick={handleLogin}>Login</button>
      
      {transaction.isPasskeyEnabled && (
        <button onClick={handlePasskeyLogin}>Use Passkey</button>
      )}
      
      {connections.map((conn) => (
        <button key={conn.name} onClick={() => handleFederatedLogin(conn.name)}>
          {conn.displayName}
        </button>
      ))}
      
      {hasError && (
        <div>
          {errors?.map((err, idx) => (
            <div key={idx}>{err.message}</div>
          ))}
          <button onClick={dismiss}>Dismiss</button>
        </div>
      )}
    </div>
  );
};
```

---

## Common Patterns

### Pattern 1: Accessing Context Data

**JavaScript SDK:**
```javascript
const manager = new LoginId();
const { transaction, screen, user, tenant, branding } = manager;
```

**React SDK:**
```tsx
const transaction = useTransaction();
const screen = useScreen();
const user = useUser();
const tenant = useTenant();
const branding = useBranding();
```

### Pattern 2: Validation Hooks

**JavaScript SDK:**
```javascript
const manager = new SignupPassword();
// Manual validation logic needed
```

**React SDK:**
```tsx
import { usePasswordValidation } from '@auth0/auth0-acul-react/signup-password';

const { isValid, results } = usePasswordValidation(password, { includeInErrors: true });
// Automatic real-time validation with per-rule results
```

### Pattern 3: Identifier Management

**JavaScript SDK:**
```javascript
const manager = new LoginId();
const identifiers = manager.transaction.getActiveIdentifiers();
```

**React SDK:**
```tsx
import { useLoginIdentifiers } from '@auth0/auth0-acul-react/login-id';

const identifiers = useLoginIdentifiers();
// Returns array like ['email', 'username']
```

### Pattern 4: MFA Polling

**JavaScript SDK:**
```javascript
const manager = new MfaPushChallengePush();
// Manual polling setup needed
```

**React SDK:**
```tsx
import { useMfaPolling } from '@auth0/auth0-acul-react/mfa-push-challenge-push';

const { isRunning, startPolling, stopPolling } = useMfaPolling({
  intervalMs: 5000,
  onCompleted: () => console.log('Push approved/denied'),
  onError: (error) => console.error('Polling error:', error)
});
// Automatic polling management with start/stop controls
```

### Pattern 5: Resend Functionality

**JavaScript SDK:**
```javascript
const manager = new MfaSmsChallenge();
await manager.resendCode();
```

**React SDK:**
```tsx
import { useResend } from '@auth0/auth0-acul-react/mfa-sms-challenge';

const { startResend, disabled, remaining } = useResend({
  timeoutSeconds: 30
});

// UI-friendly with built-in cooldown
<button onClick={startResend} disabled={disabled}>
  {disabled ? `Resend in ${remaining}s` : 'Resend Code'}
</button>
```

### Pattern 6: Passkey Autofill

**JavaScript SDK:**
```javascript
const manager = new LoginId();
await manager.registerPasskeyAutofill({
  onSuccess: (credential) => {
    // Handle credential
  },
  onError: (error) => {
    // Handle error
  }
});
```

**React SDK:**
```tsx
import { usePasskeyAutofill } from '@auth0/auth0-acul-react/login-id';

const { inputRef } = usePasskeyAutofill();

return (
  <input
    ref={inputRef}
    id="username"
    placeholder="Username"
    autoComplete="username webauthn"
  />
);
```

---

## Import Path Reference

### Partial Imports (Recommended)

Both SDKs support screen-specific imports to reduce bundle size:

```tsx
// Login ID screen
import { useScreen, login } from '@auth0/auth0-acul-react/login-id';

// Signup ID screen
import { useScreen, signup } from '@auth0/auth0-acul-react/signup-id';

// MFA screens
import { useScreen, continueMethod } from '@auth0/auth0-acul-react/mfa-otp-challenge';
```

### Root Imports (When Dynamic Rendering Needed)

**JavaScript SDK:**
```javascript
import * as Screens from '@auth0/auth0-acul-js';
const LoginId = Screens.LoginId;
```

**React SDK:**
```tsx
import { LoginId } from '@auth0/auth0-acul-react';
// Use for dynamic screen rendering
```

---

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:** Ensure you're using the correct import path:
```tsx
// ✅ Correct
import { useScreen } from '@auth0/auth0-acul-react/login-id';

// ❌ Wrong
import { useScreen } from '@auth0/auth0-acul-react';
```

### Issue: Hooks don't update when data changes

**Solution:** Ensure you're calling hooks inside React components, not outside:
```tsx
// ❌ Wrong
const transaction = useTransaction();

const MyComponent = () => {
  return <div>{transaction.state}</div>;
};

// ✅ Correct
const MyComponent = () => {
  const transaction = useTransaction();
  return <div>{transaction.state}</div>;
};
```

### Issue: Methods are not functions

**Solution:** Import submit functions directly, not from hooks:
```tsx
// ✅ Correct
import { login } from '@auth0/auth0-acul-react/login-id';
await login({ username: 'test' });

// ❌ Wrong
const loginIdInstance = useLoginId();
await loginIdInstance.login({ username: 'test' }); // May not work as expected
```

### Issue: TypeScript errors with payload types

**Solution:** Import types from the JavaScript SDK:
```tsx
import type { LoginOptions } from '@auth0/auth0-acul-js/login-id';

const handleLogin = async (payload: LoginOptions) => {
  await login(payload);
};
```

### Issue: Errors not being caught

**Solution:** Use the `useErrors` hook instead of try-catch:
```tsx
// ✅ Recommended
const { hasError, errors } = useErrors();
await login({ username });

// ⚠️ Also works but less integrated
try {
  await login({ username });
} catch (error) {
  // Handle manually
}
```

---

## Benefits of Migration

### 1. **Better React Integration**
- Hooks automatically sync with component lifecycle
- No need to manage instances in state
- Cleaner component code

### 2. **Built-in Error Management**
- Automatic error state tracking
- Error dismissal functionality
- Type-safe error objects

### 3. **Utility Hooks**
- Real-time validation (`usePasswordValidation`, `useUsernameValidation`)
- Polling management (`useMfaPolling`)
- Resend cooldowns (`useResend`)
- Passkey autofill (`usePasskeyAutofill`)

### 4. **Smaller Bundle Sizes**
- Tree-shakeable exports
- Import only what you need per screen
- Optimized for partial imports

### 5. **Better Type Safety**
- Full TypeScript support
- Type inference for hooks
- Strongly typed payloads

---

## Additional Resources

- [React SDK Documentation](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react)
- [React SDK Examples](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples)
- [JavaScript SDK Documentation](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-js)
- [Auth0 Universal Login Docs](https://auth0.com/docs/customize/login-pages/advanced-customizations)

---

## Need Help?

If you encounter issues during migration:

1. Check the [examples folder](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/examples) for screen-specific patterns
2. Review the [TypeScript definitions](https://github.com/auth0/universal-login/tree/master/packages/auth0-acul-react/dist) for available hooks and functions
3. Open an issue on [GitHub](https://github.com/auth0/universal-login/issues)

---

**Last Updated:** December 2025  
**React SDK Version:** 1.0.0  
**JavaScript SDK Version:** 1.0.0
