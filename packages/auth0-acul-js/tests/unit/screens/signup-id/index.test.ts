import SignupId from '../../../../src/screens/signup-id';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds } from '../../../../src//constants';
import {
  SignupOptions,
  SocialSignupOptions,
} from 'interfaces/screens/signup-id';

jest.mock('../../../../src/utils/form-handler');

describe('SignupId', () => {
  let signupId: SignupId;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.SIGNUP_ID;
    window.universal_login_context = baseContextData; // transaction.getRequiredIdentifiers() => { email, phone, username } from baseContext.

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

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({
        email: 'testEmail@email.com',
        password: 'testPassword',
        phone_number: '+1234567890',
        username: 'testUser',
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
        })
      );
      expect(mockFormHandler.submitData).not.toHaveBeenCalledWith(
        expect.objectContaining({ phone: '+1234567890' })
      );
    });
  });

  describe('Social Signup method', () => {
    it('should handle social signup with valid credentials correctly', async () => {
      const payload: SocialSignupOptions = {
        connection: 'testConnection',
      };
      await signupId.socialSignup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SocialSignupOptions = {
        connection: 'testConnection',
      };
      await expect(signupId.socialSignup(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });
  });
});
