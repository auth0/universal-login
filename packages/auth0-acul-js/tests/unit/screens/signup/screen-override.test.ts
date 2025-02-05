import { ScreenOverride } from '../../../../src/screens/signup/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'signup',
      data: {
        name: 'Test User',
        email: 'test@example.com',
      },
      links: {
        login: '/login',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      loginLink: '/login',
    });
  });

  describe('getScreenData', () => {
    it('should return modified data including name and loginLink', () => {
      const result = ScreenOverride.getScreenData(screenContext);
      expect(result).toEqual({
        name: 'Test User',
        email: 'test@example.com',
        loginLink: '/login',
      });
    });

    it('should return null if screenContext.data is undefined', () => {
      expect(ScreenOverride.getScreenData({} as ScreenContext)).toBeNull();
    });

    it('should return an object without loginLink if links are undefined', () => {
      const modifiedScreenContext = {
        name: 'signup',
        data: { name: 'Test User', email: 'test@example.com' },
      } as ScreenContext;
      expect(ScreenOverride.getScreenData(modifiedScreenContext)).toEqual({
        name: 'Test User',
        email: 'test@example.com',
        loginLink: undefined,
      });
    });

    it('should return an object without modifications if name is not present', () => {
      const modifiedScreenContext = { name: 'signup', data: {} } as ScreenContext;
      expect(ScreenOverride.getScreenData(modifiedScreenContext)).toEqual({
        email: undefined,
        loginLink: undefined,
      });
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
