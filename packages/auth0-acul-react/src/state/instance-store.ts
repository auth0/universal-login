let instance: unknown | null = null;

/**
 * Set the current screen instance.
 */
export function setScreen<T>(inst: T): void {
  instance = inst;
}

/**
 * Get the current screen instance (typed).
 * Throws if not initialized.
 */
export function getScreen<T>(): T {
  if (!instance) {
    throw new Error('ACUL instance has not been initialized yet');
  }
  return instance as T;
}

/**
 * Clear the instance (e.g., on screen unload).
 */
export function clearScreen(): void {
  instance = null;
}
