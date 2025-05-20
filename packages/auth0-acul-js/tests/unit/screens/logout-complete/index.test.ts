// __tests__/screens/logout-complete.test.ts

import { ScreenIds } from '../../../../src/constants';
import LogoutComplete from '../../../../src/screens/logout-complete';
import { baseContextData } from '../../../data/test-data';

describe('LogoutComplete Screen', () => {
  beforeEach(() => {
    // Mock the window context
    global.window = Object.create(window);
    baseContextData.screen.name = ScreenIds.LOGOUT_COMPLETE;
    window.universal_login_context = baseContextData;
  });

  it('should have the correct static screenIdentifier', () => {
    expect(LogoutComplete.screenIdentifier).toBe(ScreenIds.LOGOUT_COMPLETE);
  });

  it('should initialize screen data from global context', () => {
    const logoutComplete = new LogoutComplete();

    // screen.name comes from the mocked context
    expect(logoutComplete.screen.name).toBe(ScreenIds.LOGOUT_COMPLETE);
  });
});
