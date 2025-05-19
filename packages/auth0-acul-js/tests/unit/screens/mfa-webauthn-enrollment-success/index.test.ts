import { ScreenIds, FormActions } from '../../../../src/constants';
import MfaWebAuthnEnrollmentSuccess from '../../../../src/screens/mfa-webauthn-enrollment-success';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-enrollment-success/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { ContinueOptions } from '../../../../interfaces/screens/mfa-webauthn-enrollment-success';
import type { WebAuthnType } from '../../../../interfaces/screens/mfa-webauthn-error';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/screens/mfa-webauthn-enrollment-success/screen-override');

describe('MfaWebAuthnEnrollmentSuccess SDK', () => {
  let sdkInstance: MfaWebAuthnEnrollmentSuccess;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'test-tx-state-mfa-enroll-success';
  const mockNickname = "My YubiKey";
  const mockWebauthnType: WebAuthnType = 'webauthn-roaming';

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for ScreenOverride
    mockScreenOverrideInstance = {
      name: ScreenIds.MFA_WEBAUTHN_ENROLLMENT_SUCCESS,
      data: {
        nickname: mockNickname,
        webauthnType: mockWebauthnType,
      },
      // Mock other base ScreenMembers properties as needed
      texts: { title: 'Success!', description: 'Authenticator added.' },
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    // Mock global context
    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData, // Use a base mock and override specifics
        screen: {
          name: ScreenIds.MFA_WEBAUTHN_ENROLLMENT_SUCCESS,
          data: {
            nickname: mockNickname,
            webauthnType: mockWebauthnType,
          },
          texts: { title: 'Success!', description: 'Authenticator added.' },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    sdkInstance = new MfaWebAuthnEnrollmentSuccess();

    // Mock FormHandler
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should initialize correctly, setting up screen override with correct data', () => {
    expect(sdkInstance).toBeInstanceOf(MfaWebAuthnEnrollmentSuccess);
    // Check if the mocked ScreenOverride instance is used and has the correct data
    expect(sdkInstance.screen).toBe(mockScreenOverrideInstance);
    expect(sdkInstance.screen.data?.nickname).toBe(mockNickname);
    expect(sdkInstance.screen.data?.webauthnType).toBe(mockWebauthnType);
    expect(sdkInstance.screen.texts?.title).toBe('Success!');
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('continue method', () => {
    it('should call FormHandler with default action and transaction state', async () => {
      await sdkInstance.continue();

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ENROLLMENT_SUCCESS, 'continue'],
        route: '/u/mfa-webauthn-enrollment-success',
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DEFAULT,
      });
    });

    it('should include custom options in the payload if provided', async () => {
      const options: ContinueOptions = { customField: 'customValue' };
      await sdkInstance.continue(options);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        customField: 'customValue',
        action: FormActions.DEFAULT,
      });
    });

    it('should propagate errors from FormHandler.submitData', async () => {
      const submissionError = new Error('Network Error during continue');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);

      await expect(sdkInstance.continue()).rejects.toThrow(submissionError);
    });
  });
});