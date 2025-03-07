# Advanced Customization Universal Login (ACUL)

This project provides a boilerplate for building customizable login flows using Vite, React, TypeScript, and TailwindCSS. It demonstrates the implementation of Auth0's Universal Login with advanced customization options.

## 🚀 Features

- Multiple Login Flows (Username + Password, Email Only, Password Only)
- Fully customizable UI with TailwindCSS
- Hot Module Replacement (HMR) for rapid development
- Uses `@auth0/auth0-acul-js` for authentication
- TypeScript support with strict type checking
- React 19 with Suspense for code-splitting
- Integrated Next.js application for testing

## 📂 Project Structure

```
acul-boilerplate/
├── dist/                # Production build output
├── nextjs-quickstart/   # Next.js test application
├── src/                 # Source files for ACUL
│   ├── components/      # Reusable UI components
│   ├── screens/        # Login flow screens
│   └── styles/         # Global styles
├── scripts/            # Build and deployment scripts
└── [Configuration files]
```

## 📦 Prerequisites

- Node.js >= 20.0.0 (enforced via `.nvmrc`)
- npm or yarn package manager
- http-server (installed globally via npm)

## 🛠️ Installation & Setup

1. Install dependencies:
```bash
# Install ACUL dependencies
npm install

# Install http-server globally
npm install -g http-server

# Install Next.js dependencies
cd nextjs-quickstart && npm install
```

2. Configure environment:
Update `.env.local` in the parent directory:
```bash
AUTH0_SECRET='LONG_RANDOM_VALUE'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
AUTH0_AUDIENCE='YOUR_AUTH0_API_IDENTIFIER'
AUTH0_SCOPE='openid profile'
```

## 🚀 Development Workflow

1. Start both applications:

```bash
# Terminal 1: Start ACUL (Port 3032) and Start Next.js (Port 3000)
npm run start
```

2. Development features:
- Hot Module Replacement (HMR) enabled
- Automatic rebuilds on changes
- CORS enabled for API integration
- Source maps for debugging

## ⚙️ Production Build

Build both applications:
```bash
# Build ACUL
npm run build

# Build Next.js app
cd nextjs-quickstart && npm run build
```

### Build Output Structure

```
dist/
├── assets/
│   ├── login/login-[hash].js    # Login screen code
│   ├── common/common-[hash].js  # Shared dependencies
│   ├── vendor/vendor-[hash].js  # Third-party libraries
│   └── main-[hash].css         # Styles
└── index.html                  # Entry point
```

## 🔍 Development Notes

- ACUL serves on port 3032, Next.js on port 3000
- Changes to ACUL code trigger automatic rebuilds
- Components are organized in separate chunks
- Error boundaries for graceful error handling
- Tailwind utility classes for styling

## 💻 Available Scripts

```bash
npm run dev:watch    # Start ACUL development server with HMR
npm run build       # Create production build
npm run serve       # Serve production build
npm run deploy      # Build and deploy assets
```

## 📄 License

MIT