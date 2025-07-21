import { ScreenIds } from '../../../../src//constants';
import { FormActions } from '../../../../src/constants';
import MfaDetectBrowserCapabilities from '../../../../src/screens/mfa-detect-browser-capabilities';
import { isJsAvailable, isBrave, isWebAuthAvailable, isWebAuthPlatformAvailable, getBrowserCapabilities } from '../../../../src/utils/browser-capabilities';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/browser-capabilities', () => ({
  isJsAvailable: jest.fn(),
  isBrave: jest.fn(),
  isWebAuthAvailable: jest.fn(),
  isWebAuthPlatformAvailable: jest.fn(),
  getBrowserCapabilities: jest.fn(() =>({
    'js-available': true,
    'is-brave': true,
    'webauthn-available': true,
    'webauthn-platform-available': true,
    'allow-passkeys': true
  }))
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
          'is-brave': true,
          'webauthn-available': true,
          'webauthn-platform-available': true,
          'allow-passkeys': true,
          action: FormActions.PICK_AUTHENTICATOR,
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
      expect(getBrowserCapabilities).toHaveBeenCalled();
    });
  });
});
