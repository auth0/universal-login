import MfaPushWelcome from '../../../../src/screens/mfa-push-welcome';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from 'interfaces/common';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');

describe('MfaPushWelcome', () => {
  let mfaPushWelcome: MfaPushWelcome;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_PUSH_WELCOME;
    window.universal_login_context = baseContextData;
    mfaPushWelcome = new MfaPushWelcome();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('enroll method', () => {
    it('should handle enroll with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPushWelcome.enroll(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'enroll',
        })
      );
    });

    it('should handle enroll without payload correctly', async () => {
      await mfaPushWelcome.enroll();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'enroll',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaPushWelcome.enroll(payload)).rejects.toThrow('Mocked reject');
    });
  });

  describe('pickAuthenticator method', () => {
    it('should handle pickAuthenticator with valid payload correctly', async () => {
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await mfaPushWelcome.pickAuthenticator(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle pickAuthenticator without payload correctly', async () => {
      await mfaPushWelcome.pickAuthenticator();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-authenticator',
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: CustomOptions = {
        someOption: 'value',
      };
      await expect(mfaPushWelcome.pickAuthenticator(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
