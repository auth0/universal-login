import { ScreenIds } from '../../../../src/constants';
import { FormActions } from '../../../../src/constants';
import ResetPasswordRequest from '../../../../src/screens/reset-password-request';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';
import type { ResetPasswordRequestOptions } from '../../../../interfaces/screens/reset-password-request';

jest.mock('../../../../src/utils/form-handler');

describe('ResetPasswordRequest', () => {
  let resetPasswordRequest: ResetPasswordRequest;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD_REQUEST;
    window.universal_login_context = baseContextData;
    resetPasswordRequest = new ResetPasswordRequest();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('resetPassword method', () => {
    it('should handle resetPassword with valid payload correctly', async () => {
      const payload: ResetPasswordRequestOptions = {
        username: 'test@example.com',
      };
      await resetPasswordRequest.resetPassword(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ResetPasswordRequestOptions = {
        username: 'test@example.com',
      };
      await expect(resetPasswordRequest.resetPassword(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when email is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid email')
      );
      const payload = { username: '' };
      await expect(resetPasswordRequest.resetPassword(payload)).rejects.toThrow(
        'Invalid email'
      );
    });
  });

  describe('backToLogin method', () => {
    it('should handle backToLogin with valid payload correctly', async () => {
      const payload: CustomOptions = {
        username: 'test@example.com',
      };
      await resetPasswordRequest.backToLogin(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: FormActions.BACK_TO_LOGIN,
        })
      );
    });

    it('should handle backToLogin without payload correctly', async () => {
      await resetPasswordRequest.backToLogin();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: FormActions.BACK_TO_LOGIN,
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        username: 'test@example.com',
      };
      await expect(resetPasswordRequest.backToLogin(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});
