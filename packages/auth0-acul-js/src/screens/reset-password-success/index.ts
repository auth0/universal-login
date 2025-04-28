import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';

import type {
  ResetPasswordSuccessMembers,
  ScreenMembersOnResetPasswordSuccess as ScreenOptions,
} from '../../../interfaces/screens/reset-password-success';

export default class ResetPasswordSuccess extends BaseContext implements ResetPasswordSuccessMembers {
  static screenIdentifier: string = ScreenIds.RESET_PASSWORD_SUCCESS;

  constructor() {
    super();
  }
}
export { ResetPasswordSuccessMembers, ScreenOptions as ScreenMembersOnResetPasswordSuccess };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
