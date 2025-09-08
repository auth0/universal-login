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
 * @param intervalMs - Polling interval in milliseconds.
 * @param url - Endpoint URL to poll (defaults to current page URL).
 * @param condition - Function to check if polling should stop (default: checks for `body.completed`).
 * @param onResult - Callback when the condition is met.
 * @param onError - Callback on error response.
 * @returns A cancel function to stop polling.
 */
export function mfaPushPolling({
  intervalMs,
  url,
  condition = (body: Record<string, unknown>): boolean => Boolean((body as { completed?: boolean }).completed),
  onResult,
  onError,
}: Omit<StartMfaPushPollingOptions, 'state'> & { url?: string }): { stop: () => void; start: () => void; running: () => boolean } {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const pollingUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  let isRunning = false;

  function internalPoll(): void {
    if (cancelled) return;
    isRunning = true;
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
            isRunning = false;
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

  function start(): void {
    if (!isRunning) {
      cancelled = false;
      internalPoll();
    }
  }

  function stop(): void {
    cancelled = true;
    isRunning = false;
    if (timer) clearTimeout(timer);
  }

  function running(): boolean {
    return isRunning && !cancelled;
  }

  start();

  return { stop, start, running };
}