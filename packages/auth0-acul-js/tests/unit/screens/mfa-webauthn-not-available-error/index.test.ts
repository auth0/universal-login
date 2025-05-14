import { ScreenIds, FormActions } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context'; // For instanceof check
import MfaWebAuthnNotAvailableError from '../../../../src/screens/mfa-webauthn-not-available-error';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';


// Mock FormHandler to inspect its calls
jest.mock('../../../../src/utils/form-handler');

describe('MfaWebAuthnNotAvailableError', () => {
  let sdk: MfaWebAuthnNotAvailableError;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  const mockTransactionState = 'mock_transaction_state_webauthn_not_available';

  beforeEach(() => {
    jest.clearAllMocks();

    global.window = Object.create(window);
    const screenContext = {
      name: ScreenIds.MFA_WEBAUTHN_NOT_AVAILABLE_ERROR,
      // No specific data for this screen in the interface, so data would be null or base screen data
      data: {}, // or null, depending on how base Screen model handles it
      texts: { title: 'WebAuthn Not Available', description: 'Please try another method.' },
    };
    window.universal_login_context = {
      ...baseContextData,
      screen: screenContext,
      transaction: { ...baseContextData.transaction, state: mockTransactionState },
    };

    sdk = new MfaWebAuthnNotAvailableError();

    mockFormHandlerInstance = {
      submitData: jest.fn().mockResolvedValue(undefined),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should be an instance of BaseContext', () => {
    expect(sdk).toBeInstanceOf(BaseContext);
  });

  it('should correctly set the screenIdentifier', () => {
    expect(MfaWebAuthnNotAvailableError.screenIdentifier).toBe(ScreenIds.MFA_WEBAUTHN_NOT_AVAILABLE_ERROR);
  });

  it('should have screen properties initialized by BaseContext', () => {
    expect(sdk.screen).toBeDefined();
    expect(sdk.screen.name).toBe(ScreenIds.MFA_WEBAUTHN_NOT_AVAILABLE_ERROR);
    expect(sdk.screen.texts?.title).toBe('WebAuthn Not Available');
  });

  describe('tryAnotherMethod', () => {
    it('should call FormHandler with "pick-authenticator" action', async () => {
      await sdk.tryAnotherMethod();

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_NOT_AVAILABLE_ERROR, 'tryAnotherMethod'],
        route: '/u/mfa-webauthn-enrollment', // As per provided OpenAPI spec path for this action
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });

    it('should include custom options if provided', async () => {
      const customData: CustomOptions = { source: 'webauthn_unavailable' };
      await sdk.tryAnotherMethod(customData);
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        ...customData,
        action: FormActions.PICK_AUTHENTICATOR,
      });
    });

    it('should propagate errors from FormHandler', async () => {
      const error = new Error('Form submission failed for tryAnotherMethod');
      mockFormHandlerInstance.submitData.mockRejectedValue(error);
      await expect(sdk.tryAnotherMethod()).rejects.toThrow(error);
    });
  });
});