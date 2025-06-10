import BruteForceProtectionUnblockFailure from '../../../../src/screens/brute-force-protection-unblock-failure';
import { baseContextData } from '../../../data/test-data';

describe('BruteForceProtectionUnblockFailure', () => {
  let bruteForceProtectionUnblockFailure: BruteForceProtectionUnblockFailure;

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    bruteForceProtectionUnblockFailure = new BruteForceProtectionUnblockFailure();
  });

  it('should create an instance of BruteForceProtectionUnblockFailure', () => {
    expect(bruteForceProtectionUnblockFailure).toBeInstanceOf(BruteForceProtectionUnblockFailure);
  });
});