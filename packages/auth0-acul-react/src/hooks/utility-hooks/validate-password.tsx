import type { PasswordValidationResult, PasswordComplexityRule } from "@auth0/auth0-acul-js";
import { createUseErrors } from "../common/use-errors";

interface ScreenWithValidatePassword {
    validatePassword: (password: string) => PasswordValidationResult;
}

const flattenInvalidRules = (rules: PasswordComplexityRule[]): PasswordComplexityRule[] => {
    const invalid: PasswordComplexityRule[] = [];

    for (const rule of rules) {
        if (rule.status === "error") {
            invalid.push(rule);
        }

        if (Array.isArray(rule.items)) {
            for (const sub of rule.items) {
                if (sub.status === "error") {
                    invalid.push(sub);
                }
            }
        }
    }

    return invalid;
}

export const validatePassword = (
    password: string,
    instance: () => ScreenWithValidatePassword
) => {

    const { isValid, results } = instance().validatePassword(password);

    const errors = flattenInvalidRules(results).map((rule) => ({
        code: rule.code,
        message: rule.label,
    }));

    // @ts-ignore
    const { __replaceClientErrors } = createUseErrors(instance);

    __replaceClientErrors(errors);

    return { isValid, results };
};
