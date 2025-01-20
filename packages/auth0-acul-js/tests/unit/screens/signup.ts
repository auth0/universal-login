import SignupNew from "../../../src/screens/signup";
import { baseContextData } from '../../data/test-data';
import { FormHandler } from '../../../src/utils/form-handler';
import type { SignupNewOptions } from '../../../interfaces/screens/signup';

jest.mock('../../../src/utils/form-handler');

describe('SignupNew', () => {
  let signupNew: SignupNew;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    signupNew = new SignupNew();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('signup method', () => {
    it('should handle signup with valid credentials correctly', async () => {
      const payload: SignupNewOptions = {
        email: 'test@example.com',
        password: 'P@$$wOrd123!',
      };
      await signupNew.signup(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: SignupNewOptions = {
        email: 'test@example.com',
        password: 'P@$$wOrd123!',
      };
      await expect(signupNew.signup(payload)).rejects.toThrow('Mocked reject');
    });

    it('should throw error when email is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid email')
      );
      const payload = { email: '', password: 'P@$$wOrd123!' };
      await expect(signupNew.signup(payload)).rejects.toThrow('Invalid email');
    });

    it('should throw error when password is empty', async () => {
      mockFormHandler.submitData.mockRejectedValueOnce(
        new Error('Invalid password')
      );
      const payload = { email: 'test@example.com', password: '' };
      await expect(signupNew.signup(payload)).rejects.toThrow('Invalid password');
    });
  });
});
