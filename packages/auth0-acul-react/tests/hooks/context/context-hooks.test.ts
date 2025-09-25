import { ContextHooks } from '../../../src/hooks/context';
import type { BaseMembers } from '@auth0/auth0-acul-js';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => ({}), { virtual: true });

// Create a simple mock instance that implements minimal BaseMembers structure
const createMockInstance = (): BaseMembers => ({
  user: {
    id: 'user123',
    email: 'test@example.com',
    username: null,
    phoneNumber: null,
    picture: null,
    enrolledFactors: null,
    enrolledEmails: null,
    enrolledPhoneNumbers: null,
    enrolledDevices: null,
    organizations: null,
    userMetadata: null,
    appMetadata: null,
  },
  tenant: {
    name: 'Test Tenant',
    enabledLocales: ['en', 'es'],
    friendlyName: 'Test Tenant',
    enabledFactors: null,
  },
  branding: {
    themes: {
      default: {
        colors: { primary: '#007bff' },
        fonts: { bodyFont: { name: 'Arial' } },
        borders: { buttonBorderRadius: '4px' },
        pageBackground: { pageBackground: '#f8f9fa' },
        widget: { headerTextAlignment: 'center' },
        displayName: 'Default Theme',
      },
    },
    settings: null,
  },
  client: {
    id: 'client123',
    name: 'Test App',
    logoUrl: 'https://example.com/logo.png',
    description: 'Test application',
    metadata: { description: 'Test application' },
  },
  organization: {
    id: 'org123',
    name: 'Test Organization',
    usage: 'organization',
    displayName: 'Test Organization',
    branding: null,
    metadata: { industry: 'technology' },
  },
  prompt: {
    name: 'login',
  },
  untrustedData: {
    submittedFormData: null,
    authorizationParams: {
      login_hint: 'test@example.com',
      screen_hint: undefined,
      ui_locales: undefined,
    },
  },
  screen: {
    name: 'login',
    captchaImage: null,
    captchaSiteKey: null,
    captchaProvider: null,
    isCaptchaAvailable: false,
    texts: { title: 'Welcome back' },
    data: null,
    links: null,
    captcha: null,
  },
  transaction: {
    state: 'active',
    locale: 'en',
    countryCode: 'US',
    countryPrefix: '+1',
    connectionStrategy: 'auth0',
    hasErrors: false,
    errors: null,
    currentConnection: null,
    alternateConnections: null,
  },
});

