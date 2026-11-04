import { ScreenIds } from '../../../../src/constants';
import PendingConsent from '../../../../src/screens/pending-consent';
import { FormHandler } from '../../../../src/utils/form-handler';
import { createPollingControl } from '../../../../src/utils/polling-control';
import { baseContextData } from '../../../data/test-data';

import type { MfaPollingOptions } from '../../../../interfaces/utils/polling-control';

jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/utils/polling-control');

describe('PendingConsent', () => {
  let pendingConsent: PendingConsent;
  let mockFormHandler: { submitData: jest.Mock };

  beforeEach(() => {
    jest.clearAllMocks();
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.PENDING_CONSENT;
    window.universal_login_context = baseContextData;

    mockFormHandler = {
      submitData: jest.fn(),
    };
    (FormHandler as jest.Mock).mockImplementation(() => mockFormHandler);

    pendingConsent = new PendingConsent();
  });

  it('should have a static screenIdentifier property', () => {
    expect(PendingConsent.screenIdentifier).toBe(ScreenIds.PENDING_CONSENT);
  });

  it('should create an instance of PendingConsent', () => {
    expect(pendingConsent).toBeInstanceOf(PendingConsent);
  });

  describe('continue', () => {
    it('should submit without an action, since the outcome comes from the consent status', async () => {
      await pendingConsent.continue();
      expect(mockFormHandler.submitData).toHaveBeenCalledTimes(1);
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({});
    });

    it('should construct FormHandler with state and telemetry', async () => {
      await pendingConsent.continue();
      expect(FormHandler).toHaveBeenCalledWith({
        state: baseContextData.transaction.state,
        telemetry: [ScreenIds.PENDING_CONSENT, 'continue'],
      });
    });

    it('should forward custom payload', async () => {
      await pendingConsent.continue({ foo: 'bar' });
      expect(mockFormHandler.submitData).toHaveBeenCalledWith({ foo: 'bar' });
    });

    it('should throw if FormHandler.submitData rejects', async () => {
      mockFormHandler.submitData.mockRejectedValue(new Error('Submit failed'));
      await expect(pendingConsent.continue()).rejects.toThrow('Submit failed');
    });
  });

  describe('pollingManager', () => {
    it('should create a polling control with the given options and return it', () => {
      const control = { startPolling: jest.fn(), stopPolling: jest.fn(), isRunning: jest.fn() };
      (createPollingControl as jest.Mock).mockReturnValue(control);
      const options: MfaPollingOptions = {
        intervalMs: 2000,
        onCompleted: jest.fn(),
        onError: jest.fn(),
      };

      const result = pendingConsent.pollingManager(options);

      expect(createPollingControl).toHaveBeenCalledWith(options);
      expect(result).toBe(control);
    });
  });
});
