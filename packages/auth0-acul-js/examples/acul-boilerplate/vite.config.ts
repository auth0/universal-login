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

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3032,
    strictPort: true,
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
          // For main entry
          return 'assets/main.[hash].js';
        },
        chunkFileNames: (chunkInfo) => {
          // For chunks that belong to screens
          if (chunkInfo.name && screenEntries[chunkInfo.name.split('-')[0]]) {
            const screenName = chunkInfo.name.split('-')[0];
            return `assets/${screenName}/[name].[hash].js`;
          }
          // For vendor and other shared chunks
          return 'assets/shared/[name].[hash].js';
        },
        assetFileNames: (assetInfo) => {
          // For CSS files
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/shared/style.[hash][extname]';
          }
          // For other assets
          return 'assets/shared/[name].[hash][extname]';
        },
        // Improved vendor chunk configuration with more dependencies
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react/jsx-runtime',
            'react-error-boundary',
            '@auth0/auth0-acul-js'
          ],
          // Common components will be automatically extracted as shared chunks
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