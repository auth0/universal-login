export interface Connection {
  name: string;
  strategy: string;
  metadata?: Record<string, string>;
}

export interface Passkey {
  enabled: boolean;
}

export interface PasskeyLogin extends Passkey {
  public_key: {
    challenge: ArrayBuffer;
  };
}

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
    pubKeyCredParams: [
      {
        type: string;
        alg: number;
      },
    ];
    authenticatorSelection: {
      residentKey: string;
      userVerification: string;
    };
  };
}

interface CountryCode {
  code: string;
  prefix: string;
}

export interface UsernamePolicy {
  maxLength: number;
  minLength: number;
  allowedFormats?: {
    usernameInEmailFormat?: boolean;
    usernameInPhoneFormat?: boolean;
  };
}

export interface PasswordPolicy {
  enabled?: boolean;
  minLength?: number;
  policy: 'none' | 'low' | 'fair' | 'good' | 'excellent';
  passwordSecurityInfo?: PasswordComplexityRule[];
}

export interface DBConnection extends Connection {
  options: {
    signup_enabled: boolean;
    flexible_identifiers_active?: boolean;
    forgot_password_enabled: boolean;
    username_required?: boolean;
    validation?: {
      username: {
        max_length: number;
        min_length: number;
      };
    };
    attributes?: {
      email?: {
        signup_status: string;
        identifier_active: boolean;
      };
      username?: {
        signup_status: string;
        identifier_active: boolean;
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
        identifier_active: boolean;
      };
    };
    authentication_methods: {
      password: {
        enabled: boolean;
        policy: string;
        min_length: number;
        password_security_info?: PasswordComplexityRule[];
      };
      passkey: {
        enabled: boolean;
      };
    };
  };
}

export interface PasswordlessConnection extends Connection {
  options: {
    signup_enabled: boolean;
  };
}

export interface EnterpriseConnectionContext extends Connection {
  options: {
    icon_url?: string;
    display_name?: string;
    show_as_button: boolean;
  };
}

export interface EnterpriseConnection extends Connection {
  options: {
    iconUrl?: string;
    displayName?: string;
    showAsButton: boolean;
  };
}

export interface SocialConnection extends Connection {}

export interface PasswordComplexityRule {
  code: string;
  label: string;
  status: 'valid' | 'error';
  isValid: boolean;
  args?: {
    count: number;
    total?: number;
    example?: string;
  };
  items?: PasswordComplexityRule[];
}

export interface Error {
  code: string;
  field?: string;
  message: string;
  rules?: PasswordComplexityRule[];
}

export interface TransactionContext {
  state: string;
  locale: string;
  errors?: Error[];
  country_code?: CountryCode;
  connection?: DBConnection | PasswordlessConnection;
  alternate_connections?: (Connection | EnterpriseConnectionContext)[];
}

export interface TransactionMembers {
  state: string;
  locale: string;
  countryCode: CountryCode['code'] | null;
  countryPrefix: CountryCode['prefix'] | null;
  connectionStrategy: string | null;
  hasErrors: boolean;
  errors: Error[] | null;
  currentConnection: Connection | null;
  alternateConnections: (Connection | EnterpriseConnection)[] | null;
}
