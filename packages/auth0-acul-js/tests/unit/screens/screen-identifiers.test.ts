import { ScreenIds } from '../../../src/constants';
import * as Screens from '../../../src/screens';

// The React SDK's registerScreen only creates a screen instance when
// `screen.name === Screen.screenIdentifier`, so a screen class without its own
// identifier inherits BaseContext's empty one and every React hook for it breaks.
describe('screen identifiers', () => {
  const screens = Object.entries(Screens) as Array<[string, { screenIdentifier: string }]>;
  const knownIds = new Set<string>(Object.values(ScreenIds));

  it.each(screens)('%s has its own screenIdentifier from ScreenIds', (_name, Screen) => {
    expect(Screen.screenIdentifier).toEqual(expect.any(String));
    expect(Screen.screenIdentifier).not.toBe('');
    expect(knownIds.has(Screen.screenIdentifier)).toBe(true);
  });

  it('assigns a unique screenIdentifier to every screen', () => {
    const ids = screens.map(([, Screen]) => Screen.screenIdentifier);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
