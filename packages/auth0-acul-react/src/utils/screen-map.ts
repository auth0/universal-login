import * as Screens from '@auth0/auth0-acul-js';

// Build a filtered map of only constructable classes
export const ScreenMap = Object.fromEntries(
  Object.entries(Screens).filter(
    ([, value]) => typeof value === 'function' && value.prototype
  )
) as Record<string, new () => any>;
