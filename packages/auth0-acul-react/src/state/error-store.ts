export type ErrorItem = {
  id: string;
  code: string;
  message: string;
  field?: string;
  rules?: Array<Record<string, unknown>>;
};

export type ErrorKind = 'server' | 'client' | 'developer';

export const ERROR_KINDS: ErrorKind[] = ['server', 'client', 'developer'];

type Bucket = {
  server: ReadonlyArray<ErrorItem>;
  client: ReadonlyArray<ErrorItem>;
  developer: ReadonlyArray<ErrorItem>;
};

type Listener = () => void;

/** Compare two error lists by id only for maximal speed. */
export function listsEqual(a: ReadonlyArray<ErrorItem>, b: ReadonlyArray<ErrorItem>) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
  }
  return true;
}

const EMPTY_BUCKET: Bucket = Object.freeze({
  server: Object.freeze([]),
  client: Object.freeze([]),
  developer: Object.freeze([]),
});

let nextId = 0;
const genId = () => `${Date.now()}-${nextId++}`;

/**
 * Per-screen error store keyed by the screen instance (singleton per page).
 * Generates a stable id for every inserted error for fast diffing and removal.
 */
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
    return this.ensure(key);
  }

  /** Add ids and freeze an array of ErrorItem-like objects. */
  private normalize(list: Array<Omit<ErrorItem, 'id'> & { id?: string }>): ReadonlyArray<ErrorItem> {
    return Object.freeze(
      list.map((e) =>
        Object.freeze({
          ...e,
          id: e.id ?? genId(),
        })
      )
    );
  }

  /** Replace an entire kind with a new list (generating ids if needed). */
  replace(key: object, kind: ErrorKind, list: Array<Omit<ErrorItem, 'id'> | ErrorItem>) {
    const prev = this.ensure(key);
    const nextList = this.normalize(list);
    if (listsEqual(prev[kind], nextList)) return;
    
    const next: Bucket = Object.freeze({
      server: kind === 'server' ? nextList : prev.server,
      client: kind === 'client' ? nextList : prev.client,
      developer: kind === 'developer' ? nextList : prev.developer,
    });
    
    this.data.set(key, next);
    this.notify(key);
  }

  /** Append one or more items to a kind. */
  push(key: object, kind: ErrorKind, list: Omit<ErrorItem, 'id'> | ErrorItem | Array<Omit<ErrorItem, 'id'> | ErrorItem>) {
    const prev = this.ensure(key);
    const arr = Array.isArray(list) ? list : [list];
    if (arr.length === 0) return;

    const nextKindList = Object.freeze([...prev[kind], ...this.normalize(arr)]);
    const next: Bucket = Object.freeze({
      server: kind === 'server' ? nextKindList : prev.server,
      client: kind === 'client' ? nextKindList : prev.client,
      developer: kind === 'developer' ? nextKindList : prev.developer,
    });

    this.data.set(key, next);
    this.notify(key);
  }

  /** Clear one or more kinds (default: all kinds). */
  clear(key: object, kinds: ErrorKind[] = ['server', 'client', 'developer']) {
    const prev = this.ensure(key);

    let server = prev.server;
    let client = prev.client;
    let developer = prev.developer;
    let changed = false;

    const empty = (k: ErrorKind) => Object.freeze([]) as ReadonlyArray<ErrorItem>;

    for (const k of kinds) {
      if (k === 'server' && server.length) {
        server = empty('server');
        changed = true;
      } else if (k === 'client' && client.length) {
        client = empty('client');
        changed = true;
      } else if (k === 'developer' && developer.length) {
        developer = empty('developer');
        changed = true;
      }
    }

    if (!changed) return;
    const next: Bucket = Object.freeze({ server, client, developer });
    this.data.set(key, next);
    this.notify(key);
  }

  /**
   * Remove errors that match a given id or predicate from specified kinds.
   */
  remove(
    key: object,
    kinds: ErrorKind[] = ['server', 'client', 'developer'],
    test: string | ((e: ErrorItem) => boolean)
  ) {
    const prev = this.ensure(key);
    const isMatch = typeof test === 'string' ? (e: ErrorItem) => e.id === test : test;

    let server = prev.server;
    let client = prev.client;
    let developer = prev.developer;
    let changed = false;

    const maybeFilter = (list: ReadonlyArray<ErrorItem>) => {
      const filtered = list.filter((e) => !isMatch(e));
      return filtered.length === list.length ? list : Object.freeze(filtered);
    };

    if (kinds.includes('server')) {
      const next = maybeFilter(server);
      if (next !== server) { server = next; changed = true; }
    }
    if (kinds.includes('client')) {
      const next = maybeFilter(client);
      if (next !== client) { client = next; changed = true; }
    }
    if (kinds.includes('developer')) {
      const next = maybeFilter(developer);
      if (next !== developer) { developer = next; changed = true; }
    }

    if (!changed) return;
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
