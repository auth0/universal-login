import { isSignupEnabled } from '../../src/prompts/login-id/login-id';

describe('isSignupEnabled', () => {
  it('should return true', () => {
    expect(isSignupEnabled()).toBe(true);
  });
});
