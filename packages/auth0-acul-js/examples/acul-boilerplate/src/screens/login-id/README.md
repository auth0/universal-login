# Login ID Screen

## Overview

The Login ID screen is part of the identifier-first authentication approach that separates the login process into two distinct steps:

1. First, the user enters their identifier (email or username or phone) - **login-id screen**
2. Then, based on the identifier, the appropriate authentication method is presented

This approach provides several benefits:
- Better user experience by simplifying the initial login step
- Enables adaptive authentication based on user identity
- Supports various authentication methods (password, passwordless, social, etc.)
- Reduces cognitive load by presenting only relevant information at each step

<img width="1728" alt="Screenshot 2025-03-20 at 3 12 30 PM" src="https://github.com/user-attachments/assets/f018f1fb-5097-42e6-85af-699ba4607548" />

## Prerequisites

⚠️ **Warning**: You need to have a Custom Domain configured for your tenant to see the Advanced customized version of the login screen.

### Authentication Configuration

For the identifier-first flow to work properly:

1. Navigate to **Authentication** → **Authentication Profile**
2. Select **Identifier First** and click Save

This will configure your tenant to use the two-step authentication process.

<img width="550" height="880" alt="image" src="https://github.com/user-attachments/assets/4801beb2-f857-4512-8ac1-c5eb8b100519" />

## Login ID Screen Features

1. Simplified first step focused only on user identification
2. Support for email and username identifiers
3. Integration with social login providers
4. Adaptive experience based on the user's identity
5. Passkey configuration.

## Usage

### Setting Up Advanced Mode

To configure the Login ID screen in Advanced mode, run:

```bash
npm run screen:advanced login-id
```

This command will:
1. Build the necessary assets
2. Configure your Auth0 tenant to use the advanced customized Login ID screen
3. Start a development server with hot module replacement

### Switching Back to Standard Mode

To revert to the standard Universal Login experience:

```bash
npm run screen:standard login-id
```

## Using Auth0 CLI Directly

You can also use the Auth0 CLI directly to switch between standard and advanced modes:

### Standard Mode

```bash
auth0 universal-login switch --prompt login-id --screen login-id --rendering-mode standard
```

### Advanced Mode

```bash
auth0 ul customize --rendering-mode advanced --prompt login-id --screen login-id --settings-file settings.json
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
        "src": "http://127.0.0.1:3032/assets/login-id/index.hash.js",
        "type": "module"
      }
    }
  ]
}
```

## Learn More

- [Auth0 Identifier-First Documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first)
- [ACUL Login ID API Reference](https://auth0.github.io/universal-login/classes/Classes.Login.html)
