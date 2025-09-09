export type ErrorItem = {
  code: string;
  message: string;
  field?: string;
  rules?: Array<Record<string, unknown>>;
};

export type ErrorKind = 'server' | 'client' | 'developer';

type Bucket = {
  server: ReadonlyArray<ErrorItem>;
  client: ReadonlyArray<ErrorItem>;
  developer: ReadonlyArray<ErrorItem>;
};

type Listener = () => void;

export function listsEqual(a: ReadonlyArray<ErrorItem>, b: ReadonlyArray<ErrorItem>) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (x.code !== y.code || x.message !== y.message || x.field !== y.field) return false;
  }
  return true;
}

const EMPTY_BUCKET: Bucket = Object.freeze({
  server: Object.freeze([]),
  client: Object.freeze([]),
  developer: Object.freeze([]),
});

/** Per-screen error store keyed by the screen instance (singleton per page). */
class ErrorStore {
  private data = new WeakMap<object, Bucket>();
  private listeners = new WeakMap<object, Set<Listener>>();

  private ensure(key: object): Bucket {
    let b = this.data.get(key);
    if (!b) {
      b = EMPTY_BUCKET;
      this.data.set(key, b);
    }
    return b;
  }

  subscribe(key: object, cb: Listener): () => void {
    let set = this.listeners.get(key);
    if (!set) {
      set = new Set();
      this.listeners.set(key, set);
    }
    set.add(cb);
    return () => set!.delete(cb);
  }

  snapshot(key: object): Readonly<Bucket> {
    // Return existing references so React re-renders only on real changes.
    return this.ensure(key);
  }

  // Replace an entire kind (useful for server or client resets).
  replace(key: object, kind: ErrorKind, list: ErrorItem[]) {
    const prev = this.ensure(key);

    // ✅ Compare before allocating
    if (listsEqual(prev[kind], list)) return;

    const nextList = Object.freeze(list.slice());
    const next: Bucket = Object.freeze({
      server: kind === 'server' ? nextList : prev.server,
      client: kind === 'client' ? nextList : prev.client,
      developer: kind === 'developer' ? nextList : prev.developer,
    });

    this.data.set(key, next);
    this.notify(key);
  }

  // Append client/developer error(s).
  push(key: object, kind: 'client' | 'developer', list: ErrorItem | ErrorItem[]) {
    const prev = this.ensure(key);
    const arr = Array.isArray(list) ? list : [list];
    if (arr.length === 0) return; // nothing to do

    const nextKindList = Object.freeze([...prev[kind], ...arr]);
    const next: Bucket = Object.freeze({
      server: prev.server,
      client: kind === 'client' ? nextKindList : prev.client,
      developer: kind === 'developer' ? nextKindList : prev.developer,
    });

    this.data.set(key, next);
    this.notify(key);
  }

  // Clear one or more kinds (default: all).
  clear(key: object, kinds: ErrorKind[] = ['server', 'client', 'developer']) {
    const prev = this.ensure(key);

    // Compute new refs but only swap if at least one actually changes.
    let server = prev.server;
    let client = prev.client;
    let developer = prev.developer;

    let changed = false;
    for (const k of kinds) {
      if (k === 'server' && server !== EMPTY_BUCKET.server) {
        server = EMPTY_BUCKET.server;
        changed = true;
      } else if (k === 'client' && client !== EMPTY_BUCKET.client) {
        client = EMPTY_BUCKET.client;
        changed = true;
      } else if (k === 'developer' && developer !== EMPTY_BUCKET.developer) {
        developer = EMPTY_BUCKET.developer;
        changed = true;
      }
    }

    if (!changed) return; // ✅ no-op if already clear

    const next: Bucket = Object.freeze({ server, client, developer });
    this.data.set(key, next);
    this.notify(key);
  }

  private notify(key: object) {
    const set = this.listeners.get(key);
    if (!set) return;
    for (const cb of set) cb();
  }
}

export const errorStore = new ErrorStore();
