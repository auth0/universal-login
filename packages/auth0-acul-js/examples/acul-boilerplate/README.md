# Auth0 ACUL Boilerplate

This project provides a boilerplate setup for Auth0's Advanced Custom Universal Login (ACUL). ACUL allows you to build custom login screens using your own design systems and layouts. It includes a Next.js quickstart application for testing authentication flows in real-time using React, TypeScript, and TailwindCSS.

## Prerequisites

### Development Prerequisites

1. **Repository Setup**
   - Clone the universal-login repository:
     ```bash
     git clone https://github.com/auth0/universal-login.git
     cd universal-login
     ```

2. **Node.js Environment**
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

3. **Dependencies Installation**
   - Install dependencies for both the main project and Next.js app:
     ```bash
     npm install
     cd nextjs-quickstart && npm install
     cd ..
     ```

4. **Auth0 CLI Installation**
   - This project uses the Auth0 CLI to configure your tenant:
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

### Auth0 Prerequisites

1. **Auth0 Tenant**
   - Create a new Auth0 tenant. This is important! Using a new tenant ensures you don't encounter conflicts with existing configurations.
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
   # For Nextjs quickstart
   AUTH0_SECRET='LONG_RANDOM_VALUE'
   AUTH0_BASE_URL='http://localhost:3000'
   AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_CUSTOM_DOMAIN.com'
   AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
   AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
   AUTH0_AUDIENCE='YOUR_AUTH0_API_IDENTIFIER'
   AUTH0_SCOPE='openid profile'
   ```

2. Start development:
   ```bash
   # Standard mode (single screen)
   npm run screen:standard <screen_name>
   npm run screen:standard login  # For login screen. Other ex: login-id, login-password

   # Advanced mode with HMR (single screen)
   npm run screen:advanced <screen_name>
   npm run screen:advanced login  # For login screen. Other ex: login-id, login-password
   ```

## Project Structure
```
acul-boilerplate/
├── dist/                # Production build output
├── nextjs-quickstart/   # Next.js test application
├── src/                 # Source files
│   ├── components/      # Reusable UI components
│   ├── screens/        # Login flow screens
│   └── styles/         # Global styles
└── scripts/            # Build and deployment scripts
```

## Features

- Multiple authentication flows (Username/Password, Passwordless, Social)
- Modern development stack (React 19, TypeScript, TailwindCSS).
- Integrated Next.js testing environment
- Optimized development workflow with smart HMR
- Theme configuration.

## Technical Details

<details>
<summary>🔍 What happens when you run npm run screen:standard login</summary>

1. **Environment Check**
   - Validates all required environment variables
   - Checks for Auth0 CLI installation and login status

2. **Port Availability Check**
   - Checks if ports 3032 (ACUL server) and 3001 (API server) are available
   - Fails if any port is in use

3. **Screen Validation**
   - Checks if the specified screen exists in `src/screens` directory
   - Fails if screen directory is not found

4. **Auth0 CLI Configuration**
   - Uses Auth0 CLI to configure the screen in standard mode:
   ```bash
   auth0 universal-login switch --prompt login --screen login --rendering-mode standard
   ```

5. **Development Server**
   - Starts a local development server on port 3032
   - Serves the screen for testing

6. **Next.js Application**
   - A Next.js application is available for testing real authentication flows
   - Access it at http://localhost:3000

</details>

<details>
<summary>🔍 What happens when you run npm run screen:advanced login</summary>

1. **Same Environment and Validation Checks**
   - Same as standard mode

2. **Build Process**
   - Runs a production build of your screen
   - Outputs to the `dist` directory

3. **Asset Discovery**
   - Finds all compiled assets for the login screen
   - Includes JavaScript bundles and CSS files

4. **Advanced Configuration**
   - Uses Auth0 CLI to configure the screen in advanced mode
   - Uploads all the built assets as head tags
   - Sets up context configuration

5. **Hot Module Replacement (HMR)**
   - Starts a development server with HMR support
   - Any changes to source code automatically rebuild and update
   - No need to restart the server or refresh the browser

6. **Next.js Testing**
   - Same as standard mode
   
</details>

## Development Workflow

1. Choose a screen to work on
2. Run the development script for that screen
3. Make changes to components and styles
4. Test your changes in real-time
5. Switch to another screen if needed

## Documentation

For more details about ACUL, refer to the [Auth0 Documentation](https://auth0.com/docs/customize/universal-login-pages/universal-login-page-templates).

## License

MIT