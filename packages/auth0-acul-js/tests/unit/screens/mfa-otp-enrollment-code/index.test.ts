import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { CustomOptions } from 'interfaces/common';
import type { ContinueOptions } from 'interfaces/screens/mfa-otp-enrollment-code';
import MfaOtpEnrollmentCode from '../../../../src/screens/mfa-otp-enrollment-code';

jest.mock('../../../../src/utils/form-handler');

describe('MfaOtpEnrollmentCode', () => {
  let mfaOtpEnrollmentCode: MfaOtpEnrollmentCode;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaOtpEnrollmentCode = new MfaOtpEnrollmentCode();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  it('should create an instance of MfaOtpEnrollmentCode', () => {
    expect(mfaOtpEnrollmentCode).toBeInstanceOf(MfaOtpEnrollmentCode);
  });

  describe('continue method', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload: ContinueOptions = {
        code: '123456',
      };

      await mfaOtpEnrollmentCode.continue(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        code: '123456',
        action: 'default',
      });
    });

    it('should throw an error if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Form submission failed'));

      const payload: ContinueOptions = {
        code: '123456',
      };

      await expect(mfaOtpEnrollmentCode.continue(payload)).rejects.toThrow('Form submission failed');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should call FormHandler.submitData with the correct parameters', async () => {
      const payload: CustomOptions = {
        customOption: 'customValue',
      };

      await mfaOtpEnrollmentCode.tryAnotherMethod(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        customOption: 'customValue',
        action: 'pick-authenticator',
      });
    });

    it('should call FormHandler.submitData with the correct parameters when no payload is provided', async () => {
      await mfaOtpEnrollmentCode.tryAnotherMethod();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: 'pick-authenticator',
      });
    });

    it('should throw an error if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Form submission failed'));

      const payload: CustomOptions = {
        customOption: 'customValue',
      };

      await expect(mfaOtpEnrollmentCode.tryAnotherMethod(payload)).rejects.toThrow('Form submission failed');
    });
  });
});