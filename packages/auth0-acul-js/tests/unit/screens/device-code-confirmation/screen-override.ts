import { ScreenOverride } from '../../../../src/screens/device-code-confirmation/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'device-code-confirmation',
      data: {
        text_code: "123456",
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      textCode: "123456",
    });
  });

  it('should handle missing data gracefully', () => {
    const screenContext: ScreenContext = {
      name: 'device-code-confirmation',
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toBeNull();
  });

  it('should handle text_code as undefined', () => {
    const screenContext: ScreenContext = {
      name: 'device-code-confirmation',
      data: {
        text_code: undefined,
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride.data).toEqual({
      textCode: null,
    });
  });

  it('should extend Screen class', () => {
    const screenContext: ScreenContext = {
      name: 'device-code-confirmation',
      data: {
        text_code: "123456",
      },
    } as ScreenContext;
    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});