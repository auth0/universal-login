# MFA Push Polling Utility

This utility provides robust polling for MFA push notifications in applications. It ensures a push request is sent immediately and then at a specified interval, until the polling is cancelled (e.g., on component unmount or dependency change).

## Function

### `startMfaPushPolling(intervalMs, transaction, rememberDevice)`

- **intervalMs**: `number` — The polling interval in milliseconds (e.g., `5000` for 5 seconds).
- **transaction**: `MfaPushChallengePush` — An instance of your MFA push transaction.
- **rememberDevice**: `boolean` — Whether to set the `rememberDevice` flag on each push.

**Returns:**
- A cancel function. Call this to stop polling (e.g., in a React effect cleanup).

## Usage in React

```tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import MfaPushChallengePush from '@auth0/auth0-acul-js/mfa-push-challenge-push';
import { startMfaPushPolling } from '@auth0/auth0-acul-js';

const MyComponent = () => {
  const [rememberDevice, setRememberDevice] = useState(false);
  const [pollInterval] = useState(5000); // 5 seconds
  const mfaPushChallengePush = useMemo(() => new MfaPushChallengePush(), []);
  const pollerRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (pollerRef.current) pollerRef.current(); // Cancel previous poller
    pollerRef.current = startMfaPushPolling(
      pollInterval,
      mfaPushChallengePush,
      rememberDevice
    );
    return () => {
      if (pollerRef.current) pollerRef.current();
    };
  }, [pollInterval, mfaPushChallengePush, rememberDevice]);

  // ...rest of your component
};
```

## How It Works
- Sends the first push immediately.
- Resends the push after every `intervalMs` milliseconds.
- Stops polling when the cancel function is called (e.g., on unmount or dependency change).
- Only one poller runs per component instance (using a React ref).

## Best Practices
- Always clean up the poller in your effect's cleanup function.
- Use a `useRef` to store the cancel function and avoid duplicate pollers.
- Pass the latest `rememberDevice` value as a dependency to the effect.

## Example
See `src/screens/mfa-push-challenge-push/index.tsx` for a full implementation example.
