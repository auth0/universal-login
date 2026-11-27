
## login
This methods handles login-password related configuration & required password & username submitted on previous screen. 
It optionally also accepts captcha values if configured in the flow.

```typescript
import  LoginPassword  from "@auth0/auth0-acul-js/login-password"

const loginPasswordManager = new LoginPassword();

loginPasswordManager.login({
 username: "testUser",
 password: "******"
});

```


## switchToOtp

The `showSwitchToOtpButton` screen data flag controls whether this option is available. Only render the button when the server enables it.

```typescript
import LoginPassword from "@auth0/auth0-acul-js/login-password";

const loginPasswordManager = new LoginPassword();

// Only call when screen.data.showSwitchToOtpButton is true
if (loginPasswordManager.screen.data?.showSwitchToOtpButton) {
  loginPasswordManager.switchToOtp();
}

```

## passkeyLogin

The passkey challenge is only present when the server offers passkeys on this screen (for example, when the user arrives with `login_hint` and skips the identifier screen). Only render a passkey button when `screen.publicKey` is set.

`transaction.alwaysShowPasskeyButton` follows the connection's passkey challenge UI setting. When it is `false`, the connection prefers autofill, so show the button only if the browser doesn't support Conditional UI.

```typescript
import LoginPassword from "@auth0/auth0-acul-js/login-password";

const loginPasswordManager = new LoginPassword();
const { screen, transaction } = loginPasswordManager;

const isConditionalUIAvailable =
  (await window.PublicKeyCredential?.isConditionalMediationAvailable?.()) ?? false;
const showPasskeyButton =
  Boolean(screen.publicKey) && (transaction.alwaysShowPasskeyButton || !isConditionalUIAvailable);

if (showPasskeyButton) {
  // Call from the click handler of a "Continue with a passkey" button
  loginPasswordManager.passkeyLogin();
}

```

## registerPasskeyAutofill

Shows stored passkeys in the password field's autocomplete dropdown (Conditional UI). The password input needs `autocomplete="current-password webauthn"`; passing its `id` makes the SDK set it for you.

```typescript
import LoginPassword from "@auth0/auth0-acul-js/login-password";

const loginPasswordManager = new LoginPassword();

// <input id="password" type="password" autocomplete="current-password webauthn" />
if (loginPasswordManager.screen.publicKey && loginPasswordManager.transaction.showPasskeyAutofill) {
  await loginPasswordManager.registerPasskeyAutofill('password');
}

```

## Organization invitations

While a user is accepting an organization invitation, `screen.data.inviter` holds the inviter's display name. It is `undefined` otherwise. `inviter` is free text, so render it as text (JSX interpolation or `textContent`) and never via `innerHTML`.

```typescript
import LoginPassword from "@auth0/auth0-acul-js/login-password";

const { screen, organization } = new LoginPassword();

// e.g. "Log in to accept John Smith's invitation to join Acme"
const invitationText = screen.data?.inviter
  ? `Log in to accept ${screen.data.inviter}'s invitation to join ${organization.displayName ?? organization.name}`
  : null;

```
