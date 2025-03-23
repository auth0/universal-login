
## Overview

The Login screen is the initial screen in the authentication journey that users encounter when logging into your application. It serves as the entry point for various authentication methods including:
- Username/password authentication
- Social connections
- Enterprise connections

As the first touchpoint in your authentication flow, this screen is critical for creating a positive user experience and setting the tone for your brand identity.

<img width="1728" alt="image" src="https://github.com/user-attachments/assets/6a009ebb-71cc-410c-85a2-660b14848561" />

<img width="550" height="880" alt="image" src="https://github.com/user-attachments/assets/dadfc369-8b41-448e-b187-99d2bb4e9dd9" />

## Prerequisites

⚠️ **Warning**: You need to have a Custom Domain configured for your tenant to see the Advanced customized version of the login screen.

### Authentication Configuration

For the Login screen to function properly, your Auth0 tenant should have the appropriate authentication profile configured:

1. Navigate to **Authentication** → **Authentication Profile**
2. Select **Identifier + Password** and click Save

This will enable the username/password flow within your tenant.

## Usage

### Setting Up Advanced Mode

To configure the Login screen in Advanced mode, run:

```bash
npm run screen:advanced login
```

This command will:
1. Build the necessary assets
2. Configure your Auth0 tenant to use the advanced customized Login screen
3. Start a development server with hot module replacement

### Switching Back to Standard Mode

To revert to the standard Universal Login experience:

```bash
npm run screen:standard login
```

## Using Auth0 CLI Directly

You can also use the Auth0 CLI directly to switch between standard and advanced modes:

### Standard Mode

```bash
auth0 universal-login switch --prompt login --screen login --rendering-mode standard
```

### Advanced Mode

```bash
auth0 ul customize --rendering-mode advanced --prompt login --screen login --settings-file settings.json
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
    "tenant.enabled_locales"
  ],
  "head_tags": [
    {
      "tag": "base",
      "attributes": {
        "href": "http://127.0.0.1:3032/"
      }
    },
    {
      "tag": "link",
      "attributes": {
        "rel": "stylesheet",
        "href": "assets/styles.css"
      }
    },
    {
      "tag": "script",
      "attributes": {
        "src": "assets/main.js",
        "type": "module"
      }
    }
  ]
}
```

## Learn More

- [Auth0 Identifier-First Documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first)
- [ACUL Login API Reference](https://auth0.github.io/universal-login/classes/Classes.Login.html)
