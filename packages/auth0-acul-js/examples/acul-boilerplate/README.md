# Auth0 ACUL Boilerplate

This project provides a boilerplate setup for Auth0's Advanced Custom Universal Login (ACUL). It includes a Next.js quickstart application for testing authentication flows in real-time using React, TypeScript, and TailwindCSS.

## Prerequisites

Before you begin, ensure you have completed the following Auth0 setup steps:

1. **Custom Domain Setup**
   - Enable and configure a custom domain for your Auth0 tenant
   - Verify the custom domain is working properly
   - This is required for ACUL functionality

2. **Regular Web Application**
   - Create a new Regular Web Application in Auth0
   - Configure the following settings:
     - Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
     - Allowed Logout URLs: `http://localhost:3000`
     - Allowed Web Origins: `http://localhost:3000`
   - This application will be used by the Next.js quickstart for authentication testing

3. **Machine-to-Machine (M2M) Application**
   - Create a new M2M application in Auth0
   - Grant the following permissions:
     - `read:prompts`
     - `update:prompts`
   - This application will be used to:
     - Generate authentication tokens
     - Upload screen configurations
     - Configure ACUL settings

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

   # For ACUL authentication and configuration
   AUTH0_M2M_DOMAIN='https://M2M_APP_DOMAIN.com'
   AUTH0_M2M_CLIENT_ID='YOUR_M2M_CLIENT_ID'
   AUTH0_M2M_CLIENT_SECRET='YOUR_M2M_CLIENT_SECRET'
   AUTH0_M2M_AUDIENCE='YOUR_M2M_API_IDENTIFIER'
   ```

2. Install dependencies:
   ```bash
   npm install
   cd nextjs-quickstart && npm install
   ```

3. Start development:
   ```bash
   # Standard mode (single screen)
   npm run screen:standard login     # For login screen
   npm run screen:standard login-id  # For login-id screen

   # Advanced mode with HMR (single screen)
   npm run screen:advanced login     # For login screen with hot reload
   npm run screen:advanced login-id  # For login-id screen with hot reload
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

## Development Workflow

### Standard Mode
- Uses Auth0's standard rendering mode
- Runs for a specific screen (e.g., login, login-id)
- No asset management required
- Suitable for simple development needs

### Advanced Mode (with HMR)
1. Start the development server with `npm run screen:advanced <screen-name>`
2. Make changes to your screen's source files in `src/screens/<screen-name>`
3. Changes are automatically:
   - Detected by the file watcher
   - Rebuilt using Vite
   - Uploaded to Auth0
   - Reflected in your browser

The development server handles all the complexity of:
- Building TypeScript and CSS
- Managing asset versions
- Uploading configurations to Auth0
- Serving assets locally

## Features

- Multiple authentication flows (Username/Password, Passwordless, Social)
- Modern development stack (React 19, TypeScript, TailwindCSS)
- Integrated Next.js testing environment

## Troubleshooting

- **Port already in use**: Stop any existing processes using ports 3032 or 3001
- **Authentication errors**: Verify your Auth0 credentials in `.env.local`
- **Screen not found**: Ensure your screen directory exists in `src/screens`
- **Invalid screen name**: Use only screen names that match your directory names in `src/screens`

## Technical Details

<details>
<summary>🔍 What happens when you run npm run screen:standard login</summary>

1. **Environment Check**
   - Validates all required environment variables
   - Ensures Auth0 M2M credentials are properly configured

2. **Port Availability Check**
   - Checks if ports 3032 (ACUL server) and 3001 (API server) are available
   - Fails if any port is in use

3. **Screen Validation**
   - Checks if the specified screen exists in `src/screens` directory
   - Fails if screen directory is not found

4. **Auth Token Generation**
   ```http
   POST ${AUTH0_M2M_DOMAIN}/oauth/token
   Content-Type: application/json

   {
     "client_id": "your-m2m-client-id",
     "client_secret": "your-m2m-client-secret",
     "audience": "your-audience",
     "grant_type": "client_credentials"
   }
   ```

5. **Screen Configuration Upload**
   ```http
   PATCH ${AUTH0_ISSUER_BASE_URL}/api/v2/prompts/${screenName}/screen/${screenName}/rendering
   Authorization: Bearer ${access_token}
   Content-Type: application/json

   {
     "rendering_mode": "standard"
   }
   ```

6. **Server Start**
   - Starts ACUL development server
   - Starts Next.js development server
</details>

<details>
<summary>🔍 What happens when you run npm run screen:advanced login</summary>

1. **Environment & Port Checks**
   - Same as standard mode

2. **Build Process**
   - Compiles assets to `dist/` directory
   - Generates JavaScript bundles and CSS files

3. **Asset Discovery**
   - Scans `dist/` directory for JS and CSS files
   - Prepares asset URLs for configuration

4. **Advanced Configuration Upload**
   ```http
   PATCH ${AUTH0_ISSUER_BASE_URL}/api/v2/prompts/login/screen/login/rendering
   Authorization: Bearer ${access_token}
   Content-Type: application/json

   {
     "rendering_mode": "advanced",
     "context_configuration": [],
     "default_head_tags_disabled": false,
     "head_tags": [
       {
         "tag": "script",
         "attributes": {
           "src": "http://127.0.0.1:3032/main.js",
           "defer": true
         }
       },
       {
         "tag": "link",
         "attributes": {
           "rel": "stylesheet",
           "href": "http://127.0.0.1:3032/main.css"
         }
       }
     ]
   }
   ```

5. **Server Start**
   - Starts ACUL development server
   - Starts Next.js development server
   - Starts file watcher for automatic rebuilds
</details>

## Development Notes

- The server automatically handles Ctrl+C (SIGINT) for graceful shutdown
- Each server restart will:
  - Get a fresh auth token
  - Upload screen configurations
  - Start development servers
- To apply changes to your screens, stop (Ctrl+C) and restart the server

## License

MIT