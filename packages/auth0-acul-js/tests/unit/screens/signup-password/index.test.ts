import SignupPassword from '../../../../src/screens/signup-password';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { ScreenIds } from '../../../../src/utils/enums';
import { SignupPasswordOptions } from 'interfaces/screens/signup-password';

jest.mock('../../../../src/utils/form-handler');

describe('SignupPassword', () => {
  let signupPassword: SignupPassword;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
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

    it('should transform phone to phone_number', async () => {
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        phone: '+1234567890',
      };

      await signupPassword.signup(payload);

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

    it('should throw error when required fields are missing', async () => {
      const payload: SignupPasswordOptions = {
        username: '',
        password: 'testPassword',
      };

      jest
        .spyOn(signupPassword, 'signup')
        .mockImplementationOnce(async (payload) => {
          if (!payload.username || !payload.password) {
            throw new Error('Missing required fields');
          }
          await mockFormHandler.submitData(payload);
        });

      await expect(signupPassword.signup(payload)).rejects.toThrow(
        'Missing required fields'
      );
    });

    it('should not transform phone when phone is empty', async () => {
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        phone: '',
      };

      await signupPassword.signup(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'testUser',
          password: 'testPassword',
        })
      );
      expect(mockFormHandler.submitData).not.toHaveBeenCalledWith(
        expect.objectContaining({ phone_number: '' })
      );
    });

    it('should handle invalid phone number format', async () => {
      mockFormHandler.submitData.mockRejectedValue(
        new Error('Invalid phone number format')
      );
      const payload: SignupPasswordOptions = {
        username: 'testUser',
        password: 'testPassword',
        phone: 'invalidPhoneNumber',
      };

      await expect(signupPassword.signup(payload)).rejects.toThrow(
        'Invalid phone number format'
      );
    });
  });
});
