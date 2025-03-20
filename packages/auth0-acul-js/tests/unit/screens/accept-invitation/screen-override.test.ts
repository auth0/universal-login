import { ScreenOverride } from '../../../../src/screens/accept-invitation/screen-override';
import { Screen } from '../../../../src/models/screen';
import type { ScreenContext } from '../../../../interfaces/models/screen';

describe('ScreenOverride', () => {
  it('should initialize data correctly', () => {
    const screenContext: ScreenContext = {
      name: 'accept-invitation',
      data: {
        inviter: 'John Doe',
        email: 'john.doe@example.com',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);

    expect(screenOverride.data).toEqual({
      inviter: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should return null for data when screenContext.data is undefined', () => {
    const emptyContext = {} as ScreenContext;
    const result = ScreenOverride.getScreenData(emptyContext);
    expect(result).toBeNull();
  });

  it('should return a copy of screenContext.data when available', () => {
    const screenContext: ScreenContext = {
      name: 'accept-invitation',
      data: {
        inviter: 'John Doe',
        email: 'john.doe@example.com',
      },
    } as ScreenContext;

    const result = ScreenOverride.getScreenData(screenContext);
    expect(result).toEqual({
      inviter: 'John Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should create an instance of Screen', () => {
    const screenContext: ScreenContext = {
      name: 'accept-invitation',
      data: {
        inviter: 'John Doe',
        email: 'john.doe@example.com',
      },
    } as ScreenContext;

    const screenOverride = new ScreenOverride(screenContext);
    expect(screenOverride).toBeInstanceOf(Screen);
  });
});