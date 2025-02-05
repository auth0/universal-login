import LoginId from '../../../../src/screens/login-id';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { LoginOptions, SocialLoginOptions } from 'interfaces/screens/login-id';
import { CustomOptions } from 'interfaces/common';
import { Errors } from '../../../../src/utils/errors';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');

describe('LoginId', () => {
  let loginId: LoginId;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;

    loginId = new LoginId();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('Login method', () => {
    it('should handle login correctly', async () => {
      const payload: LoginOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginId.login(payload);

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
      await expect(loginId.login(payload)).rejects.toThrow('Mocked reject');
    });

    it('should throw error when username is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid username')
      );
      const payload = { username: '', password: 'testPassword' };

      await expect(loginId.login(payload)).rejects.toThrow('Invalid username');
    });

    it('should throw error when password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid password')
      );
      const payload: LoginOptions = {
        username: 'testUser',
        password: '',
      };

      await expect(loginId.login(payload)).rejects.toThrow('Invalid password');
    });
  });

  describe('Social Login method', () => {
    it('should handle social login correctly', async () => {
      const payload: SocialLoginOptions = {
        connection: 'testConnection',
      };
      await loginId.socialLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SocialLoginOptions = {
        connection: 'testConnection',
      };
      await expect(loginId.socialLogin(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('Passkey Login method', () => {
    it('should handle login with passkey correctly', async () => {
      const payload: CustomOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await loginId.passkeyLogin(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should handle errors thrown by getPasskeyCredentials', async () => {
      mockFormHandler.submitData.mockRejectedValue(
        new Error(Errors.PASSKEY_DATA_UNAVAILABLE)
      );
      await expect(loginId.passkeyLogin()).rejects.toThrow(
        Errors.PASSKEY_DATA_UNAVAILABLE
      );
    });
  });

  describe('Pick Country Code method', () => {
    it('should submit pick country code action without additional payload', async () => {
      await loginId.pickCountryCode();

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-country-code',
        })
      );
    });

    it('should merge additional payload with pick country code action', async () => {
      const additionalPayload: CustomOptions = {
        countryCode: '+1',
        region: 'US',
      };

      await loginId.pickCountryCode(additionalPayload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...additionalPayload,
          action: 'pick-country-code',
        })
      );
    });

    it('should handle form submission errors for pick country code', async () => {
      mockFormHandler.submitData.mockRejectedValue(
        new Error('Country code selection failed')
      );

      const additionalPayload: CustomOptions = {
        countryCode: '+1',
      };

      await expect(loginId.pickCountryCode(additionalPayload)).rejects.toThrow(
        'Country code selection failed'
      );
    });
  });
});
