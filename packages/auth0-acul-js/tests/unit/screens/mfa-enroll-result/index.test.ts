import MfaEnrollResult from '../../../../src/screens/mfa-enroll-result';
import { BaseContext } from '../../../../src/models/base-context';
import { ScreenIds } from '../../../../src/utils/enums';

describe('MfaEnrollResult', () => {
  let mfaEnrollResult: MfaEnrollResult;

  beforeEach(() => {
    global.window = Object.create(window);
    window.universal_login_context = {
      client: {},
      screen: {
        name: ScreenIds.MFA_ENROLL_RESULT
      },
      transaction: { state: 'testState' },
      prompt: {},
      organization: {},
      tenant: {},
      user: {},
      branding: {},
      untrusted_data: {}
    };
    mfaEnrollResult = new MfaEnrollResult();
  });

  it('should create an instance of MfaEnrollResult', () => {
    expect(mfaEnrollResult).toBeInstanceOf(MfaEnrollResult);
  });

  it('should extend BaseContext', () => {
    expect(mfaEnrollResult).toBeInstanceOf(BaseContext);
  });

  it('should have the correct screen name', () => {
    expect(mfaEnrollResult.screen.name).toBe('mfa-enroll-result');
  });
});
