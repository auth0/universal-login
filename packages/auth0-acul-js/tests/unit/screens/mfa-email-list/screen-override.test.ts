import { ScreenOverride } from '../../../../src/screens/mfa-email-list/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-email-list',
      data: {
        enrolled_emails: ['test1@example.com', 'test2@example.com'],
      },
    } as ScreenContext;
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      enrolled_emails: ['test1@example.com', 'test2@example.com'],
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return empty array for enrolled_emails when data.enrolled_emails is not an array', () => {
    const invalidContext = {
      name: 'mfa-email-list',
      data: {
        enrolled_emails: 'not an array',
      },
    } as ScreenContext;
    const result = ScreenOverride.getScreenData(invalidContext);
    expect(result).toEqual({
      enrolled_emails: [],
    });
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
