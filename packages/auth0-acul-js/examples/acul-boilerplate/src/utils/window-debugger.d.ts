/**
 * Attaches an object to the window for debugging and logs it to console
 * @param manager The object to expose for debugging
 * @param debugKey The key to access the object on window
 * @param logToConsole Whether to log the object to console (default: true)
 * @returns The original object
 */
export declare const withWindowDebug: <T extends object>(manager: T, debugKey: string, logToConsole?: boolean) => T;
/**
 * Logs an object to console with a label
 */
export declare const debugLog: <T>(label: string, obj: T) => T;
