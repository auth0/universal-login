import type { ScreenContextOnSignupPassword } from '../../../interfaces/screens/signup-password';
import { Screen } from '../../models/screen';
import { getLoginLink, getEditIdentifierLink } from '../../shared/screen';

export class ScreenOverride extends Screen {
  loginLink = getLoginLink(this.screen);
  editLink = getEditIdentifierLink(this.screen);

  constructor(screenContext: ScreenContextOnSignupPassword) {
    super(screenContext);
  }

  getScreenData = super.getScreenData.bind(this);
}
