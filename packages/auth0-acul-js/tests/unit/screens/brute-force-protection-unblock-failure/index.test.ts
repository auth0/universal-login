import { ScreenOverride } from '../../../../src/screens/brute-force-protection-unblock-failure/screen-override';
import { baseContextData } from '../../../data/test-data';
import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/screens/brute-force-protection-unblock-failure/screen-override');
jest.mock('../../../../src/models/base-context');

describe('BruteForceProtectionUnblockFailure', () => {
  let bruteForceProtectionUnblockFailure: any;
  let screenContext: ScreenContext;

  beforeEach(() => {
    screenContext = {
      name: 'brute-force-protection-unblock-failure',
      data: { errorType: 'testError' },
    } as ScreenContext;

    (BaseContext.prototype.getContext as jest.Mock).mockReturnValue(screenContext);
    (ScreenOverride as unknown as jest.Mock).mockImplementation((context) => ({
      data: context.data,
    }));

    // Instantiate the class after mocking
    bruteForceProtectionUnblockFailure = new (require('../../../../src/screens/brute-force-protection-unblock-failure').default)();
  });

  it('should instantiate ScreenOverride with the correct screenContext', () => {
    expect(ScreenOverride).toHaveBeenCalledTimes(1);
    expect(ScreenOverride).toHaveBeenCalledWith(screenContext);
  });

  it('should correctly initialize screen data', () => {
    expect(bruteForceProtectionUnblockFailure.screen.data).toEqual({
      errorType: 'testError',
    });
  });

  it('should extend BaseContext', () => {
    expect(bruteForceProtectionUnblockFailure).toBeInstanceOf(BaseContext);
  });
});
