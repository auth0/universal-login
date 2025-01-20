import Login from '../../../src/screens/login';
import { baseContextData } from '../../data/test-data';
import { FormHandler } from '../../../src/utils/form-handler';
import { LoginOptions, SocialLoginOptions } from '../../../interfaces/screens/login';

jest.mock('../../../src/utils/form-handler');

describe('Login', () => {
  let login: Login;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    login = new Login();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('Login method', () => {
    it('should handle login with valid credentials correctly', async () => {
      const payload: LoginOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await login.login(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should handle login with captcha correctly', async () => {
      const payload: LoginOptions = {
        username: 'testUser',
        password: 'testPassword',
        captcha: 'testCaptcha',
      };
      await login.login(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: LoginOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await expect(login.login(payload)).rejects.toThrow('Mocked reject');
    });

    it('should throw error when username is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid username')
      );
      const payload = { username: '', password: 'testPassword' };
      await expect(login.login(payload)).rejects.toThrow('Invalid username');
    });

    it('should throw error when password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid password')
      );
      const payload: LoginOptions = {
        username: 'testUser',
        password: '',
      };
      await expect(login.login(payload)).rejects.toThrow('Invalid password');
    });
  });

  describe('Social Login method', () => {
    it('should handle social login correctly', async () => {
      const payload: SocialLoginOptions = {
        connection: 'google-oauth2',
      };
      await login.socialLogin(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SocialLoginOptions = {
        connection: 'google-oauth2',
      };
      await expect(login.socialLogin(payload)).rejects.toThrow('Mocked reject');
    });
  });
});