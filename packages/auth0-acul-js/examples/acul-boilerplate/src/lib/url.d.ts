/**
 * URL utility functions
 */
/**
 * Builds a URL using the current page's origin
 * @param path The path to append to the origin
 * @returns A complete URL with the current origin and the provided path
 */
export declare const buildUrlWithCurrentOrigin: (path: string) => string;
/**
 * Navigates to a URL built with the current origin
 * @param path The path to navigate to
 */
export declare const navigateWithCurrentOrigin: (path: string) => void;
