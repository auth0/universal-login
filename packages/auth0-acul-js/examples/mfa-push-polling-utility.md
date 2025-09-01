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
import { startMfaPushPolling, approveMfaPush } from '@auth0/auth0-acul-js';

// Start polling for MFA push status
const cancelPolling = startMfaPushPolling({
  intervalMs: 5000,
  url: '/api/mfa/push/status', // or omit for current page
  condition: (body) => !!body.completed, // stop when MFA is approved
  onResult: () => {
    alert('MFA push approved!');
    cancelPolling(); // stop polling
  },
  onError: (err) => {
    console.error('Polling error:', err);
    cancelPolling();
  }
});

// When user clicks "Approve" button, send approval
document.getElementById('approve-btn').addEventListener('click', function() {
  approveMfaPush({
    url: '/api/mfa/push/status', // or omit for current page
    state: 'your-mfa-state-value', // get this from your app context
    rememberDeviceSelector: '#remember-device-checkbox' // CSS selector for checkbox
  });
});
```

**Note:**  
- `startMfaPushPolling` will keep polling until the condition is met or cancelled.
- `approveMfaPush` sends the user's approval to the backend, including the current state and checkbox value.

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