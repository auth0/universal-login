import { normalizeTypedIdentifier } from '../../../src/utils/typed-identifier';

describe('normalizeTypedIdentifier', () => {
  describe('with a discrete identifier option (typed contract)', () => {
    it('maps an email onto the typed fields', () => {
      const result = normalizeTypedIdentifier({ email: 'test@example.com', password: 'P@ssw0rd!' });

      expect(result).toEqual({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
        password: 'P@ssw0rd!',
      });
    });

    it('maps a phone and country onto the typed fields', () => {
      const result = normalizeTypedIdentifier({ phone: '2015550123', phoneCountryCode: 'US' });

      expect(result).toEqual({
        username: '2015550123',
        identifier_type: 'phone',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
      });
    });

    // The endpoint reads neither name, so leaving them in would submit unread fields that the
    // custom-prompt-field handling would then have to ignore.
    it('does not submit the discrete option names', () => {
      const result = normalizeTypedIdentifier({ email: 'test@example.com' });

      expect(result).not.toHaveProperty('email');
      expect(result).not.toHaveProperty('phone');
    });

    it('copies the value into username so an unflagged tenant falls back to the legacy contract', () => {
      expect(normalizeTypedIdentifier({ email: 'test@example.com' }).username).toBe('test@example.com');
      expect(normalizeTypedIdentifier({ phone: '2015550123', phoneCountryCode: 'US' }).username).toBe(
        '2015550123'
      );
    });

    it('degrades a phone submitted without a country code to the legacy contract', () => {
      const result = normalizeTypedIdentifier({ phone: '+12015550123', password: 'P@ssw0rd!' });

      expect(result).toEqual({ username: '+12015550123', password: 'P@ssw0rd!' });
    });

    it('names its own type, superseding a conflicting identifierType', () => {
      const result = normalizeTypedIdentifier({ email: 'test@example.com', identifierType: 'username' });

      expect(result).toMatchObject({
        identifier_type: 'email',
        identifier_email: 'test@example.com',
      });
      expect(result).not.toHaveProperty('identifier_username');
    });

    // A screen driven by React state may pass every option it renders, leaving the inactive ones as
    // empty strings. The filled one is the identifier the user actually entered.
    it('resolves the option holding a value when a blank sibling is also passed', () => {
      const result = normalizeTypedIdentifier({ email: '', phone: '2015550123', phoneCountryCode: 'US' });

      expect(result).toMatchObject({
        identifier_type: 'phone',
        identifier_phone: '2015550123',
      });
    });

    // Submitting the blank field typed is what earns the server's `identifier-required` error, which
    // names the field the user left empty. Dropping it would earn a vaguer one.
    it('submits a blank option as its type rather than dropping it', () => {
      const result = normalizeTypedIdentifier({ email: '' });

      expect(result).toEqual({ username: '', identifier_type: 'email', identifier_email: '' });
    });

    // A blank phone still selects its type, but the typed path prefixes no dial code without a
    // country, so it degrades like a filled one rather than submitting `identifier_phone: ''`.
    it('degrades a blank phone with no country code to the legacy contract', () => {
      const result = normalizeTypedIdentifier({ phone: '' });

      expect(result).toEqual({ username: '' });
    });

    it('submits a blank phone as its type once a country code selects it', () => {
      const result = normalizeTypedIdentifier({ phone: '', phoneCountryCode: 'US' });

      expect(result).toEqual({
        username: '',
        identifier_type: 'phone',
        identifier_phone: '',
        identifier_phone_country_code: 'US',
      });
    });

    it('does not let a blank option discard the value another option carries', () => {
      const result = normalizeTypedIdentifier({ phone: '', username: 'someone', identifierType: 'username' });

      expect(result).toEqual({
        username: 'someone',
        identifier_type: 'username',
        identifier_username: 'someone',
      });
    });

    it('preserves the other payload fields', () => {
      const result = normalizeTypedIdentifier({
        email: 'test@example.com',
        password: 'P@ssw0rd!',
        captcha: 'abc',
        customField: 'customValue',
      });

      expect(result).toMatchObject({
        password: 'P@ssw0rd!',
        captcha: 'abc',
        customField: 'customValue',
      });
    });

    it('does not mutate the payload it was given', () => {
      const payload = { phone: '2015550123', phoneCountryCode: 'US' };
      normalizeTypedIdentifier(payload);

      expect(payload).toEqual({ phone: '2015550123', phoneCountryCode: 'US' });
    });
  });

  // Login submits one identifier, so supplying several is a caller mistake. It resolves by
  // precedence rather than throwing: rejecting would turn a payload the previous contract submitted
  // into a rejected promise, and screen handlers do not catch one.
  describe('with more than one identifier option', () => {
    let warn: jest.SpyInstance;

    beforeEach(() => {
      warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      warn.mockRestore();
    });

    it('does not throw', () => {
      expect(() =>
        normalizeTypedIdentifier({ email: 'test@example.com', phone: '2015550123', username: 'someone' })
      ).not.toThrow();
    });

    it('resolves email ahead of phone', () => {
      const result = normalizeTypedIdentifier({ email: 'test@example.com', phone: '2015550123' });

      expect(result).toEqual({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
      });
    });

    it('resolves email ahead of username', () => {
      const result = normalizeTypedIdentifier({ email: 'test@example.com', username: 'someone' });

      expect(result).toEqual({
        username: 'test@example.com',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
      });
    });

    // Phone wins, and with no country code it degrades to the legacy contract — which carries the
    // number, not the discarded username.
    it('resolves phone ahead of username', () => {
      const result = normalizeTypedIdentifier({ phone: '+12015550123', username: 'someone' });

      expect(result).toEqual({ username: '+12015550123' });
    });

    it('resolves email when all three hold a value', () => {
      const result = normalizeTypedIdentifier({
        email: 'test@example.com',
        phone: '2015550123',
        username: 'someone',
      });

      expect(result).toMatchObject({
        identifier_type: 'email',
        identifier_email: 'test@example.com',
      });
    });

    it('warns, naming the options that hold a value', () => {
      normalizeTypedIdentifier({ email: 'test@example.com', username: 'someone' });

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('email, username');
    });

    it('does not warn when only one of them holds a value', () => {
      normalizeTypedIdentifier({ email: 'test@example.com', phone: '', username: '  ' });

      expect(warn).not.toHaveBeenCalled();
    });

    // identifierType names a type for `username`, so the two are one identifier, not two.
    it('does not warn for a username paired with its identifierType', () => {
      normalizeTypedIdentifier({ username: 'someone', identifierType: 'username' });

      expect(warn).not.toHaveBeenCalled();
    });
  });

  describe('with an identifier type (typed contract)', () => {
    it('maps an email onto the typed fields', () => {
      const result = normalizeTypedIdentifier({
        username: 'test@example.com',
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
      const result = normalizeTypedIdentifier({ username: 'someone', identifierType: 'username' });

      expect(result).toEqual({
        username: 'someone',
        identifier_type: 'username',
        identifier_username: 'someone',
      });
    });

    it('maps a phone and country onto the typed fields', () => {
      const result = normalizeTypedIdentifier({
        username: '2015550123',
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
      expect(normalizeTypedIdentifier({ username: 'a@b.com', identifierType: 'email' })).toHaveProperty(
        'identifier_type',
        'email'
      );
      expect(normalizeTypedIdentifier({ username: 'x', identifierType: 'username' })).toHaveProperty(
        'identifier_type',
        'username'
      );
      expect(
        normalizeTypedIdentifier({ username: '123', identifierType: 'phone', phoneCountryCode: 'US' })
      ).toHaveProperty('identifier_type', 'phone');
    });

    it('keeps username so an unflagged tenant falls back to the legacy contract', () => {
      const result = normalizeTypedIdentifier({ username: 'someone', identifierType: 'username' });

      expect(result.username).toBe('someone');
    });

    it('submits only the field for the resolved type', () => {
      const result = normalizeTypedIdentifier({ username: 'someone', identifierType: 'username' });

      expect(result).not.toHaveProperty('identifier_email');
      expect(result).not.toHaveProperty('identifier_phone');
      expect(result).not.toHaveProperty('identifier_phone_country_code');
    });

    // A typed phone submission suppresses the server's own country-code prefixing, and the typed
    // path prefixes nothing when the country is missing, so submitting one would send a national
    // number with no dial code. The legacy contract is the only one that still resolves a country.
    it('degrades a phone submitted without a country code to the legacy contract', () => {
      const result = normalizeTypedIdentifier({ username: '+12015550123', identifierType: 'phone' });

      expect(result).toEqual({ username: '+12015550123' });
    });

    it('degrades a phone submitted with a blank country code to the legacy contract', () => {
      const result = normalizeTypedIdentifier({
        username: '2015550123',
        identifierType: 'phone',
        phoneCountryCode: '   ',
      });

      expect(result).toEqual({ username: '2015550123' });
    });

    it('keeps the other payload fields when a phone degrades to the legacy contract', () => {
      const result = normalizeTypedIdentifier({
        username: '+12015550123',
        identifierType: 'phone',
        password: 'P@ssw0rd!',
      });

      expect(result).toEqual({ username: '+12015550123', password: 'P@ssw0rd!' });
    });

    it('drops a country code supplied with a non-phone type, as the server does not read it', () => {
      const result = normalizeTypedIdentifier({
        username: 'test@example.com',
        identifierType: 'email',
        phoneCountryCode: 'US',
      });

      expect(result).not.toHaveProperty('identifier_phone_country_code');
      expect(result).not.toHaveProperty('phoneCountryCode');
    });

    it('preserves the other payload fields', () => {
      const result = normalizeTypedIdentifier({
        username: 'test@example.com',
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

    it('submits an empty identifier when username is absent, rather than omitting the field', () => {
      const result = normalizeTypedIdentifier({ identifierType: 'email' });

      expect(result).toEqual({ identifier_type: 'email', identifier_email: '' });
    });
  });

  describe('without an identifier type (legacy contract)', () => {
    it('leaves the payload untouched', () => {
      const result = normalizeTypedIdentifier({ username: 'testUser', password: 'P@ssw0rd!' });

      expect(result).toEqual({ username: 'testUser', password: 'P@ssw0rd!' });
    });

    it('does not submit any typed field', () => {
      const result = normalizeTypedIdentifier({ username: 'testUser' });

      expect(result).not.toHaveProperty('identifier_type');
      expect(result).not.toHaveProperty('identifier_email');
      expect(result).not.toHaveProperty('identifier_username');
      expect(result).not.toHaveProperty('identifier_phone');
    });

    // Unlike `email`/`phone`, a bare `username` names no type. It predates them as the untyped
    // identifier field, and every caller passing an email address through it would otherwise start
    // submitting identifier_type: 'username' and be rejected where username is not enabled.
    it('leaves a bare username untyped even though it is a known identifier name', () => {
      const result = normalizeTypedIdentifier({ username: 'test@example.com' });

      expect(result).toEqual({ username: 'test@example.com' });
    });

    it('drops a country code submitted on its own, as no type selects it', () => {
      const result = normalizeTypedIdentifier({ username: '2015550123', phoneCountryCode: 'US' });

      expect(result).toEqual({ username: '2015550123' });
    });

    it('degrades an unrecognized identifier type to the legacy contract', () => {
      const result = normalizeTypedIdentifier({
        username: 'testUser',
        identifierType: 'phone_number' as never,
      });

      expect(result).toEqual({ username: 'testUser' });
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
        username: 'someone',
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
        username: 'someone',
        identifierType: 'username',
        identifier_email: 'stale@example.com',
      });

      // Not stripped: the server reads only the field its identifier_type names, so the stray value
      // is inert. Documented here so the behaviour is a deliberate contract rather than a surprise.
      expect(result.identifier_email).toBe('stale@example.com');
      expect(result.identifier_type).toBe('username');
    });
  });

  it('never leaves the camelCase options alongside the server fields', () => {
    const typed = normalizeTypedIdentifier({
      username: '2015550123',
      identifierType: 'phone',
      phoneCountryCode: 'US',
    });

    expect(typed).not.toHaveProperty('identifierType');
    expect(typed).not.toHaveProperty('phoneCountryCode');
  });

  it('does not mutate the payload it was given', () => {
    const payload = {
      username: '2015550123',
      identifierType: 'phone' as const,
      phoneCountryCode: 'US',
    };
    normalizeTypedIdentifier(payload);

    expect(payload).toEqual({
      username: '2015550123',
      identifierType: 'phone',
      phoneCountryCode: 'US',
    });
  });
});
