import ResetPassword from '../../../../src/screens/reset-password';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ResetPasswordOptions } from 'interfaces/screens/reset-password';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');
describe('ResetPassword', () => {
  let resetPassword: ResetPassword;
  let mockFormHandler: { submitData: jest.Mock };
  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.RESET_PASSWORD;
    window.universal_login_context = baseContextData;
    resetPassword = new ResetPassword();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });
  describe('resetPassword method', () => {
    it('should handle resetPassword with valid payload correctly', async () => {
      const payload: ResetPasswordOptions = {
        'password-reset': 'Test@123!',
        're-enter-password': 'Test@123!',
      };
      await resetPassword.resetPassword(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });
    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: ResetPasswordOptions = {
        'password-reset': 'Test@123!',
        're-enter-password': 'Test@123!',
      };
      await expect(resetPassword.resetPassword(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
    it('should throw error when password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid password')
      );
      const payload = { 'password-reset': '', 're-enter-password': 'Test@123!' };
      await expect(resetPassword.resetPassword(payload)).rejects.toThrow(
        'Invalid password'
      );
    });
     it('should throw error when re-enter password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid re-enter password')
      );
      const payload = { 'password-reset': 'Test@123!', 're-enter-password': '' };
      await expect(resetPassword.resetPassword(payload)).rejects.toThrow(
        'Invalid re-enter password'
      );
    });
  });
});
