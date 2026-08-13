import { ScreenIds, FormActions } from '../../../../src/constants';
import Login from '../../../../src/screens/login';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { LoginOptions, FederatedLoginOptions } from '../../../../interfaces/screens/login';
import type { GoogleOneTapOptions } from '../../../../interfaces/common';

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

    it('should map identifierType onto the typed fields the login endpoint reads', async () => {
      const payload: LoginOptions = {
        username: 'test@example.com',
        password: 'testPassword',
        identifierType: 'email',
      };
      await login.login(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        username: 'test@example.com',
        password: 'testPassword',
        identifier_type: 'email',
        identifier_email: 'test@example.com',
        action: FormActions.DEFAULT,
      });
    });

    it('should map a phone identifier and country onto the typed fields', async () => {
      const payload: LoginOptions = {
        username: '2015550123',
        password: 'testPassword',
        identifierType: 'phone',
        phoneCountryCode: 'US',
      };
      await login.login(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        username: '2015550123',
        password: 'testPassword',
        identifier_type: 'phone',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
        action: FormActions.DEFAULT,
      });
    });

    it('should not submit the camelCase options', async () => {
      await login.login({
        username: '2015550123',
        password: 'testPassword',
        identifierType: 'phone',
        phoneCountryCode: 'US',
      });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.not.objectContaining({
          identifierType: expect.anything() as unknown,
          phoneCountryCode: expect.anything() as unknown,
        })
      );
    });

    it('should submit no typed field when identifierType is omitted', async () => {
      await login.login({ username: 'testUser', password: 'testPassword' });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        username: 'testUser',
        password: 'testPassword',
        action: FormActions.DEFAULT,
      });
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

  describe('googleOneTap', () => {
    it('should submit google-one-tap action with credential and correct telemetry', async () => {
      const payload: GoogleOneTapOptions = { one_tap_credential: 'mock-google-id-token' };
      await login.googleOneTap(payload);
      expect(FormHandler).toHaveBeenLastCalledWith({
        state: 'randomStateString1234567890',
        telemetry: [ScreenIds.LOGIN, 'googleOneTap'],
      });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        one_tap_credential: 'mock-google-id-token',
        action: FormActions.GOOGLE_ONE_TAP,
      });
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      await expect(login.googleOneTap({ one_tap_credential: 'token' })).rejects.toThrow('Mocked reject');
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