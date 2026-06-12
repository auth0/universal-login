
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