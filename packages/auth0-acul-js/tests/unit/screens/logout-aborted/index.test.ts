// __tests__/screens/logout-aborted.test.ts

import { ScreenIds } from '../../../../src/constants';
import LogoutAborted from '../../../../src/screens/logout-aborted';
import { baseContextData } from '../../../data/test-data';

describe('LogoutAborted Screen', () => {
  beforeEach(() => {
    // Mock the window context
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.LOGOUT_ABORTED;
    window.universal_login_context = baseContextData;
  });

  it('should have the correct static screenIdentifier', () => {
    expect(LogoutAborted.screenIdentifier).toBe(ScreenIds.LOGOUT_ABORTED);
  });

  it('should initialize screen data from global context', () => {
    const logoutAborted = new LogoutAborted();

    // screen.name comes from the mocked context
    expect(logoutAborted.screen.name).toBe(ScreenIds.LOGOUT_ABORTED);
  });
});
