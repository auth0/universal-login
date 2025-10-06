import { Errors } from '../constants';

import { isWebAuthPlatformAvailable } from './browser-capabilities';
import { base64UrlToUint8Array, uint8ArrayToBase64Url } from './codec';

import type { PasskeyRead, PasskeyCreate } from '../../interfaces/models/screen';
import type { PasskeyCreateResponse, PasskeyCredentialResponse } from '../../interfaces/utils/passkeys';

function safeBase64Url(buffer: ArrayBuffer | null): string | null {
  return buffer ? uint8ArrayToBase64Url(buffer) : null;
}

function decodePublicKey(publicKey: PasskeyCreate['public_key']): PublicKeyCredentialCreationOptions {
  const { challenge, user, authenticatorSelection, pubKeyCredParams, rp } = publicKey;
  const decodedUser: PublicKeyCredentialUserEntity = {
    id: base64UrlToUint8Array(user.id),
    name: user.name,
    displayName: user.displayName,
  };

  return {
    rp,
    user: decodedUser,
    challenge: base64UrlToUint8Array(challenge),
    pubKeyCredParams: pubKeyCredParams.map(({ alg }) => ({
      type: 'public-key',
      alg,
    })),
    authenticatorSelection: {
      ...authenticatorSelection,
      residentKey: authenticatorSelection.residentKey as 'required' | 'preferred' | 'discouraged',
      userVerification: authenticatorSelection.userVerification as 'required' | 'preferred' | 'discouraged' | undefined,
    },
    attestation: 'direct',
  };
}

function isAuthenticatorAssertionResponse(response: AuthenticatorResponse): response is AuthenticatorAssertionResponse {
  return (response as AuthenticatorAssertionResponse).authenticatorData !== undefined;
}

export async function getPasskeyCredentials(publicKey: PasskeyRead['public_key']): Promise<PasskeyCredentialResponse> {
  if (!publicKey?.challenge) throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);

  const hasWebAuthPlatform = await isWebAuthPlatformAvailable();
  const challenge = base64UrlToUint8Array(publicKey.challenge);

  const credential = (await navigator.credentials.get({
    publicKey: { challenge },
  })) as PublicKeyCredential | null;

  if (!credential) throw new Error(Errors.PASSKEY_CREDENTIALS_UNAVAILABLE);
  if (!isAuthenticatorAssertionResponse(credential.response)) throw new Error(Errors.PASSKEY_EXPECTED_ASSERTION_RESPONSE);

  const response = credential.response;

  return {
    id: credential.id,
    rawId: safeBase64Url(credential.rawId ?? null),
    type: credential.type,
    authenticatorAttachment: credential.authenticatorAttachment,
    response: {
      clientDataJSON: safeBase64Url(response.clientDataJSON ?? null),
      authenticatorData: safeBase64Url(response.authenticatorData ?? null),
      signature: safeBase64Url(response.signature ?? null),
      userHandle: safeBase64Url(response.userHandle ?? null),
    },
    isUserVerifyingPlatformAuthenticatorAvailable: hasWebAuthPlatform,
  };
}

export async function createPasskeyCredentials(publicKey: PasskeyCreate['public_key']): Promise<PasskeyCreateResponse> {
  if (!publicKey?.challenge) throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);

  const publicKeyDecoded = decodePublicKey(publicKey);
  const credential = (await navigator.credentials.create({ publicKey: publicKeyDecoded })) as PublicKeyCredential | null;
  if (!credential) throw new Error(Errors.PASSKEY_CREATE_FAILED);

  const credentialResponse = credential.response as AuthenticatorAttestationResponse;
  return {
    id: credential.id,
    rawId: uint8ArrayToBase64Url(credential.rawId),
    type: credential.type,
    authenticatorAttachment: credential.authenticatorAttachment,
    response: {
      clientDataJSON: uint8ArrayToBase64Url(credentialResponse.clientDataJSON),
      attestationObject: uint8ArrayToBase64Url(credentialResponse.attestationObject),
      transports: typeof credentialResponse?.getTransports === 'function' ? credentialResponse.getTransports() : undefined,
    },
  };
}

/**
 * Registers the browser’s **Conditional UI for Passkeys** (autocomplete experience).
 *
 * This method sets up a passive WebAuthn `navigator.credentials.get()` request
 * with `mediation: "conditional"`, allowing the browser to show saved passkeys
 * directly inside the username input’s autocomplete dropdown.
 *
 * ---
 * 🧠 **Behavior**
 * - Call this **once** when initializing your login screen or page.
 * - The function registers an idle credential request in the background.
 * - When the user focuses a field with `autocomplete="webauthn username"`,
 *   the browser will display matching passkeys as suggestions.
 * - Selecting a passkey automatically resolves the challenge.
 *
 * ---
 * ⚠️ **Usage guidelines**
 * - Must be invoked only **once per page load**.
 * - Safe to call even if Conditional UI is not supported; it will no-op.
 * - Use `onResolve` to handle successful credential selection.
 * - Use `onReject` to handle errors or unsupported browsers.
 *
 * ---
 * @param params.publicKey - Public key challenge options returned by Auth0.
 * @param params.onResolve - Called when a credential is selected and resolved.
 * @param params.onReject - Called on errors or unsupported browsers.
 *
 * @example
 * ```ts
 * import { registerPasskeyAutocomplete } from "@auth0/auth0-acul-js/utils/passkeys";
 * import LoginId from "@auth0/auth0-acul-js/login-id";
 *
 * const loginId = new LoginId();
 * await registerPasskeyAutocomplete({
 *   publicKey: loginId.screen.publicKey!,
 *   onResolve: async (cred) => {
 *     await loginId.passkeyLogin({ passkey: JSON.stringify(cred) });
 *   }
 * });
 * ```
 *
 * @remarks
 * Uses the W3C WebAuthn Conditional Mediation API
 * (`navigator.credentials.get({ mediation: "conditional" })`).
 * Supported in Chrome 108+, Edge, and Safari 17+.
 *
 * @category Passkeys
 */
export async function registerPasskeyAutocomplete({
  publicKey,
  onResolve,
  onReject
}: {
  publicKey: PasskeyRead['public_key'];
  onResolve: (credential: Credential) => void | Promise<void>;
  onReject?: (error: unknown) => void;
}): Promise<void> {
  if (!publicKey?.challenge) {
    throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
  }

  /**
   * Some browsers (Chrome 108+, Edge, Safari 17+) expose a static method
   * `PublicKeyCredential.isConditionalMediationAvailable()`.
   * This is not yet part of the standard TypeScript DOM typings, so we
   * extend the interface locally and perform a runtime check.
   */
  interface ConditionalMediationCapable {
    isConditionalMediationAvailable?: () => Promise<boolean>;
  }

  const pkc = PublicKeyCredential as unknown as ConditionalMediationCapable;
  const supportsConditionalMediation = typeof pkc.isConditionalMediationAvailable === 'function'
    ? await pkc.isConditionalMediationAvailable()
    : false;

  if (!supportsConditionalMediation) {
    onReject?.(new Error('Conditional mediation not supported by this browser.'));
    return;
  }

  try {
    const challenge = base64UrlToUint8Array(publicKey.challenge);
    const credential = (await navigator.credentials.get({
      publicKey: { challenge },
      mediation: 'conditional'
    }));

    if (credential) {
      await onResolve(credential);
    }
  } catch (err) {
    onReject?.(err);
  }
}

