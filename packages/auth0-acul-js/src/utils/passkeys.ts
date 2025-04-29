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
