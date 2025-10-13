import { ScreenIds, FormActions } from '../../../../src/constants';
import Login from '../../../../src/screens/login';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { LoginOptions, FederatedLoginOptions } from '../../../../interfaces/screens/login';

jest.mock('../../../../src/utils/form-handler');

describe('Login', () => {
  let login: Login;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.LOGIN;
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
      const payload: FederatedLoginOptions = {
        connection: 'google-oauth2',
      };
      await login.federatedLogin(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: FederatedLoginOptions = {
        connection: 'google-oauth2',
      };
      await expect(login.federatedLogin(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('getLoginIdentifiers method', () => {
    it('should return allowedIdentifiers when set in transaction', () => {
      login.transaction.allowedIdentifiers = ['email', 'username'];
      const result = login.getLoginIdentifiers();
      expect(result).toEqual(['email', 'username']);
    });

    it('should return null when allowedIdentifiers is null or empty', () => {
      login.transaction.allowedIdentifiers = null;
      expect(login.getLoginIdentifiers()).toBeNull();
      login.transaction.allowedIdentifiers = [];
      expect(login.getLoginIdentifiers()).toEqual([]);
    });
  });

  describe('pickCountryCode', () => {
    it('should submit pick-country-code action without payload', async () => {
      await login.pickCountryCode();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_COUNTRY_CODE,
      });
    });

    it('should submit pick-country-code action with custom payload', async () => {
      const payload = { customField: 'customValue' };
      await login.pickCountryCode(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        ...payload,
        action: FormActions.PICK_COUNTRY_CODE,
      });
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      await expect(login.pickCountryCode()).rejects.toThrow('Mocked reject');
    });
  });
});