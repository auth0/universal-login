// packages/auth0-acul-js/tests/unit/screens/reset-password-mfa-webauthn-platform-challenge/index.test.ts
import { ScreenIds, FormActions, Errors } from '../../../../src/constants';
import ResetPasswordMfaWebAuthnPlatformChallenge from '../../../../src/screens/reset-password-mfa-webauthn-platform-challenge';
import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-webauthn-platform-challenge/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials } from '../../../../src/utils/passkeys'; // Import the mocked utility
import { baseContextData } from '../../../data/test-data';

import type { WebAuthnErrorDetails } from '../../../../interfaces/common';
import type { PasskeyRead } from '../../../../interfaces/models/screen';
import type {
  ContinueWithPasskeyOptions,
  ReportBrowserErrorOptions,
  TryAnotherMethodOptions,
} from '../../../../interfaces/screens/reset-password-mfa-webauthn-platform-challenge';
import type { PasskeyCredentialResponse } from '../../../../interfaces/utils/passkeys';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys'); // Mock getPasskeyCredentials
jest.mock('../../../../src/screens/reset-password-mfa-webauthn-platform-challenge/screen-override');

/**
 * @group unit
 * @group screens
 */
describe('ResetPasswordMfaWebAuthnPlatformChallenge SDK', () => {
  let sdkInstance: ResetPasswordMfaWebAuthnPlatformChallenge;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'test-tx-state-rp-mfa-webauthn-platform';
  const mockPublicKeyChallengeOptions: PasskeyRead['public_key'] = {
    challenge: 'mockChallengeBase64EncodedStringForRPPlatform',
  };
  const mockSuccessfulCredentialResponse: PasskeyCredentialResponse = {
    id: 'credential-id-from-get',
    rawId: 'raw-credential-id-from-get',
    type: 'public-key',
    authenticatorAttachment: 'platform',
    response: {
      clientDataJSON: 'clientDataJSONString',
      authenticatorData: 'authenticatorDataString',
      signature: 'signatureString',
      userHandle: 'userHandleString',
    },
    isUserVerifyingPlatformAuthenticatorAvailable: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockScreenOverrideInstance = {
      name: ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_PLATFORM_CHALLENGE,
      publicKey: mockPublicKeyChallengeOptions,
      texts: { title: 'Verify Your Identity' },
      captchaImage: null,
      captchaProvider: null,
      captchaSiteKey: null,
      isCaptchaAvailable: false,
      data: {
        showRememberDevice: true,
      },
      links: null,
      captcha: null,
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData,
        screen: {
          name: ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_PLATFORM_CHALLENGE,
          data: {
            passkey: { public_key: mockPublicKeyChallengeOptions },
            show_remember_device: true,
          },
          texts: { title: 'Verify Your Identity' },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    sdkInstance = new ResetPasswordMfaWebAuthnPlatformChallenge();
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
    (getPasskeyCredentials as jest.Mock).mockResolvedValue(mockSuccessfulCredentialResponse);
  });

  it('should initialize correctly, setting up screen override', () => {
    expect(sdkInstance).toBeInstanceOf(ResetPasswordMfaWebAuthnPlatformChallenge);
    expect(sdkInstance.screen).toBe(mockScreenOverrideInstance);
  });

  describe('continueWithPasskey method', () => {
    it('should call getPasskeyCredentials with screen.publicKey and then FormHandler with the result', async () => {
      await sdkInstance.continueWithPasskey();

      expect(getPasskeyCredentials).toHaveBeenCalledWith(mockPublicKeyChallengeOptions);
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_PLATFORM_CHALLENGE, 'continueWithPasskey'],
        route: '/u/mfa-webauthn-platform-challenge',
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        response: JSON.stringify(mockSuccessfulCredentialResponse),
        // rememberBrowser is not included by default if options.rememberDevice is not explicitly true
      });
    });

    it('should include rememberBrowser=true if options.rememberDevice is true and screen.data.showRememberDevice is true', async () => {
      mockScreenOverrideInstance.data = { showRememberDevice: true };
      sdkInstance = new ResetPasswordMfaWebAuthnPlatformChallenge(); // Re-initialize

      const options: ContinueWithPasskeyOptions = { rememberDevice: true };
      await sdkInstance.continueWithPasskey(options);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          rememberBrowser: 'true',
          response: JSON.stringify(mockSuccessfulCredentialResponse),
        }),
      );
    });

    it('should NOT include rememberBrowser if options.rememberDevice is true BUT screen.data.showRememberDevice is false', async () => {
      mockScreenOverrideInstance.data = { showRememberDevice: false };
      sdkInstance = new ResetPasswordMfaWebAuthnPlatformChallenge(); // Re-initialize

      const options: ContinueWithPasskeyOptions = { rememberDevice: true };
      await sdkInstance.continueWithPasskey(options);

      const submittedData = mockFormHandlerInstance.submitData.mock.calls[0][0];
      expect(submittedData.rememberBrowser).toBeUndefined();
      expect(submittedData.response).toBe(JSON.stringify(mockSuccessfulCredentialResponse));
    });

    it('should throw error if screen.publicKey is null', async () => {
      mockScreenOverrideInstance.publicKey = null;
      sdkInstance = new ResetPasswordMfaWebAuthnPlatformChallenge(); // Re-initialize to pick up new mock
      await expect(sdkInstance.continueWithPasskey()).rejects.toThrow(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
      expect(getPasskeyCredentials).not.toHaveBeenCalled();
    });

    it('should re-throw error from getPasskeyCredentials if it fails', async () => {
      const webAuthnError = new Error('User cancelled WebAuthn prompt');
      (getPasskeyCredentials as jest.Mock).mockRejectedValueOnce(webAuthnError);
      await expect(sdkInstance.continueWithPasskey()).rejects.toThrow(webAuthnError);
    });

    it('should propagate errors from FormHandler.submitData', async () => {
      const submissionError = new Error('Form submission failed');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);
      await expect(sdkInstance.continueWithPasskey()).rejects.toThrow(submissionError);
    });
  });

  describe('reportBrowserError method', () => {
    const errorDetails: WebAuthnErrorDetails = { name: 'NotAllowedError', message: 'User cancelled.' };

    it('should call FormHandler with showError action and stringified error details', async () => {
      const options: ReportBrowserErrorOptions = { error: errorDetails };
      await sdkInstance.reportBrowserError(options);

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_PLATFORM_CHALLENGE, 'reportBrowserError'],
        route: '/u/mfa-webauthn-platform-challenge',
      });
      const expectedAction = `${FormActions.SHOW_ERROR_ACTION_PREFIX}${JSON.stringify(errorDetails)}`;
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: expectedAction,
        response: '',
      });
    });

    it('should throw error if options.error is missing or invalid', async () => {
      await expect(sdkInstance.reportBrowserError({} as ReportBrowserErrorOptions)).rejects.toThrow(
        'The `error` property in options, with `name` and `message` strings, is required.',
      );
      // @ts-expect-error Testing invalid input
      await expect(sdkInstance.reportBrowserError({ error: { name: 'Test' } })).rejects.toThrow(
        'The `error` property in options, with `name` and `message` strings, is required.',
      );
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should call FormHandler with pick-authenticator action', async () => {
      const options: TryAnotherMethodOptions = {};
      await sdkInstance.tryAnotherMethod(options);

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_PLATFORM_CHALLENGE, 'tryAnotherMethod'],
        route: '/u/mfa-webauthn-platform-challenge',
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
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