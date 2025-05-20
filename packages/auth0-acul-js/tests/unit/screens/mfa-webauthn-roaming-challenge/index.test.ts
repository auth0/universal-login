import { ScreenIds, FormActions, Errors } from '../../../../src/constants';
import MfaWebAuthnRoamingChallenge from '../../../../src/screens/mfa-webauthn-roaming-challenge';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-roaming-challenge/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { getPasskeyCredentials } from '../../../../src/utils/passkeys';
import { baseContextData } from '../../../data/test-data';

import type { ReportWebAuthnErrorOptions, TryAnotherMethodOptions, VerifySecurityKeyOptions } from '../../../../interfaces/screens/mfa-webauthn-roaming-challenge';
import type { PasskeyCredentialResponse } from '../../../../interfaces/utils/passkeys';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');
jest.mock('../../../../src/screens/mfa-webauthn-roaming-challenge/screen-override');

describe('MfaWebAuthnRoamingChallenge SDK', () => {
  let sdkInstance: MfaWebAuthnRoamingChallenge;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'test-transaction-state-mfa-webauthn-roaming';
  const mockPublicKey = {
    challenge: 'mockChallengeBase64Url',
  };
  const mockSuccessfulCredential = {
    id: 'credentialId',
    rawId: 'rawCredentialId',
    type: 'public-key',
    response: { clientDataJSON: 'clientData', authenticatorData: 'authData', signature: 'sig', userHandle: 'handle' },
    authenticatorAttachment: 'cross-platform',
    isUserVerifyingPlatformAuthenticatorAvailable: false,
  } as PasskeyCredentialResponse;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for ScreenOverride
    mockScreenOverrideInstance = {
      name: ScreenIds.MFA_WEBAUTHN_ROAMING_CHALLENGE,
      showRememberDevice: true,
      webauthnType: 'roaming',
      publicKey: mockPublicKey,
      // Add other necessary ScreenMembers properties if BaseContext or other parts rely on them
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
        ...baseContextData,
        screen: {
          name: ScreenIds.MFA_WEBAUTHN_ROAMING_CHALLENGE,
          data: { // Data that ScreenOverride would parse
            webauthnType: 'roaming',
            passkey: { public_key: mockPublicKey },
            show_remember_device: true,
          },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    sdkInstance = new MfaWebAuthnRoamingChallenge();

    // Mock FormHandler
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);

    // Mock getPasskeyCredentials
    (getPasskeyCredentials as jest.Mock).mockResolvedValue(mockSuccessfulCredential);
  });

  it('should initialize correctly', () => {
    expect(sdkInstance).toBeInstanceOf(MfaWebAuthnRoamingChallenge);
    expect(sdkInstance.screen).toBe(mockScreenOverrideInstance);
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('verify method', () => {
    it('should call getPasskeyCredentials and submit with default action on success', async () => {
      await sdkInstance.verify();

      expect(getPasskeyCredentials).toHaveBeenCalledWith(mockPublicKey);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        response: JSON.stringify(mockSuccessfulCredential),
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ROAMING_CHALLENGE, 'verify'],
        route: '/u/mfa-webauthn-challenge',
      });
    });

    it('should NOT include rememberBrowser if options.rememberDevice is true but showRememberDevice is false', async () => {
      mockScreenOverrideInstance.showRememberDevice = false; // Override mock for this test
      sdkInstance = new MfaWebAuthnRoamingChallenge(); // Re-initialize to pick up new screen mock
      
      const options: VerifySecurityKeyOptions = { rememberDevice: true };
      await sdkInstance.verify(options);

      expect(mockFormHandlerInstance.submitData).not.toHaveBeenCalledWith(expect.objectContaining({
        rememberBrowser: true,
      }));
    });
    
    it('should NOT include rememberBrowser if options.rememberDevice is false', async () => {
      const options: VerifySecurityKeyOptions = { rememberDevice: false };
      await sdkInstance.verify(options);

      expect(mockFormHandlerInstance.submitData).not.toHaveBeenCalledWith(expect.objectContaining({
        rememberBrowser: true,
      }));
    });
    
    it('should re-throw unknown errors from getPasskeyCredentials', async () => {
      const unknownError = new Error("Something went wrong.");
      (getPasskeyCredentials as jest.Mock).mockRejectedValueOnce(unknownError);
      jest.spyOn(sdkInstance, 'reportWebAuthnError');

      await expect(sdkInstance.verify()).rejects.toThrow(unknownError);
      expect(sdkInstance.reportWebAuthnError).not.toHaveBeenCalled();
    });

    it('should throw an error if publicKey is missing', async () => {
      mockScreenOverrideInstance.publicKey = null;
      sdkInstance = new MfaWebAuthnRoamingChallenge(); // Re-initialize with the new mock
      
      await expect(sdkInstance.verify()).rejects.toThrow(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
    });
  });

  describe('reportWebAuthnError method', () => {
    const errorDetails = { name: 'TestError', message: 'This is a test error.' };
    
    it('should submit with showError action and stringified error details', async () => {
      const options: ReportWebAuthnErrorOptions = { error: errorDetails };
      await sdkInstance.reportWebAuthnError(options);

      const expectedAction = `${FormActions.SHOW_ERROR_ACTION_PREFIX}${JSON.stringify(errorDetails)}`;
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: expectedAction,
        response: '',
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ROAMING_CHALLENGE, 'reportWebAuthnError'],
        route: '/u/mfa-webauthn-challenge',
      });
    });
  });

  describe('tryAnotherMethod method', () => {
    it('should submit with pick-authenticator action', async () => {
      const options: TryAnotherMethodOptions = {};
      await sdkInstance.tryAnotherMethod(options);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ROAMING_CHALLENGE, 'tryAnotherMethod'],
        route: '/u/mfa-webauthn-challenge',
      });
    });
  });
});