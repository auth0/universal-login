import { ScreenIds } from '../../../../src/constants';
import BruteForceProtectionUnblockSuccess from '../../../../src/screens/brute-force-protection-unblock-success';
import { baseContextData } from '../../../data/test-data';

describe('BruteForceProtectionUnblockSuccess', () => {
  let bruteForceProtectionUnblockSuccess: BruteForceProtectionUnblockSuccess;

  beforeEach(() => {
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.BRUTE_FORCE_PROTECTION_UNBLOCK_SUCCESS;
    window.universal_login_context = baseContextData;
    bruteForceProtectionUnblockSuccess = new BruteForceProtectionUnblockSuccess();
  });

  it('should have a static screenIdentifier matching the screen name', () => {
    expect(BruteForceProtectionUnblockSuccess.screenIdentifier).toBe(
      ScreenIds.BRUTE_FORCE_PROTECTION_UNBLOCK_SUCCESS
    );
  });

  it('should create an instance of BruteForceProtectionUnblockSuccess', () => {
    expect(bruteForceProtectionUnblockSuccess).toBeInstanceOf(BruteForceProtectionUnblockSuccess);
  });

  it('should have a screen property', () => {
    expect(bruteForceProtectionUnblockSuccess).toHaveProperty('screen');
  });
});