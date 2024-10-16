export interface Connection {
  name: string;
  display_name?: string;
  strategy: string;
  metadata: {
    [key: string]: string;
  };
};

export interface DbConnection extends Connection {
  options: {
    signup_enabled: boolean;
    username_required?: boolean; // Legacy (pre-flexible-id) connections only
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
      passkey: {
        enabled: boolean;
        public_key: {
          user_id?: ArrayBuffer;
          challenge?: ArrayBuffer;
        };
      };
    };
  };
};

export interface PasswordlessConnection extends Connection {
  options: {
    signup_enabled: Boolean;
  };
};

export interface EnterpriseConnection extends Connection {
  options: {
    icon_url?: string;
    show_as_button: boolean;
  };
};

export interface SocialConnection extends Connection {};

export interface Error {
  code: string;
  field?: string;
  message: string;
};

export interface TransactionContext {
  state: string;
  locale: string;
  errors?: Error[];
  country_code?: {
    code: string;
    prefix: string;
  };
  connections: (DbConnection | PasswordlessConnection | SocialConnection | EnterpriseConnection)[] | [];
  alternate_connections?: Connection[] | null;
}

export interface TransactionMembers {
  state: string;
  errors: Error[] | [];
  hasErrors: boolean;
  hasConnections: boolean;
  locale: string;
  countryCode: string | undefined;
  countryPrefix: string | undefined;
  connections: (DbConnection | PasswordlessConnection | SocialConnection | EnterpriseConnection)[] | [];
  alternateConnections: Connection[] | [];
}