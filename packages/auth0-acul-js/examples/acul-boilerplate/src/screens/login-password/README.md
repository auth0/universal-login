# Login Password Screen

## Overview

The Login Password screen is the second step in a two-step authentication flow. It is displayed after a user has entered their identifier (email, username, or phone) on the login-id screen. This screen allows users to enter their password to complete the login process, displaying the user's identifier from the previous step 
with an option to edit it.

<img width="1728" alt="Screenshot 2025-04-29 at 9 26 33 PM" src="https://github.com/user-attachments/assets/17fd951d-1c46-40ec-a2c3-e217526003f8" /> 

## Prerequisites

⚠️ **Warning**: You need to have a Custom Domain configured for your tenant to see the Advanced customized version of the login screen.

### Authentication Configuration

For the Login Password screen to function properly, your Auth0 tenant should have the appropriate authentication profile configured:

1. Navigate to **Authentication** → **Authentication Profile**
2. Select **Identifier First** and click Save

This will configure your tenant to use the two-step authentication process where users first enter their identifier and then their password.

## Login Password Screen Features

1. Display of user's identifier from previous step with option to edit
2. Secure password entry with visibility toggle
3. Captcha support when required by Auth0 rules
4. Forgot password link for password recovery
5. Optional signup link for new account creation
6. Personalized title that can include the username

## Implementation Details

### Core Components

- **Main Screen Component**: `src/screens/login-password/index.tsx`
- **Form Component**: `src/screens/login-password/components/LoginPasswordForm.tsx`
- **Custom Hooks**:
  - `useLoginPasswordManager`: Initializes the ACUL SDK and manages screen state
  - `useLoginPasswordForm`: Manages form input references and values

### Common Components Used

This screen leverages several reusable components from the common directory:

- **Layout**: Uses `AuthScreenTemplate` for consistent screen layout and structure
- **UI Elements**:
  - `Input`: For username display and password field
  - `Button`: For the form submit button
  - `ErrorMessages`: To display validation and authentication errors
  - `Logo`: For consistent branding at the top of the screen
  - `SignupLink`: For displaying the signup option at the bottom of the form
  - `Captcha`: For displaying captcha challenges when required
- **Theming**: Uses `ThemeProvider` for consistent styling based on Auth0 tenant settings

### ACUL SDK Integration

This screen uses the `LoginPasswordInstance` from the `@auth0/auth0-acul-js/login-password` package:

```javascript
import LoginPasswordInstance from '@auth0/auth0-acul-js/login-password';

// Initialize the instance
const loginPasswordInstance = new LoginPasswordInstance();

// Submit the form
loginPasswordInstance.login({
  username: "user@example.com", // Username from previous screen
  password: "userPassword",     // Password from form
  captcha: "captchaValue"       // Optional captcha value
});
```

## Usage

### Setting Up Advanced Mode

To configure the Login Password screen in Advanced mode, run:

```bash
npm run screen:advanced login-password
```

This command will:
1. Build the necessary assets
2. Configure your Auth0 tenant to use the advanced customized Login Password screen
3. Start a development server with hot module replacement

### Switching Back to Standard Mode

To revert to the standard Universal Login experience:

```bash
npm run screen:standard login-password
```

## Using Auth0 CLI Directly

You can also use the Auth0 CLI directly to switch between standard and advanced modes:

### Standard Mode

```bash
auth0 universal-login switch --prompt login-password --screen login-password --rendering-mode standard
```

### Advanced Mode

```bash
auth0 ul customize --rendering-mode advanced --prompt login-password --screen login-password --settings-file settings.json
```

Where `settings.json` contains the payload with your assets. For example:

```json
{
  "rendering_mode": "advanced",
  "context_configuration": [
    "branding.settings",
    "branding.themes.default",
    "client.logo_uri",
    "client.description",
    "organization.display_name",
    "organization.branding",
    "screen.texts",
    "tenant.name",
    "tenant.friendly_name",
    "tenant.enabled_locales",
    "untrusted_data.submitted_form_data",
    "untrusted_data.authorization_params.ui_locales",
    "untrusted_data.authorization_params.login_hint",
    "untrusted_data.authorization_params.screen_hint"
  ],
  "default_head_tags_disabled": false,
  "head_tags": [
    {
      "tag": "base",
      "attributes": {
        "href": "http://127.0.0.1:3032/"
      }
    },
    {
      "tag": "meta",
      "attributes": {
        "name": "viewport",
        "content": "width=device-width, initial-scale=1"
      }
    },
    {
      "tag": "link",
      "attributes": {
        "rel": "stylesheet",
        "href": "http://127.0.0.1:3032/assets/shared/styles.hash.css"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "http://127.0.0.1:3032/assets/shared/vendor.js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "http://127.0.0.1:3032/assets/shared/dependencies.hash.js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "http://127.0.0.1:3032/assets/shared/auth0-acul.hash.js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "http://127.0.0.1:3032/assets/main.yTsNeFmk.js",
        "type": "module"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "http://127.0.0.1:3032/assets/login-password/index.hash.js",
        "type": "module"
      }
    }
  ]
}
```

## Learn More

- [Auth0 Identifier-First Documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first)
- [ACUL Login Password API Reference](https://auth0.github.io/universal-login/classes/Classes.LoginPassword.html)
