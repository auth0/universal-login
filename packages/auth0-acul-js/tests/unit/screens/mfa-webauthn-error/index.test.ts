import { ScreenIds, FormActions } from '../../../../src/constants';
import MfaWebAuthnError from '../../../../src/screens/mfa-webauthn-error';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';

jest.mock('../../../../src/utils/form-handler');

describe('MfaWebAuthnError', () => {
  let sdk: MfaWebAuthnError;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  const mockTransactionState = 'mock_tx_state_webauthn_error';

  beforeEach(() => {
    jest.clearAllMocks();

    global.window = Object.create(window);
    const screenContext = {
      name: ScreenIds.MFA_WEBAUTHN_ERROR,
      data: {
        errorType: 'NotAllowedError',
        webauthnType: 'webauthn-platform',
      },
    };
    window.universal_login_context = {
      ...baseContextData,
      screen: screenContext,
      transaction: { ...baseContextData.transaction, state: mockTransactionState },
    };

    sdk = new MfaWebAuthnError();

    mockFormHandlerInstance = {
      submitData: jest.fn().mockResolvedValue(undefined),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  describe('constructor', () => {
    it('should correctly set the screenIdentifier', () => {
      expect(MfaWebAuthnError.screenIdentifier).toBe(ScreenIds.MFA_WEBAUTHN_ERROR);
    });

    it('should initialize screen properties via ScreenOverride', () => {
      expect(sdk.screen).toBeDefined();
      expect(sdk.screen.data?.errorType).toBe('NotAllowedError');
      expect(sdk.screen.data?.webauthnType).toBe('webauthn-platform');
    });
  });

  describe('tryAgain', () => {
    it('should call FormHandler with "tryagain" action', async () => {
      await sdk.tryAgain();
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ERROR, 'tryAgain'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.TRY_AGAIN,
      });
    });

    it('should include custom options if provided', async () => {
      const customData: CustomOptions = { custom: 'data' };
      await sdk.tryAgain(customData);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        ...customData,
        action: FormActions.TRY_AGAIN,
      });
    });
  });

  describe('usePassword', () => {
    it('should call FormHandler with "use-password" action', async () => {
      await sdk.usePassword();
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ERROR, 'usePassword'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.USE_PASSWORD,
      });
    });
  });

  describe('tryAnotherMethod', () => {
    it('should call FormHandler with "pick-authenticator" action', async () => {
      await sdk.tryAnotherMethod();
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ERROR, 'tryAnotherMethod'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });
  });

  describe('noThanks', () => {
    it('should call FormHandler with "refuse-add-device" action', async () => {
      await sdk.noThanks();
      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_ERROR, 'noThanks'],
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.REFUSE_ADD_DEVICE,
      });
    });
  });
});