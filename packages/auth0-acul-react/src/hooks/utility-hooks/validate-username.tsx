import type { UsernameValidationResult } from "@auth0/auth0-acul-js";
import { createUseErrors } from "../common/use-errors";

import type { SignupMembers } from "@auth0/auth0-acul-js";
interface validateUsernameMembers {
    validateUsername: (username: string) => UsernameValidationResult;
}

export const validateUsername = (username: string, instance: () => validateUsernameMembers) => {
    const result = instance().validateUsername(username);

    // @ts-ignore
    const { __replaceClientErrors } = createUseErrors<SignupMembers>(instance);
    __replaceClientErrors(result.errors);
    return { isValid: result.isValid, errors: result.errors };
};