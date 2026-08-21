import { normalizePhoneIdentifier } from '../../../src/utils/phone-identifier';

describe('normalizePhoneIdentifier', () => {
  describe('with a country code (composite contract)', () => {
    it('maps the number and country onto the typed fields', () => {
      const result = normalizePhoneIdentifier(
        { phoneNumber: '2015550123', phoneCountryCode: 'US' },
        'phoneNumber'
      );

      expect(result).toEqual({
        phone_number: '2015550123',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
      });
    });

    it('reads the phone from the screen-specific field', () => {
      const result = normalizePhoneIdentifier({ phone: '7400123456', phoneCountryCode: 'GB' }, 'phone');

      expect(result).toEqual({
        phone_number: '7400123456',
        identifier_phone: '7400123456',
        identifier_phone_country_code: 'GB',
      });
    });

    // A tenant that does not process the composite fields reads only phone_number. Submitting it
    // alongside them is what keeps the number from being dropped there; where they are processed,
    // the server overwrites phone_number with the prefixed value before anything reads it.
    it('also submits phone_number, as the carrier the discrete contract falls back to', () => {
      const result = normalizePhoneIdentifier(
        { phoneNumber: '6045550123', phoneCountryCode: 'CA' },
        'phoneNumber'
      );

      expect(result).toHaveProperty('phone_number', '6045550123');
    });

    it('preserves the other payload fields', () => {
      const result = normalizePhoneIdentifier(
        {
          email: 'test@example.com',
          username: 'someone',
          password: 'P@ssw0rd!',
          captcha: 'abc',
          phoneNumber: '2015550123',
          phoneCountryCode: 'US',
        },
        'phoneNumber'
      );

      expect(result).toEqual({
        email: 'test@example.com',
        username: 'someone',
        password: 'P@ssw0rd!',
        captcha: 'abc',
        phone_number: '2015550123',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
      });
    });

    it('falls back to the discrete contract for a blank country code', () => {
      const result = normalizePhoneIdentifier(
        { phoneNumber: '2015550123', phoneCountryCode: '   ' },
        'phoneNumber'
      );

      expect(result).toEqual({ phone_number: '2015550123' });
    });
  });

  describe('without a country code (discrete contract)', () => {
    it('maps the number onto phone_number', () => {
      const result = normalizePhoneIdentifier({ phoneNumber: '+12015550123' }, 'phoneNumber');

      expect(result).toEqual({ phone_number: '+12015550123' });
    });

    it('does not submit the typed fields', () => {
      const result = normalizePhoneIdentifier({ phone: '+12015550123' }, 'phone');

      expect(result).not.toHaveProperty('identifier_phone');
      expect(result).not.toHaveProperty('identifier_phone_country_code');
    });
  });

  describe('without a phone number', () => {
    it('leaves a payload with no phone untouched', () => {
      const result = normalizePhoneIdentifier(
        { email: 'test@example.com', password: 'P@ssw0rd!' },
        'phoneNumber'
      );

      expect(result).toEqual({ email: 'test@example.com', password: 'P@ssw0rd!' });
    });

    it('drops a country code submitted on its own, as it identifies no number', () => {
      const result = normalizePhoneIdentifier(
        { email: 'test@example.com', phoneCountryCode: 'US' },
        'phoneNumber'
      );

      expect(result).toEqual({ email: 'test@example.com' });
    });

    it('treats a blank phone number as absent, submitting neither spelling of the field', () => {
      const result = normalizePhoneIdentifier(
        { phoneNumber: '   ', phoneCountryCode: 'US' },
        'phoneNumber'
      );

      expect(result).toEqual({});
    });
  });

  it('never leaves both the camelCase option and the server field on the payload', () => {
    const composite = normalizePhoneIdentifier(
      { phoneNumber: '2015550123', phoneCountryCode: 'US' },
      'phoneNumber'
    );
    const discrete = normalizePhoneIdentifier({ phoneNumber: '+12015550123' }, 'phoneNumber');

    expect(composite).not.toHaveProperty('phoneNumber');
    expect(composite).not.toHaveProperty('phoneCountryCode');
    expect(discrete).not.toHaveProperty('phoneNumber');
  });
});