describe('ContextHooks', () => {
  let mockInstance: BaseMembers;
  let contextHooks: ContextHooks<BaseMembers>;

  beforeEach(() => {
    mockInstance = createMockInstance();
    contextHooks = new ContextHooks(mockInstance);
  });

  describe('constructor', () => {
    it('should initialize with provided instance', () => {
      expect(contextHooks).toBeInstanceOf(ContextHooks);
    });
  });

  describe('useUser', () => {
    it('should return user data from instance', () => {
      const user = contextHooks.useUser();
      
      expect(user).toEqual(mockInstance.user);
      expect(user.id).toBe('user123');
      expect(user.email).toBe('test@example.com');
    });

    it('should return the same reference as instance.user', () => {
      const user = contextHooks.useUser();
      expect(user).toBe(mockInstance.user);
    });
  });

  describe('useTenant', () => {
    it('should return tenant data from instance', () => {
      const tenant = contextHooks.useTenant();
      
      expect(tenant).toEqual(mockInstance.tenant);
      expect(tenant.name).toBe('Test Tenant');
      expect(tenant.enabledLocales).toEqual(['en', 'es']);
    });

    it('should return the same reference as instance.tenant', () => {
      const tenant = contextHooks.useTenant();
      expect(tenant).toBe(mockInstance.tenant);
    });
  });

  describe('useBranding', () => {
    it('should return branding data from instance', () => {
      const branding = contextHooks.useBranding();
      
      expect(branding).toEqual(mockInstance.branding);
      expect(branding.themes?.default?.colors?.primary).toBe('#007bff');
    });

    it('should return the same reference as instance.branding', () => {
      const branding = contextHooks.useBranding();
      expect(branding).toBe(mockInstance.branding);
    });
  });

  describe('useClient', () => {
    it('should return client data from instance', () => {
      const client = contextHooks.useClient();
      
      expect(client).toEqual(mockInstance.client);
      expect(client.id).toBe('client123');
      expect(client.name).toBe('Test App');
    });

    it('should return the same reference as instance.client', () => {
      const client = contextHooks.useClient();
      expect(client).toBe(mockInstance.client);
    });
  });

  describe('useOrganization', () => {
    it('should return organization data from instance', () => {
      const organization = contextHooks.useOrganization();
      
      expect(organization).toEqual(mockInstance.organization);
      expect(organization.id).toBe('org123');
      expect(organization.displayName).toBe('Test Organization');
    });

    it('should return the same reference as instance.organization', () => {
      const organization = contextHooks.useOrganization();
      expect(organization).toBe(mockInstance.organization);
    });
  });

  describe('usePrompt', () => {
    it('should return prompt data from instance', () => {
      const prompt = contextHooks.usePrompt();
      
      expect(prompt).toEqual(mockInstance.prompt);
      expect(prompt.name).toBe('login');
    });

    it('should return the same reference as instance.prompt', () => {
      const prompt = contextHooks.usePrompt();
      expect(prompt).toBe(mockInstance.prompt);
    });
  });

  describe('useUntrustedData', () => {
    it('should return untrusted data from instance', () => {
      const untrustedData = contextHooks.useUntrustedData();
      
      expect(untrustedData).toEqual(mockInstance.untrustedData);
      expect(untrustedData.authorizationParams?.login_hint).toBe('test@example.com');
    });

    it('should return the same reference as instance.untrustedData', () => {
      const untrustedData = contextHooks.useUntrustedData();
      expect(untrustedData).toBe(mockInstance.untrustedData);
    });
  });

  describe('useScreen', () => {
    it('should return screen data from instance', () => {
      const screen = contextHooks.useScreen();
      
      expect(screen).toEqual(mockInstance.screen);
      expect(screen.name).toBe('login');
      expect(screen.texts?.title).toBe('Welcome back');
    });

    it('should return the same reference as instance.screen', () => {
      const screen = contextHooks.useScreen();
      expect(screen).toBe(mockInstance.screen);
    });
  });

  describe('useTransaction', () => {
    it('should return transaction data from instance', () => {
      const transaction = contextHooks.useTransaction();
      
      expect(transaction).toEqual(mockInstance.transaction);
      expect(transaction.state).toBe('active');
      expect(transaction.locale).toBe('en');
    });

    it('should return the same reference as instance.transaction', () => {
      const transaction = contextHooks.useTransaction();
      expect(transaction).toBe(mockInstance.transaction);
    });
  });

  describe('all hooks integration', () => {
    it('should provide consistent access to all context data', () => {
      const allData = {
        user: contextHooks.useUser(),
        tenant: contextHooks.useTenant(),
        branding: contextHooks.useBranding(),
        client: contextHooks.useClient(),
        organization: contextHooks.useOrganization(),
        prompt: contextHooks.usePrompt(),
        untrustedData: contextHooks.useUntrustedData(),
        screen: contextHooks.useScreen(),
        transaction: contextHooks.useTransaction(),
      };

      // All hooks should return references to the original instance data
      expect(allData.user).toBe(mockInstance.user);
      expect(allData.tenant).toBe(mockInstance.tenant);
      expect(allData.branding).toBe(mockInstance.branding);
      expect(allData.client).toBe(mockInstance.client);
      expect(allData.organization).toBe(mockInstance.organization);
      expect(allData.prompt).toBe(mockInstance.prompt);
      expect(allData.untrustedData).toBe(mockInstance.untrustedData);
      expect(allData.screen).toBe(mockInstance.screen);
      expect(allData.transaction).toBe(mockInstance.transaction);
    });

    it('should reflect changes in the original instance', () => {
      // Get initial user
      const initialUser = contextHooks.useUser();
      expect(initialUser.email).toBe('test@example.com');

      // Modify the instance
      mockInstance.user.email = 'updated@example.com';

      // The hook should return the updated data
      const updatedUser = contextHooks.useUser();
      expect(updatedUser.email).toBe('updated@example.com');
      expect(updatedUser).toBe(mockInstance.user); // Same reference
    });
  });

  describe('type safety', () => {
    it('should maintain type safety for all hook methods', () => {
      // This test ensures TypeScript types are preserved and accessible
      const user = contextHooks.useUser();
      const tenant = contextHooks.useTenant();
      const branding = contextHooks.useBranding();
      const client = contextHooks.useClient();
      const organization = contextHooks.useOrganization();
      const prompt = contextHooks.usePrompt();
      const untrustedData = contextHooks.useUntrustedData();
      const screen = contextHooks.useScreen();
      const transaction = contextHooks.useTransaction();

      // Test that properties are accessible (would fail at compile time if types are wrong)
      expect(user.id).toBeDefined();
      expect(tenant.name).toBeDefined();
      expect(branding.themes).toBeDefined();
      expect(client.id).toBeDefined();
      expect(organization.id).toBeDefined();
      expect(prompt.name).toBeDefined();
      expect(untrustedData.authorizationParams).toBeDefined();
      expect(screen.name).toBeDefined();
      expect(transaction.state).toBeDefined();
    });
  });
});