import { ScreenIds } from '../../../../src/constants';
import LoginPassword from '../../../../src/screens/login-password';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { LoginPasswordOptions, FederatedLoginOptions } from '../../../../interfaces/screens/login-password';

jest.mock('../../../../src/utils/form-handler');

describe('LoginPassword', () => {
  let loginPassword: LoginPassword;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.LOGIN_PASSWORD;
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

  describe('federatedLogin method', () => {
    it('should handle federated login correctly', async () => {
      const payload: FederatedLoginOptions = {
        connection: 'google-oauth2'
      };
      await loginPassword.federatedLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
      expect(FormHandler).toHaveBeenCalledWith({
        state: loginPassword.transaction.state,
        telemetry: [ScreenIds.LOGIN_PASSWORD, 'federatedLogin']
      });
    });

    it('should handle federated login with additional parameters', async () => {
      const payload: FederatedLoginOptions = {
        connection: 'facebook',
        login_hint: 'user@example.com'
      };
      await loginPassword.federatedLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when federated login promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Federated login failed'));
      const payload: FederatedLoginOptions = {
        connection: 'github'
      };

      await expect(loginPassword.federatedLogin(payload)).rejects.toThrow(
        'Federated login failed'
      );
    });

    it('should throw error when connection is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Connection is required')
      );
      const payload = { connection: '' };

      await expect(loginPassword.federatedLogin(payload)).rejects.toThrow(
        'Connection is required'
      );
    });
  });
});
