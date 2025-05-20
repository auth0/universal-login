import { ScreenIds, FormActions } from '../../../../src/constants';
import MfaWebAuthnChangeKeyNickname from '../../../../src/screens/mfa-webauthn-change-key-nickname';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-change-key-nickname/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { baseContextData } from '../../../data/test-data';

import type { ContinueOptions } from '../../../../interfaces/screens/mfa-webauthn-change-key-nickname';

// Mock dependencies
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/screens/mfa-webauthn-change-key-nickname/screen-override');

describe('MfaWebAuthnChangeKeyNickname SDK', () => {
  let sdkInstance: MfaWebAuthnChangeKeyNickname;
  let mockFormHandlerInstance: { submitData: jest.Mock };
  let mockScreenOverrideInstance: Partial<ScreenOverride>;

  const mockTransactionState = 'test-tx-state-mfa-webauthn-change-nickname';
  const currentKeyNickname = 'Old Key Name';

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock for ScreenOverride
    mockScreenOverrideInstance = {
      name: ScreenIds.MFA_WEBAUTHN_CHANGE_KEY_NICKNAME,
      data: {
        nickname: currentKeyNickname,
      },
      texts: { title: 'Change Nickname' },
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    // Mock global context
    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        ...baseContextData,
        screen: {
          name: ScreenIds.MFA_WEBAUTHN_CHANGE_KEY_NICKNAME,
          data: {
            nickname: currentKeyNickname,
          },
          texts: { title: 'Change Nickname' },
        },
        transaction: { ...baseContextData.transaction, state: mockTransactionState },
      },
      writable: true,
    });

    sdkInstance = new MfaWebAuthnChangeKeyNickname();

    // Mock FormHandler
    mockFormHandlerInstance = { submitData: jest.fn().mockResolvedValue(undefined) };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandlerInstance);
  });

  it('should initialize correctly, setting up screen override with correct data', () => {
    expect(sdkInstance).toBeInstanceOf(MfaWebAuthnChangeKeyNickname);
    expect(sdkInstance.screen).toBe(mockScreenOverrideInstance);
    expect(sdkInstance.screen.data?.nickname).toBe(currentKeyNickname);
    expect(sdkInstance.screen.texts?.title).toBe('Change Nickname');
    expect(ScreenOverride).toHaveBeenCalledWith(window.universal_login_context.screen);
  });

  describe('continueWithNewNickname method', () => {
    const validNewNickname = 'New Key Name';

    it('should call FormHandler with correct nickname, default action, and transaction state', async () => {
      const options: ContinueOptions = { nickname: validNewNickname };
      await sdkInstance.continueWithNewNickname(options);

      expect(FormHandler).toHaveBeenCalledWith({
        state: mockTransactionState,
        telemetry: [ScreenIds.MFA_WEBAUTHN_CHANGE_KEY_NICKNAME, 'continueWithNewNickname'],
        route: '/u/mfa-webauthn-change-key-nickname',
      });
      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        nickname: validNewNickname,
        action: FormActions.DEFAULT,
      });
    });

    it('should include custom options in the payload if provided', async () => {
      const options: ContinueOptions = { nickname: validNewNickname, customField: 'customValue' };
      await sdkInstance.continueWithNewNickname(options);

      expect(mockFormHandlerInstance.submitData).toHaveBeenCalledWith({
        nickname: validNewNickname,
        customField: 'customValue',
        action: FormActions.DEFAULT,
      });
    });

    it('should throw an error if payload is missing', async () => {
      // @ts-expect-error Testing invalid input for missing payload
      await expect(sdkInstance.continueWithNewNickname(undefined)).rejects.toThrow(
        'The `nickname` property in the payload is required and must be a string.',
      );
    });

    it('should throw an error if nickname property is missing in payload', async () => {
      // @ts-expect-error Testing invalid input where nickname is missing
      await expect(sdkInstance.continueWithNewNickname({})).rejects.toThrow(
        'The `nickname` property in the payload is required and must be a string.',
      );
    });

    it('should throw an error if nickname is not a string', async () => {
      // @ts-expect-error Testing invalid input for nickname type
      await expect(sdkInstance.continueWithNewNickname({ nickname: 12345 })).rejects.toThrow(
        'The `nickname` property in the payload is required and must be a string.',
      );
    });

    it('should propagate errors from FormHandler.submitData', async () => {
      const submissionError = new Error('Network Error during nickname update');
      mockFormHandlerInstance.submitData.mockRejectedValue(submissionError);
      const options: ContinueOptions = { nickname: validNewNickname };
      await expect(sdkInstance.continueWithNewNickname(options)).rejects.toThrow(submissionError);
    });
  });
});