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
      passkey: {
        public_key: {
          challenge: "randomChallengeString1234567890",
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
      code: "US",
      prefix: "1",
    },
    alternate_connections: [
      {
        name: "facebook",
        strategy: "facebook",
        metadata: {
          client_id: "123456",
          client_secret: "abcdef",
        },
      },
      {
        name: "linkedin",
        strategy: "linkedin",
        metadata: {
          client_id: "123456",
          client_secret: "abcdef",
        },
      },
      {
        name: "microsoft",
        strategy: "microsoft",
        metadata: {
          client_id: "123456",
          client_secret: "abcdef",
        },
      },
      {
        name: "apple",
        strategy: "apple",
        metadata: {
          client_id: "123456",
          client_secret: "abcdef",
        },
      },
    ],
    connection: {
      name: "Username-Password-Authentication",
      strategy: "auth0",
      options: {
        signup_enabled: true,
        username_required: false,
        forgot_password_enabled: true,
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
