import { normalizeTypedIdentifier } from '../../../src/utils/typed-identifier';

describe('normalizeTypedIdentifier', () => {
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
