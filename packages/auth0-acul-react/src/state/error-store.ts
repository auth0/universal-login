import type { Error as Auth0Error } from '@auth0/auth0-acul-js';

export interface ErrorItem extends Auth0Error {
  id: string;
  label?: string;
  kind?: ErrorKind;
}

export type ErrorKind = 'auth0' | 'validation' | 'configuration';

export const ERROR_KINDS: ErrorKind[] = ['auth0', 'validation', 'configuration'];

type Bucket = {
  auth0: ReadonlyArray<ErrorItem>;
  validation: ReadonlyArray<ErrorItem>;
  configuration: ReadonlyArray<ErrorItem>;
};

type Listener = () => void;

/** Compare two error lists by id only for maximal speed. */
function listsEqual(a: ReadonlyArray<ErrorItem>, b: ReadonlyArray<ErrorItem>) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
  }
  return true;
}

const EMPTY_BUCKET: Bucket = Object.freeze({
  auth0: Object.freeze([]),
  validation: Object.freeze([]),
  configuration: Object.freeze([]),
});

let nextId = 0;
const genId = () => `${Date.now()}-${nextId++}`;

/**
 * Global error store for ACUL (one screen per page).
 * - Holds a single bucket of errors across the current page.
 * - Generates stable ids for every inserted error.
 * - Emits immutable snapshots to subscribers.
 */
class ErrorStore {
  private bucket: Bucket = EMPTY_BUCKET;
  private listeners: Set<Listener> = new Set();

  subscribe(cb: Listener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  snapshot(): Readonly<Bucket> {
    return this.bucket;
  }

  /** Add ids and freeze an array of ErrorItem-like objects. */
  private normalize(
    list: Array<Omit<ErrorItem, 'id'> & { id?: string }>
  ): ReadonlyArray<ErrorItem> {
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
  replace(kind: ErrorKind, list: Array<Omit<ErrorItem, 'id'> | ErrorItem>) {
    const nextList = this.normalize(list);
    if (listsEqual(this.bucket[kind], nextList)) return;

    this.bucket = Object.freeze({
      ...this.bucket,
      [kind]: nextList,
    });
    this.notify();
  }

  /**
   * Replace only errors for a specific field within a kind.
   * - Keeps all existing errors for other fields.
   * - Normalizes incoming errors and replaces matching field ones.
   */
  replacePartial(kind: ErrorKind, list: Array<Omit<ErrorItem, 'id'> | ErrorItem>, field: string) {
    const incoming = this.normalize(list);
    const existing = this.bucket[kind].filter((e) => e.field !== field);
    const nextKindList = Object.freeze([...existing, ...incoming]);

    if (listsEqual(this.bucket[kind], nextKindList)) return;

    this.bucket = Object.freeze({
      ...this.bucket,
      [kind]: nextKindList,
    });
    this.notify();
  }

  /** Append one or more items to a kind. */
  push(
    kind: ErrorKind,
    list: Omit<ErrorItem, 'id'> | ErrorItem | Array<Omit<ErrorItem, 'id'> | ErrorItem>
  ) {
    const arr = Array.isArray(list) ? list : [list];
    if (arr.length === 0) return;

    const nextKindList = Object.freeze([...this.bucket[kind], ...this.normalize(arr)]);
    this.bucket = Object.freeze({
      ...this.bucket,
      [kind]: nextKindList,
    });
    this.notify();
  }

  /** Clear one or more kinds (default: all kinds). */
  clear(kinds: ErrorKind[] = ERROR_KINDS) {
    let changed = false;
    const next: Bucket = { ...this.bucket };

    for (const k of kinds) {
      if (this.bucket[k].length > 0) {
        next[k] = Object.freeze([]);
        changed = true;
      }
    }

    if (!changed) return;
    this.bucket = Object.freeze(next);
    this.notify();
  }

  /**
   * Remove errors that match a given id or predicate from specified kinds.
   */
  remove(kinds: ErrorKind[] = ERROR_KINDS, test: string | ((e: ErrorItem) => boolean)) {
    const isMatch = typeof test === 'string' ? (e: ErrorItem) => e.id === test : test;

    let changed = false;
    const next: Bucket = { ...this.bucket };

    for (const k of kinds) {
      const filtered = this.bucket[k].filter((e) => !isMatch(e));
      if (filtered.length !== this.bucket[k].length) {
        next[k] = Object.freeze(filtered);
        changed = true;
      }
    }

    if (!changed) return;
    this.bucket = Object.freeze(next);
    this.notify();
  }

  private notify() {
    for (const cb of this.listeners) cb();
  }
}

export const errorStore = new ErrorStore();
