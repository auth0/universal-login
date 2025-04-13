import { useMemo } from 'react';
import * as Screens from '@auth0/auth0-acul-js';

/**
 * Converts a kebab-case string to PascalCase.
 * E.g., "login-id" -> "LoginId"
 */
function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

// All available constructable screen classes
type ScreenMap = {
  [K in keyof typeof Screens]: typeof Screens[K] extends abstract new (...args: any) => any ? K : never;
}[keyof typeof Screens];

// Converts PascalCase -> kebab-case at the type level
type PascalToKebab<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${PascalToKebab<U>}`
    : '';

// Reverse mapping: kebab-case keys => PascalCase class names
type KebabToScreenClass = {
  [K in ScreenMap as PascalToKebab<K> extends `-${infer Kebab}` ? Kebab : Lowercase<K>]: K;
};

/**
 * Hook to get a screen class instance using a kebab-case name.
 * E.g., useAculScreen('login-id') will instantiate new LoginId()
 */
export function useAculScreen<T extends keyof KebabToScreenClass>(
  kebabName: T
): InstanceType<(typeof Screens)[KebabToScreenClass[T]]> {
  return useMemo(() => {
    const pascalName = toPascalCase(kebabName);
    const ScreenClass = (Screens as Record<string, any>)[pascalName];

    if (typeof ScreenClass !== 'function') {
      throw new Error(
        `Invalid screen name "${kebabName}". Class "${pascalName}" was not found in @auth0/auth0-acul-js.`
      );
    }

    return new ScreenClass();
  }, [kebabName]);
}
