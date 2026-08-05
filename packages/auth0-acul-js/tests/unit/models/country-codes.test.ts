import { CountryCodes } from '../../../src/models/country-codes';

import type { CountryCodesContext } from '../../../interfaces/models/country-codes';

describe('CountryCodes', () => {
  it('should transform available country codes to camelCase and set recommended', () => {
    const context: CountryCodesContext = {
      available: [
        { code: 'US', label: 'United States', dial_code: '+1' },
        { code: 'GB', label: 'United Kingdom', dial_code: '+44' },
      ],
      recommended: 'US',
    };

    const countryCodes = new CountryCodes(context);

    expect(countryCodes.available).toEqual([
      { code: 'US', label: 'United States', dialCode: '+1' },
      { code: 'GB', label: 'United Kingdom', dialCode: '+44' },
    ]);
    expect(countryCodes.recommended).toBe('US');
  });

  it('should default to null when context is undefined', () => {
    const countryCodes = new CountryCodes(undefined);

    expect(countryCodes.available).toBeNull();
    expect(countryCodes.recommended).toBeNull();
  });

  it('should set available to null when it is not an array', () => {
    const countryCodes = new CountryCodes({} as CountryCodesContext);

    expect(countryCodes.available).toBeNull();
    expect(countryCodes.recommended).toBeNull();
  });

  it('should set recommended to null when only available is provided', () => {
    const context: CountryCodesContext = {
      available: [{ code: 'FR', label: 'France', dial_code: '+33' }],
    };

    const countryCodes = new CountryCodes(context);

    expect(countryCodes.available).toEqual([{ code: 'FR', label: 'France', dialCode: '+33' }]);
    expect(countryCodes.recommended).toBeNull();
  });
});
