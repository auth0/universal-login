import Signup from '../../../../src/screens/signup';
import { ScreenOverride } from '../../../../src/screens/signup/screen-override';
import { TransactionOverride } from '../../../../src/screens/signup/transaction-override';
import { FormHandler } from '../../../../src/utils/form-handler';
import { BaseContext } from '../../../../src/models/base-context';
import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { TransactionContext } from '../../../../interfaces/models/transaction';
import type { SignupOptions, SocialSignupOptions } from '../../../../interfaces/screens/signup';

jest.mock('../../../../src/screens/signup/screen-override');
jest.mock('../../../../src/screens/signup/transaction-override');
jest.mock('../../../../src/utils/form-handler');
jest.mock('../../../../src/models/base-context');

describe('Signup', () => {
  let signup: Signup;
  let screenContext: ScreenContext;
  let transactionContext: TransactionContext;

  beforeEach(() => {
    screenContext = { name: 'signup', data: {} } as ScreenContext;
    transactionContext = { state: 'mockState', locale: 'en' } as TransactionContext;

    (BaseContext.prototype.getContext as jest.Mock).mockImplementation((contextType: string) => {
      if (contextType === 'screen') return screenContext;
      if (contextType === 'transaction') return transactionContext;
      return null;
    });

    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => ({
      data: screenContext.data,
    }));

    (TransactionOverride as unknown as jest.Mock).mockImplementation(() => ({
      state: transactionContext.state,
    }));

    signup = new Signup();
  });

  it.skip('should initialize screen and transaction correctly', () => {
    expect(signup.screen).toBeInstanceOf(ScreenOverride);
    expect(signup.transaction).toBeInstanceOf(TransactionOverride);
  });

  describe('signup', () => {
    it('should submit signup form data correctly', async () => {
      const payload: SignupOptions = { email: 'test@example.com', password: 'P@ssw0rd!' };
      await signup.signup(payload);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(payload);
    });
  });

  describe('socialSignup', () => {
    it('should submit social signup form data correctly', async () => {
      const payload: SocialSignupOptions = { connection: 'google-oauth2' };
      await signup.socialSignup(payload);
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith(payload);
    });
  });

  describe('pickCountryCode', () => {
    it('should submit pick-country-code action', async () => {
      await signup.pickCountryCode();
      expect(FormHandler).toHaveBeenCalledWith(expect.objectContaining({ state: 'mockState' }));
      expect(FormHandler.prototype.submitData).toHaveBeenCalledWith({
        action: 'pick-country-code',
      });
    });
  });

  it('should extend BaseContext', () => {
    expect(signup).toBeInstanceOf(BaseContext);
  });
});
