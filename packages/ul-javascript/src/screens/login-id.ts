import type { ScreenContext, PasskeyRead, PasskeyCreate, ScreenData } from '../../interfaces/models/screen';
import type {
  ContinueWithCaptcha,
  ContinueWithCountryCode,
  ContinueWithFederatedLogin,
  ContinueWithPasskey,
  ContinueWithUsername,
  ScreenMembersOnLoginId,
  LoginIdMembers,
} from '../../interfaces/screens/login-id';
import { base64UrlToUint8Array, uint8ArrayToBase64Url } from '../utils/browser-capabilities';
import { loginIdPayloadSchema, passkeyPayloadSchema, federatedPayloadSchema } from '../../interfaces/screens/login-id';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { stateNotFound } from '../utils/errors';
import { FormHandler } from '../utils/form-handler';
// import { Transaction } from '@/models';
// import { TransactionContext } from '../../interfaces';

class ScreenOverride extends Screen implements ScreenMembersOnLoginId {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  get isSignupEnabled(): boolean {
    const baseContext = new BaseContext();
    const connection = baseContext.getContext(ContextKey.Transaction)?.connection;
    return connection?.options?.signup_enabled === true;
  }

  get signupLink(): ScreenMembersOnLoginId['signupLink'] {
    return this.links?.signup; // TODO: Some places this values is "sign_up"
  }

  get passwordResetLink(): ScreenMembersOnLoginId['passwordResetLink'] {
    return this.links?.reset_password;
  }
}

// TODO: Revisit this.
// class TransactionOverride extends Transaction implements TransactionMembersOnLoginId {
//   constructor(transaction: TransactionContext) {
//     super(transaction);
//   }


// }

export default class LoginId extends BaseContext implements LoginIdMembers {
  screen: ScreenMembersOnLoginId;

  /**
   * Creates an instance of LoginIdManager.
   */
  constructor() {
    super();
    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as ScreenContext);

    // Ensure methods are bound to the current instance to support destructuring
    this.continueWithUsername = this.continueWithUsername.bind(this);
    this.continueWithFederatedLogin = this.continueWithFederatedLogin.bind(this);
    this.continueWithPasskey = this.continueWithPasskey.bind(this);
    this.continueWithCaptcha = this.continueWithCaptcha.bind(this);
    this.continueWithCountryCode = this.continueWithCountryCode.bind(this);
  }

  /**
   * @example
   * ```typescript
   * import { LoginId } from "ul-javascript"
   * 
   * const loginIdManager = new LoginId();
   * 
  loginIdManager.continueWithUserName({
    username: <usernameFieldValue>
  })
  * ```
  */
  async continueWithUsername(data: ContinueWithUsername): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: loginIdPayloadSchema,
      useBrowserCapabilities: true
    };

    await new FormHandler(options).submitData(data);
  }

  async continueWithFederatedLogin(data: ContinueWithFederatedLogin): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: federatedPayloadSchema,
      useBrowserCapabilities: true
    };

    await new FormHandler(options).submitData(data);
  }

  async continueWithPasskey(data: ContinueWithPasskey): Promise<void> {
    const baseContext = new BaseContext();
    const screenData: ScreenData | undefined = baseContext.getContext(ContextKey.Screen)?.data;
    const passkey = screenData?.passkey as PasskeyRead;
    
    // TODO: Re-work the following code.
    if (passkey.public_key) {
      passkey.public_key.challenge = base64UrlToUint8Array(
        passkey.public_key.challenge as string,
      );
      if (passkey.public_key.user?.id) {
        passkey.public_key.user.id = base64UrlToUint8Array(
          passkey.public_key.user.id as string,
        );
      }
    }

    const credential: any = await navigator.credentials.get({ publicKey: passkey.public_key as PublicKeyCredentialRequestOptions });
    if (!credential) return;
    const encoded = {
      id: credential?.id,
      rawId: uint8ArrayToBase64Url(credential?.rawId),
      type: credential.type,
      authenticatorAttachment: credential?.authenticatorAttachment,
      response: {
        clientDataJSON: uint8ArrayToBase64Url(
          credential?.response?.clientDataJSON,
        ),
        authenticatorData: uint8ArrayToBase64Url(
          credential.response.authenticatorData,
        ),
        signature: uint8ArrayToBase64Url(credential.response.signature),
        userHandle: uint8ArrayToBase64Url(credential.response.userHandle),
      },
      isUserVerifyingPlatformAuthenticatorAvailable: true,
    };

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: passkeyPayloadSchema,
      useBrowserCapabilities: false
    };

    return new FormHandler(options).submitData({ passkey: JSON.stringify(encoded) });
  }

  async continueWithCaptcha(data: ContinueWithCaptcha): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: passkeyPayloadSchema,
      useBrowserCapabilities: true
    };

    await new FormHandler(options).submitData(data);
  }

  // TODO: Revisit this.
  async continueWithCountryCode(data: any /*ContinueWithCountryCode*/): Promise<void> {
    if (this.transaction.state === undefined) {
      throw stateNotFound();
    }

    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: passkeyPayloadSchema,
      useBrowserCapabilities: true
    };
    
    await new FormHandler(options).submitData({ action: 'pick-country-code' });
  }

  // submitFederatedLoginForm = (event: Event): Promise<void> => {
  //   const options: FormOptions = {
  //     state: this.transaction.state,
  //     zodSchema: federatedPayloadSchema,
  //   };
  //   return new FormHandler(options).submitForm(event);
  // };

  /**
   * @example
   * ```typescript
   * import { LoginId } from "ul-javascript"
   * 
   * const loginIdManager = new LoginId();
   * const { connections } = loginIdManager.transaction;
   * 
  const connectionName = connections?.map(conn => conn.name)[0]
  loginIdManager.submitFederatedLoginData({
      connection: connectionName
  })
  * ```
  */
}
