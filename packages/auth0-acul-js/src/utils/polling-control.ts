import type { Error as ErrorSchema } from "../../interfaces/models/transaction";
import type {
  MfaPollingOptions,
  MfaPushPollingControl,
} from "../../interfaces/utils/polling-control";

/**
 * Polls the current page URL using XHR GET requests with `Accept: application/json`.
 *
 * - Polls at the specified interval until the response body has `completed: true`, for
 *   example once an MFA push challenge or a pending consent has been approved or denied.
 * - When `completed` is true, calls `onCompleted` and stops polling.
 * - Skips requests while the page is hidden and checks again after the interval.
 * - Handles rate limiting (HTTP 429) by waiting until the rate limit resets.
 * - Calls `onError` and stops polling on a network error or a non-200/429 response.
 *
 * @param options - {@link MfaPollingOptions}
 * @returns A {@link MfaPushPollingControl} to start, stop, and inspect polling.
 */
export function createPollingControl(
  options?: MfaPollingOptions
): MfaPushPollingControl {
  const { intervalMs = 5000, onCompleted, onError } = options || {};
  const url = window.location.href;
  const condition = (body: Record<string, unknown>): boolean =>
    Boolean((body as { completed?: boolean }).completed);
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const pollingUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  let running = false;

  function internalPoll(): void {
    if (cancelled) return;
    running = true;

    if (typeof document !== "undefined" && document.hidden) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(internalPoll, intervalMs);
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", pollingUrl);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onload = function (): void {
      if (cancelled) return;
      let body: Record<string, unknown> | string;
      try {
        body =
          xhr.getResponseHeader("Content-Type")?.split(";")[0] === "application/json"
            ? (JSON.parse(xhr.responseText) as Record<string, unknown>)
            : xhr.responseText;
      } catch {
        body = xhr.responseText;
      }

      if (xhr.status === 200) {
        if (typeof body === "object" && body && !Array.isArray(body)) {
          if (condition(body)) {
            onCompleted?.();
            running = false;
            return;
          }
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(internalPoll, intervalMs);
        return;
      }

      if (xhr.status === 429) {
        const end =
          Number.parseInt(xhr.getResponseHeader("X-RateLimit-Reset") || "0") * 1000;
        const wait = end - Date.now();
        if (timer) clearTimeout(timer);
        timer = setTimeout(internalPoll, wait > intervalMs ? wait : intervalMs);
        return;
      }

      const err: ErrorSchema = {
        code: `polling_error_${xhr.status}`,
        message: parseErrorMessage(xhr.responseText, xhr.status),
      };
      onError?.(err);
    };

    xhr.onerror = function (): void {
      if (cancelled) return;
      const err: ErrorSchema = {
        code: "polling_network_error",
        message: "Network error while polling.",
      };
      onError?.(err);
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

function parseErrorMessage(responseText: string, status: number): string {
  try {
    const parsed: unknown = JSON.parse(responseText);
    if (typeof parsed === "object" && parsed && "message" in parsed) {
      return String((parsed as { message?: string }).message) || `Polling error (${status})`;
    }
    
  } catch {
    // Not JSON, fall back
  }
  return responseText?.trim() || `Polling error (${status})`;
}
