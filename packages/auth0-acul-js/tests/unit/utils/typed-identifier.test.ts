import { applyTypedPhone } from '../../../src/utils/typed-identifier';

import type { TypedPhonePayloadOptions } from '../../../interfaces/utils/typed-identifier';

describe('applyTypedPhone', () => {
  it('should map the phone and country code onto the typed fields', () => {
    const result = applyTypedPhone(
      { phoneNumber: '4155551234', phoneCountryCode: 'US', password: 'P@$$wOrd123!' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({
      password: 'P@$$wOrd123!',
      identifier_phone: '4155551234',
      identifier_phone_country_code: 'US',
    });
  });

  it('should not submit the caller-facing phone key alongside the typed fields', () => {
    const result = applyTypedPhone(
      { phoneNumber: '4155551234', phoneCountryCode: 'US' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).not.toHaveProperty('phoneNumber');
    expect(result).not.toHaveProperty('phoneCountryCode');
  });

  it('should fall back to the legacy phone field when no country code is supplied', () => {
    const result = applyTypedPhone(
      { phoneNumber: '+14155551234', password: 'P@$$wOrd123!' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({ password: 'P@$$wOrd123!', phone_number: '+14155551234' });
  });

  it('should honor a custom legacyKey', () => {
    const result = applyTypedPhone(
      { phone: '+14155551234' },
      { phoneKeys: ['phone'], legacyKey: 'phone' }
    );

    expect(result).toEqual({ phone: '+14155551234' });
  });

  it('should use the first phoneKey holding a non-empty value', () => {
    const result = applyTypedPhone(
      { phoneNumber: '   ', phone_number: '4155551234', phoneCountryCode: 'US' },
      { phoneKeys: ['phoneNumber', 'phone_number'] }
    );

    expect(result).toEqual({
      phoneNumber: '   ',
      identifier_phone: '4155551234',
      identifier_phone_country_code: 'US',
    });
  });

  it('should trim the phone digits and the country code', () => {
    const result = applyTypedPhone(
      { phoneNumber: '  4155551234  ', phoneCountryCode: '  US  ' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({
      identifier_phone: '4155551234',
      identifier_phone_country_code: 'US',
    });
  });

  it('should return the payload untouched when no phone is supplied', () => {
    const result = applyTypedPhone(
      { email: 'test@example.com', password: 'P@$$wOrd123!' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({ email: 'test@example.com', password: 'P@$$wOrd123!' });
  });

  it('should drop a country code supplied without a phone number', () => {
    const result = applyTypedPhone(
      { email: 'test@example.com', phoneCountryCode: 'US' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({ email: 'test@example.com' });
  });

  it('should ignore a blank country code and use the legacy field', () => {
    const result = applyTypedPhone(
      { phoneNumber: '+14155551234', phoneCountryCode: '   ' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({ phone_number: '+14155551234' });
  });

  it('should ignore a non-string phone value', () => {
    const result = applyTypedPhone(
      { phoneNumber: 4155551234, phoneCountryCode: 'US' },
      { phoneKeys: ['phoneNumber'] }
    );

    expect(result).toEqual({ phoneNumber: 4155551234 });
  });

  it('should not mutate the input payload', () => {
    const payload: TypedPhonePayloadOptions = {
      phoneNumber: '4155551234',
      phoneCountryCode: 'US',
    };

    applyTypedPhone(payload, { phoneKeys: ['phoneNumber'] });

    expect(payload).toEqual({ phoneNumber: '4155551234', phoneCountryCode: 'US' });
  });
});
