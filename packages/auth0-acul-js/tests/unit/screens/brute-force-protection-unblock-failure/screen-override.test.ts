import { baseContextData } from '../../../data/test-data';
import { ScreenOverride } from '../../../../src/screens/brute-force-protection-unblock-failure/screen-override';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'brute-force-protection-unblock-failure',
      data: {
        errorType: 'too_many_attempts',
      },
    } as ScreenContext;

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize data correctly', () => {
    expect(screenOverride.data).toEqual({
      errorType: 'too_many_attempts',
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
      errorType: 'too_many_attempts',
    });
  });
});