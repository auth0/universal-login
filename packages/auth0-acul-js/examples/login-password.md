
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