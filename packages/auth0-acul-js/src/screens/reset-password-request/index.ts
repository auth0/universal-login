import { BaseContext } from '../../models/base-context';
import { ScreenIds } from '../../utils/enums';
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
import { FormActions } from '../../../src/constants';

export default class ResetPasswordRequest extends BaseContext implements ResetPasswordRequestMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_REQUEST;
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
      telemetry: [ResetPasswordRequest.screenIdentifier, 'resetPassword'],
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
      telemetry: [ResetPasswordRequest.screenIdentifier, 'backToLogin'],
    };
    await new FormHandler(options).submitData<CustomOptions>({ ...payload, action: FormActions.BACK_TO_LOGIN });
  }
}

/**
 * @private
 */
function updatePayloadByIdentifier(
  payload: ResetPasswordRequestOptions,
  isFlexibleIdentifier: boolean,
): ResetPasswordRequestOptions | { email: string } {
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

export {
  ResetPasswordRequestMembers,
  ResetPasswordRequestOptions,
  ScreenOptions as ScreenMembersOnResetPasswordRequest,
  TransactionOptions as TransactionMembersOnResetPasswordRequest,
};
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
