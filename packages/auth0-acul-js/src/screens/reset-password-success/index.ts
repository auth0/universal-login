import { BaseContext } from '../../models/base-context';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  ResetPasswordSuccessMembers,
  ScreenMembersOnResetPasswordSuccess as ScreenOptions,
} from '../../../interfaces/screens/reset-password-success';

export default class ResetPasswordSuccess extends BaseContext implements ResetPasswordSuccessMembers {
  screen: ScreenOptions;
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
}
export { ResetPasswordSuccessMembers, ScreenOptions as ScreenMembersOnResetPasswordSuccess };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
