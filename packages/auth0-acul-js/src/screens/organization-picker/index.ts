import { ScreenIds } from '../../constants';
import { BaseContext } from '../../models/base-context';
import { FormHandler } from '../../utils/form-handler';

import type { CustomOptions } from '../../../interfaces/common';
import type { OrganizationPickerMembers, SelectOrganizationOptions } from '../../../interfaces/screens/organization-picker';
import type { FormOptions } from '../../../interfaces/utils/form-handler';

/**
 * Class implementing the organization-picker screen functionality.
 * This screen allows users to select an organization from a list of available organizations.
 */
export default class OrganizationPicker extends BaseContext implements OrganizationPickerMembers {
  /**
   * Screen identifier for validation and telemetry
   */
  static screenIdentifier: string = ScreenIds.ORGANIZATION_PICKER;
  /**
   * Creates an instance of OrganizationPicker screen manager.
   */
  constructor() {
    super();
  }

  /**
   * Submits the selected organization ID.
   * @param payload The ID of the selected organization. `{ organization: string; }`
   * @example
   * ```typescript
   * import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';
   *
   * const organizationPicker = new OrganizationPicker();
   * organizationPicker.selectOrganization({
   *   organization: 'org_XXXXXXXXXXXXXXX'
   * });
   * ```
   */
  async selectOrganization(payload: SelectOrganizationOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [OrganizationPicker.screenIdentifier, 'selectOrganization'],
    };
    await new FormHandler(options).submitData(payload);
  }

  /**
   * Submits the action to skip the organization selection.
   * @param payload Optional custom options to include with the request.
   * @example
   * ```typescript
   * import OrganizationPicker from '@auth0/auth0-acul-js/organization-picker';
   *
   * const organizationPicker = new OrganizationPicker();
   * organizationPicker.skipOrganizationSelection();
   * ```
   */
  async skipOrganizationSelection(payload?: CustomOptions): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      telemetry: [OrganizationPicker.screenIdentifier, 'skipOrganizationSelection'],
    };
    await new FormHandler(options).submitData({
      ...payload,
      organizationSkipped: true,
      state: this.transaction.state,
    });
  }
}

export { OrganizationPickerMembers, SelectOrganizationOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
