import { ConnectionStrategy } from '../../../src/constants';
import getEnabledIdentifiers from '../../../src/utils/getEnabledIdentifiers';

import type { IdentifierType } from '../../../interfaces/models/screen';

describe('getEnabledIdentifiers', () => {
  it('returns a required email identifier for passwordless email strategy', () => {
    const result = getEnabledIdentifiers([], [], ConnectionStrategy.EMAIL);
    expect(result).toEqual([{ type: 'email', required: true }]);
  });

  it('returns a required phone identifier for passwordless sms strategy', () => {
    const result = getEnabledIdentifiers([], [], ConnectionStrategy.SMS);
    expect(result).toEqual([{ type: 'phone', required: true }]);
  });

  it('returns required and optional identifiers for username-password strategy', () => {
    const required: IdentifierType[] = ['email', 'phone'];
    const optional: IdentifierType[] = ['username'];

    const result = getEnabledIdentifiers(required, optional, 'auth0');

    expect(result).toEqual([
      { type: 'email', required: true },
      { type: 'phone', required: true },
      { type: 'username', required: false },
    ]);
  });

  it('handles only required identifiers', () => {
    const required: IdentifierType[] = ['email'];
    const result = getEnabledIdentifiers(required, [], 'auth0');

    expect(result).toEqual([{ type: 'email', required: true }]);
  });

  it('handles only optional identifiers', () => {
    const optional: IdentifierType[] = ['username'];
    const result = getEnabledIdentifiers([], optional, 'auth0');

    expect(result).toEqual([{ type: 'username', required: false }]);
  });

  it('returns empty array when no identifiers and non-passwordless strategy', () => {
    const result = getEnabledIdentifiers([], [], 'auth0');
    expect(result).toEqual([]);
  });

  it('returns empty array when strategy is null and no identifiers', () => {
    const result = getEnabledIdentifiers([], [], null);
    expect(result).toEqual([]);
  });

  it('passwordless strategy ignores identifier lists and returns only required passwordless identifier', () => {
    const result = getEnabledIdentifiers(['email'], ['phone', 'username'], ConnectionStrategy.EMAIL);
    expect(result).toEqual([{ type: 'email', required: true }]);
  });
});
