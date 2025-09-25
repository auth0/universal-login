import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

let instance: unknown = null;

type ScreenConstructor<T> = { new (): T; screenIdentifier: string };

/**
 * Register a screen class. If its identifier matches the current screen,
 * instantiate it immediately and store as the singleton.
 * Returns the instance if created, or null otherwise.
 */
export function registerScreen<T>(Constructor: ScreenConstructor<T>): T | null {
  const current = getCurrentScreenOptions();

  if (current.screen?.name === Constructor.screenIdentifier) {
    if (!instance) {
      instance = new Constructor();
    }
    return instance as T;
  }

  // Not the active screen, just ignore
  return null;
}

/**
 * Get the current screen instance (throws if not initialized).
 */
export function getScreen<T>(): T {
  if (!instance) {
    throw new Error('No active screen instance has been initialized');
  }
  return instance as T;
}

/**
 * Clear the current instance.
 */
export function clearScreen(): void {
  instance = null;
}
