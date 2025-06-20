import BruteForceProtectionUnblockSuccess from '../../../../src/screens/brute-force-protection-unblock-success';
import { baseContextData } from '../../../data/test-data';

describe('BruteForceProtectionUnblockSuccess', () => {
  let bruteForceProtectionUnblockSuccess: BruteForceProtectionUnblockSuccess;

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = baseContextData;
    bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
  });

  it('should create an instance of BruteForceProtectionUnblockSuccess', () => {
    expect(bruteForceProtectionUnblockSuccess).toBeInstanceOf(BruteForceProtectionUnblockSuccess);
  });

  it('should have a screen property', () => {
    expect(bruteForceProtectionUnblockSuccess).toHaveProperty('screen');
  });
});