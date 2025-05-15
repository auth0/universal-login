import { ScreenIds } from '../../../../src/constants';
import { BaseContext } from '../../../../src/models/base-context';
import EmailVerificationResult from '../../../../src/screens/email-verification-result';
import { ScreenOverride } from '../../../../src/screens/email-verification-result/screen-override';

import type { BrandingContext } from '../../../../interfaces/models/branding';
import type { ClientContext } from '../../../../interfaces/models/client';
import type { OrganizationContext } from '../../../../interfaces/models/organization';
import type { PromptContext } from '../../../../interfaces/models/prompt';
import type { ScreenContext } from '../../../../interfaces/models/screen';
import type { TenantContext } from '../../../../interfaces/models/tenant';
import type { TransactionContext } from '../../../../interfaces/models/transaction';
import type { UserContext } from '../../../../interfaces/models/user';

// Mock the ScreenOverride to isolate testing of EmailVerificationResult class logic
jest.mock('../../../../src/screens/email-verification-result/screen-override');

describe('EmailVerificationResult Screen', () => {
  let mockScreenContext: ScreenContext;
  let mockClientContext: ClientContext;
  let mockTransactionContext: TransactionContext;
  let mockPromptContext: PromptContext;
  let mockOrganizationContext: OrganizationContext | undefined;
  let mockTenantContext: TenantContext;
  let mockUserContext: UserContext;
  let mockBrandingContext: BrandingContext;

  const setupGlobalContext = (screenName: string, status: string, loginLink: string, orgContext?: OrganizationContext): void => {
    mockClientContext = { id: 'client123', name: 'Test App' };
    mockTransactionContext = { state: 'stateXYZ', locale: 'en' };
    mockPromptContext = { name: 'login' }; // Or whatever prompt leads to this
    mockTenantContext = { name: 'test-tenant' };
    mockUserContext = { id: 'user-abc' };
    mockBrandingContext = {};
    mockOrganizationContext = orgContext;

    mockScreenContext = {
      name: screenName,
      data: { status },
      links: { login: loginLink },
    };

    // Set up the global universal_login_context
    global.window = Object.create(window);
    Object.defineProperty(window, 'universal_login_context', {
      value: {
        client: mockClientContext,
        transaction: mockTransactionContext,
        prompt: mockPromptContext,
        screen: mockScreenContext,
        organization: mockOrganizationContext,
        tenant: mockTenantContext,
        user: mockUserContext,
        branding: mockBrandingContext,
        untrusted_data: {},
      },
      writable: true,
    });
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Reset the static context cache in BaseContext
    (BaseContext as any).context = null;
  });

  it('should correctly set the static screenIdentifier', () => {
    expect(EmailVerificationResult.screenIdentifier).toBe(ScreenIds.EMAIL_VERIFICATION_RESULT);
  });

  it('should instantiate correctly and set up screen property with ScreenOverride', () => {
    setupGlobalContext(ScreenIds.EMAIL_VERIFICATION_RESULT, 'success', '/login');
    const emailVerificationResultScreen = new EmailVerificationResult();

    expect(emailVerificationResultScreen).toBeInstanceOf(EmailVerificationResult);
    expect(emailVerificationResultScreen).toBeInstanceOf(BaseContext);
    expect(ScreenOverride).toHaveBeenCalledWith(mockScreenContext);
    expect(emailVerificationResultScreen.screen).toBeInstanceOf(ScreenOverride);
  });

  it('should throw an error if the screen name in context does not match screenIdentifier', () => {
    setupGlobalContext('some-other-screen', 'failure', '/login-error');
    expect(() => new EmailVerificationResult()).toThrow(
      `Incorrect import: The current screen name does not match the imported screen class. Imported Screen: ${ScreenIds.EMAIL_VERIFICATION_RESULT}, Current Screen: some-other-screen`,
    );
  });

  it('should correctly parse and expose client, transaction, prompt, and screen data via BaseContext and ScreenOverride', () => {
    const status = 'already_verified';
    const loginLink = '/custom-login';
    setupGlobalContext(ScreenIds.EMAIL_VERIFICATION_RESULT, status, loginLink);

    // Mock the behavior of ScreenOverride instance
    const mockScreenOverrideInstance = {
      name: ScreenIds.EMAIL_VERIFICATION_RESULT,
      data: { status },
      loginLink: loginLink,
      // other ScreenMembers properties if needed for assertion
    };
    (ScreenOverride as unknown as jest.Mock).mockImplementation(() => mockScreenOverrideInstance);

    const screenInstance = new EmailVerificationResult();

    // Check data parsed by BaseContext
    expect(screenInstance.client.id).toBe(mockClientContext.id);
    expect(screenInstance.transaction.state).toBe(mockTransactionContext.state);
    expect(screenInstance.prompt.name).toBe(mockPromptContext.name);

    // Check data parsed by ScreenOverride (via the mocked instance)
    expect(screenInstance.screen.name).toBe(ScreenIds.EMAIL_VERIFICATION_RESULT);
    expect(screenInstance.screen.data?.status).toBe(status);
    expect(screenInstance.screen.loginLink).toBe(loginLink);
  });

  it('should correctly parse organization when present in context', () => {
    const orgContext = { id: 'org_123', name: 'Test Org', usage: 'allow' };
    setupGlobalContext(ScreenIds.EMAIL_VERIFICATION_RESULT, 'success', '/login', orgContext);
    const screenInstance = new EmailVerificationResult();
    expect(screenInstance.organization?.id).toBe(orgContext.id);
    expect(screenInstance.organization?.name).toBe(orgContext.name);
  });

  // Since there are no operations, no tests for operations are needed.
});