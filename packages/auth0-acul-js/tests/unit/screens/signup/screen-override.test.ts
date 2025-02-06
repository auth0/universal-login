import { ScreenOverride } from '../../../../src/screens/signup/screen-override';
import { getLoginLink } from '../../../../src/shared/screen';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/shared/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = { name: 'signup' } as ScreenContext;

    (getLoginLink as jest.Mock).mockReturnValue('mockLoginLink');

    screenOverride = new ScreenOverride(screenContext);
  });

  it('should initialize loginLink correctly', () => {
    expect(screenOverride.loginLink).toBe('mockLoginLink');
  });

  it('should call getLoginLink with screenContext', () => {
    expect(getLoginLink).toHaveBeenCalledWith(screenContext);
  });

  it('should extend Screen class', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
