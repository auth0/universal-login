import { ScreenOverride } from '../../../../src/screens/reset-password-email/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'reset-password-email',
      data: {
        email: 'user@example.com',
        username: 'testUser',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      email: 'user@example.com',
      username: 'testUser',
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);

    expect(result).toBeNull();
  });

  it('should return a copy of screenContext.data when available', () => {
    const result = ScreenOverride.getScreenData(screenContext);

    expect(result).toEqual({
      email: 'user@example.com',
      username: 'testUser',
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
