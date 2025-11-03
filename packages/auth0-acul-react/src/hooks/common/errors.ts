import {
  ConfigurationError,
  ValidationError,
  Auth0Error as Auth0ServerError,
  getErrors as getServerErrors,
  type Error as Auth0Error,
} from '@auth0/auth0-acul-js';
import { useEffect, useMemo, useRef, useSyncExternalStore, useCallback } from 'react';

import { errorStore, ERROR_KINDS, type ErrorItem, type ErrorKind } from '../../state/error-store';

export interface ErrorsResult extends ReadonlyArray<ErrorItem> {
  byKind(kind: ErrorKind, opts?: { field?: string }): ReadonlyArray<ErrorItem>;
  byField(field: string, opts?: { kind?: ErrorKind }): ReadonlyArray<ErrorItem>;
}

export interface UseErrorOptions {
  includeDevErrors?: boolean;
}

export interface UseErrorsResult {
  errors: ErrorsResult;
  hasError: boolean;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

function classifyKind(e: unknown): ErrorKind | null {
  if (e instanceof ValidationError) {
    return 'validation';
  }
  if (e instanceof ConfigurationError) {
    return 'configuration';
  }
  if (e instanceof Auth0ServerError) {
    return 'auth0';
  }
  return null;
}

function toErrorObject(e: unknown): Omit<ErrorItem, 'id'> {
  return {
    code: (e as Auth0Error)?.code ?? (e instanceof Error ? e.name : undefined) ?? 'unknown_error',
    message: (e as Auth0Error)?.message ?? 'Unknown error',
    field: (e as Auth0Error)?.field,
  };
}

function filterByField<T extends { field?: string }>(
  list: ReadonlyArray<T>,
  field?: string
): ReadonlyArray<T> {
  if (!field) {
    return list;
  }
  return list.filter((e) => e.field === field);
}

// caches for tagging
const cacheServer = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorItem>>();
const cacheValidation = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorItem>>();
const cacheDev = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorItem>>();

const tag = (kind: ErrorKind, arr: ReadonlyArray<ErrorItem>): ReadonlyArray<ErrorItem> => {
  const cache = kind === 'auth0' ? cacheServer : kind === 'validation' ? cacheValidation : cacheDev;
  const hit = cache.get(arr);
  if (hit) {
    return hit;
  }
  const out = Object.freeze(arr.map((e) => Object.freeze({ ...e, kind })));
  cache.set(arr, out);
  return out;
};

/**
 * React hook for reading and managing errors in ACUL (Advanced Customization of Universal Login).
 * With all validation and server-side errors. It groups errors into three kinds:
 * - `auth0` — errors returned by Auth0 or your own backend.
 * - `validation` — errors from client-side validation (e.g., invalid form input).
 * - `configuration` — errors caused by incorrect integration or SDK misuse.
 *
 * @supportedScreens
 * - The `useErrors` hook is available on every ACUL screen.
 *
 * @param options.includeDevErrors - When `true`, configuration errors are included in
 *   the returned list. Defaults to `false`.
 *
 * @returns An object of type {@link UseErrorsResult}, containing:
 * - `errors` — the full error list of type {@link ErrorsResult}, with helpers:
 *   - `errors.byKind(kind, filter?)` — filter by error kind and optionally by field.
 *   - `errors.byField(field, filter?)` — filter by field and optionally by kind.
 * - `hasError` — `true` if any error is currently present.
 * - `dismiss(id)` — remove a specific error by its ID.
 * - `dismissAll()` — clear all tracked errors.
 *
 * Typical usage is inside a form or screen component where you need to
 * reactively display errors and provide ways to dismiss them:
 *
 * @example
 * ```tsx
 * import { useErrors } from "@auth0/auth0-acul-react";
 *
 * export function SignupForm() {
 *   const { errors, hasError, dismiss, dismissAll } = useErrors();
 *
 *   return (
 *     <div>
 *       {hasError && (
 *         <div className="mb-4">
 *           {errors.byKind("auth0").map(err => (
 *             <div key={err.id} className="text-red-600">
 *               {err.message}
 *               <button onClick={() => dismiss(err.id)}>Dismiss</button>
 *             </div>
 *           ))}
 *         </div>
 *       )}
 *
 *       <button onClick={dismissAll}>Clear All Errors</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * In addition to rendering messages, you can filter by field or kind:
 * ```ts
 * console.log(errors.byKind('validation')); // all validation errors
 * console.log(errors.byKind('validation', { field: 'username' })); // validation errors for field 'username'
 * console.log(errors.byField('username')); // all errors for field 'username'
 * console.log(errors.byField('username', { kind: 'auth0' })); // auth0 errors for field 'username'
 * ```
 */

export function useErrors(options: UseErrorOptions = {}): UseErrorsResult {
  const { includeDevErrors = false } = options;

  const snap = useSyncExternalStore(
    (cb) => errorStore.subscribe(cb),
    () => errorStore.snapshot()
  );

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) {
      return;
    }
    didInit.current = true;

