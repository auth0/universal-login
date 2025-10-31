import { useLayoutEffect, useRef } from 'react';

import { getScreen } from '../../state/instance-store';

import type { LoginIdMembers } from '@auth0/auth0-acul-js/login-id';

const REQUIRED_TOKENS = 'username webauthn';

/**
 * Result object returned by {@link usePasskeyAutofill}.
 *
 * Provides a ref that can be attached to the username `<input>` element
 * to automatically enable browser Conditional UI (passkey autofill).
 *
 * @see {@link usePasskeyAutofill}
 * @category Passkeys
 * @public
 */
export interface UsePasskeyAutofillResult {
  /**
   * A React ref that can be bound to the username `<input>` element.
   *
   * When attached, the SDK ensures the input’s `autocomplete`
   * attribute is correctly set to `"username webauthn"`.
   *
   * If the developer already declared this attribute in markup,
   * the ref is optional, the hook will still register Conditional
   * Mediation correctly even without it.
   */
  inputRef: React.RefObject<HTMLInputElement>;
}

/**
 * React hook that enables browser **Conditional UI** (passkey autofill)
 * for the login identifier field on the `login-id` screen.
 *
 * ---
 * ### Behavior
 * - The hook automatically initializes the browser’s Conditional Mediation
 *   API (`navigator.credentials.get({ mediation: "conditional" })`),
 *   allowing passkeys stored on the user’s device to appear directly in
 *   the username field’s autocomplete dropdown.
 * - It **fails silently** on unsupported browsers and **never blocks** user input.
 * - The registration is performed once per page lifecycle.
 *
 * ---
 * ### Using the returned `ref`
 * The returned `inputRef` is **optional**.
 * - If you bind it to your `<input>` element, the SDK will ensure the element’s
 *   `autocomplete` attribute is correctly set to `"username webauthn"`.
 * - If your input element **already has**
 *   `autocomplete="username webauthn"` declared in markup,
 *   you can skip binding the `ref` entirely, the hook will still register
 *   Conditional Mediation correctly. See {@link UsePasskeyAutofillResult}
 *
 * ---
 * ### Example
 * ```tsx
 * import { usePasskeyAutofill } from '@auth0/auth0-acul-react/login-id';
 *
 * export function LoginForm() {
 *   // Option 1: bind the ref for automatic attribute handling
 *   const { inputRef } = usePasskeyAutofill();
 *
 *   return (
 *     <input
 *       ref={inputRef}
 *       id="username"
 *       placeholder="Username"
 *       autoComplete="username webauthn"
 *     />
 *   );
 * }
 *
 * // Option 2: works equally well without using the ref
 * export function LoginFormWithoutRef() {
 *   usePasskeyAutofill(); // just call the hook once
 *
 *   return (
 *     <input
 *       id="username"
 *       placeholder="Username"
 *       autoComplete="username webauthn"
 *     />
 *   );
 * }
 * ```
 *
 * ---
 * @supportedScreens
 * - `login-id`
 *
 * @category Passkeys
 */
export function usePasskeyAutofill(): UsePasskeyAutofillResult {
  const instance = getScreen<LoginIdMembers>();
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  useLayoutEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      if (!instance || typeof instance.registerPasskeyAutofill !== 'function') {
        console.warn('Passkey autofill unavailable: missing instance method');
        return;
      }

      const el = inputRef.current;
      const inputId = el?.id;

      // Fire-and-forget registration (fails silently)
      void instance.registerPasskeyAutofill(inputId);

      // Optionally correct the autocomplete attribute if the ref was used
      if (el) {
        const current = (el.getAttribute('autocomplete') ?? '').trim().toLowerCase();
        if (current !== REQUIRED_TOKENS) {
          el.setAttribute('autocomplete', REQUIRED_TOKENS);
        }
      }
    } catch (err) {
      console.warn('usePasskeyAutofill failed:', err);
    }
  }, [instance]);

  return { inputRef };
}
