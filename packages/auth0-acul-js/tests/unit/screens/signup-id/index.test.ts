import { ScreenIds, FormActions } from '../../../../src/constants';
import SignupId from '../../../../src/screens/signup-id';
import { getBrowserCapabilities } from '../../../../src/utils/browser-capabilities';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type {
  SignupOptions,
  FederatedSignupOptions,
} from 'interfaces/screens/signup-id';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/browser-capabilities');

describe('SignupId', () => {
  let signupId: SignupId;
  let mockFormHandler: { submitData: jest.Mock };
  let mockBrowserCapabilities: object;

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.SIGNUP_ID;
    window.universal_login_context = baseContextData; // transaction.getRequiredIdentifiers() => { email, phone, username } from baseContext.

    mockBrowserCapabilities = {
      'js-available': true,
      'is-brave': false,
      'webauthn-available': true,
      'webauthn-platform-available': false,
      'allow-passkeys': false,
    };

    (getBrowserCapabilities as jest.Mock).mockResolvedValue(mockBrowserCapabilities);

    signupId = new SignupId();

    jest.clearAllMocks();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('Signup method', () => {
    it('should handle signup with valid credentials correctly', async () => {
      const payload: SignupOptions = {
        email: 'testEmail@email.com',
        password: 'testPassword',
        phone: '+1234567890',
        username: 'testUser',
      };
      await signupId.signup(payload);

      expect(getBrowserCapabilities).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        email: 'testEmail@email.com',
        password: 'testPassword',
        phone_number: '+1234567890',
        username: 'testUser',
        ...mockBrowserCapabilities,
      });
    });

    it('should throw error when promise is rejected', async () => {
      const payload: SignupOptions = {
        username: 'testUser',
        password: 'testPassword',
      };
      await expect(signupId.signup(payload)).rejects.toThrow(
        'Missing parameter(s): email, phone'
      );
    });

    it.each([
      {
        name: 'missing phone and username',
        payload: { email: 'test@example.com' },
        expectedError: 'Missing parameter(s): phone, username',
      },
      {
        name: 'missing only username',
        payload: { email: 'test@example.com', phone: '+1234567890' },
        expectedError: 'Missing parameter(s): username',
      },
    ])(
      'should handle missing identifiers: $name',
      async ({ payload, expectedError }) => {
        await expect(signupId.signup(payload)).rejects.toThrow(expectedError);
      }
    );
    it('should transform phone to phone_number', async () => {
      const payload: SignupOptions = {
        email: 'testUser@testmail.com',
        username: 'testUser',
        password: 'testPassword',
        phone: '+1234567890',
      };

      await signupId.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'testUser',
          password: 'testPassword',
          phone_number: '+1234567890',
          ...mockBrowserCapabilities,
        })
      );
      expect(mockFormHandler.submitData).not.toHaveBeenCalledWith(
        expect.objectContaining({ phone: '+1234567890' })
      );
    });
  });

  describe('Social Signup method', () => {
    it('should handle social signup with valid credentials correctly', async () => {
      const payload: FederatedSignupOptions = {
        connection: 'testConnection',
      };
      await signupId.federatedSignup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: FederatedSignupOptions = {
        connection: 'testConnection',
      };
      await expect(signupId.federatedSignup(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });

  describe('pickCountryCode', () => {
    it('should submit pick-country-code action', async () => {
      await signupId.pickCountryCode();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_COUNTRY_CODE,
      });
    });

    it('should throw an error if submitData fails', async () => {
      const expectedError = new Error('Submission failed');
      mockFormHandler.submitData.mockRejectedValue(expectedError);

      await expect(signupId.pickCountryCode()).rejects.toThrow(expectedError);
    });
  });
});
