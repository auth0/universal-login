import {  getSignupIdentifiers } from '../../../src/utils/signup-identifiers';
import { ConnectionStrategy } from '../../../src/constants';
import type { IdentifierType } from '../../../interfaces/utils/signup-identifiers';

describe('getSignupIdentifiers', () => {
  it('returns a required email identifier for passwordless email strategy', () => {
    const result = getSignupIdentifiers([], [], ConnectionStrategy.EMAIL);
    expect(result).toEqual([{ type: 'email', required: true }]);
  });

  it('returns a required phone identifier for passwordless sms strategy', () => {
    const result = getSignupIdentifiers([], [], ConnectionStrategy.SMS);
    expect(result).toEqual([{ type: 'phone', required: true }]);
  });

  it('returns required and optional identifiers for username-password strategy', () => {
    const required: IdentifierType[] = ['email', 'phone'];
    const optional: IdentifierType[] = ['username'];

    const result = getSignupIdentifiers(required, optional, 'auth0');

    expect(result).toEqual([
      { type: 'email', required: true },
      { type: 'phone', required: true },
      { type: 'username', required: false },
    ]);
  });

  it('handles only required identifiers', () => {
    const required: IdentifierType[] = ['email'];
    const result = getSignupIdentifiers(required, [], 'auth0');

    expect(result).toEqual([{ type: 'email', required: true }]);
  });

  it('handles only optional identifiers', () => {
    const optional: IdentifierType[] = ['username'];
    const result = getSignupIdentifiers([], optional, 'auth0');

    expect(result).toEqual([{ type: 'username', required: false }]);
  });

  it('returns empty array when no identifiers and non-passwordless strategy', () => {
    const result = getSignupIdentifiers([], [], 'auth0');
    expect(result).toEqual([]);
  });

  it('returns empty array when strategy is null and no identifiers', () => {
    const result = getSignupIdentifiers([], [], null);
    expect(result).toEqual([]);
  });

  it('passwordless strategy ignores identifier lists and returns only required passwordless identifier', () => {
    const result = getSignupIdentifiers(['email'], ['phone', 'username'], ConnectionStrategy.EMAIL);
    expect(result).toEqual([{ type: 'email', required: true }]);
  });
});
