
## signup
   This methods handles signup-password related screen configuration.
   It allows to proceed with registering signup password along with signup identifers passed in previous screen

```typescript
    import SignupPassword from "@auth0/auth0-acul-js/signup-password";
    
    const signupPasswordManager = new SignupPassword();
    const { transaction, screen } = signupPasswordManager;
    
    //get mandatory & optional identifiers required for signup-password screen to proceed
    const mandatoryIdentifier = transaction.getRequiredIdentifiers(); //eg: email
    const optionalIdentifiers = transaction.getOptionalIdentifiers() //eg: phone
    
    //get signup data submitted on previous screen from previous screen
    const data = transaction.screen.getScreenData(); //eg: email, phone
    
    
    const signupParams = {
     email : data.email,
     phone : data.phone_number,
     password : "********"
    };
    
    signupPasswordManager.signup(signupParams);
```
