export const baseContextData = {
  client: {
    id: "aBcDeFgHiJkLmNoPqRsTuVwXyZ123456",
    name: "random client name",
  },
  prompt: {
    name: "random-prompt",
  },
  screen: {
    data: {
      webauthnType: 'roaming',
      passkey: {
        public_key: {
          challenge: "randomChallengeString1234567890",
          user: { id: 'mockUserId', name: 'mockUser', displayName: 'Mock User' },
          rp: { id: 'mockRpId', name: 'Mock RP' }, pubKeyCredParams: [{ type: 'public-key', alg: -7 }], 
          authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' }
        },
      },
    },
    links: {
      reset_password:
        "/u/login/password-reset-start/Username-Password-Authentication?state=randomStateString1234567890",
      signup: "/u/signup/identifier?state=randomStateString1234567890",
    },
    name: "random-screen-name",
  },
  transaction: {
    country_code: {
      code: "IN",
      prefix: "91",
    },
    alternate_connections: [
      {
        name: "google-oauth2",
        strategy: "google",
      },
      {
        name: "github",
        strategy: "github",
      },
      {
        name: "twitter",
        strategy: "twitter",
      },
    ],
    connection: {
      name: "Username-Password-Authentication",
      strategy: "auth0",
      options: {
        signup_enabled: true,
        forgot_password_enabled: true,
        attributes: {
          email: {
            signup_status: "required",
          },
          phone: {
            signup_status: "required",
          },
          username: {
            signup_status: "required",
            validation: {
              max_length: 15,
              min_length: 1,
              allowed_types: {
                email: false,
                phone_number: false,
              },
            },
          },
        },
        authentication_methods: {
          password: {
            enabled: true,
            policy: "good",
            min_length: 8,
          },
          passkey: {
            enabled: true,
          },
        },
      },
    },
    locale: "en",
    state: "randomStateString1234567890",
  },
  organization: {
    id: "randomOrgId",
    name: "randomOrgName",
    usage: "randomUsage",
  },
  user: {
    id: "randomUserId",
    email: "randomEmail@example.com",
    username: "randomUsername",
    picture: "randomPictureUrl",
    phone_number: "1234567890",
    enrolled_factors: ["randomFactor1", "randomFactor2"],
  },
  branding: {},
  tenant: {},
  untrusted_data: {},
};
