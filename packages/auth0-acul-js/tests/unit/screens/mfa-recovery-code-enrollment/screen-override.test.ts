import { ScreenOverride } from '../../../../src/screens/mfa-recovery-code-enrollment/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-enrollment',
      data: {
        text_code: 'EXAMPLE-RECOVERY-CODE',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      textCode: 'EXAMPLE-RECOVERY-CODE',
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return a copy of screenContext.data when available', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-enrollment',
      data: {
        text_code: 'EXAMPLE-RECOVERY-CODE',
      },
    } as ScreenContext;

    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      textCode: 'EXAMPLE-RECOVERY-CODE',
    });
  });

  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'mfa-recovery-code-enrollment',
      data: {
        textCode: 'EXAMPLE-RECOVERY-CODE',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});
