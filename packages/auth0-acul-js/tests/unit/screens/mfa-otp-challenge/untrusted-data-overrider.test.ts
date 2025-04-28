import { UntrustedDataOverride } from '../../../../src/screens/mfa-otp-challenge/untrusted-data-overrider';
import type { UntrustedDataContext } from '../../../../interfaces/models/untrusted-data';

describe('MFA OTP Challenge - UntrustedDataOverride', () => {
  describe('getSubmittedFormData', () => {
    it('should return null if untrusted data is undefined', () => {
      const result = UntrustedDataOverride.getSubmittedFormData({});
      expect(result).toBeNull();
    });

    it('should return null if submitted_form_data is undefined', () => {
      const untrustedData = {} as UntrustedDataContext;
      const result = UntrustedDataOverride.getSubmittedFormData(untrustedData);
      expect(result).toBeNull();
    });

    it('should parse remember_device as boolean when true', () => {
      const untrustedData: UntrustedDataContext = {
        submitted_form_data: {
          remember_device: true,
          code: '123456',
        },
      };

      const result = UntrustedDataOverride.getSubmittedFormData(untrustedData);
      
      expect(result).toEqual({
        rememberDevice: true,
        code: '123456'
      });
    });

    it('should parse remember_device as false when value is false', () => {
      const untrustedData: UntrustedDataContext = {
        submitted_form_data: {
          remember_device: false,
          code: '123456',
        },
      };

      const result = UntrustedDataOverride.getSubmittedFormData(untrustedData);
      
      expect(result).toEqual({
        code: '123456',
        rememberDevice: false,
      });
    });

    it('should parse remember_device as null when value is not present', () => {
      const untrustedData: UntrustedDataContext = {
        submitted_form_data: {
          code: '123456',
        },
      };

      const result = UntrustedDataOverride.getSubmittedFormData(untrustedData);
      
      expect(result).toEqual({
        code: '123456',
        rememberDevice: false
      });
    });
  });

  describe('constructor', () => {
    it('should call getSubmittedFormData in constructor', () => {
      const spy = jest.spyOn(UntrustedDataOverride, 'getSubmittedFormData');
      const untrustedData: UntrustedDataContext = {
        submitted_form_data: {
          remember_device: true,
        },
      };

      const instance = new UntrustedDataOverride(untrustedData);
      
      expect(spy).toHaveBeenCalledWith(untrustedData);
      expect(instance.submittedFormData).toEqual({
        rememberDevice: true,
      });
      
      spy.mockRestore();
    });
  });
});