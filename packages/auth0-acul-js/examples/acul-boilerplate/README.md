# Advanced Customization Universal Login (ACUL)

This project provides a boilerplate for building customizable login flows using Vite, React, TypeScript, and TailwindCSS. It demonstrates the implementation of Auth0's Universal Login with advanced customization options.

## 🚀 Features

- Multiple Login Flows (Username + Password, Email Only, Password Only)
- Fully customizable UI with TailwindCSS
- Chunk-based build optimization for better performance
- Uses `@auth0/auth0-acul-js` for authentication
- TypeScript support with strict type checking
- React 19 with Suspense for code-splitting

## 📂 Project Structure

```
acul-boilerplate/
├── dist/                # Production build output
│   ├── assets/
│   │   ├── login/      # Login screen bundle
│   │   ├── common/     # Shared dependencies
│   │   └── vendor/     # Third-party libraries
├── src/
│   ├── components/     # Reusable UI components
│   │   └── common/     # Shared components
│   ├── screens/        # Login flow screens
│   │   └── Login/      # Main login screen
│   ├── styles/         # Global styles
│   ├── App.tsx        # Main application
│   └── main.tsx       # Entry point
├── vite.config.ts     # Build configuration
└── tsconfig.json      # TypeScript configuration
```

## 📦 Prerequisites

- Node.js >= 20.0.0 (enforced via `.nvmrc`)
- npm or yarn package manager

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## ⚙️ Production Build

```bash
# Create production build
npm run build

# Test production build locally
npx http-server dist -p 3032
```

### Build Output Structure

```
dist/
├── assets/
│   ├── login/
│   │   └── login-[hash].js      # Login screen code
│   ├── common/
│   │   └── common-[hash].js     # React, Auth0 dependencies
│   ├── vendor/
│   │   └── vendor-[hash].js     # Third-party libraries
│   └── main-[hash].css          # Styles
└── index.html                    # Entry point
```

## 🔍 Development Notes

- Components are organized in separate chunks for optimal loading
- Error boundaries implemented for graceful error handling
- Tailwind utility classes for consistent styling
- Source maps enabled for debugging

## 📄 License

MIT