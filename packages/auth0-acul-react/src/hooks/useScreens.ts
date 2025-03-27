import { useMemo } from 'react';
import * as Screens from '@auth0/auth0-acul-js';

type ConstructableScreen = {
  [K in keyof typeof Screens]: typeof Screens[K] extends abstract new (...args: any) => any ? K : never;
}[keyof typeof Screens];

export function useScreen<T extends ConstructableScreen>(screen: T): InstanceType<typeof Screens[T]> {
  return useMemo(() => new (Screens[screen] as any)(), [screen]);
}