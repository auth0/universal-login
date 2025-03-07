import MfaDetectBrowserCapabilities from '../../../../src/screens/mfa-detect-browser-capabilities';
import { baseContextData } from '../../../data/test-data';
import { FormHandler } from '../../../../src/utils/form-handler';
import { CustomOptions } from '../../../../interfaces/common';
import { isJsAvailable, isBrave, isWebAuthAvailable, isWebAuthPlatformAvailable } from '../../../../src/utils/browser-capabilities';
import { ScreenIds } from '../../../../src/utils/enums';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/browser-capabilities', () => ({
  isJsAvailable: jest.fn(),
  isBrave: jest.fn(),
  isWebAuthAvailable: jest.fn(),
  isWebAuthPlatformAvailable: jest.fn(),
}));

describe('MfaDetectBrowserCapabilities', () => {
  let mfaDetectBrowserCapabilities: MfaDetectBrowserCapabilities;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    // Mock global context
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_DETECT_BROWSER_CAPABILITIES;
    window.universal_login_context = baseContextData;

    // Initialize the class
    mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();

    // Mock FormHandler instance
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);

    // Mock browser capability functions
    (isJsAvailable as jest.Mock).mockReturnValue(true);
    (isBrave as jest.Mock).mockResolvedValue(false);
    (isWebAuthAvailable as jest.Mock).mockReturnValue(true);
    (isWebAuthPlatformAvailable as jest.Mock).mockResolvedValue(true);
  });

  describe('pickAuthenticator method', () => {
    it('should submit correct payload with dynamically detected capabilities', async () => {
      const payload: CustomOptions = {
        'custom-option': 'test-value',
      };

      await mfaDetectBrowserCapabilities.detectCapabilities(payload);

      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          'js-available': true,
          'is-brave': false,
          'webauthn-available': true,
          'webauthn-platform-available': true,
          action: 'pick-authenticator',
        })
      );
    });

    it('should handle promise rejection and throw an error', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked rejection'));

      const payload: CustomOptions = {
        'custom-option': 'test',
      };

      await expect(mfaDetectBrowserCapabilities.detectCapabilities(payload)).rejects.toThrow(
        'Mocked rejection'
      );
    });

    it('should ensure async capability functions are called', async () => {
      const payload: CustomOptions = {};

      await mfaDetectBrowserCapabilities.detectCapabilities(payload);

      // Ensure all capability checks were executed
      expect(isJsAvailable).toHaveBeenCalled();
      expect(isBrave).toHaveBeenCalled();
      expect(isWebAuthAvailable).toHaveBeenCalled();
      expect(isWebAuthPlatformAvailable).toHaveBeenCalled();
    });
  });
});
