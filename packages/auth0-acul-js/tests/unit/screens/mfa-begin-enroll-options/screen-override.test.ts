import { ScreenOverride } from '../../../../src/screens/mfa-begin-enroll-options/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

jest.mock('../../../../src/models/screen');

describe('ScreenOverride', () => {
  let screenContext: ScreenContext;
  let screenOverride: ScreenOverride;

  beforeEach(() => {
    screenContext = {
      name: 'mfa-begin-enroll-options',
    } as ScreenContext;
    screenOverride = new ScreenOverride(screenContext);
  });

  it('should create an instance of Screen', () => {
    expect(screenOverride).toBeInstanceOf(Screen);
  });

  it('should call Screen constructor with screenContext', () => {
    expect(Screen).toHaveBeenCalledWith(screenContext);
  });
});
