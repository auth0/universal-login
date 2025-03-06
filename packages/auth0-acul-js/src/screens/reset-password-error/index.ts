import { BaseContext } from '../../models/base-context';

import { ScreenOverride } from './screen-override';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ResetPasswordErrorMembers, ScreenMembersOnResetPasswordError as ScreenOptions } from '../../../interfaces/screens/reset-password-error';
export default class ResetPasswordError extends BaseContext implements ResetPasswordErrorMembers {
  static screenIdentifier: string = 'reset-password-error';
  screen: ScreenOptions;

  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = new ScreenOverride(screenContext);
  }
}
export { ResetPasswordErrorMembers, ScreenOptions as ScreenMembersOnResetPasswordError };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
