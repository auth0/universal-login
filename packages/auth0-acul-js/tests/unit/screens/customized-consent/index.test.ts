import { ScreenIds, FormActions } from '../../../../src/constants';
import CustomizedConsent from '../../../../src/screens/customized-consent';
import { ScreenOverride } from '../../../../src/screens/customized-consent/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';
import type { CustomOptions } from '../../../../interfaces/common';
import type { Scope, AuthorizationDetail } from '../../../../interfaces/models/screen';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/screens/customized-consent/screen-override');

describe('CustomizedConsent Screen SDK', () => {
  let consentInstance: CustomizedConsent;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'customized-consent-tx-state-456';
  const mockScopes: Scope[] = [
    { name: 'read:data', description: 'Read your data', values: [] },
  ];
  const mockAuthDetails: AuthorizationDetail[] = [
    { type: 'transaction', amount: '100', currency: 'USD' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockScreenOverrideInstance = {
      name: ScreenIds.CUSTOMIZED_CONSENT,
      scopes: mockScopes,
      authorizationDetails: mockAuthDetails,
      texts: { title: 'Review Access Request' },
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData,
        screen: {
          name: ScreenIds.CUSTOMIZED_CONSENT,
          data: {
            scopes: mockScopes,
            authorization_details: mockAuthDetails,
          },
          texts: { title: 'Review Access Request' },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    consentInstance = new CustomizedConsent();

    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should have the correct static screenIdentifier', () => {
    expect(CustomizedConsent.screenIdentifier).toBe(ScreenIds.CUSTOMIZED_CONSENT);
  });

  it('should initialize correctly, setting up ScreenOverride with correct data', () => {
    expect(consentInstance).toBeInstanceOf(CustomizedConsent);
    expect(consentInstance.screen).toBe(mockScreenOverrideInstance);
    expect(consentInstance.screen?.scopes).toEqual(mockScopes);
    expect(consentInstance.screen?.authorizationDetails).toEqual(mockAuthDetails);
    expect(consentInstance.screen.texts?.title).toBe('Review Access Request');
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('accept method', () => {
    const expectedRoute = `/u/customized-consent?state=${mockTransactionState}`;

    it('should call FormHandler with "accept" action, correct route, and transaction state', async () => {
      await consentInstance.accept();

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.CUSTOMIZED_CONSENT, 'accept'],
        route: expectedRoute,
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.ACCEPT,
      });
    });

    it('should include custom options in the payload if provided', async () => {
      const customPayload: CustomOptions = { custom_accept_param: 'acceptedValue' };
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
    const expectedRoute = `/u/customized-consent?state=${mockTransactionState}`;

    it('should call FormHandler with "deny" action, correct route, and transaction state', async () => {
      await consentInstance.deny();

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.CUSTOMIZED_CONSENT, 'deny'],
        route: expectedRoute,
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        action: FormActions.DENY,
      });
    });

    it('should include custom options in the payload if provided', async () => {
      const customPayload: CustomOptions = { reason_code: 'user_rejected' };
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