import { ScreenIds, FormActions, Errors } from '../../../../src/constants';
import ResetPasswordMfaWebAuthnRoamingChallenge from '../../../../src/screens/reset-password-mfa-webauthn-roaming-challenge';
import { ScreenOverride } from '../../../../src/screens/reset-password-mfa-webauthn-roaming-challenge/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials } from '../../../../src/utils/passkeys';
import { baseContextData } from '../../../data/test-data';

import type { PasskeyRead } from '../../../../interfaces/models/screen';
import type {
  UseSecurityKeyOptions,
  TryAnotherMethodOptions,
} from '../../../../interfaces/screens/reset-password-mfa-webauthn-roaming-challenge';
import type { PasskeyCredentialResponse } from '../../../../interfaces/utils/passkeys';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');
jest.mock('../../../../src/screens/reset-password-mfa-webauthn-roaming-challenge/screen-override');

describe('ResetPasswordMfaWebAuthnRoamingChallenge SDK', () => {
  let sdkInstance: ResetPasswordMfaWebAuthnRoamingChallenge;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'test-tx-state-rp-mfa-webauthn-roaming';
  const mockPublicKeyChallenge: PasskeyRead['public_key'] = {
    challenge: 'mockChallengeBase64UrlEncodedStringForPasswordResetMfa',
    // Other potential properties like rpId, allowCredentials if part of PasskeyRead.public_key
  };
  const mockSuccessfulCredentialResponse: PasskeyCredentialResponse = {
    id: 'credIdRpMfa',
    rawId: 'rawCredIdRpMfa',
    type: 'public-key',
    authenticatorAttachment: 'cross-platform',
    response: {
      clientDataJSON: 'clientDataJSONStringRpMfa',
      authenticatorData: 'authenticatorDataStringRpMfa',
      signature: 'signatureStringRpMfa',
      userHandle: 'userHandleStringRpMfa',
    },
    isUserVerifyingPlatformAuthenticatorAvailable: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for ScreenOverride
    mockScreenOverrideInstance = {
      name: ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_ROAMING_CHALLENGE,
      publicKey: mockPublicKeyChallenge,
      showRememberDevice: true, // Default to true for testing rememberDevice logic
      links: null,
      texts: null,
      captcha: null,
      captchaImage: null,
      captchaProvider: null,
      captchaSiteKey: null,
      isCaptchaAvailable: false,
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    // Mock global context
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData,
        screen: {
          name: ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_ROAMING_CHALLENGE,
          data: {
            passkey: { public_key: mockPublicKeyChallenge },
            show_remember_device: true,
          },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    sdkInstance = new ResetPasswordMfaWebAuthnRoamingChallenge();

    // Mock FormHandler
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);

    // Mock getPasskeyCredentials
    (getPasskeyCredentials as jest.Mock).mockResolvedValue(mockSuccessfulCredentialResponse);
  });

  it('should initialize correctly, setting up screen override', () => {
    expect(sdkInstance).toBeInstanceOf(ResetPasswordMfaWebAuthnRoamingChallenge);
    expect(sdkInstance.screen).toBe(mockScreenOverrideInstance);
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('useSecurityKey method', () => {
    it('should call getPasskeyCredentials and submit with default action', async () => {
      await sdkInstance.useSecurityKey();
      expect(getPasskeyCredentials).toHaveBeenCalledWith(mockPublicKeyChallenge);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        response: JSON.stringify(mockSuccessfulCredentialResponse),
        // rememberBrowser should not be included by default if options.rememberDevice is not explicitly true
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_ROAMING_CHALLENGE, 'useSecurityKey'],
        route: '/u/mfa-webauthn-challenge',
      });
    });

    it('should include rememberBrowser if options.rememberDevice is true and screen.showRememberDevice is true', async () => {
      const options: UseSecurityKeyOptions = { rememberDevice: true };
      await sdkInstance.useSecurityKey(options);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          rememberBrowser: true,
        }),
      );
    });

    it('should NOT include rememberBrowser if options.rememberDevice is true BUT screen.showRememberDevice is false', async () => {
      mockScreenOverrideInstance.showRememberDevice = false;
      sdkInstance = new ResetPasswordMfaWebAuthnRoamingChallenge(); // Re-initialize
      const options: UseSecurityKeyOptions = { rememberDevice: true };
      await sdkInstance.useSecurityKey(options);
      expect(mockFormHandlerInstance.submitData).not.toHaveBeenCalledWith(
        expect.objectContaining({ rememberBrowser: true }),
      );
    });

    it('should throw an error if publicKey is missing from screen', async () => {
      mockScreenOverrideInstance.publicKey = null;
      sdkInstance = new ResetPasswordMfaWebAuthnRoamingChallenge(); // Re-initialize
      await expect(sdkInstance.useSecurityKey()).rejects.toThrow(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
    });

    it('should re-throw errors from getPasskeyCredentials', async () => {
      const webauthnApiError = new DOMException('User cancelled WebAuthn', 'NotAllowedError');
      (getPasskeyCredentials as jest.Mock).mockRejectedValueOnce(webauthnApiError);
      await expect(sdkInstance.useSecurityKey()).rejects.toThrow(webauthnApiError);
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should submit with pick-authenticator action', async () => {
      await sdkInstance.tryAnotherMethod();
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.RESET_PASSWORD_MFA_WEBAUTHN_ROAMING_CHALLENGE, 'tryAnotherMethod'],
        route: '/u/mfa-webauthn-challenge',
      });
    });

    it('should include rememberBrowser if options.rememberDevice is true and screen.showRememberDevice is true', async () => {
      const options: TryAnotherMethodOptions = { rememberDevice: true };
      await sdkInstance.tryAnotherMethod(options);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith(
        expect.objectContaining({ rememberBrowser: true }),
      );
    });
  });
});