import LoginPassword from '../../../../src/screens/login-password';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import type { LoginPasswordOptions } from '../../../../interfaces/screens/login-password';

jest.mock('../../../../src/utils/form-handler');

describe('LoginPassword', () => {
  let loginPassword: LoginPassword;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    loginPassword = new LoginPassword();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('Login method', () => {
    it('should handle login with valid credentials correctly', async () => {
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginPassword.login(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should handle login with captcha correctly', async () => {
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        captcha: 'testCaptcha',
      };
      await loginPassword.login(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should throw error when username is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid username')
      );
      const payload = { username: '', password: 'testPassword' };

      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Invalid username'
      );
    });

    it('should throw error when password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid password')
      );
      const payload: LoginPasswordOptions = {
        username: 'testUser',
        password: '',
      };

      await expect(loginPassword.login(payload)).rejects.toThrow(
        'Invalid password'
      );
    });
  });
});
