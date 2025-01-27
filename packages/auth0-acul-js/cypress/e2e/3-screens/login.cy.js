describe('[login]: E2E tests on login screen', () => {
  const DOMAIN = Cypress.env('AUTH0_DOMAIN');
  const CLIENT_ID = Cypress.env('AUTH0_CLIENT_ID');
  const SCREEN_URL = `${DOMAIN}/authorize?client_id=${CLIENT_ID}&scope=openid profile&response_type=id_token&state=123&nonce=678&redirect_uri=http://localhost:3000`;
  beforeEach(() => {
    cy.visit(SCREEN_URL);
  });

  describe('[prerequisites]: Test the initial prompt/configurations.', () => {
    it('should load the login page on the custom domain', () => {
      cy.url().should('include', 'acmetest.org');
    });

    it('should load the login page on the custom domain and verify "universal_login_context"', () => {
      cy.window().then((win) => {
        const context = win.universal_login_context;
        expect(context).to.exist;
      });
    });
  });

  describe('[login]: Test the login flow.', () => {
    it('should fill the login form and submit', () => {
      cy.get('input[id="username"]').type('');
      cy.get('input[id="password"]').type('');
      cy.get('button[id="continue"]').click();
    });
  });
});
