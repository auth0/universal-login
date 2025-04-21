/**
 * @file Unit tests for the ScreenOverride class specific to the MFA Phone Challenge screen.
 */

import { ScreenOverride } from '../../../../src/screens/mfa-phone-challenge/screen-override';
import { Screen } from '../../../../src/models/screen'; // Ensure Screen model is imported for instanceof check
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('MfaPhoneChallenge ScreenOverride', () => {
  it('should correctly initialize with valid screen context data', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-phone-challenge',
      data: {
        phone_number: '+19876543210',
        other_data: 'irrelevant', // Extra data should be ignored
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride).toBeInstanceOf(Screen); // Check inheritance
    expect(screenOverride.data).toBeDefined();
    expect(screenOverride.data).toEqual({
      phone_number: '+19876543210',
    });
  });

  it('should return null for data when screenContext.data is missing', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-phone-challenge',
      data: undefined, // Data object is missing
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should return null for data when phone_number property is missing', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-phone-challenge',
      data: {
        some_other_key: 'value', // phone_number is missing
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  // Static method test
  describe('getScreenData static method', () => {
    it('should extract phone_number correctly', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-phone-challenge',
        data: {
          phone_number: '+1112223333',
        },
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toEqual({ phone_number: '+1112223333' });
    });

    it('should return null if data is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-phone-challenge',
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });

    it('should return null if phone_number is missing', () => {
      const screenContext: ScreenContext = {
        name: 'mfa-phone-challenge',
        data: {},
      } as ScreenContext;
      const data = ScreenOverride.getScreenData(screenContext);
      expect(data).toBeNull();
    });
  });
});