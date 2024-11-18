import type { ScreenContext, ScreenData, PasskeyRead, PasskeyCreate} from '../../interfaces/models/screen';
import { loginIdPayloadSchema } from '../../interfaces/screens/login-password';
import { PasskeyEnrollmentLocalMembers, ScreenMembersOnPasskeyEnrollmentLocal, ContinueWithPasskeyEnrollmentLocal, AbortPasskeyEnrollmentLocal } from '../../interfaces/screens/passkey-enrollment-local';
import { base64UrlToUint8Array, uint8ArrayToBase64Url } from '../utils/browser-capabilities';
import type { FormOptions } from '../../interfaces/utils/form-handler';
import { BaseContext } from '../models/base-context';
import { Screen } from '../models/screen';
import { ContextKey } from '../utils/enums';
import { FormHandler } from '../utils/form-handler';

class ScreenOverride extends Screen implements ScreenMembersOnPasskeyEnrollmentLocal {
  constructor(screen: ScreenContext) {
    super(screen);
  }

  get backLink(): ScreenMembersOnPasskeyEnrollmentLocal['backLink'] {
    return this.links?.back; // TODO: Some places this values is "signup"
  }
}

export default class PasskeyEnrollmentLocal extends BaseContext implements PasskeyEnrollmentLocalMembers {
  screen: ScreenMembersOnPasskeyEnrollmentLocal;

  constructor() {
    super();
    this.screen = new ScreenOverride(this.getContext(ContextKey.Screen) as ScreenContext);
  }

  async continueWithPasskeyEnrollmentLocal(data: ContinueWithPasskeyEnrollmentLocal): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: loginIdPayloadSchema,
      useBrowserCapabilities: true
    };

    // TODO: Re-work the following code.
    const baseContext = new BaseContext();
    const screenData: ScreenData | undefined = baseContext.getContext(ContextKey.Screen)?.data;
    const passkey: any = screenData?.passkey ?? {};
    if (passkey?.public_key) {
      passkey.public_key.challenge = base64UrlToUint8Array(
        passkey.public_key.challenge,
      );
      if (passkey.public_key.user?.id) {
        passkey.public_key.user.id = base64UrlToUint8Array(
          passkey.public_key.user.id,
        );
      }
    }

    if (!passkey.public_key) {
      throw new Error('Public key is missing');
    }

    const credential: any = await navigator.credentials.create({
      publicKey: passkey.public_key
    });

    const encoded: any = {
      id: credential.id,
      rawId: uint8ArrayToBase64Url(credential.rawId),
      type: credential.type,
      authenticatorAttachment: credential.authenticatorAttachment,
      response: {
        clientDataJSON: uint8ArrayToBase64Url(
          credential.response.clientDataJSON,
        ),
        attestationObject: uint8ArrayToBase64Url(
          credential.response.attestationObject,
        ),
      },
    };

    if (credential.response.getTransports) {
      encoded.response.transports = credential.response.getTransports();
    }

    await new FormHandler(options).submitData({ ...data, passkey: JSON.stringify(encoded) });
  }

  async abortPasskeyEnrollmentLocal(data: AbortPasskeyEnrollmentLocal): Promise<void> {
    const options: FormOptions = {
      state: this.transaction.state,
      zodSchema: loginIdPayloadSchema,
      useBrowserCapabilities: true
    };

    const _data: {[key: string]: string} = {};
    if (data['doNotShowAgain']) {
      _data['dontShowAgain'] = 'on';
    }
    await new FormHandler(options).submitData({ ...data, action: 'abort-passkey-enrollment', ..._data });
  }
}
