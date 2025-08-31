# MFA Push Polling Utility

This utility provides robust polling for MFA push notifications in applications. It sends a POST request to your backend endpoint at a specified interval and continues until the polling is cancelled or the condition is met.

## Function

### `startMfaPushPolling(options)`

**Options:**
- **intervalMs**: `number` — The polling interval in milliseconds (e.g., `5000` for 5 seconds).
- **url**: `string` — The endpoint URL to poll for MFA push status.
- **condition**: `(body: Record<string, unknown>) => boolean` — A function to determine if polling should stop (default: checks for `body.completed`).
- **onResult**: `() => void` — Called when the condition is met.
- **onError**: `(error: { status: number; responseText: string }) => void` — Called on error responses.

**Returns:**
- A cancel function. Call this to stop polling (e.g., in a React effect cleanup).

## Usage in React

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { startMfaPushPolling } from '@auth0/auth0-acul-js';

const MyComponent = () => {
  const [pollInterval] = useState(5000); // 5 seconds
  const pollerRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (pollerRef.current) pollerRef.current(); // Cancel previous poller
    pollerRef.current = startMfaPushPolling({
      intervalMs: pollInterval,
      url: '/your/mfa/push/status/endpoint',
      condition: (body) => !!body.completed,
      onResult: () => { /* handle approval, e.g. submit form */ },
      onError: (err) => { /* handle error */ }
    });
    return () => {
      if (pollerRef.current) pollerRef.current();
    };
  }, [pollInterval]);

  // ...rest of your component
};
```

## How It Works
- Sends a POST request with `{ action: 'CONTINUE' }` at every interval.
- Checks the response using the `condition` function.
- Stops polling when the condition is met or when cancelled.
- Handles rate limiting (HTTP 429) and errors.
- Only one poller runs per component instance (using a React ref).

## Best Practices
- Always clean up the poller in your effect's cleanup function.
- Use a `useRef` to store the cancel function and avoid duplicate pollers.

## Example
See `src/helpers/startMfaPushPolling.ts` for the full implementation.