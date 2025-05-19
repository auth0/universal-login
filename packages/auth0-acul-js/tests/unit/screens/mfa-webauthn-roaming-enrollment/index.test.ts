import { ScreenIds } from '../../../../src/constants/enums';
import MfaWebAuthnRoamingEnrollment from '../../../../src/screens/mfa-webauthn-roaming-enrollment';
import { ScreenOverride } from '../../../../src/screens/mfa-webauthn-roaming-enrollment/screen-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createPasskeyCredentials } from '../../../../src/utils/passkeys';
import { baseContextData } from '../../../data/test-data';

import type { CustomOptions, WebAuthnErrorDetails } from '../../../../interfaces/common';
import type { ShowErrorOptions, TryAnotherMethodOptions } from '../../../../interfaces/screens/mfa-webauthn-roaming-enrollment';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/screens/mfa-webauthn-roaming-enrollment/screen-override');
jest.mock('../../../../src/utils/passkeys');

describe('MfaWebAuthnRoamingEnrollment', () => {
  let mfaWebAuthnRoamingEnrollment: MfaWebAuthnRoamingEnrollment;
  let mockFormHandler: { submitData: jest.Mock };
  let mockScreenOverride: ScreenOverride;
  
  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.MFA_WEBAUTHN_ROAMING_ENROLLMENT;
    baseContextData.screen.data = {
        webauthnType: 'roaming',
        passkey: { public_key: { challenge: 'mockChallenge', user: { id: 'mockUserId', name: 'mockUser', displayName: 'Mock User' }, rp: { id: 'mockRpId', name: 'Mock RP' }, pubKeyCredParams: [{ type: 'public-key', alg: -7 }], authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' } } }
    };
    window.universal_login_context = baseContextData;
    mockScreenOverride = new ScreenOverride(baseContextData.screen);
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverride);
    mfaWebAuthnRoamingEnrollment = new MfaWebAuthnRoamingEnrollment();
    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);
    
    // Mock createPasskeyCredentials to return a mock credential
    (createPasskeyCredentials as jest.Mock).mockResolvedValue({ id: 'mock-credential-id', type: 'public-key' });
  });
  
  describe('enroll method', () => {
    it('should handle enroll with valid payload correctly', async () => {
      const payload: CustomOptions = {
        customOption: 'value'
      };
      
      // Set up the publicKey on screen property to be used by the method
      const mockPublicKeyOptions = {
        challenge: 'mockChallenge',
        user: { id: 'mockUserId', name: 'mockUser', displayName: 'Mock User' },
        rp: { id: 'mockRpId', name: 'Mock RP' },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }] as [{ type: string; alg: number }],
        authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' }
      };
      mockScreenOverride.publicKey = mockPublicKeyOptions;

      await mfaWebAuthnRoamingEnrollment.enroll(payload);
      
      // Verify createPasskeyCredentials was called with the public key
      expect(createPasskeyCredentials).toHaveBeenCalledWith(mockPublicKeyOptions);
      
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'default',
          response: JSON.stringify({ id: 'mock-credential-id', type: 'public-key' }),
        })
      );
    });
    
    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      
      // Set up the publicKey on screen property to be used by the method
      mockScreenOverride.publicKey = {
        challenge: 'mockChallenge',
        user: { id: 'mockUserId', name: 'mockUser', displayName: 'Mock User' },
        rp: { id: 'mockRpId', name: 'Mock RP' },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
      };
      
      const payload: CustomOptions = {
        customOption: 'value'
      };
      
      await expect(mfaWebAuthnRoamingEnrollment.enroll(payload)).rejects.toThrow('Mocked reject');
    });
  });
  
  describe('showError method', () => {
    it('should handle showError with valid payload correctly', async () => {
      const errorDetails: WebAuthnErrorDetails = {
        name: 'NotAllowedError',
        message: 'The operation either timed out or was not allowed.',
      };
      const payload: ShowErrorOptions = {
          error: errorDetails,
          customOption: 'value'
      };
      await mfaWebAuthnRoamingEnrollment.showError(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          customOption: 'value',
          action: `showError::${JSON.stringify(errorDetails)}`,
          response: '',
        })
      );
    });
    
    it('should throw error when promise is rejected', async () => {
        mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
        const errorDetails: WebAuthnErrorDetails = {
            name: 'NotAllowedError',
            message: 'The operation either timed out or was not allowed.',
          };
          const payload: ShowErrorOptions = {
              error: errorDetails
          };
        await expect(mfaWebAuthnRoamingEnrollment.showError(payload)).rejects.toThrow('Mocked reject');
      });
  });
  
  describe('tryAnotherMethod method', () => {
    it('should handle tryAnotherMethod with valid payload correctly', async () => {
      const payload: TryAnotherMethodOptions = {
        customOption: 'value'
      };
      await mfaWebAuthnRoamingEnrollment.tryAnotherMethod(payload);
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          ...payload,
          action: 'pick-authenticator',
        })
      );
    });
    
    it('should handle tryAnotherMethod without payload correctly', async () => {
      await mfaWebAuthnRoamingEnrollment.tryAnotherMethod();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pick-authenticator',
        })
      );
    });
    
    it('should throw error when promise is rejected', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Mocked reject'));
      const payload: TryAnotherMethodOptions = {
        customOption: 'value'
      };
      await expect(mfaWebAuthnRoamingEnrollment.tryAnotherMethod(payload)).rejects.toThrow('Mocked reject');
    });
  });
});
