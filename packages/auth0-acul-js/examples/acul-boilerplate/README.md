# Auth0 ACUL Boilerplate

This project provides a boilerplate setup for Auth0's Advanced Custom Universal Login (ACUL). ACUL allows you to build custom login screens using your own design systems and layouts. It includes a Next.js quickstart application for testing authentication flows in real-time using React, TypeScript, and TailwindCSS.

## ⚙️ Development Prerequisites

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

- Install dependencies for both the main project and Next.js app:
  ```bash
  npm install
  cd nextjs-quickstart && npm install
  cd ..
  ```
</details>

<details>
<summary>* 🔨 Auth0 CLI Installation</summary>

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
</details>

### Auth0 Prerequisites

1. **Auth0 Tenant**
   - Create a Auth0 tenant. You can use existing tenant if you alraedy have auth0 tenant. Remember to work in Development tenants before changing configuration for Production tenants.
   - You can sign up for a free Auth0 account at [https://auth0.com/signup](https://auth0.com/signup)
   - See [Create Tenants](https://auth0.com/docs/get-started/auth0-overview/create-tenants) in the Auth0 docs if you need help

2. **Custom Domain Setup**
   - Enable and configure a [custom domain](https://auth0.com/docs/customize/custom-domains) for your Auth0 tenant
   - Verify the custom domain is working properly
   - This is required for ACUL functionality

3. **Regular Web Application**
   - Create a new [Regular Web Application](https://auth0.com/docs/get-started/auth0-overview/create-applications) in Auth0
   - Configure the following settings:
     - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
     - Allowed Logout URLs: `http://localhost:3000`
     - Allowed Web Origins: `http://localhost:3000`
   - This application will be used by the Next.js quickstart for authentication testing
   - Follow the [Next.js Quickstart guide](https://auth0.com/docs/quickstart/webapp/nextjs/01-login) for additional configuration help

## Quick Start

1. Set up your environment variables in `.env.local`:
   ```env
   # For Nextjs quickstart - only needed if you want to use the test application
   AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_CUSTOM_DOMAIN.com'
   AUTH0_SECRET='LONG_RANDOM_VALUE'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
   AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
   AUTH0_AUDIENCE='YOUR_AUTH0_API_IDENTIFIER'
   AUTH0_SCOPE='openid profile'
   AUTH0_ORGANIZATION='optional_field_organization_config'
   ```

2. Start development:
   ```bash
   # Standard mode (single screen) 
   This is Universal login mode to see the mentioned screen as per tenant settings.
   npm run screen:standard <screen_name>
   npm run screen:standard login  # Other ex: login-id, login-password

   # Advanced mode with HMR (single screen)
   This is ACUL(advanced mode) to see the mentioned screen as per code (under src/screens)
   npm run screen:advanced <screen_name>
   npm run screen:advanced login  # Other ex: login-id, login-password
   ```

3. Run on browser:
   ```bash
   http://localhost:3000/
   ```

## 🚀 Deployment (Automated via GitHub Actions)

This boilerplate includes a GitHub Actions workflow to automate the process of building your customized ACUL screens, uploading them to an S3 bucket, and configuring your Auth0 tenant to use them in Advanced mode.

This is ideal for Continuous Integration/Continuous Deployment (CI/CD) pipelines.

**For detailed setup instructions and prerequisites (Auth0 M2M App, AWS IAM Role, S3 Bucket, GitHub Secrets, etc.), please refer to the dedicated deployment guide:**

➡️ **[./DEPLOYMENT.md](./DEPLOYMENT.md)**

## Project Structure
```
acul-boilerplate/
├── dist/                # Production build output
├── nextjs-quickstart/   # Next.js test application
├── src/                 # Source files
│   ├── components/      # Reusable UI components
│   ├── screens/        # Login flow screens
│   └── styles/         # Global styles
├── scripts/            # Build and deployment scripts
│   ├── utils/          # Utility functions and helpers
│   │   ├── auth0-cli.js     # Auth0 CLI integration
│   │   ├── config-generator.js  # Configuration generators
│   │   ├── error-handler.js  # Error handling utilities
│   │   └── ... 
│   ├── advanced-mode.js   # Advanced mode entry point
│   ├── standard-mode.js   # Standard mode entry point
│   └── server.js          # Development server
└── settings/           # Auth0 CLI settings
```

## Screens

This boilerplate includes implementations for several Universal Login screens:

- **[Login Screen](src/screens/Login/README.md)**
- **[Login ID Screen](src/screens/login-id/README.md)**

Each screen comes with its own documentation, implementation details, and configuration options. Check the README.md file in each screen directory for more information.

## Technical Details

<details>
<summary>🔍 Technical Details: What happens when you run npm run screen:standard login</summary>

1. **Environment Check**
   - Validates all required environment variables
   - Checks for Auth0 CLI installation and login status

2. **Port Availability Check**
   - Checks if ports 3032 (ACUL server) and 3001 (Next.js API server) are available
   - Fails if any port is in use

3. **Screen Validation**
   - Checks if the specified screen exists in `src/screens` directory
   - Fails if screen directory is not found

4. **Tenant Selection**
   - Shows the current tenant with visual highlighting for clarity
   - Provides a simple yes/no option to switch tenants

5. **Auth0 CLI Configuration**
   - Uses Auth0 CLI to configure the screen in standard mode with explicit tenant:
   ```bash
   auth0 universal-login switch --tenant <tenant_name> --prompt <screen_name> --screen <screen_name> --rendering-mode standard
   ```

6. **Development Server**
   - Starts a local http server on port 3032 that serves assets
   - Serves the screen for testing on port 3000


</details>

<details>
<summary>🔍 Technical Details: What happens when you run npm run screen:advanced login</summary>

1. **Same Environment and Validation Checks**
   - Same as standard mode

2. **Build Process**
   - Runs a production build of your screen
   - Outputs to the `dist` directory

3. **Asset Discovery**
   - Finds all compiled assets for the login screen
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

6. **Hot Module Replacement (HMR)**
   - Starts a development server with HMR support
   - Any changes to source code automatically rebuild and update
   - No need to restart the server or refresh the browser
   
</details>

## Documentation

### Advanced Custom Universal Login (ACUL)

Auth0's Advanced Custom Universal Login (ACUL) allows you to create highly customized authentication experiences using your own design system and components. ACUL gives you complete control over the UI while Auth0 handles the security aspects of authentication.

Learn more about ACUL in the [Auth0 Advanced Customizations documentation](https://auth0.com/docs/customize/login-pages/advanced-customizations).

### ACUL JavaScript Library

The ACUL JavaScript library provides a set of components, hooks, and utilities for building advanced custom login experiences with Auth0. It includes utilities for form handling, state management, and integration with Auth0's authentication APIs.

Explore the [ACUL API documentation](https://auth0.github.io/universal-login/modules/Classes.html) to learn about all available modules and classes.

### Auth0 CLI

The Auth0 CLI is a command-line tool for managing Auth0 tenants, applications, and Universal Login configurations. This boilerplate project uses the Auth0 CLI to switch between standard and advanced modes for Universal Login screens.

Learn more about the Auth0 CLI in the [official documentation](https://auth0.github.io/auth0-cli/).

## License

MIT