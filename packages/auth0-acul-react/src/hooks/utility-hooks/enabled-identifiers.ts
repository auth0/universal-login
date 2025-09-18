import type { Identifier } from "@auth0/auth0-acul-js";

export const getEnabledIdentifiers = (instance: () => { getEnabledIdentifiers: () => Identifier[] | null }) => {
    return instance().getEnabledIdentifiers() || [];
}