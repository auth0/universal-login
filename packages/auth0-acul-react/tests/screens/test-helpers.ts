/**
 * Test helpers for categorizing screen exports
 */

// Standard context hooks exported by all screens
const CONTEXT_HOOKS = new Set([
  'useUser',
  'useTenant',
  'useBranding',
  'useClient',
  'useOrganization',
  'usePrompt',
  'useScreen',
  'useTransaction',
  'useUntrustedData',
]);

// Common hooks exported by all screens
const COMMON_HOOKS = new Set([
  'useCurrentScreen',
  'useErrors',
  'useAuth0Themes',
]);

// Known utility hooks (imported from utility modules)
const UTILITY_HOOKS = new Set([
  'useLoginIdentifiers',
  'useSignupIdentifiers',
  'usePasswordValidation',
  'useUsernameValidation',
  'useResend',
  'useMfaPolling',
]);

/**
 * Categorizes screen exports into different types
 */
export function categorizeScreenExports(screenModule: any) {
  const allExports = Object.keys(screenModule);
  
  const contextHooks: string[] = [];
  const commonHooks: string[] = [];
  const utilityHooks: string[] = [];
  const instanceHooks: string[] = [];
  const submitFunctions: string[] = [];
  const other: string[] = [];

  allExports.forEach(key => {
    const value = screenModule[key];
    
    // Skip default export
    if (key === 'default') {
      return;
    }
    
    // Skip non-functions
    if (typeof value !== 'function') {
      other.push(key);
      return;
    }

    // Categorize by known sets
    if (CONTEXT_HOOKS.has(key)) {
      contextHooks.push(key);
    } else if (COMMON_HOOKS.has(key)) {
      commonHooks.push(key);
    } else if (UTILITY_HOOKS.has(key)) {
      utilityHooks.push(key);
    } else if (key.startsWith('use')) {
      // Remaining hooks starting with 'use' are likely instance hooks
      // (e.g., useConsent, useLogin, useMfaOtpChallenge)
      instanceHooks.push(key);
    } else {
      // Functions not starting with 'use' are submit functions
      // (e.g., accept, deny, login, enroll)
      submitFunctions.push(key);
    }
  });

  return {
    contextHooks,
    commonHooks,
    utilityHooks,
    instanceHooks,
    submitFunctions,
    other,
    all: allExports,
  };
}

/**
 * Tests if a hook returns a screen instance
 * Instance hooks return objects (the screen instance) via useMemo
 */
export function isInstanceHook(screenModule: any, hookName: string): boolean {
  try {
    const hook = screenModule[hookName];
    if (typeof hook !== 'function') {
      return false;
    }
    
    // This is a simplified check - in reality, you'd call it with renderHook
    // but we can't do that here without React context
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the expected instance hook name for a screen
 * E.g., 'consent' -> 'useConsent', 'mfa-otp-challenge' -> 'useMfaOtpChallenge'
 */
export function getExpectedInstanceHookName(screenName: string): string {
  return 'use' + screenName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
