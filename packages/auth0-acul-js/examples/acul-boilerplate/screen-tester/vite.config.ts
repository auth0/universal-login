import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env files from parent directory
  process.env = { ...process.env, ...loadEnv(mode, process.cwd() + '/..', '') }
  
  // Make a copy of all environment variables to ensure they are available in the app
  const envVars: Record<string, string> = {}
  Object.keys(process.env).forEach(key => {
    if (typeof process.env[key] === 'string') {
      // Prefix all environment variables with VITE_ to make them available in the app
      envVars[`VITE_${key}`] = process.env[key] as string
    }
  })
  
  return {
    plugins: [react()],
    // Load .env files from the parent directory (project root)
    envDir: '..',
    envPrefix: ['VITE_', 'AUTH0_'],
    server: {
      // Ensure server options match package.json scripts if needed
      port: 4040,
      strictPort: true,
      host: 'localhost', // Restrict to localhost only for security
    },
    define: {
      // Make all environment variables available to the app
      'import.meta.env.AUTH0_ISSUER_BASE_URL': JSON.stringify(process.env.AUTH0_ISSUER_BASE_URL),
      'import.meta.env.AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'import.meta.env.AUTH0_AUDIENCE': JSON.stringify(process.env.AUTH0_AUDIENCE),
      'import.meta.env.AUTH0_ORGANIZATION': JSON.stringify(process.env.AUTH0_ORGANIZATION),
      'import.meta.env.SCREEN_NAME': JSON.stringify(process.env.SCREEN_NAME),
      'import.meta.env.RUN_MODE': JSON.stringify(process.env.RUN_MODE),
      // Legacy support for VITE_ prefixed variables
      'import.meta.env.VITE_AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_ISSUER_BASE_URL?.toString().replace(/^https?:\/\//, '')),
      'import.meta.env.VITE_AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID)
    }
  }
})
