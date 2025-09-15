import { useEffect, useMemo, useRef, useSyncExternalStore, useCallback } from 'react';
import { errorStore, ERROR_KINDS, type ErrorItem, type ErrorKind } from '../../state/error-store';
import { SDKUsageError, UserInputError, Auth0ServerError } from '@auth0/auth0-acul-js';

export interface ErrorInfo extends ErrorItem {
  kind: ErrorKind;
}

export interface WithGetErrors {
  getErrors?: () => Omit<ErrorItem, 'id'>[];
}

export interface ErrorsResult extends ReadonlyArray<ErrorInfo> {
  byKind(kind: ErrorKind, opts?: { field?: string }): ReadonlyArray<ErrorInfo>;
  byField(field: string, opts?: { kind?: ErrorKind }): ReadonlyArray<ErrorInfo>;
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

function classifyKind(e: any): 'client' | 'developer' | 'server' | null {
  if (e instanceof UserInputError) return 'client';
  if (e instanceof SDKUsageError) return 'developer';
  if (e instanceof Auth0ServerError) return 'server';

  return null;
}

function toErrorObject(e: any): Omit<ErrorItem, 'id'> {
  return {
    code: e?.code ?? e?.name ?? 'unknown_error',
    message: e?.message ?? 'Unknown error',
    field: e?.field,
  };
}

function filterByField<T extends { field?: string }>(
  list: ReadonlyArray<T>,
  field?: string
): ReadonlyArray<T> {
  if (!field) return list;
  return list.filter((e) => e.field === field);
}

export function createUseErrors<M extends WithGetErrors>(getInstance: () => M) {
  const key = getInstance as unknown as object;

  const cacheServer = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorInfo>>();
  const cacheClient = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorInfo>>();
  const cacheDev = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorInfo>>();

  const tag = (kind: ErrorKind, arr: ReadonlyArray<ErrorItem>): ReadonlyArray<ErrorInfo> => {
    const cache = kind === 'server' ? cacheServer : kind === 'client' ? cacheClient : cacheDev;
    const hit = cache.get(arr);
    if (hit) return hit;
    const out = Object.freeze(arr.map((e) => Object.freeze({ ...e, kind: kind as ErrorKind })));
    cache.set(arr, out);
    return out;
  };

  function useErrors(options: UseErrorOptions = {}): UseErrorsResult {
    const { includeDevErrors = false } = options;

    const snap = useSyncExternalStore(
      (cb) => errorStore.subscribe(key, cb),
      () => errorStore.snapshot(key)
    );

    const didInit = useRef(false);
    useEffect(() => {
      if (didInit.current) return;
      didInit.current = true;
      const instance = getInstance();
      const server = (instance.getErrors?.() ?? []) as Array<Omit<ErrorItem, 'id'>>;
      errorStore.replace(key, 'server', server);
    }, []);

    const serverTagged = useMemo(() => tag('server', snap.server), [snap.server]);
    const clientTagged = useMemo(() => tag('client', snap.client), [snap.client]);
    const devTagged = useMemo(() => tag('developer', snap.developer), [snap.developer]);

    const all = useMemo<ReadonlyArray<ErrorInfo>>(
      () =>
        Object.freeze([...(includeDevErrors ? devTagged : []), ...clientTagged, ...serverTagged]),
      [includeDevErrors, devTagged, clientTagged, serverTagged]
    );

    const errors: ErrorsResult = useMemo(() => {
      const arr = Object.assign([...all], {
        // Get all errors of a specific kind, optionally filtered by field.
        byKind(kind: ErrorKind, opts?: { field?: string }): ReadonlyArray<ErrorInfo> {
          const base =
            kind === 'client' ? clientTagged :
            kind === 'developer' ? devTagged :
            serverTagged;
          return opts?.field ? Object.freeze(filterByField(base, opts.field)) : base;
        },

        // Get all errors for a specific field, optionally filtered by kind.
        byField(field: string, opts?: { kind?: ErrorKind }): ReadonlyArray<ErrorInfo> {
          if (opts?.kind) {
            return arr.byKind(opts.kind, { field });
          }
          return Object.freeze(filterByField(all, field));
        }
      });
      return Object.freeze(arr);
    }, [all, clientTagged, devTagged, serverTagged]);

    const hasError = all.length > 0;

    const dismiss = useCallback((id: string) => {
      errorStore.remove(key, ERROR_KINDS, id);
    }, []);

    const dismissAll = useCallback(() => {
      errorStore.clear(key, ERROR_KINDS);
    }, []);

    return useMemo(
      () => ({ errors, hasError, dismiss, dismissAll }),
      [errors, hasError, dismiss, dismissAll]
    );
  }

  /* internal helpers for SDK usage */
  function __replaceClientErrors(list: Array<Omit<ErrorItem, 'id'>>) {
    errorStore.replace(key, 'client', list);
  }
  function __clearClientErrors() {
    errorStore.clear(key, ['client']);
  }
  function __pushClientErrors(list: Omit<ErrorItem, 'id'> | Array<Omit<ErrorItem, 'id'>>) {
    errorStore.push(key, 'client', list);
  }

  function __replaceDeveloperErrors(list: Array<Omit<ErrorItem, 'id'>>) {
    errorStore.replace(key, 'developer', list);
  }
  function __clearDeveloperErrors() {
    errorStore.clear(key, ['developer']);
  }
  function __pushDeveloperErrors(list: Omit<ErrorItem, 'id'> | Array<Omit<ErrorItem, 'id'>>) {
    errorStore.push(key, 'developer', list);
  }

  function __replaceServerErrors(list: Array<Omit<ErrorItem, 'id'>>) {
    errorStore.replace(key, 'server', list);
  }
  function __clearServerErrors() {
    errorStore.clear(key, ['server']);
  }
  function __pushServerErrors(list: Omit<ErrorItem, 'id'> | Array<Omit<ErrorItem, 'id'>>) {
    errorStore.push(key, 'server', list);
  }

  function __syncServerErrors() {
    const inst = getInstance();
    const server = (inst.getErrors?.() ?? []) as Array<Omit<ErrorItem, 'id'>>;
    errorStore.replace(key, 'server', server);
  }

  const isPromise = (v: unknown): v is Promise<unknown> =>
    !!v && typeof (v as any).then === 'function';

  function withErrorHandler<T>(fn: () => T): T;
  function withErrorHandler<T>(fn: () => Promise<T>): Promise<T>;
  function withErrorHandler<T>(promise: Promise<T>): Promise<T>;
  function withErrorHandler<T>(
    actionOrPromise: (() => T | Promise<T>) | Promise<T>
  ): T | Promise<T> {
    const handle = (e: any) => {
      const kind = classifyKind(e);
      const normalized = toErrorObject(e);
      if (kind === 'client') __replaceClientErrors([normalized]);
      else if (kind === 'developer') __replaceDeveloperErrors([normalized]);
      else if (kind === 'server') __replaceServerErrors([normalized]);
      throw e;
    };

    if (typeof actionOrPromise === 'function') {
      try {
        const result = (actionOrPromise as () => T | Promise<T>)();
        return isPromise(result) ? (result as Promise<T>).catch(handle) : result;
      } catch (e) {
        handle(e);
      }
    }

    return (actionOrPromise as Promise<T>).catch(handle);
  }

  return {
    useErrors,
    withErrorHandler,
    __replaceClientErrors,
    __clearClientErrors,
    __pushClientErrors,
    __replaceDeveloperErrors,
    __clearDeveloperErrors,
    __pushDeveloperErrors,
    __replaceServerErrors,
    __clearServerErrors,
    __pushServerErrors,
    __syncServerErrors,
  };
}
