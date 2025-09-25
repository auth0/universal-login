import { ScreenIds } from '../../../../src/constants';
import SignupPassword from '../../../../src/screens/signup-password';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { SignupPasswordOptions, FederatedSignupOptions } from 'interfaces/screens/signup-password';

jest.mock('../../../../src/utils/form-handler');

describe('SignupPassword', () => {
  let signupPassword: SignupPassword;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    Object.defineProperty(global, 'window', {
      value: Object.create(window),
      writable: true
    });
    baseContextData.screen.name = ScreenIds.SIGNUP_PASSWORD;
    window.universal_login_context = baseContextData;

    signupPassword = new SignupPassword();

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('Signup method', () => {
    it('should handle signup with valid credentials correctly', async () => {
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await signupPassword.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await expect(signupPassword.signup(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should handle phoneNumber field correctly', async () => {
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        phoneNumber: '+1234567890',
      };

      await signupPassword.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'testUser',
          password: 'testPassword',
          phoneNumber: '+1234567890',
        })
      );
    });

    it('should throw error when FormHandler rejects', async () => {
      const payload: SignupPasswordOptions = {
        username: '',
        password: 'testPassword',
      };

      mockFormHandler.submitData.mockRejectedValue(new Error('Missing required fields'));

      await expect(signupPassword.signup(payload)).rejects.toThrow(
        'Missing required fields'
      );
    });

    it('should handle empty phoneNumber field correctly', async () => {
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        phoneNumber: '',
      };

      await signupPassword.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'testUser',
          password: 'testPassword',
          phoneNumber: '',
        })
      );
    });

    it('should handle invalid phoneNumber format', async () => {
      mockFormHandler.submitData.mockRejectedValue(
        new Error('Invalid phone number format')
      );
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        phoneNumber: 'invalidPhoneNumber',
      };

      await expect(signupPassword.signup(payload)).rejects.toThrow(
        'Invalid phone number format'
      );
    });
  });

  describe('FederatedSignup method', () => {
    it('should handle federated signup with valid connection correctly', async () => {
      const payload: FederatedSignupOptions = {
        connection: 'google-oauth2',
      };
      await signupPassword.federatedSignup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(payload);
      expect(FormHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          state: signupPassword.transaction.state,
          telemetry: [ScreenIds.SIGNUP_PASSWORD, 'federatedSignup'],
        })
      );
    });

    it('should throw error when promise is rejected during federated signup', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Connection failed'));
      const payload: FederatedSignupOptions = {
        connection: 'google-oauth2',
      };

      await expect(signupPassword.federatedSignup(payload)).rejects.toThrow(
        'Connection failed'
      );
    });

    it('should handle various social connections', async () => {
      const connections = ['google-oauth2', 'facebook', 'github', 'apple'];

      for (const connection of connections) {
        mockFormHandler.submitData.mockClear();
        const payload: FederatedSignupOptions = { connection };

        await signupPassword.federatedSignup(payload);

        expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
        expect(mockFormHandler.submitData).toHaveBeenCalledWith(
          expect.objectContaining({ connection })
        );
      }
    });

    it('should use correct screen identifier in telemetry', async () => {
      const payload: FederatedSignupOptions = {
        connection: 'google-oauth2',
      };

      await signupPassword.federatedSignup(payload);

      expect(FormHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          telemetry: [ScreenIds.SIGNUP_PASSWORD, 'federatedSignup'],
        })
      );
    });
  });
});
