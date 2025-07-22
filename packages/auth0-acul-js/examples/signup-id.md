
## signup
This methods handles signup-id related configuration.
It allows to signup new users via different identifiers

```typescript
    import SignupId from "@auth0/auth0-acul-js/signup-id";
    const signupIdManager = new SignupId();

    //get mandatory & optional identifiers required for signup
    const { transaction } = signupIdManager;
    const mandatoryIdentifier = transaction.getRequiredIdentifiers(); // eg: email
    const optionalIdentifiers = transaction.getOptionalIdentifiers() // eg: phone

    /* Based on mandatory & optional identifiers users can render corresponding field on signup-id screen */

    const signupParams = {
        email : "testEmail",
        phone : "+91923456789"
    }

    signupIdManager.signup(signupParams);
    
```

## socialSignup

```typescript
    import SignupId from "@auth0/auth0-acul-js/signup-id";
    
    const signupIdManager = new SignupId();
    const { transaction } = signupIdManager;
    
    //get social connections
    const socialConnection = transaction.getAlternateConnections(); //eg: "google-oauth2"
    const signupParams = {
     connection : socialConnection[0].name, // "google-oauth2"
    };
    
    signupIdManager.socialSignup(signupParams);
   
```