import type { StartMfaPushPollingOptions } from '../../interfaces/screens/mfa-push-challenge-push';

/**
 * Polls the MFA push challenge endpoint using XHR POST.
 * Sends { action: 'CONTINUE' } as the body.
 * Calls onResult when the condition is met, onError otherwise.
 * Returns a cancel function.
 */
export function startMfaPushPolling({
  intervalMs,
  url,
  condition = (body: Record<string, unknown>): boolean => Boolean((body as { completed?: boolean }).completed),
  onResult,
  onError,
}: Omit<StartMfaPushPollingOptions, 'rememberDevice'>): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function internalPoll(): void {
    if (cancelled) return;

    // Pause polling if document is hidden
    if (typeof document !== 'undefined' && document.hidden) {
      timer = setTimeout(internalPoll, intervalMs);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (): void {
      if (cancelled) return;
      if (xhr.status === 200) {
        let body: Record<string, unknown> | string;
        try {
          body =
            xhr.getResponseHeader('Content-Type')?.split(';')[0] === 'application/json'
              ? (JSON.parse(xhr.responseText) as Record<string, unknown>)
              : xhr.responseText;
        } catch {
          body = xhr.responseText;
        }
        if (typeof body === 'object' && body !== null && condition(body)) {
          if (onResult) onResult();
          return;
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
    // Send the POST body with only action
    xhr.send(JSON.stringify({ action: 'CONTINUE' }));
  }

  timer = setTimeout(internalPoll, intervalMs);

  function cancel(): void {
    cancelled = true;
    if (timer) clearTimeout(timer);
  }

  return cancel;
}