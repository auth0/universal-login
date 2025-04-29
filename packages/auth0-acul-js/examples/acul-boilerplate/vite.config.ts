import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';

// Dynamically discover screen directories
const screensDir = resolve(__dirname, 'src/screens');
const screenEntries: Record<string, string> = {};

// Only add screens that exist in the src/screens directory
if (fs.existsSync(screensDir)) {
  const screenDirs = fs.readdirSync(screensDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // Create an entry point for each screen
  screenDirs.forEach(screen => {
    const entryFile = resolve(screensDir, screen, 'index.tsx');
    if (fs.existsSync(entryFile)) {
      screenEntries[screen] = entryFile;
    }
  });
}

/**
 * Bundling Strategy Configuration
 * -------------------------------
 * 
 * This defines how our application code is split into different bundles:
 * 
 * 1. All chunks now include hash for proper cache invalidation:
 *    - vendor.[hash].js: Core libraries (React, React DOM)
 *    - auth0-acul.[hash].js: Auth0 ACUL library
 *    - dependencies.[hash].js: Other third-party dependencies
 *    - main.[hash].js: Entry point bootstrapping code
 *    - [screen]/index.[hash].js: Screen-specific code for each screen
 *    - styles.[hash].css: All application styles
 * 
 * 2. Each screen gets its own directory with isolated bundles:
 *    - assets/login/index.[hash].js
 *    - assets/login-id/index.[hash].js
 *    - etc.
 */
const CHUNK_CONFIG = {
  // All chunks will have hash in filename for proper cache invalidation
  FIXED_CHUNKS: [],
  
  // Dependencies to include in vendor chunk (core libraries that rarely change)
  VENDOR_DEPS: [
    'react', 
    'react-dom',
    'react-error-boundary'
  ],
  
  // Dependencies to bundle separately (more likely to change)
  SEPARATE_DEPS: {
    'auth0-acul': ['@auth0/auth0-acul-js']
  }
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3032,
    strictPort: true,
    host: 'localhost',
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3032,
      clientPort: 3032
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      // Use multiple entry points - one for each screen
      input: {
        ...screenEntries,
        // Include the main entry point for shared code
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Organize files into screen-specific directories
        entryFileNames: (chunkInfo) => {
          // For screen entries, place in screen-specific directories
          if (screenEntries[chunkInfo.name]) {
            return `assets/${chunkInfo.name}/index.[hash].js`;
          }
          // For main entry (bootstrapping code)
          return 'assets/main.[hash].js';
        },
        chunkFileNames: (chunkInfo) => {
          // Apply different naming strategies based on chunk type
          const chunkName = chunkInfo.name || '';
          
          // For screen-specific chunks
          const screenMatch = Object.keys(screenEntries).find(
            screen => chunkName.startsWith(`${screen}-`)
          );
          
          if (screenMatch) {
            return `assets/${screenMatch}/[name].[hash].js`;
          }
          
          // For all shared chunks (needs hash for proper versioning)
          return 'assets/shared/[name].[hash].js';
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          
          // CSS files should have hashes for proper cache invalidation
          // since styles are likely to change between deployments
          if (info.endsWith('.css')) {
            return 'assets/shared/styles.[hash][extname]';
          }
          
          // For other assets (images, fonts, etc.)
          return 'assets/shared/[name].[hash][extname]';
        },
        // Bundle splitting strategy
        manualChunks: (id) => {
          // Skip if not from node_modules
          if (!id.includes('node_modules')) {
            return;
          }
          
          // Bundle #1: vendor.[hash].js
          // Core libraries that rarely change (React, React DOM)
          // Using fixed name for better caching across deployments
          const isVendor = CHUNK_CONFIG.VENDOR_DEPS.some(dep => 
            id.includes(`/node_modules/${dep}/`) || id.includes(`/node_modules/${dep.replace('/', '@')}`)
          );
          
          if (isVendor) {
            return 'vendor';
          }
          
          // Bundle #2: auth0-acul.[hash].js
          // Auth0 ACUL library that might change more frequently
          // Using hash for proper cache invalidation
          for (const [chunkName, deps] of Object.entries(CHUNK_CONFIG.SEPARATE_DEPS)) {
            if (deps.some(dep => id.includes(`/node_modules/${dep}/`))) {
              return chunkName;
            }
          }
          
          // Bundle #3: dependencies.[hash].js
          // Other third-party npm modules
          // Using hash for proper versioning
          return 'dependencies';
        }
      },
    },
    minify: true,
    emptyOutDir: true,
    cssCodeSplit: false, // Keep CSS in a single file for simplicity
    sourcemap: true,
  },
  logLevel: 'error'
});