import { FormActions } from '../../../src/constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type {
  OrganizationSelectionMembers,
  ContinueWithOrganizationNameOptions,
  ScreenMembersOnOrganizationSelection as ScreenOptions,
} from '../../../interfaces/screens/organization-selection';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the organization-selection screen functionality.
 * This screen allows users to select an organization to continue with.
 */
export default class OrganizationSelection extends BaseContext implements OrganizationSelectionMembers {
  screen: ScreenOptions;

  /**
   * Creates an instance of OrganizationSelection screen manager.
   */
  constructor() {
    super();
    const screenContext = this.getContext('screen') as ScreenContext;
    this.screen = screenContext as ScreenOptions;
  }

  /**
   * Continues with the selected organization name.
   * @param payload The options containing the organization name.
   * @example
   * ```typescript
   * import OrganizationSelection from '@auth0/auth0-acul-js/organization-selection';
   *
   * const organizationSelection = new OrganizationSelection();
   * await organizationSelection.continueWithOrganizationName({
   *   organizationName: 'testOrganizationName',
   * });
   * ```
   */
  async continueWithOrganizationName(payload: ContinueWithOrganizationNameOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [OrganizationSelection.screenIdentifier, 'continueWithOrganizationName'],
    };
    await new FormHandler(options).submitData<ContinueWithOrganizationNameOptions>({
      ...payload,
      action: FormActions.DEFAULT,
    });
  }
}

export { OrganizationSelectionMembers, ContinueWithOrganizationNameOptions, ScreenOptions as ScreenMembersOnOrganizationSelection };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
