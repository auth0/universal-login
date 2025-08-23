
## login
This methods handles username related configuration for login-flow, it optionally also accepts captcha values if configured in the flow

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id"

const loginIdManager = new LoginId();

loginIdManager.login({
 username: "testUser"
})

```

## error handling
This methods handles username related configuration for login-flow, it optionally also accepts captcha values if configured in the flow

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id"

const loginIdManager = new LoginId();
const errors = loginIdManager.getErrors();

loginIdManager.login({
 username: "testUser"
})

return (
    <div>
      {/* Render the login ID screen content */}
      <button onclick={handleLogin}>Continue<button>
      {loginIdManager.transaction.hasErrors && errors && (
        // A custom React component that renders a <div> with error details
        <ErrorMessages errors={errors} />
      )}
)

```


## federatedLogin
If there is an associated social connection, below snippet can help login with selected social connection

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

// Check if alternateConnections is available and has at least one item
if (!loginIdManager.transaction.getAlternateConnections()) {
  console.error('No alternate connections available.');
}

// Select the first available connection (users can select any available connection)
const selectedConnection = alternateConnections[0];

// Log the chosen connection for debugging or informational purposes
console.log(`Selected connection: ${selectedConnection.name}`);

// Proceed with federated login using the selected connection
loginIdManager.federatedLogin({
  connection: selectedConnection.name,
})

```

## passkeyLogin
If there is an associated passkey, this method will automatically prompt users to select the passkey from native window dialog.
```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

// it internally maps users available passkey config provided from auth0 server
loginIdManager.passkeyLogin();
```


## pickCountryCode

```typescript
import  LoginId  from "@auth0/auth0-acul-js/login-id";
const loginIdManager = new LoginId();

loginIdManager.pickCountryCode();
```

