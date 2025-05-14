import { ScreenIds, FormActions, Errors } from '../../../../src/constants';
import MfaWebAuthnPlatformEnrollment from '../../../../src/screens/mfa-webauthn-platform-enrollment';
import { ScreenOverride as MfaWebAuthnPlatformEnrollmentScreenOverride } from '../../../../src/screens/mfa-webauthn-platform-enrollment/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createPasskeyCredentials } from '../../../../src/utils/passkeys';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';
import type { PasskeyCreate } from '../../../../interfaces/models/screen';
import type { ReportBrowserErrorOptions } from '../../../../interfaces/screens/mfa-webauthn-platform-enrollment';
import type { PasskeyCreateResponse } from '../../../../interfaces/utils/passkeys';


jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/passkeys');
jest.mock('../../../../src/screens/mfa-webauthn-platform-enrollment/screen-override');


describe('MfaWebAuthnPlatformEnrollment', () => {
  let sdk: MfaWebAuthnPlatformEnrollment;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  const mockTransactionState = 'mock_transaction_state_123';
  const mockPublicKeyOptions: PasskeyCreate['public_key'] = {
    user: { id: 'user123', name: 'testuser', displayName: 'Test User' },
    rp: { id: 'localhost', name: 'Local Test' },
    challenge: 'mockChallengeString',
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
    authenticatorSelection: { residentKey: 'preferred', userVerification: 'required' },
  };

  // Helper to setup mocks for ScreenOverride
  const setupScreenOverrideMock = (publicKey: PasskeyCreate['public_key'] | null) => {
    (MfaWebAuthnPlatformEnrollmentScreenOverride as unknown as jest.Mock).mockImplementation(() => {
      return {
        // These are the properties ScreenMembersOnMfaWebAuthnPlatformEnrollment expects
        name: ScreenIds.MFA_WEBAUTHN_PLATFORM_ENROLLMENT,
        publicKey: publicKey, // This is the crucial part
        // Mock other base ScreenMembers properties
        captchaImage: null,
        captchaSiteKey: null,
        captchaProvider: null,
        isCaptchaAvailable: false,
        data: publicKey ? { passkeys: { public_key: publicKey } } : null, // Keep data consistent if publicKey exists
        links: null,
        texts: null,
        captcha: null,
      };
    });
  };


  beforeEach(() => {
    jest.clearAllMocks();

    global.window = Object.create(window);
    // Base context for SDK initialization
    window.universal_login_context = {
      ...baseContextData,
      screen: {
        name: ScreenIds.MFA_WEBAUTHN_PLATFORM_ENROLLMENT,
        // data for ScreenOverride will be effectively controlled by the mock below
        data: { passkeys: { public_key: mockPublicKeyOptions } },
      },
      transaction: { ...baseContextData.transaction, state: mockTransactionState },
    };

    // Default mock for ScreenOverride will provide publicKeyOptions
    setupScreenOverrideMock(mockPublicKeyOptions);

    sdk = new MfaWebAuthnPlatformEnrollment();

    mockFormHandlerInstance = {
      submitData: jest.fn().mockResolvedValue(undefined),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
    (createPasskeyCredentials as jest.Mock).mockResolvedValue({
      id: 'credId',
      rawId: 'rawCredId',
      type: 'public-key',
      response: { clientDataJSON: 'clientData', attestationObject: 'attestationObj' },
    } as PasskeyCreateResponse);
  });


  describe('submitPasskeyCredential', () => {
    it('should use this.screen.publicKey, call createPasskeyCredentials and FormHandler', async () => {
      // ScreenOverride is mocked to provide publicKeyOptions by default in beforeEach
      await sdk.submitPasskeyCredential();

      expect(sdk.screen.publicKey).toEqual(mockPublicKeyOptions);
      expect(createPasskeyCredentials).toHaveBeenCalledWith(mockPublicKeyOptions);
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_ENROLLMENT, 'submitPasskeyCredential'],
      });
      const expectedCredentialResponse = await (createPasskeyCredentials as jest.Mock).mock.results[0].value;
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
        response: JSON.stringify(expectedCredentialResponse),
      });
    });

    it('should include custom options in the submission if provided', async () => {
      const customData: CustomOptions = { customField: 'customValue' };
      await sdk.submitPasskeyCredential(customData); // Pass custom data

      const expectedCredentialResponse = await (createPasskeyCredentials as jest.Mock).mock.results[0].value;
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        ...customData, // customField should be here
        action: FormActions.DEFAULT,
        response: JSON.stringify(expectedCredentialResponse),
      });
    });

    it('should throw error if this.screen.publicKey is null', async () => {
      setupScreenOverrideMock(null); // Mock ScreenOverride to return null publicKey
      sdk = new MfaWebAuthnPlatformEnrollment(); // Re-initialize with the new mock

      await expect(sdk.submitPasskeyCredential()).rejects.toThrow(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
      expect(createPasskeyCredentials).not.toHaveBeenCalled();
      expect(mockFormHandlerInstance.submitData).not.toHaveBeenCalled();
    });

    it('should re-throw error if createPasskeyCredentials fails', async () => {
      const webauthnError = new Error("WebAuthn API failed");
      (createPasskeyCredentials as jest.Mock).mockRejectedValueOnce(webauthnError);

      await expect(sdk.submitPasskeyCredential()).rejects.toThrow(webauthnError);
      expect(mockFormHandlerInstance.submitData).not.toHaveBeenCalled();
    });
  });

  // ReportBrowserError, snoozeEnrollment, refuseEnrollmentOnThisDevice tests remain unchanged
  // as their internal logic doesn't depend on the change to submitPasskeyCredential's signature.
  describe('reportBrowserError', () => {
    const mockError = { name: 'NotAllowedError', message: 'User cancelled' };
    it('should call FormHandler with showError action and stringified error', async () => {
      const payload: ReportBrowserErrorOptions = { error: mockError };
      await sdk.reportBrowserError(payload);
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_ENROLLMENT, 'reportBrowserError'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: `${FormActions.SHOW_ERROR_ACTION_PREFIX}${JSON.stringify(mockError)}`,
        response: '',
      });
    });
  });

  describe('snoozeEnrollment', () => {
    it('should call FormHandler with snooze-enrollment action', async () => {
      await sdk.snoozeEnrollment();
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_ENROLLMENT, 'snoozeEnrollment'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.SNOOZE_ENROLLMENT,
      });
    });
  });

  describe('refuseEnrollmentOnThisDevice', (): void => {
    it('should call FormHandler with refuse-add-device action', async () => {
      await sdk.refuseEnrollmentOnThisDevice();
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_PLATFORM_ENROLLMENT, 'refuseEnrollmentOnThisDevice'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.REFUSE_ADD_DEVICE,
      });
    });
  });
});