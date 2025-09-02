import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { errorStore, type ErrorItem, type ErrorKind } from '../../state/error-store';

export type ErrorInfo = ErrorItem & { type: 'server' | 'client' | 'developer' };
export type UseErrorsOptions = { type?: ErrorKind };

type WithGetErrors = { getErrors?: () => ErrorItem[] };

export function createUseErrors<M extends WithGetErrors>(getInstance: () => M) {
  // Use the factory function as a stable WeakMap key; no instance creation.
  const key = getInstance as unknown as object;

  // Per-kind caches so we only map when the bucket reference actually changes.
  const cacheServer = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorInfo>>();
  const cacheClient = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorInfo>>();
  const cacheDev    = new WeakMap<ReadonlyArray<ErrorItem>, ReadonlyArray<ErrorInfo>>();

  const tag = (
    kind: ErrorKind,
    arr: ReadonlyArray<ErrorItem>
  ): ReadonlyArray<ErrorInfo> => {
    const cache = kind === 'server' ? cacheServer : kind === 'client' ? cacheClient : cacheDev;
    const hit = cache.get(arr);
    if (hit) return hit;
    const out = Object.freeze(arr.map((e) => ({ ...e, type: kind as ErrorKind})));
    cache.set(arr, out);
    return out;
  };

  function useErrors(opts?: UseErrorsOptions): ReadonlyArray<ErrorInfo> {
    const type = opts?.type ?? 'all';

    const snap = useSyncExternalStore(
      (cb) => errorStore.subscribe(key, cb),
      () => errorStore.snapshot(key)
    );

    const didInit = useRef(false);
    useEffect(() => {
      if (didInit.current) return;
      didInit.current = true;

      const inst = getInstance();
      const server = (inst.getErrors?.() ?? []) as ErrorItem[];
      errorStore.replace(key, 'server', server);
    }, []);

    return useMemo(() => {
      if (type === 'server')   return tag('server',   snap.server);
      if (type === 'client')   return tag('client',   snap.client);
      if (type === 'developer')return tag('developer',snap.developer);
      // all = developer > client > server (priority order)
      return Object.freeze([
        ...tag('developer', snap.developer),
        ...tag('client',    snap.client),
        ...tag('server',    snap.server),
      ]);
    }, [snap.server, snap.client, snap.developer, type]);
  }

  // ---------- INTERNAL (SDK-only) ----------
  function __replaceClientErrors(list: ErrorItem[]) { errorStore.replace(key, 'client', list); }
  function __clearClientErrors() { errorStore.replace(key, 'client', []); }
  function __pushClientErrors(list: ErrorItem | ErrorItem[]) { errorStore.push(key, 'client', list); }

  function __replaceDeveloperErrors(list: ErrorItem[]) { errorStore.replace(key, 'developer', list); }
  function __clearDeveloperErrors() { errorStore.replace(key, 'developer', []); }
  function __pushDeveloperErrors(list: ErrorItem | ErrorItem[]) { errorStore.push(key, 'developer', list); }

  function __syncServerErrors() {
    const inst = getInstance();
    const server = (inst.getErrors?.() ?? []) as ErrorItem[];
    errorStore.replace(key, 'server', server);
  }

  return {
    // public
    useErrors,
    // internal (do NOT re-export)
    __replaceClientErrors,
    __clearClientErrors,
    __pushClientErrors,
    __replaceDeveloperErrors,
    __clearDeveloperErrors,
    __pushDeveloperErrors,
    __syncServerErrors,
  };
}