    // Get server errors directly from TS SDK on first render.
    const server = (getServerErrors?.() ?? []) as Array<Omit<ErrorItem, 'id'>>;
    errorStore.replace('auth0', server);
  }, []);

  const serverTagged = useMemo(() => tag('auth0', snap.auth0), [snap.auth0]);
  const clientTagged = useMemo(() => tag('validation', snap.validation), [snap.validation]);
  const devTagged = useMemo(() => tag('configuration', snap.configuration), [snap.configuration]);

  const all = useMemo<ReadonlyArray<ErrorItem>>(
    () => Object.freeze([...(includeDevErrors ? devTagged : []), ...clientTagged, ...serverTagged]),
    [includeDevErrors, devTagged, clientTagged, serverTagged]
  );

  const errors: ErrorsResult = useMemo(() => {
    const arr = Object.assign([...all], {
      byKind(kind: ErrorKind, opts?: { field?: string }): ReadonlyArray<ErrorItem> {
        let base: ReadonlyArray<ErrorItem>;
        if (kind === 'validation') {
          base = clientTagged;
        } else if (kind === 'configuration') {
          base = devTagged;
        } else {
          base = serverTagged;
        }
        if (opts?.field) {
          return Object.freeze(filterByField(base, opts.field));
        }
        return base;
      },
      byField(field: string, opts?: { kind?: ErrorKind }): ReadonlyArray<ErrorItem> {
        if (opts?.kind) {
          return arr.byKind(opts.kind, { field });
        }
        return Object.freeze(filterByField(all, field));
      },
    });
    return Object.freeze(arr);
  }, [all, clientTagged, devTagged, serverTagged]);

  const hasError = all.length > 0;

  const dismiss = useCallback((id: string) => {
    errorStore.remove(ERROR_KINDS, id);
  }, []);

  const dismissAll = useCallback(() => {
    errorStore.clear(ERROR_KINDS);
  }, []);

  return useMemo(
    () => ({ errors, hasError, dismiss, dismissAll }),
    [errors, hasError, dismiss, dismissAll]
  );
}

// ---------------- INTERNAL (SDK-only) ----------------
const isPromise = (v: unknown): v is Promise<unknown> =>
  typeof v === 'object' &&
  v !== null &&
  'then' in v &&
  typeof (v as { then: unknown }).then === 'function';

function withError<T>(actionOrPromise: (() => T | Promise<T>) | Promise<T>): T | Promise<T> {
  const handle = (e: unknown) => {
    const kind = classifyKind(e);
    const normalized = toErrorObject(e);
    switch (kind) {
      case 'validation':
        errorManager.replaceValidationErrors([normalized]);
        break;
      case 'configuration':
        errorManager.replaceDeveloperErrors([normalized]);
        break;
      case 'auth0':
        errorManager.replaceServerErrors([normalized]);
        break;
      default: {
        console.error('[auth0-acul-react] Unhandled error:', e);
        throw e;
      }
    }
  };

  if (typeof actionOrPromise === 'function') {
    try {
      const result = (actionOrPromise as () => T | Promise<T>)();
      return isPromise(result)
        ? result.catch((e) => {
            handle(e);
            throw e;
          })
        : result;
    } catch (e) {
      handle(e);
      throw e;
    }
  }

  return actionOrPromise.catch((e) => {
    handle(e);
    throw e;
  });
}

/**
 * @hidden
 * Internal error manager for use by SDK methods.
 * Use the `useErrors` hook in React components instead.
 */
export const errorManager = {
  withError,

  replaceValidationErrors(list: Array<Omit<ErrorItem, 'id'>>, opts?: { byField?: string }) {
    if (opts?.byField) {
      errorStore.replacePartial('validation', list, opts.byField);
    } else {
      errorStore.replace('validation', list);
    }
  },
  clearValidationErrors() {
    errorStore.clear(['validation']);
  },
  pushValidationErrors(list: Omit<ErrorItem, 'id'> | Array<Omit<ErrorItem, 'id'>>) {
    errorStore.push('validation', list);
  },

  replaceDeveloperErrors(list: Array<Omit<ErrorItem, 'id'>>, opts?: { byField?: string }) {
    if (opts?.byField) {
      errorStore.replacePartial('configuration', list, opts.byField);
    } else {
      errorStore.replace('configuration', list);
    }
  },
  clearDeveloperErrors() {
    errorStore.clear(['configuration']);
  },
  pushDeveloperErrors(list: Omit<ErrorItem, 'id'> | Array<Omit<ErrorItem, 'id'>>) {
    errorStore.push('configuration', list);
  },

  replaceServerErrors(list: Array<Omit<ErrorItem, 'id'>>, opts?: { byField?: string }) {
    if (opts?.byField) {
      errorStore.replacePartial('auth0', list, opts.byField);
    } else {
      errorStore.replace('auth0', list);
    }
  },
  clearServerErrors() {
    errorStore.clear(['auth0']);
  },
  pushServerErrors(list: Omit<ErrorItem, 'id'> | Array<Omit<ErrorItem, 'id'>>) {
    errorStore.push('auth0', list);
  },

  syncServerErrors() {
    const server = (getServerErrors?.() ?? []) as Array<Omit<ErrorItem, 'id'>>;
    errorStore.replace('auth0', server);
  },
};

export { ErrorItem, ErrorKind };
