import type { MfaPushPollingControl, StartMfaPushPollingOptions } from '../../interfaces/common/mfa-push-polling';
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
 * @param onResult - Callback when the condition is met.
 * @param onError - Callback on error response.
 * @returns A cancel function to stop polling.
 */
export function createPollingControl({
  intervalMs,
  onResult,
  onError,
}: StartMfaPushPollingOptions): MfaPushPollingControl {
  const url = window.location.href;
  const condition = (body: Record<string, unknown>): boolean => Boolean((body as { completed?: boolean }).completed);
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const pollingUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  let running = false;

  function internalPoll(): void {
    if (cancelled) return;
    running = true;
    if (typeof document !== 'undefined' && document.hidden) {
      if (timer !== null) {
       clearTimeout(timer);
      }
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
            running = false;
            return;
          }
        }
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(internalPoll, intervalMs);
        return;
      }
      if (xhr.status === 429) {
        const end = Number.parseInt(xhr.getResponseHeader('X-RateLimit-Reset') || '0') * 1000;
        const wait = end - new Date().getTime();
        if (timer !== null) {
          clearTimeout(timer);
        }
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

  function startPolling(): void {
    if (!running) {
      cancelled = false;
      internalPoll();
    }
  }

  function stopPolling(): void {
    cancelled = true;
    running = false;
    if (timer) clearTimeout(timer);
  }

  function isRunning(): boolean {
    return running && !cancelled;
  }

  return { stopPolling, startPolling, isRunning };
}