import { Screen } from '../../../../src/models/screen';
import { ScreenOverride } from '../../../../src/screens/phone-identifier-challenge/screen-override';

import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'phone-identifier-challenge',
      data: {
        phone_number: '+1234567890',
        message_type: 'sms',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  describe('constructor', () => {
    it('should initialize data correctly with valid screen context', () => {
      expect(screenOverride.data).toEqual({
        phone_number: '+1234567890',
        message_type: 'sms',
        phone: '+1234567890',
        messageType: 'sms',
      });
    });

    it('should call getScreenData with correct screenContext', () => {
      const getScreenDataSpy = jest.spyOn(ScreenOverride, 'getScreenData');

      screenOverride = new ScreenOverride(screenContext);

      expect(getScreenDataSpy).toHaveBeenCalledWith(screenContext);
    });

    it('should create an instance of Screen', () => {
      expect(screenOverride).toBeInstanceOf(Screen);
    });

    it('should handle null screen context data', () => {
      const nullDataContext = {
        name: 'phone-identifier-challenge',
        data: null
      } as unknown as ScreenContext;

      const screenOverrideWithNull = new ScreenOverride(nullDataContext);

      expect(screenOverrideWithNull.data).toBeNull();
    });

    it('should handle undefined screen context data', () => {
      const undefinedDataContext = {
        name: 'phone-identifier-challenge',
        data: undefined
      } as ScreenContext;

      const screenOverrideWithUndefined = new ScreenOverride(undefinedDataContext);

      expect(screenOverrideWithUndefined.data).toBeNull();
    });
  });

  describe('getScreenData static method', () => {
    it('should map phone_number to phone and message_type to messageType', () => {
      const result = ScreenOverride.getScreenData(screenContext);

      expect(result).toEqual({
        phone_number: '+1234567890',
        message_type: 'sms',
        phone: '+1234567890',
        messageType: 'sms',
      });
    });

    it('should return null when screenContext.data is undefined', () => {
      const emptyContext = {} as ScreenContext;
      const result = ScreenOverride.getScreenData(emptyContext);

      expect(result).toBeNull();
    });

    it('should return null when screenContext.data is null', () => {
      const nullContext = {
        name: 'phone-identifier-challenge',
        data: null
      } as unknown as ScreenContext;
      const result = ScreenOverride.getScreenData(nullContext);

      expect(result).toBeNull();
    });

    it('should handle partial data transformation', () => {
      const partialContext = {
        name: 'phone-identifier-challenge',
        data: {
          phone_number: '+9876543210',
          // message_type is missing
          customField: 'customValue'
        }
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(partialContext);

      expect(result).toEqual({
        phone_number: '+9876543210',
        customField: 'customValue',
        phone: '+9876543210',
        messageType: undefined
      });
    });

    it('should handle empty data object', () => {
      const emptyDataContext = {
        name: 'phone-identifier-challenge',
        data: {}
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(emptyDataContext);

      expect(result).toEqual({
        phone: undefined,
        messageType: undefined
      });
    });

    it('should preserve all original fields while adding transformed fields', () => {
      const complexContext = {
        name: 'phone-identifier-challenge',
        data: {
          phone_number: '+5555555555',
          message_type: 'voice',
          custom_field: 'custom_value',
          extra_field: 'extra_value'
        }
      } as unknown as ScreenContext;

      const result = ScreenOverride.getScreenData(complexContext);

      expect(result).toEqual({
        phone_number: '+5555555555',
        message_type: 'voice',
        custom_field: 'custom_value',
        extra_field: 'extra_value',
        phone: '+5555555555',
        messageType: 'voice'
      });
    });

    it('should handle falsy but valid phone_number values', () => {
      const falsyPhoneContext = {
        name: 'phone-identifier-challenge',
        data: {
          phone_number: '',
          message_type: 'sms'
        }
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(falsyPhoneContext);

      expect(result).toEqual({
        phone_number: '',
        message_type: 'sms',
        phone: '',
        messageType: 'sms'
      });
    });

    it('should handle falsy but valid message_type values', () => {
      const falsyMessageContext = {
        name: 'phone-identifier-challenge',
        data: {
          phone_number: '+1234567890',
          message_type: ''
        }
      } as ScreenContext;

      const result = ScreenOverride.getScreenData(falsyMessageContext);

      expect(result).toEqual({
        phone_number: '+1234567890',
        message_type: '',
        phone: '+1234567890',
        messageType: ''
      });
    });
  });

  describe('field transformation edge cases', () => {
    it('should correctly map various phone number formats', () => {
      const testCases = [
        '+1234567890',
        '+44 123 456 7890',
        '555-123-4567',
        '(555) 123-4567',
        ''
      ];

      testCases.forEach(phoneNumber => {
        const context = {
          name: 'phone-identifier-challenge',
          data: {
            phone_number: phoneNumber
          }
        } as ScreenContext;

        const result = ScreenOverride.getScreenData(context);

        expect(result?.phone).toBe(phoneNumber);
      });
    });

    it('should correctly map various message types', () => {
      const testCases = [
        'sms',
        'voice',
        'email',
        'push',
        ''
      ];

      testCases.forEach(messageType => {
        const context = {
          name: 'phone-identifier-challenge',
          data: {
            message_type: messageType
          }
        } as ScreenContext;

        const result = ScreenOverride.getScreenData(context);

        expect(result?.messageType).toBe(messageType);
      });
    });
  });
});
