import { normalizeTypedIdentifier } from '../../../src/utils/typed-identifier';

describe('normalizeTypedIdentifier', () => {
  describe('with an identifier type (typed contract)', () => {
    it('maps an email onto the typed fields', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'test@example.com',
        identifierType: 'email',
        password: 'P@ssw0rd!',
      });

      expect(result).toEqual({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
        password: 'P@ssw0rd!',
      });
    });

    it('maps a username onto the typed fields', () => {
      const result = normalizeTypedIdentifier({ identifier: 'someone', identifierType: 'username' });

      expect(result).toEqual({
        username: 'someone',
        identifier_type: 'username',
        identifier_username: 'someone',
      });
    });

    it('maps a phone and country onto the typed fields', () => {
      const result = normalizeTypedIdentifier({
        identifier: '2015550123',
        identifierType: 'phone',
        phoneCountryCode: 'US',
      });

      expect(result).toEqual({
        username: '2015550123',
        identifier_type: 'phone',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
      });
    });

    it('always submits identifier_type, since the server reads the typed fields only when present', () => {
      expect(normalizeTypedIdentifier({ identifier: 'a@b.com', identifierType: 'email' })).toHaveProperty(
        'identifier_type',
        'email'
      );
      expect(normalizeTypedIdentifier({ identifier: 'x', identifierType: 'username' })).toHaveProperty(
        'identifier_type',
        'username'
      );
      expect(
        normalizeTypedIdentifier({ identifier: '123', identifierType: 'phone', phoneCountryCode: 'US' })
      ).toHaveProperty('identifier_type', 'phone');
    });

    it('submits only the field for the named type', () => {
      const result = normalizeTypedIdentifier({ identifier: 'someone', identifierType: 'username' });

      expect(result).not.toHaveProperty('identifier_email');
      expect(result).not.toHaveProperty('identifier_phone');
      expect(result).not.toHaveProperty('identifier_phone_country_code');
    });

    // A typed phone submission suppresses the server's own country-code prefixing, and the typed
    // path prefixes nothing when the country is missing, so submitting one would send a national
    // number with no dial code. The untyped contract is the only one that still resolves a country.
    it('degrades a phone submitted without a country code to the untyped contract', () => {
      const result = normalizeTypedIdentifier({ identifier: '+12015550123', identifierType: 'phone' });

      expect(result).toEqual({ username: '+12015550123' });
    });

    it('degrades a phone submitted with a blank country code to the untyped contract', () => {
      const result = normalizeTypedIdentifier({
        identifier: '2015550123',
        identifierType: 'phone',
        phoneCountryCode: '   ',
      });

      expect(result).toEqual({ username: '2015550123' });
    });

    it('keeps the other payload fields when a phone degrades to the untyped contract', () => {
      const result = normalizeTypedIdentifier({
        identifier: '+12015550123',
        identifierType: 'phone',
        password: 'P@ssw0rd!',
      });

      expect(result).toEqual({ username: '+12015550123', password: 'P@ssw0rd!' });
    });

    it('drops a country code supplied with a non-phone type, as the server does not read it', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'test@example.com',
        identifierType: 'email',
        phoneCountryCode: 'US',
      });

      expect(result).not.toHaveProperty('identifier_phone_country_code');
      expect(result).not.toHaveProperty('phoneCountryCode');
    });

    it('preserves the other payload fields', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'test@example.com',
        identifierType: 'email',
        password: 'P@ssw0rd!',
        captcha: 'abc',
        customField: 'customValue',
      });

      expect(result).toEqual({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
        password: 'P@ssw0rd!',
        captcha: 'abc',
        customField: 'customValue',
      });
    });
  });

  // `identifier` is the name that pairs with `identifierType`; `username` is its original spelling,
  // still accepted so callers written against the previous contract keep working unchanged. Either
  // way the value goes out as `username`, the only identifier field the endpoint reads.
  describe('under either name for the identifier', () => {
    it('submits the identifier as username', () => {
      const result = normalizeTypedIdentifier({ identifier: 'someone', identifierType: 'username' });

      expect(result.username).toBe('someone');
      expect(result).not.toHaveProperty('identifier');
    });

    it('accepts the username spelling and submits the same payload', () => {
      const viaIdentifier = normalizeTypedIdentifier({ identifier: 'a@b.com', identifierType: 'email' });
      const viaUsername = normalizeTypedIdentifier({ username: 'a@b.com', identifierType: 'email' });

      expect(viaUsername).toEqual(viaIdentifier);
    });

    it('accepts the username spelling on the untyped contract', () => {
      const result = normalizeTypedIdentifier({ username: 'testUser', password: 'P@ssw0rd!' });

      expect(result).toEqual({ username: 'testUser', password: 'P@ssw0rd!' });
    });

    it('lets identifier win when both names are supplied', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'a@b.com',
        username: 'stale',
        identifierType: 'email',
      });

      expect(result).toEqual({
        username: 'a@b.com',
        identifier_type: 'email',
        identifier_email: 'a@b.com',
      });
    });

    it('falls back to username when identifier does not hold a string', () => {
      const result = normalizeTypedIdentifier({
        identifier: 12345 as never,
        username: 'someone',
        identifierType: 'username',
      });

      expect(result).toMatchObject({ username: 'someone', identifier_username: 'someone' });
    });
  });

  // Submitting the blank identifier typed is what earns the server's `identifier-required` error,
  // which names the type the user left empty. Dropping the typed fields would earn a vaguer one.
  describe('with a blank identifier', () => {
    it('submits it as its type rather than degrading to the untyped contract', () => {
      const result = normalizeTypedIdentifier({ identifier: '', identifierType: 'email' });

      expect(result).toEqual({ username: '', identifier_type: 'email', identifier_email: '' });
    });

    it('submits an empty identifier when neither name is supplied, rather than omitting the field', () => {
      const result = normalizeTypedIdentifier({ identifierType: 'email' });

      expect(result).toEqual({ identifier_type: 'email', identifier_email: '' });
    });

    it('submits a blank phone as its type once a country code is selected', () => {
      const result = normalizeTypedIdentifier({
        identifier: '',
        identifierType: 'phone',
        phoneCountryCode: 'US',
      });

      expect(result).toEqual({
        username: '',
        identifier_type: 'phone',
        identifier_phone: '',
        identifier_phone_country_code: 'US',
      });
    });

    // A blank phone degrades for the same reason a filled one does: no country, no dial code.
    it('degrades a blank phone with no country code to the untyped contract', () => {
      const result = normalizeTypedIdentifier({ identifier: '', identifierType: 'phone' });

      expect(result).toEqual({ username: '' });
    });

    it('treats a non-string identifier as an empty one rather than submitting it typed', () => {
      const result = normalizeTypedIdentifier({ identifier: 12345 as never, identifierType: 'email' });

      expect(result.identifier_email).toBe('');
    });
  });

  describe('without an identifier type (untyped contract)', () => {
    it('leaves the payload untouched apart from the identifier name', () => {
      const result = normalizeTypedIdentifier({ identifier: 'testUser', password: 'P@ssw0rd!' });

      expect(result).toEqual({ username: 'testUser', password: 'P@ssw0rd!' });
    });

    it('does not submit any typed field', () => {
      const result = normalizeTypedIdentifier({ identifier: 'testUser' });

      expect(result).not.toHaveProperty('identifier_type');
      expect(result).not.toHaveProperty('identifier_email');
      expect(result).not.toHaveProperty('identifier_username');
      expect(result).not.toHaveProperty('identifier_phone');
    });

    // The identifier names no type of its own. Typing it as a username by default would make every
    // caller passing an email address through it submit identifier_type: 'username' and be rejected
    // where username is not an enabled identifier.
    it('leaves a bare identifier untyped even when it holds an email address', () => {
      const result = normalizeTypedIdentifier({ identifier: 'test@example.com' });

      expect(result).toEqual({ username: 'test@example.com' });
    });

    it('drops a country code submitted on its own, as no type selects it', () => {
      const result = normalizeTypedIdentifier({ identifier: '2015550123', phoneCountryCode: 'US' });

      expect(result).toEqual({ username: '2015550123' });
    });

    it('degrades an unrecognized identifier type to the untyped contract', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'testUser',
        identifierType: 'phone_number' as never,
      });

      expect(result).toEqual({ username: 'testUser' });
    });
  });

  // The endpoint has no `email` or `phone` field — the identifier is a single value typed by
  // `identifier_type`. Fields by those names are ordinary custom prompt fields and must be left
  // alone rather than read as identifier options.
  it('does not read an email or phone field as an identifier option', () => {
    const result = normalizeTypedIdentifier({
      identifier: 'someone',
      identifierType: 'username',
      email: 'test@example.com',
      phone: '2015550123',
    });

    expect(result).toEqual({
      username: 'someone',
      identifier_type: 'username',
      identifier_username: 'someone',
      email: 'test@example.com',
      phone: '2015550123',
    });
  });

  // Before these options existed, the only way to reach the typed contract was to pass the server's
  // snake_case field names straight through `LoginOptions`' index signature. Consumers may already
  // be doing that, so those fields must keep flowing through untouched.
  describe('with the server field names passed directly (pre-existing workaround)', () => {
    it('passes a hand-built email submission through untouched', () => {
      const result = normalizeTypedIdentifier({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
        password: 'P@ssw0rd!',
      });

      expect(result).toEqual({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
        password: 'P@ssw0rd!',
      });
    });

    it('passes a hand-built phone submission through untouched', () => {
      const result = normalizeTypedIdentifier({
        username: '2015550123',
        identifier_type: 'phone',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
      });

      expect(result).toEqual({
        username: '2015550123',
        identifier_type: 'phone',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
      });
    });

    it('lets the camelCase option win when a caller supplies both spellings', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'someone',
        identifierType: 'username',
        identifier_type: 'email',
      });

      // The mapped value is applied after the caller's fields are spread, so it takes precedence.
      expect(result).toMatchObject({
        identifier_type: 'username',
        identifier_username: 'someone',
      });
    });

    it('leaves a stale sibling field alone, since identifier_type selects which one is read', () => {
      const result = normalizeTypedIdentifier({
        identifier: 'someone',
        identifierType: 'username',
        identifier_email: 'stale@example.com',
      });

      // Not stripped: the server reads only the field its identifier_type names, so the stray value
      // is inert. Documented here so the behaviour is a deliberate contract rather than a surprise.
      expect(result.identifier_email).toBe('stale@example.com');
      expect(result.identifier_type).toBe('username');
    });
  });

  it('never leaves the SDK option names alongside the server fields', () => {
    const typed = normalizeTypedIdentifier({
      identifier: '2015550123',
      identifierType: 'phone',
      phoneCountryCode: 'US',
    });

    expect(typed).not.toHaveProperty('identifier');
    expect(typed).not.toHaveProperty('identifierType');
    expect(typed).not.toHaveProperty('phoneCountryCode');
  });

  it('does not mutate the payload it was given', () => {
    const payload = {
      identifier: '2015550123',
      identifierType: 'phone' as const,
      phoneCountryCode: 'US',
    };
    normalizeTypedIdentifier(payload);

    expect(payload).toEqual({
      identifier: '2015550123',
      identifierType: 'phone',
      phoneCountryCode: 'US',
    });
  });
});
