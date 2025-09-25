import { registerScreen, getScreen, clearScreen } from '../../src/state/instance-store';
import { getCurrentScreenOptions, type CurrentScreenOptions } from '@auth0/auth0-acul-js';

// Mock the auth0-acul-js module
jest.mock('@auth0/auth0-acul-js', () => {
  return {
    getCurrentScreenOptions: jest.fn()
  };
}, { virtual: true });

const mockGetCurrentScreenOptions = getCurrentScreenOptions as jest.MockedFunction<typeof getCurrentScreenOptions>;

// Helper function to create mock screen options
const createMockScreenOptions = (screenName: string | null): CurrentScreenOptions => ({
  client: { id: 'test-client', metadata: null },
  organization: null,
  prompt: { name: 'login' },
  screen: screenName ? { name: screenName } : null,
  tenant: { enabledLocales: ['en'] },
  transaction: { state: 'active', locale: 'en', errors: null },
  untrustedData: { authorizationParams: null },
});

describe('instance-store', () => {
  beforeEach(() => {
    clearScreen();
    jest.clearAllMocks();
  });

  describe('registerScreen', () => {
    it('should register and instantiate screen when identifier matches', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('test-screen'));

      class TestScreen {
        static screenIdentifier = 'test-screen';
        public value = 'test-instance';
      }

      const instance = registerScreen(TestScreen);

      expect(instance).toBeInstanceOf(TestScreen);
      expect(instance?.value).toBe('test-instance');
      expect(mockGetCurrentScreenOptions).toHaveBeenCalledTimes(1);
    });

    it('should return null when screen identifier does not match', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('different-screen'));

      class TestScreen {
        static screenIdentifier = 'test-screen';
      }

      const instance = registerScreen(TestScreen);

      expect(instance).toBeNull();
      expect(mockGetCurrentScreenOptions).toHaveBeenCalledTimes(1);
    });

    it('should return existing instance on subsequent calls', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('test-screen'));

      class TestScreen {
        static screenIdentifier = 'test-screen';
        public instanceId = Math.random();
      }

      const instance1 = registerScreen(TestScreen);
      const instance2 = registerScreen(TestScreen);

      expect(instance1).toBe(instance2);
      expect(instance1?.instanceId).toBe(instance2?.instanceId);
    });

    it('should handle screen options without screen property', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions(null));

      class TestScreen {
        static screenIdentifier = 'test-screen';
      }

      const instance = registerScreen(TestScreen);

      expect(instance).toBeNull();
    });

    it('should work with different screen types', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('login-screen'));

      interface LoginData {
        email: string;
        password: string;
      }

      class LoginScreen {
        static screenIdentifier = 'login-screen';
        public data: LoginData = { email: '', password: '' };
        
        setEmail(email: string) {
          this.data.email = email;
        }
      }

      const instance = registerScreen(LoginScreen);

      expect(instance).toBeInstanceOf(LoginScreen);
      expect(instance?.data).toEqual({ email: '', password: '' });
      
      instance?.setEmail('test@example.com');
      expect(instance?.data.email).toBe('test@example.com');
    });
  });

  describe('getScreen', () => {
    it('should return the current screen instance', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('active-screen'));

      class ActiveScreen {
        static screenIdentifier = 'active-screen';
        public status = 'active';
      }

      const registered = registerScreen(ActiveScreen);
      const retrieved = getScreen<ActiveScreen>();

      expect(retrieved).toBe(registered);
      expect(retrieved.status).toBe('active');
    });

    it('should throw error when no instance is initialized', () => {
      expect(() => {
        getScreen();
      }).toThrow('No active screen instance has been initialized');
    });

    it('should throw error after clearing screen', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('test-screen'));

      class TestScreen {
        static screenIdentifier = 'test-screen';
      }

      registerScreen(TestScreen);
      clearScreen();

      expect(() => {
        getScreen();
      }).toThrow('No active screen instance has been initialized');
    });

    it('should work with typed generics', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('typed-screen'));

      interface ScreenInterface {
        getId(): string;
        getName(): string;
      }

      class TypedScreen implements ScreenInterface {
        static screenIdentifier = 'typed-screen';
        private id = 'screen-123';
        private name = 'Typed Screen';

        getId(): string {
          return this.id;
        }

        getName(): string {
          return this.name;
        }
      }

      registerScreen(TypedScreen);
      const screen = getScreen<ScreenInterface>();

      expect(screen.getId()).toBe('screen-123');
      expect(screen.getName()).toBe('Typed Screen');
    });
  });

  describe('clearScreen', () => {
    it('should clear the current instance', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('clear-test'));

      class ClearTestScreen {
        static screenIdentifier = 'clear-test';
      }

      registerScreen(ClearTestScreen);
      
      // Verify instance exists
      expect(() => getScreen()).not.toThrow();

      clearScreen();

      // Verify instance is cleared
      expect(() => getScreen()).toThrow('No active screen instance has been initialized');
    });

    it('should allow registering new screen after clearing', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('reuse-screen'));

      class ReuseScreen {
        static screenIdentifier = 'reuse-screen';
        public value: string;

        constructor() {
          this.value = Math.random().toString();
        }
      }

      const instance1 = registerScreen(ReuseScreen);
      const value1 = instance1?.value;

      clearScreen();

      const instance2 = registerScreen(ReuseScreen);
      const value2 = instance2?.value;

      expect(value1).not.toBe(value2);
      expect(instance1).not.toBe(instance2);
    });

    it('should be safe to call multiple times', () => {
      clearScreen();
      clearScreen();
      clearScreen();

      expect(() => getScreen()).toThrow('No active screen instance has been initialized');
    });

    it('should not affect getCurrentScreenOptions calls', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('options-test'));

      clearScreen();

      class OptionsTestScreen {
        static screenIdentifier = 'options-test';
      }

      const instance = registerScreen(OptionsTestScreen);

      expect(instance).toBeInstanceOf(OptionsTestScreen);
      expect(mockGetCurrentScreenOptions).toHaveBeenCalled();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle constructor that throws error', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('error-screen'));

      class ErrorScreen {
        static screenIdentifier = 'error-screen';
        
        constructor() {
          throw new Error('Constructor error');
        }
      }

      expect(() => {
        registerScreen(ErrorScreen);
      }).toThrow('Constructor error');
    });

    it('should handle screen identifier comparison edge cases', () => {
      // Clear any existing instance first
      clearScreen();
      
      // Test with null screen name - should return null for any identifier
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions(null));

      class EmptyIdentifierScreen {
        static screenIdentifier = '';
      }

      const instance1 = registerScreen(EmptyIdentifierScreen);
      expect(instance1).toBeNull();

      // Clear for next test
      clearScreen();
      
      // Test with special characters  
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('special-chars-@#$%'));

      class SpecialCharScreen {
        static screenIdentifier = 'special-chars-@#$%';
      }

      const instance2 = registerScreen(SpecialCharScreen);
      expect(instance2).toBeInstanceOf(SpecialCharScreen);
    });

    it('should maintain instance isolation between different screen types', () => {
      clearScreen();
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('isolation-test'));

      class IsolationScreen {
        static screenIdentifier = 'isolation-test';
        public type = 'isolation';
      }

      const instance = registerScreen(IsolationScreen);
      expect(instance).toBeInstanceOf(IsolationScreen);
      
      clearScreen();

      // Switch to different screen - note the constructor still expects 'different-screen' to match
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('different-screen'));

      class DifferentScreen {
        static screenIdentifier = 'different-screen';
        public type = 'different';
      }

      const differentInstance = registerScreen(DifferentScreen);

      expect(differentInstance).toBeInstanceOf(DifferentScreen); // Screen name should match now
      expect(() => getScreen()).not.toThrow(); // Instance should be active
    });

    it('should work with complex screen constructors', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('complex-screen'));

      class ComplexScreen {
        static screenIdentifier = 'complex-screen';
        public initTime: number;
        public config: object;
        public handlers: Map<string, Function>;

        constructor() {
          this.initTime = Date.now();
          this.config = { theme: 'dark', locale: 'en' };
          this.handlers = new Map();
          this.setupHandlers();
        }

        private setupHandlers() {
          this.handlers.set('click', () => 'clicked');
          this.handlers.set('focus', () => 'focused');
        }

        getHandler(name: string) {
          return this.handlers.get(name);
        }
      }

      const instance = registerScreen(ComplexScreen);

      expect(instance).toBeInstanceOf(ComplexScreen);
      expect(instance?.initTime).toBeLessThanOrEqual(Date.now());
      expect(instance?.config).toEqual({ theme: 'dark', locale: 'en' });
      expect(instance?.handlers.size).toBe(2);
      
      const clickHandler = instance?.getHandler('click');
      expect(clickHandler?.()).toBe('clicked');
    });
  });

  describe('type safety and generics', () => {
    it('should maintain type safety with generics', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('generic-screen'));

      interface GenericInterface<T> {
        getValue(): T;
        setValue(value: T): void;
      }

      class GenericScreen<T> implements GenericInterface<T> {
        static screenIdentifier = 'generic-screen';
        private value!: T;

        getValue(): T {
          return this.value;
        }

        setValue(value: T): void {
          this.value = value;
        }
      }

      // TypeScript should infer types correctly
      const instance = registerScreen(GenericScreen);
      expect(instance).toBeInstanceOf(GenericScreen);
    });

    it('should work with inheritance', () => {
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('child-screen'));

      class BaseScreen {
        public baseProperty = 'base';
        
        baseMethod() {
          return 'base method';
        }
      }

      class ChildScreen extends BaseScreen {
        static screenIdentifier = 'child-screen';
        public childProperty = 'child';
        
        childMethod() {
          return 'child method';
        }
      }

      const instance = registerScreen(ChildScreen);

      expect(instance).toBeInstanceOf(ChildScreen);
      expect(instance).toBeInstanceOf(BaseScreen);
      expect(instance?.baseProperty).toBe('base');
      expect(instance?.childProperty).toBe('child');
      expect(instance?.baseMethod()).toBe('base method');
      expect(instance?.childMethod()).toBe('child method');
    });
  });

  describe('branch coverage for complete coverage', () => {
    it('should test all conditional branches', () => {
      // Test screen?.name comparison branches
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('match-test'));

      class MatchScreen {
        static screenIdentifier = 'match-test';
        public matched = true;
      }

      // First registration - should match and create instance
      const instance1 = registerScreen(MatchScreen);
      expect(instance1).toBeInstanceOf(MatchScreen);
      expect(instance1?.matched).toBe(true);

      // Second registration - should return existing instance
      const instance2 = registerScreen(MatchScreen);
      expect(instance2).toBe(instance1);

      // Test with non-matching screen
      class NonMatchScreen {
        static screenIdentifier = 'no-match';
      }

      const instance3 = registerScreen(NonMatchScreen);
      expect(instance3).toBeNull();
    });

    it('should test instance null check branches', () => {
      // Test when instance is null (first time)
      mockGetCurrentScreenOptions.mockReturnValue(createMockScreenOptions('null-test'));

      class NullTestScreen {
        static screenIdentifier = 'null-test';
        public created = Date.now();
      }

      const instance = registerScreen(NullTestScreen);
      expect(instance).toBeInstanceOf(NullTestScreen);

      // Test getScreen when instance exists
      const retrieved = getScreen<NullTestScreen>();
      expect(retrieved).toBe(instance);

      // Test clearScreen
      clearScreen();

      // Test getScreen when instance is null
      expect(() => getScreen()).toThrow('No active screen instance has been initialized');
    });

    it('should cover all code paths in getCurrentScreenOptions response', () => {
      // Test with various screen configurations
      const testCases = [
        { screen: null },
        { screen: { name: 'test' } },
      ];

      testCases.forEach((mockOptions, index) => {
        clearScreen();
        
        const fullOptions: CurrentScreenOptions = {
          client: { id: 'test-client', metadata: null },
          organization: null,
          prompt: { name: 'login' },
          screen: mockOptions.screen,
          tenant: { enabledLocales: ['en'] },
          transaction: { state: 'active', locale: 'en', errors: null },
          untrustedData: { authorizationParams: null },
        };

        mockGetCurrentScreenOptions.mockReturnValue(fullOptions);

        class TestScreen {
          static screenIdentifier = 'test';
          public index = index;
        }

        const instance = registerScreen(TestScreen);
        
        if (mockOptions.screen?.name === 'test') {
          expect(instance).toBeInstanceOf(TestScreen);
          expect(instance?.index).toBe(index);
        } else {
          expect(instance).toBeNull();
        }
      });
    });
  });
});