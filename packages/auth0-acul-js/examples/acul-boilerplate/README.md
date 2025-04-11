# Auth0 ACUL Boilerplate

This project provides a boilerplate setup for Auth0's Advanced Custom Universal Login (ACUL). ACUL allows you to build custom login screens using your own design systems and layouts. It includes a minimal React-based screen tester for initiating authentication flows and testing your screens in real-time.

## 📑 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Screens](#screens)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Technical Details](#technical-details)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)

<a id="prerequisites"></a>
## ⚙️ Prerequisites

<details>
<summary>📂 Repository Setup</summary>

- Clone the universal-login repository:
  ```bash
  git clone https://github.com/auth0/universal-login.git
  cd universal-login
  ```
</details>

<details>
<summary>🔧 Node.js Environment</summary>

- Node.js version 20 or above is required
- Check your current version: `node -v`
- We recommend using NVM (Node Version Manager) to manage Node.js versions:
  - Install NVM:
    - For macOS/Linux: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
    - For Windows: Install [nvm-windows](https://github.com/coreybutler/nvm-windows)
  - Install and use Node.js v20:
    ```bash
    nvm install 20
    nvm use 20
    ```
</details>

<details>
<summary>📦 Dependencies Installation</summary>

- Install dependencies:
  ```bash
  npm install
  cd screen-tester && npm install
  cd ..
  ```
</details>

<details>
<summary>🔨 Auth0 CLI Installation</summary>

- This project requires the Auth0 CLI to configure your tenant:
  - For macOS/Linux using Homebrew:
    ```bash
    brew tap auth0/auth0-cli && brew install auth0
    ```
  - For Windows using Scoop:
    ```bash
    scoop bucket add auth0 https://github.com/auth0/scoop-auth0-cli.git
    scoop install auth0
    ```
  - Or download from [Auth0 CLI GitHub repository](https://github.com/auth0/auth0-cli)
- Verify installation with:
  ```bash
  auth0 --version
  ```
- Log in to your Auth0 account:
  ```bash
  auth0 login
  ```
- **Important**: You must be logged in to the Auth0 CLI before running this project
</details>

### Auth0 Setup

1. **Auth0 Tenant**
   - Create or use an existing Auth0 tenant. Remember to work in Development tenants before making changes to Production tenants.
   - You can sign up for a free Auth0 account at [https://auth0.com/signup](https://auth0.com/signup)
   - See [Create Tenants](https://auth0.com/docs/get-started/auth0-overview/create-tenants) in the Auth0 docs if you need help

2. **Custom Domain Setup**
   - Enable and configure a [custom domain](https://auth0.com/docs/customize/custom-domains) for your Auth0 tenant
   - Verify the custom domain is working properly
   - This is required for ACUL functionality in advanced mode

3. **Single Page Application Setup**
   - Create a new [Single Page Application](https://auth0.com/docs/get-started/auth0-overview/create-applications) in Auth0
   - Configure the following settings:
     - Allowed Callback URLs: `http://localhost:4040/callback`
     - Allowed Logout URLs: `http://localhost:4040`
     - Allowed Web Origins: `http://localhost:4040`
   - This application will be used by the Screen Tester for authentication testing

<a id="quick-start"></a>
## 🚀 Quick Start

1. Set up your environment variables in `.env.local`:
   ```env
   # Auth0 Configuration
   AUTH0_CUSTOM_DOMAIN='https://your-custom-domain.com'
   AUTH0_CLIENT_ID='your-client-id'
   AUTH0_AUDIENCE='your-audience'

   # Optional
   AUTH0_ORGANIZATION='optional_org_id'
   ```

2. Start development:
   ```bash
   # Standard mode (single screen) 
   # This uses Universal Login mode to see the screen configured in your tenant
   npm run screen:standard <screen_name>
   npm run screen:standard login  # Examples: login, login-id, login-password

   # Advanced mode with Hot Module Replacement (single screen)
   # This uses ACUL (advanced mode) to see the screen being developed locally
   npm run screen:advanced <screen_name>
   npm run screen:advanced login  # Examples: login, login-id, login-password
   ```

3. Access in browser:
   - Screen Tester: `http://localhost:4040/`
   - After clicking "Log In" in the tester, you will be redirected to your custom login screen

<a id="project-structure"></a>
## 📁 Project Structure

```
acul-boilerplate/
├── dist/                # Production build output
├── screen-tester/       # React SPA for initiating auth flows
├── src/                 # Source files
│   ├── components/      # Reusable UI components (atomic design pattern)
│   │   ├── atoms/       # Basic UI elements (buttons, inputs, icons)
│   │   ├── molecules/   # Groups of atoms (form fields, alerts)
│   │   ├── organisms/   # Complex UI components (forms, navigation)
│   │   └── templates/   # Page layouts
│   ├── screens/         # Login flow screens
│   └── styles/          # Global styles
├── scripts/             # Build and development scripts
│   ├── utils/           # Utility functions and helpers
│   ├── advanced-mode.js # Advanced mode entry point
│   ├── standard-mode.js # Standard mode entry point
│   └── server.js        # Development server
├── settings/            # Auth0 CLI settings
└── .github/             # GitHub Actions workflows for CI/CD
    └── actions/         # Custom GitHub Actions
        └── configure-auth0-screens/ # Action for configuring Auth0 screens
```

<a id="screens"></a>
## 🖥️ Screens

This boilerplate includes implementations for several Universal Login screens:

- **[Login Screen](src/screens/Login/README.md)**
  - Main login screen with username/email and password
  - Customizable with your design system

- **[Login ID Screen](src/screens/login-id/README.md)**
  - Username/email input step in a multi-step login flow
  - Follows modern authentication patterns

- **[Login Password Screen](src/screens/login-password/README.md)**
  - Password entry step in a multi-step login flow
  - Secure password entry with validation

Each screen comes with its own documentation. Check the README.md file in each screen directory for more information.

<a id="development-workflow"></a>
## 🔄 Development Workflow

### Standard Mode Development

Use standard mode when you want to test your screen with the configuration already set up in your Auth0 tenant:

```bash
npm run screen:standard login
```

This command:
1. Configures your Auth0 tenant to use standard mode for the specified screen
2. Launches the Screen Tester application for initiating the authentication flow
3. Any changes to the tenant configuration will be reflected in the login experience

### Advanced Mode Development

Use advanced mode when actively developing your custom screen:

```bash
npm run screen:advanced login
```

This command:
1. Builds your screen and serves it locally with Hot Module Replacement (HMR)
2. Configures your Auth0 tenant to use advanced mode with your local assets
3. Launches the Screen Tester application for initiating the authentication flow
4. Any changes to your code will be immediately reflected without page reloads

<a id="deployment"></a>
## 📤 Deployment

### Automated Deployment with GitHub Actions

This boilerplate includes a GitHub Actions workflow to automate the process of:
1. Building your customized ACUL screens
2. Uploading the assets to an AWS S3 bucket
3. Configuring your Auth0 tenant to use these assets in Advanced mode
4. Serving the assets through a CDN for optimal performance

**For detailed setup instructions including AWS S3, CloudFront, IAM roles, Auth0 M2M applications, and GitHub secrets, please refer to the comprehensive deployment guide:**

➡️ **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Key Deployment Features

- **Content-Based Asset Hashing**: All assets include content hashes for proper cache invalidation
- **CDN Integration**: Assets are served through CloudFront or your preferred CDN
- **Partial Deployments**: The workflow succeeds even if some screens fail to deploy
- **Automatic Screen Discovery**: No need to manually update configuration when adding new screens

<a id="technical-details"></a>
## 🔍 Technical Details

<details>
<summary>Standard Mode Process Flow</summary>

1. **Environment Check**
   - Validates all required environment variables
   - Checks for Auth0 CLI installation and login status

2. **Port Availability Check**
   - Checks if ports 4040 (Screen Tester) and 3000 (Auth0 redirect) are available
   - Fails if any port is in use

3. **Screen Validation**
   - Checks if the specified screen exists in `src/screens` directory
   - Fails if screen directory is not found

4. **Tenant Selection**
   - Shows the current tenant with visual highlighting for clarity
   - Provides a simple yes/no option to switch tenants

5. **Auth0 CLI Configuration**
   - Uses Auth0 CLI to configure the screen in standard mode:
   ```bash
   auth0 universal-login switch --tenant <tenant_name> --prompt <screen_name> --screen <screen_name> --rendering-mode standard
   ```

6. **Screen Tester**
   - Starts the Screen Tester SPA on port 4040
   - The tester initiates authentication flows using `@auth0/auth0-react`
</details>

<details>
<summary>Advanced Mode Process Flow</summary>

1. **Same Environment and Validation Checks**
   - Same as standard mode

2. **Build Process**
   - Runs a production build of your screen
   - Outputs to the `dist` directory

3. **Asset Discovery**
   - Finds all compiled assets for the screen
   - Includes JavaScript bundles and CSS files

4. **Tenant Selection**
   - Shows the current tenant with visual highlighting for clarity
   - Provides a simple yes/no option to switch tenants

5. **Auth0 CLI Configuration**
   - Generates a configuration JSON file
   - Saves it to settings/<screen_name>_advanced.json
   - Uses Auth0 CLI to apply the configuration:
   ```bash
   auth0 ul customize --tenant <tenant_name> --rendering-mode advanced --prompt <screen_name> --screen <screen_name> --settings-file settings.json
   ```

6. **Development Server with HMR**
   - Starts a development server with Hot Module Replacement support
   - Any changes to source code automatically rebuild and update
   - No need to restart the server or refresh the browser
   
7. **Screen Tester**
   - Starts the Screen Tester SPA on port 4040
   - The tester initiates authentication flows using `@auth0/auth0-react`
</details>

<a id="documentation"></a>
## 📚 Documentation

### Advanced Custom Universal Login (ACUL)

Auth0's Advanced Custom Universal Login (ACUL) allows you to create highly customized authentication experiences using your own design system and components. ACUL gives you complete control over the UI while Auth0 handles the security aspects of authentication.

Learn more about ACUL in the [Auth0 Advanced Customizations documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations).

### ACUL JavaScript Library

The ACUL JavaScript library provides a set of components, hooks, and utilities for building advanced custom login experiences with Auth0. It includes utilities for form handling, state management, and integration with Auth0's authentication APIs.

Explore the [ACUL API documentation](https://auth0.github.io/universal-login/modules/Classes.html) to learn about all available modules and classes.

### Auth0 CLI

The Auth0 CLI is a command-line tool for managing Auth0 tenants, applications, and Universal Login configurations. This boilerplate project uses the Auth0 CLI to switch between standard and advanced modes for Universal Login screens.

Learn more about the Auth0 CLI in the [official documentation](https://auth0.github.io/auth0-cli/).

<a id="troubleshooting"></a>
## ❓ Troubleshooting

### Common Issues

<details>
<summary>Authentication Flow Not Starting</summary>

- **Issue**: Clicking "Log In" in the Screen Tester doesn't start the authentication flow
- **Solution**:
  1. Check your Auth0 application settings to ensure the correct callback URLs are set
  2. Verify your `.env.local` file has the correct AUTH0_CLIENT_ID
  3. Make sure your tenant is properly configured with the Auth0 CLI
</details>

<details>
<summary>Assets Not Loading in Advanced Mode</summary>

- **Issue**: The screen loads but appears unstyled or with JavaScript errors
- **Solution**:
  1. Check browser console for errors related to loading CSS or JS files
  2. Ensure your Auth0 tenant has a custom domain configured
  3. Verify the advanced mode configuration was properly applied
  4. Try running `npm run build` manually to check for build errors
</details>

<details>
<summary>Screen Not Found Error</summary>

- **Issue**: Getting "Screen not found" error when starting development
- **Solution**:
  1. Make sure the screen name matches a directory in `src/screens/`
  2. Screen names are case-sensitive, so use the exact name as the directory
  3. If creating a new screen, ensure it has the required files structure
</details>

### Getting Help

- **GitHub Issues**: Report issues or request features through [GitHub Issues](https://github.com/auth0/universal-login/issues)
- **Auth0 Community**: Ask questions in the [Auth0 Community](https://community.auth0.com/)
- **Support**: Contact [Auth0 Support](https://support.auth0.com/) for assistance with tenant-specific issues