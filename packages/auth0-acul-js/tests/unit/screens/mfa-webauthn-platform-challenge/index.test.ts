import { ScreenIds, FormActions, Errors } from '../../../../src/constants';
import MfaWebAuthnPlatformChallenge from '../../../../src/screens/mfa-webauthn-platform-challenge';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-platform-challenge/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials } from '../../../../src/utils/passkeys';
import { baseContextData } from '../../../data/test-data';

import type { PasskeyRead } from '../../../../interfaces/models/screen';
import type {
  VerifyPlatformAuthenticatorOptions,
  ReportBrowserErrorOptions,
  TryAnotherMethodOptions
} from '../../../../interfaces/screens/mfa-webauthn-platform-challenge';
import type { PasskeyCredentialResponse } from '../../../../interfaces/utils/passkeys';
import type { WebAuthnErrorDetails } from '../../../../src/screens/mfa-webauthn-platform-challenge';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');
jest.mock('../../../../src/screens/mfa-webauthn-platform-challenge/screen-override');

describe('MfaWebAuthnPlatformChallenge SDK', () => {
  let sdkInstance: MfaWebAuthnPlatformChallenge;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>; // Use Partial for easier mocking

  const mockTransactionState = 'test-tx-state-mfa-platform-challenge';
  const mockPublicKeyChallenge: PasskeyRead['public_key'] = {
    challenge: 'mockChallengeBase64EncodedString',
    // Add other properties like rpId, allowCredentials if they are part of your PasskeyRead.public_key structure
  };
  const mockSuccessfulCredentialResponse: PasskeyCredentialResponse = {
    id: 'credentialId123',
    rawId: 'rawCredentialId123',
    type: 'public-key',
    authenticatorAttachment: 'platform',
    response: {
      clientDataJSON: 'clientDataJSONString',
      authenticatorData: 'authenticatorDataString',
      signature: 'signatureString',
      userHandle: 'userHandleString',
    },
    isUserVerifyingPlatformAuthenticatorAvailable: true, // Assuming this is part of the response structure
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for ScreenOverride
    mockScreenOverrideInstance = {
      name: ScreenIds.MFA_WEBAUTHN_PLATFORM_CHALLENGE,
      publicKey: mockPublicKeyChallenge,
      data: {
        showRememberDevice: true,
      },
      // Mock other base ScreenMembers properties as needed by BaseContext or other parts
      captchaImage: null,
      captchaProvider: null,
      captchaSiteKey: null,
      isCaptchaAvailable: false,
      links: null,
      texts: null,
      captcha: null,
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    // Mock global context
    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData, // Use a base mock and override specifics
        screen: {
          name: ScreenIds.MFA_WEBAUTHN_PLATFORM_CHALLENGE,
          data: {
            passkey: { public_key: mockPublicKeyChallenge },
            show_remember_device: true,
          },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    sdkInstance = new MfaWebAuthnPlatformChallenge();

    // Mock FormHandler
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);

    // Mock getPasskeyCredentials
    (getPasskeyCredentials as jest.Mock).mockResolvedValue(mockSuccessfulCredentialResponse);
  });

  it('should initialize correctly, setting up screen override', () => {
    expect(sdkInstance).toBeInstanceOf(MfaWebAuthnPlatformChallenge);
    expect(sdkInstance.screen).toBe(mockScreenOverrideInstance); // Check if the mocked instance is used
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('verify method', () => {
    it('should call getPasskeyCredentials and submit with default action on success', async () => {
      await sdkInstance.verify();

      expect(getPasskeyCredentials).toHaveBeenCalledWith(mockPublicKeyChallenge);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        response: JSON.stringify(mockSuccessfulCredentialResponse),
        // rememberBrowser should not be included by default if options.rememberDevice is not true
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_CHALLENGE, 'verify']
      });
    });

    it('should include rememberBrowser if options.rememberDevice is true and screen.data.showRememberDevice is true', async () => {
      // Ensure screen.data.showRememberDevice is true (it is by default in mockScreenOverrideInstance)
      const options: VerifyPlatformAuthenticatorOptions = { rememberDevice: true };
      await sdkInstance.verify(options);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          rememberBrowser: true,
        }),
      );
    });

    it('should NOT include rememberBrowser if options.rememberDevice is true BUT screen.data.showRememberDevice is false', async () => {
      if (mockScreenOverrideInstance.data) {
        mockScreenOverrideInstance.data.showRememberDevice = false;
      }
      // Re-initialize sdkInstance because constructor uses the screen override instance
      sdkInstance = new MfaWebAuthnPlatformChallenge();
      const options: VerifyPlatformAuthenticatorOptions = { rememberDevice: true };
      await sdkInstance.verify(options);

      expect(mockFormHandlerInstance.submitData).not.toHaveBeenCalledWith(
        expect.objectContaining({
          rememberBrowser: true,
        }),
      );
    });

    it('should throw an error if publicKey (challenge options) is missing from screen', async () => {
      mockScreenOverrideInstance.publicKey = null;
      sdkInstance = new MfaWebAuthnPlatformChallenge(); // Re-initialize
      await expect(sdkInstance.verify()).rejects.toThrow(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
    });

    it('should re-throw errors from getPasskeyCredentials', async () => {
      const webauthnError = new Error('User cancelled WebAuthn');
      (getPasskeyCredentials as jest.Mock).mockRejectedValueOnce(webauthnError);
      await expect(sdkInstance.verify()).rejects.toThrow(webauthnError);
    });
  });

  describe('reportBrowserError method', () => {
    const errorDetails: WebAuthnErrorDetails = { name: 'NotAllowedError', message: 'User cancelled the operation.' };

    it('should submit with showError action and stringified error details', async () => {
      const options: ReportBrowserErrorOptions = { error: errorDetails };
      await sdkInstance.reportBrowserError(options);

      const expectedAction = `${FormActions.SHOW_ERROR_ACTION_PREFIX}${JSON.stringify(errorDetails)}`;
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: expectedAction,
        response: '', // Empty response for showError action
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_CHALLENGE, 'reportBrowserError']
      });
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should submit with pick-authenticator action', async () => {
      const options: TryAnotherMethodOptions = {}; // Can be empty or with custom options
      await sdkInstance.tryAnotherMethod(options);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_CHALLENGE, 'tryAnotherMethod']
      });
    });

    it('should include custom options in the payload', async () => {
      const options: TryAnotherMethodOptions = { customField: 'anotherValue' };
      await sdkInstance.tryAnotherMethod(options);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          customField: 'anotherValue',
          action: FormActions.PICK_AUTHENTICATOR,
        }),
      );
    });
  });
});