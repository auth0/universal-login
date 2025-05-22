export interface PasskeyCredentialResponse {
  id: string;
  rawId: string | null;
  type: string;
  authenticatorAttachment: string | null;
  response: {
    clientDataJSON: string | null;
    authenticatorData: string | null;
    signature: string | null;
    userHandle: string | null;
  };
  isUserVerifyingPlatformAuthenticatorAvailable: boolean;
}

export interface CredentialResponse {
  clientDataJSON: string | null;
  attestationObject: string | null;
  transports?: string[];
}

export interface PasskeyCreateResponse {
  id: string;
  rawId: string | null;
  type: string;
  authenticatorAttachment: string | null;
  response: CredentialResponse;
}
