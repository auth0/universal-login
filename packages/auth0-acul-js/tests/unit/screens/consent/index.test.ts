import { ScreenIds, FormActions } from '../../../../src/constants';
import Consent from '../../../../src/screens/consent';
import { ScreenOverride } from '../../../../src/screens/consent/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions } from '../../../../interfaces/common';
import type { Scope } from '../../../../interfaces/models/screen';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/screens/consent/screen-override');

/**
 * @group unit
 * @group screens
 */
describe('Consent Screen SDK', () => {
  let consentInstance: Consent;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'consent-tx-state-123';
  const mockScopes: Scope[] = [
    { value: 'openid', description: 'Sign in' },
    { value: 'profile', description: 'View your profile information' },
    { value: 'email', description: 'View your email address' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for ScreenOverride
    mockScreenOverrideInstance = {
      name: ScreenIds.CONSENT,
      scopes: mockScopes,
      hideScopes: false,
      texts: { title: 'Authorize Application' },
      // Mock other base ScreenMembers properties as needed by BaseContext or other parts
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    // Mock global context
    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData,
        screen: {
          name: ScreenIds.CONSENT,
          data: {
            scopes: mockScopes,
            hideScopes: false,
          },
          texts: { title: 'Authorize Application' },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    consentInstance = new Consent();

    // Mock FormHandler
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should have the correct static screenIdentifier', () => {
    expect(Consent.screenIdentifier).toBe(ScreenIds.CONSENT);
  });

  it('should initialize correctly, setting up ScreenOverride with correct data', () => {
    expect(consentInstance).toBeInstanceOf(Consent);
    expect(consentInstance.screen).toBe(mockScreenOverrideInstance);
    expect(consentInstance.screen?.scopes).toEqual(mockScopes);
    expect(consentInstance.screen?.hideScopes).toBe(false);
    expect(consentInstance.screen.texts?.title).toBe('Authorize Application');
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('accept method', () => {
    it('should call FormHandler with "accept" action, correct route, and transaction state', async () => {
      await consentInstance.accept();

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.CONSENT, 'accept']
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.ACCEPT,
      });
    });

    it('should include custom options in the payload if provided', async () => {
      const customPayload: CustomOptions = { customField: 'acceptValue' };
      await consentInstance.accept(customPayload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        ...customPayload,
        action: FormActions.ACCEPT,
      });
    });

    it('should propagate errors from FormHandler.submitData', async () => {
      const submissionError = new Error('Network Error during accept');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);

      await expect(consentInstance.accept()).rejects.toThrow(submissionError);
    });
  });

  describe('deny method', () => {
    it('should call FormHandler with "deny" action, correct route, and transaction state', async () => {
      await consentInstance.deny();

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.CONSENT, 'deny']
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DENY,
      });
    });

    it('should include custom options in the payload if provided', async () => {
      const customPayload: CustomOptions = { reason: 'user_cancelled' };
      await consentInstance.deny(customPayload);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        ...customPayload,
        action: FormActions.DENY,
      });
    });

    it('should propagate errors from FormHandler.submitData', async () => {
      const submissionError = new Error('Network Error during deny');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);

      await expect(consentInstance.deny()).rejects.toThrow(submissionError);
    });
  });
});