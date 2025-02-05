import { ScreenOverride } from '../../../../src/screens/reset-password-success/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'reset-password-success',
      data: {
        username: 'test-user',
        otherField: 'some-value',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      username: 'test-user',
      otherField: 'some-value',
    });
  });

  describe('getScreenData', () => {
    it('should return modified data including username', () => {
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toEqual({
        username: 'test-user',
        otherField: 'some-value',
      });
    });

    it('should return null if screenContext.data is undefined', () => {
      expect(ScreenOverride.getScreenData({} as ScreenContext)).toBeNull();
    });

    it('should return an object without modifications if username is not present', () => {
      const modifiedScreenContext = { name: 'reset-password-success', data: { email: 'test@example.com' } } as ScreenContext;
      expect(ScreenOverride.getScreenData(modifiedScreenContext)).toEqual({ email: 'test@example.com' });
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
