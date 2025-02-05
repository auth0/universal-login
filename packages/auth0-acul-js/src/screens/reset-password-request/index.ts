import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import { ScreenOverride } from './screen-override';
import { TransactionOverride } from './transaction-override';

import type { CustomOptions } from '../../../interfaces/common';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type {
  ResetPasswordRequestOptions,
  ResetPasswordRequestMembers,
  ScreenMembersOnResetPasswordRequest as ScreenOptions,
  TransactionMembersOnResetPasswordRequest as TransactionOptions,
} from '../../../interfaces/screens/reset-password-request';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

export default class ResetPasswordRequest extends BaseContext implements ResetPasswordRequestMembers {
  screen: ScreenOptions;
  transaction: TransactionOptions;
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    const transactionContext = this.getContext('transaction') as TransactionContext;
    this.screen = new ScreenOverride(screenContext);
    this.transaction = new TransactionOverride(transactionContext);
  }

  /**
   * @example
   * import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
   *
   * const resetPasswordRequest = new ResetPasswordRequest();
   * resetPasswordRequest.resetPassword({ username: 'testuser' });
   */
  async resetPassword(payload: ResetPasswordRequestOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    const updatedPayload = updatePayloadByIdentifier(payload, this.transaction.hasFlexibleIdentifier);
    await new FormHandler(options).submitData(updatedPayload);
  }

  /**
   * @example
   * import ResetPasswordRequest from '@auth0/auth0-acul-js/reset-password-request';
   *
   * const resetPasswordRequest = new ResetPasswordRequest();
   * resetPasswordRequest.backToLogin();
   */
  async backToLogin(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: 'back-to-login' });
  }
}

/**
 * @private
 */
function updatePayloadByIdentifier(payload: ResetPasswordRequestOptions, isFlexibleIdentifier: boolean): ResetPasswordRequestOptions {
  if (!isFlexibleIdentifier) {
    // eslint-disable-next-line
    const { username, ...rest } = payload;
    return {
      ...rest,
      email: payload.username,
    };
  } else {
    return payload;
  }
}

export { ResetPasswordRequestMembers, ResetPasswordRequestOptions, ScreenOptions };
