import { Screen } from '../../models/screen';

import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaLoginOptions } from '../../../interfaces/screens/mfa-login-options';

/**
 * @class ScreenOverride
 * @extends Screen
 * @implements ScreenMembersOnMfaLoginOptions
 * @description Screen-specific override for the MFA Login Options screen ('mfa-login-options').
 * This class ensures that the screen data is correctly parsed and typed
 * according to the {@link ScreenMembersOnMfaLoginOptions} interface.
 */
export class ScreenOverride extends Screen implements ScreenMembersOnMfaLoginOptions {
    /**
     * Screen-specific data for MFA login options.
     * @type {{ enrolled_factors: string[]; } | null}
     * @public
     */
    public data: ScreenMembersOnMfaLoginOptions['data'];

    /**
     * Creates an instance of ScreenOverride for the MFA Login Options screen.
     * It initializes the data by parsing the provided screenContext.
     *
     * @param {ScreenContext} screenContext - The screen context object from the Universal Login global context,
     * specific to the 'mfa-login-options' screen.
     */
    constructor(screenContext: ScreenContext) {
        super(screenContext);
        this.data = ScreenOverride.getScreenData(screenContext);
    }

    /**
     * @static
     * @method getScreenData
     * @description Extracts and transforms the screen-specific data from the provided screen context.
     * Specifically, it retrieves the `enrolled_factors` list for MFA.
     *
     * @param {ScreenContext} screenContext - The screen context containing the raw data for the screen.
     * @returns {ScreenMembersOnMfaLoginOptions['data']} The structured screen data containing the `enrolled_factors`,
     * or `null` if the `enrolled_factors` is not present or not an array in the context data.
     */
    static getScreenData = (screenContext: ScreenContext): ScreenMembersOnMfaLoginOptions['data'] => {
        const data = screenContext.data;

        if (!data || !Array.isArray(data.enrolled_factors)) {
            return null;
        }

        return {
            enrolled_factors: Array.isArray(data.enrolled_factors)
                ? data.enrolled_factors.filter((factor): factor is string => typeof factor === 'string')
                : [],
        };
    };
}