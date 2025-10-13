import { Errors } from "../constants";

import { isWebAuthPlatformAvailable } from "./browser-capabilities";
import { base64UrlToUint8Array, uint8ArrayToBase64Url } from "./codec";

import type { PasskeyRead, PasskeyCreate } from '../../interfaces/models/screen';
import type { PasskeyCreateResponse, PasskeyCredentialResponse, ConditionalMediationCapable } from '../../interfaces/utils/passkeys';

function safeBase64Url(buffer: ArrayBuffer | null): string | null {
  return buffer ? uint8ArrayToBase64Url(buffer) : null;
}

function decodePublicKey(
  publicKey: PasskeyCreate["public_key"]
): PublicKeyCredentialCreationOptions {
  const { challenge, user, authenticatorSelection, pubKeyCredParams, rp } =
    publicKey;
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
      type: "public-key",
      alg,
    })),
    authenticatorSelection: authenticatorSelection ? {
      ...authenticatorSelection,
      residentKey: authenticatorSelection.residentKey as
        | "required"
        | "preferred"
        | "discouraged",
      userVerification: authenticatorSelection.userVerification as
        | "required"
        | "preferred"
        | "discouraged"
        | undefined,
      authenticatorAttachment: authenticatorSelection.authenticatorAttachment as
        | "platform"
        | "cross-platform"
        | undefined,
    } : undefined
  };
}

function isAuthenticatorAssertionResponse(
  response: AuthenticatorResponse
): response is AuthenticatorAssertionResponse {
  return (
    (response as AuthenticatorAssertionResponse).authenticatorData !== undefined
  );
}

export async function getPasskeyCredentials(
  publicKey: PasskeyRead["public_key"]
): Promise<PasskeyCredentialResponse> {
  if (!publicKey?.challenge)
    throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);

  const hasWebAuthPlatform = await isWebAuthPlatformAvailable();
  const challenge = base64UrlToUint8Array(publicKey.challenge);

  const credential = (await navigator.credentials.get({
    publicKey: {
      challenge,
      allowCredentials: publicKey.allowCredentials?.length
      ? publicKey.allowCredentials.map((c) => ({
          id: base64UrlToUint8Array(c.id),
          type: "public-key" as const,
          transports: c.transports?.map(t => t as AuthenticatorTransport),
        }))
      : undefined
    },
  })) as PublicKeyCredential | null;

  if (!credential) throw new Error(Errors.PASSKEY_CREDENTIALS_UNAVAILABLE);
  if (!isAuthenticatorAssertionResponse(credential.response))
    throw new Error(Errors.PASSKEY_EXPECTED_ASSERTION_RESPONSE);

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

export async function createPasskeyCredentials(
  publicKey: PasskeyCreate["public_key"]
): Promise<PasskeyCreateResponse> {
  if (!publicKey?.challenge)
    throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);

  const publicKeyDecoded = decodePublicKey(publicKey);
  const credential = (await navigator.credentials.create({
    publicKey: publicKeyDecoded,
  })) as PublicKeyCredential | null;
  if (!credential) throw new Error(Errors.PASSKEY_CREATE_FAILED);

  const credentialResponse =
    credential.response as AuthenticatorAttestationResponse;
  return {
    id: credential.id,
    rawId: uint8ArrayToBase64Url(credential.rawId),
    type: credential.type,
    authenticatorAttachment: credential.authenticatorAttachment,
    response: {
      clientDataJSON: uint8ArrayToBase64Url(credentialResponse.clientDataJSON),
      attestationObject: uint8ArrayToBase64Url(
        credentialResponse.attestationObject
      ),
      transports:
        typeof credentialResponse?.getTransports === "function"
          ? credentialResponse.getTransports()
          : undefined,
    },
  };
}

export async function registerPasskeyAutofill({
  publicKey,
  inputId,
  onResolve,
  onReject,
}: {
  publicKey: PasskeyRead['public_key'];
  inputId?: string;
  onResolve: (credential: Credential) => void | Promise<void>;
  onReject?: (error: unknown) => void;
}): Promise<AbortController | void> {
  if (!publicKey?.challenge) throw new Error(Errors.PASSKEY_PUBLIC_KEY_UNAVAILABLE);
  const DEFAULT_TIMEOUT = 300_000; // 5 minutes

  const pkc = PublicKeyCredential as unknown as ConditionalMediationCapable;
  const supportsConditional =
    typeof pkc.isConditionalMediationAvailable === 'function'
      ? await pkc.isConditionalMediationAvailable()
      : false;

  if (!supportsConditional) {
    onReject?.(new Error('Conditional mediation not supported by this browser.'));
    return;
  }

  if (!('credentials' in navigator) || !('PublicKeyCredential' in window)) {
    onReject?.(new Error('WebAuthn is not supported in this environment.'));
    return;
  }

  // Overwrite the autocomplete attribute to ensure it has the required values.
  if (typeof document !== 'undefined' && inputId) {
    const el = document.getElementById(inputId);
    if (el && el.tagName?.toUpperCase() === 'INPUT') {
      const input = el as HTMLInputElement;
      input.setAttribute('autocomplete', 'username webauthn');
    } else {
      console.warn(`[Auth0 ACUL] No valid <input> found with id="${inputId}". Passkey autocomplete may not work.`);
    }
  }

  const challenge = base64UrlToUint8Array(publicKey.challenge);
  const controller = new AbortController();
  const request: CredentialRequestOptions = {
    publicKey: {
      challenge,
      rpId: window.location.hostname,
      allowCredentials: [],
      userVerification: 'preferred',
      timeout: DEFAULT_TIMEOUT
    },
    mediation: 'conditional',
    signal: controller.signal,
  };

  // Keep the promise open to allow the user to interact with the UI.
  navigator.credentials.get(request)
    .then((credential) => credential && onResolve(credential))
    .catch((err: unknown) => {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Aborted, no action needed
        return;
      }
      onReject?.(err);
    });

  return controller;
}