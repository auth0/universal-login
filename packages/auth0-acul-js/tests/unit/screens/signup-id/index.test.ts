import { ScreenIds, FormActions } from '../../../../src/constants';
import SignupId from '../../../../src/screens/signup-id';
import { getBrowserCapabilities } from '../../../../src/utils/browser-capabilities';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { GoogleOneTapOptions } from '../../../../interfaces/common';
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

    it('should submit the composite phone fields when a country code is selected', async () => {
      const payload: SignupOptions = {
        email: 'testUser@testmail.com',
        username: 'testUser',
        password: 'testPassword',
        phone: '2015550123',
        phoneCountryCode: 'US',
      };

      await signupId.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        email: 'testUser@testmail.com',
        username: 'testUser',
        password: 'testPassword',
        phone_number: '2015550123',
        identifier_phone: '2015550123',
        identifier_phone_country_code: 'US',
        ...mockBrowserCapabilities,
      });
    });

    it('should count phone towards the required identifiers even with a country code', async () => {
      // `phoneCountryCode` is an extra field on the phone identifier, not an identifier of its own,
      // so it must not satisfy the required-identifier check on its own.
      await expect(
        signupId.signup({ email: 'test@example.com', username: 'testUser', phoneCountryCode: 'US' })
      ).rejects.toThrow('Missing parameter(s): phone');
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

  describe('googleOneTap', () => {
    it('should submit google-one-tap action with credential and correct telemetry', async () => {
      const payload: GoogleOneTapOptions = { one_tap_credential: 'mock-google-id-token' };
      await signupId.googleOneTap(payload);
      expect(FormHandler).toHaveBeenCalledWith({
        state: 'randomStateString1234567890',
        telemetry: [ScreenIds.SIGNUP_ID, 'googleOneTap'],
      });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        one_tap_credential: 'mock-google-id-token',
        action: FormActions.GOOGLE_ONE_TAP,
      });
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(new Error('Mocked reject'));
      await expect(signupId.googleOneTap({ one_tap_credential: 'token' })).rejects.toThrow('Mocked reject');
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
