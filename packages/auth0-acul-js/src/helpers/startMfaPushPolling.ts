import type { StartMfaPushPollingOptions } from '../../interfaces/screens/mfa-push-challenge-push';

/**
 * Starts polling the MFA push challenge endpoint using XHR GET requests.
 * 
 * - Polls the given URL (or current page URL if not provided) at the specified interval.
 * - Calls the `condition` function with the response body to determine if polling should stop.
 * - If the condition is met, calls `onResult` and stops polling.
 * - Handles rate limiting (HTTP 429) by waiting until the rate limit resets.
 * - Calls `onError` if a non-200/429 response is received.
 * - Returns a cancel function to stop polling.
 * 
 * @param options.intervalMs - Polling interval in milliseconds.
 * @param options.url - Endpoint URL to poll (defaults to current page URL).
 * @param options.condition - Function to check if polling should stop (default: checks for `body.completed`).
 * @param options.onResult - Callback when the condition is met.
 * @param options.onError - Callback on error response.
 * @returns A cancel function to stop polling.
 */
export function startMfaPushPolling({
  intervalMs,
  url,
  condition = (body: Record<string, unknown>): boolean => Boolean((body as { completed?: boolean }).completed),
  onResult,
  onError,
}: Omit<StartMfaPushPollingOptions, 'state'> & { url?: string }): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const pollingUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  function internalPoll(): void {
    if (cancelled) return;
    if (typeof document !== 'undefined' && document.hidden) {
      timer = setTimeout(internalPoll, intervalMs);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', pollingUrl);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function (): void {
      if (cancelled) return;
      let body: Record<string, unknown> | string;
      try {
        body =
          xhr.getResponseHeader('Content-Type')?.split(';')[0] === 'application/json'
            ? (JSON.parse(xhr.responseText) as Record<string, unknown>)
            : xhr.responseText;
      } catch {
        body = xhr.responseText;
      }
      if (xhr.status === 200) {
        if (typeof body === 'object' && body !== null && !Array.isArray(body)) {
          if (condition(body)) {
            if (onResult) onResult();
            return;
          }
        }
        timer = setTimeout(internalPoll, intervalMs);
        return;
      }
      if (xhr.status === 429) {
        const end = Number.parseInt(xhr.getResponseHeader('X-RateLimit-Reset') || '0') * 1000;
        const wait = end - new Date().getTime();
        timer = setTimeout(internalPoll, wait > intervalMs ? wait : intervalMs);
        return;
      }
      if (onError) onError({ status: xhr.status, responseText: xhr.responseText });
    };
    xhr.onerror = function (): void {
      if (cancelled) return;
      if (onError) onError({ status: xhr.status, responseText: xhr.responseText });
    };
    xhr.send();
  }

  timer = setTimeout(internalPoll, intervalMs);

  function cancel(): void {
    cancelled = true;
    if (timer) clearTimeout(timer);
  }

  return cancel;
}

/**
 * Sends an approval for the MFA push challenge using XHR POST.
 * 
 * - Sends a POST request to the given URL (or current page URL if not provided).
 * - Includes `action: 'continue'`, `state`, and the current value of the "Remember Device" checkbox in the payload.
 * - Reads the checkbox value from the DOM using the provided selector.
 * 
 * @param options.url - Endpoint URL to send approval (defaults to current page URL).
 * @param options.state - The MFA transaction/challenge state.
 * @param options.rememberDeviceSelector - CSS selector for the "Remember Device" checkbox.
 */
export function approveMfaPush({
  url,
  state,
  rememberDeviceSelector,
}: {
  url?: string;
  state: string;
  rememberDeviceSelector?: string;
}): void {
  const postUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  let rememberDevice = false;
  if (rememberDeviceSelector && typeof document !== 'undefined') {
    const el = document.querySelector<HTMLInputElement>(rememberDeviceSelector);
    rememberDevice = !!el?.checked;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('POST', postUrl);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ action: 'continue', state, rememberDevice }));
}