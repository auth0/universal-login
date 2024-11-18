export interface Connection {
  name: string;
  strategy: string;
  metadata: Record<string, string>;
}

export interface Passkey {
  enabled: boolean;
}

export interface PasskeyLogin extends Passkey{
  public_key: {
    challenge: ArrayBuffer;
  };
};

export interface PasskeyEnroll extends Passkey {
  public_key: {
    user: {
      id: ArrayBuffer;
      name: string;
      displayName: string;
    };
    rp: {
      id: string;
      name: string;
    };
    challenge: ArrayBuffer;
    pubKeyCredParams: [{
      type: string,
      alg: Number
    }];
    authenticatorSelection: {
      residentKey: string;
      userVerification: string;
    };
  };
};

interface CountryCode {
  code: string;
  prefix: string;
};

interface DBConnection extends Connection {
  options: {
    signup_enabled: boolean;
    username_required?: boolean;
    forgot_password_enabled: boolean;
    attributes: {
      email?: {
        signup_status: string;
      };
      username?: {
        signup_status: string;
        validation?: {
          max_length: number;
          min_length: number;
          allowed_types: {
            email: boolean;
            phone_number: boolean;
          };
        };
      };
      phone?: {
        signup_status: string;
      };
    };
    authentication_methods: {
      password: {
        enabled: boolean;
        policy: string;
        min_length: number;
      };
      passkey: Passkey | PasskeyLogin | PasskeyEnroll | null;
    };
  };
};

export interface PasswordlessConnection extends Connection {
  options: {
    signup_enabled: boolean;
  };
}

interface EnterpriseConnection extends Connection {
  options: {
    icon_url?: string;
    display_name?: string;
    show_as_button: boolean;
  };
};

export interface SocialConnection extends Connection {}

export interface Error {
  code: string;
  field?: string;
  message: string;
}

export interface TransactionContext {
  state: string;
  locale: string;
  errors?: Error[];
  country_code?: CountryCode;
  connection?: DBConnection | PasswordlessConnection | undefined;
  alternate_connections?: Connection[] | undefined;
}

export interface TransactionMembers {
  state: string;
  locale: string;
  countryCode: CountryCode['code'] | undefined;
  countryPrefix: CountryCode['prefix'] | undefined;
  hasErrors: boolean;
  hasCurrentConnection: boolean;
  hasAlternateConnections: boolean;
  errors: Error[];
  currentConnection: DBConnection | PasswordlessConnection | undefined;
  alternateConnections: Connection[] | undefined;
}
