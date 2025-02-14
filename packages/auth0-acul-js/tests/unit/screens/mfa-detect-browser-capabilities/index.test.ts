import MfaDetectBrowserCapabilities from '../../../../src/screens/mfa-detect-browser-capabilities';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { PickAuthenticatorOptions } from '../../../../interfaces/screens/mfa-detect-browser-capabilities';

jest.mock('../../../../src/utils/form-handler');

describe('MfaDetectBrowserCapabilities', () => {
  let mfaDetectBrowserCapabilities: MfaDetectBrowserCapabilities;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
  });

  describe('pickAuthenticator method', () => {
    it('should handle pickAuthenticator with valid payload correctly', async () => {
      const payload: PickAuthenticatorOptions = {
        'js-available': true,
        'is-brave': false,
        'webauthn-available': true,
        'webauthn-platform-available': true
      };

      await mfaDetectBrowserCapabilities.pickAuthenticator(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator'
        })
      );
    });

    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));

      const payload: PickAuthenticatorOptions = {
        'js-available': true,
        'is-brave': false,
        'webauthn-available': true,
        'webauthn-platform-available': true
      };

      await expect(mfaDetectBrowserCapabilities.pickAuthenticator(payload)).rejects.toThrow(
        'Mocked reject'
      );
    });

    it('should handle additional custom options correctly', async () => {
      const payload: PickAuthenticatorOptions = {
        'js-available': true,
        'is-brave': false,
        'webauthn-available': true,
        'webauthn-platform-available': true,
        'custom-option': 'test'
      };

      await mfaDetectBrowserCapabilities.pickAuthenticator(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator'
        })
      );
    });
  });
});