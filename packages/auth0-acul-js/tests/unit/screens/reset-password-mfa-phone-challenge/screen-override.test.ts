import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-phone-challenge/screen-override';
import { Screen } from '../../../../src/models/screen'; // Ensure Screen model is imported for instanceof check
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ResetPasswordMfaPhoneChallenge ScreenOverride', () => {

  it('should correctly initialize with valid screen context data containing phone_number', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-phone-challenge',
      data: {
        phone_number: '+1234567890', // Example phone number as string
        some_other_data: 'ignore this', // Extra data should be ignored
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen); // Check inheritance
    expect(screenOverride.data).toBeDefined();
    expect(screenOverride.data).toEqual({
      phoneNumber: '+1234567890', // Ensure correct mapping and value
    });
  });

  it('should return null for data when screenContext.data is missing', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-phone-challenge',
      data: undefined, // Data object is missing
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

   it('should return null for data when screenContext.data is null', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-phone-challenge',
      data: null as any, // Explicitly null
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when phone_number property is missing in data', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-phone-challenge',
      data: {
        some_other_key: 'some value', // phone_number is missing
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when phone_number is not a string', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-phone-challenge',
      data: {
        // phone_number is now explicitly typed in ScreenData,
        // so passing a number directly would be a TS error earlier.
        // Test with a non-string value that fits the index signature but isn't expected.
        phone_number: 1234567890 as any, // Cast to any to bypass TS check for test case
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    // The getScreenData logic specifically checks `typeof data.phone_number === 'string'`
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when phone_number is an empty string', () => {
    const screenContext: ScreenContext = {
      name: 'reset-password-mfa-phone-challenge',
      data: {
        phone_number: '', // Phone number is an empty string
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toBeNull();
  });


  // Static method test
  describe('getScreenData static method', () => {
    it('should extract phone_number correctly when present and valid', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-phone-challenge',
        data: {
          phone_number: '+9876543210',
        },
      } as ScreenContext;

      const data = ScreenOverride.getScreenData(screenContext);

      expect(data).toEqual({ phoneNumber: '+9876543210' });
    });

    it('should return null if data object is missing', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-phone-challenge',
      } as ScreenContext; // No data property

      const data = ScreenOverride.getScreenData(screenContext);

      expect(data).toBeNull();
    });

    it('should return null if phone_number property is missing in data', () => {
      const screenContext: ScreenContext = {
        name: 'reset-password-mfa-phone-challenge',
        data: { another_prop: 'value' }, // phone_number missing
      } as ScreenContext;

      const data = ScreenOverride.getScreenData(screenContext);

      expect(data).toBeNull();
    });

    it('should return null if phone_number is not a string type', () => {
        const screenContext: ScreenContext = {
          name: 'reset-password-mfa-phone-challenge',
           // Cast to any to bypass TS check for test case
          data: { phone_number: 123 as any }, // Not a string
        } as ScreenContext;

        const data = ScreenOverride.getScreenData(screenContext);

        expect(data).toBeNull();
      });

    it('should return null if phone_number is an empty string', () => {
        const screenContext: ScreenContext = {
            name: 'reset-password-mfa-phone-challenge',
            data: { phone_number: '' }, // Empty string
        } as ScreenContext;

        const data = ScreenOverride.getScreenData(screenContext);

        expect(data).toBeNull();
        });
  });
});