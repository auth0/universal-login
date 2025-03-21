/**
 * Attaches an object to the window for debugging and logs it to console
 * @param manager The object to expose for debugging
 * @param debugKey The key to access the object on window
 * @param logToConsole Whether to log the object to console (default: true)
 * @returns The original object
 */
export const withWindowDebug = <T extends object>(
  manager: T, 
  debugKey: string, 
  logToConsole: boolean = true
): T => {
  // Attach to window
  (window as any)[debugKey] = manager;
  
  // Log to console if requested
  if (logToConsole) {
    console.log(`%c🐞 Debug: ${debugKey}`, 'color: #4CAF50; font-weight: bold', manager);
  }
  
  // Also log any changes to the object (optional)
  const logChanges = false;
  if (logChanges && typeof Proxy !== 'undefined') {
    const handler = {
      set(target: any, prop: string, value: any) {
        console.log(`%c🔄 ${debugKey}.${String(prop)} changed:`, 'color: #2196F3; font-weight: bold', value);
        target[prop] = value;
        return true;
      }
    };
    
    (window as any)[debugKey] = new Proxy(manager, handler);
  }
  
  return manager;
};

/**
 * Logs an object to console with a label
 */
export const debugLog = <T>(label: string, obj: T): T => {
  console.log(`%c📝 ${label}:`, 'color: #9C27B0; font-weight: bold', obj);
  return obj;
};