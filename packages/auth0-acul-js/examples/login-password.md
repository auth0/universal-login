
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

```typescript
import LoginPassword from "@auth0/auth0-acul-js/login-password";

const loginPasswordManager = new LoginPassword();

if (loginPasswordManager.screen.publicKey) {
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
