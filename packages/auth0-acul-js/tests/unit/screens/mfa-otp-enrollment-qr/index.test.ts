
import { FormActions, ScreenIds } from '../../../../src/constants';
import MfaOtpEnrollmentQr from '../../../../src/screens/mfa-otp-enrollment-qr';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from 'interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('MfaOtpEnrollmentQr', () => {
  let mfaOtpEnrollmentQr: MfaOtpEnrollmentQr;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = {
      ...baseContextData,
      screen: {
        ...baseContextData.screen,
        name: 'mfa-otp-enrollment-qr',
      }
    };
    mfaOtpEnrollmentQr = new MfaOtpEnrollmentQr();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  it('should have the correct screenIdentifier', () => {
    expect(MfaOtpEnrollmentQr.screenIdentifier).toBe(ScreenIds.MFA_OTP_ENROLLMENT_QR);
  });

  describe('toggleView method', () => {
    it('should handle toggleView with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaOtpEnrollmentQr.toggleView(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.TOGGLE_VIEW,
        })
      );
    });

    it('should handle toggleView without payload correctly', async () => {
      await mfaOtpEnrollmentQr.toggleView();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.TOGGLE_VIEW,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaOtpEnrollmentQr.toggleView(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaOtpEnrollmentQr.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaOtpEnrollmentQr.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.PICK_AUTHENTICATOR,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaOtpEnrollmentQr.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('continue method', () => {
    it('should handle continue with valid payload correctly', async () => {
      const payload = {
        code: '123456',
      };
      await mfaOtpEnrollmentQr.continue(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.DEFAULT,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload = {
        code: '123456',
      };
      await expect(mfaOtpEnrollmentQr.continue(payload)).rejects.toThrow('Mocked reject');
    });
  });
});