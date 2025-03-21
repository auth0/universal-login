import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'

// Screen definitions - easier to add new screens here
// const screens = [
//   'Login',
//   // Add more screens as needed
// ];

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port: 3032,
    strictPort: true, // Force the specified port
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
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //   },
    //   output: {
    //     manualChunks: (id) => {
    //       // Create a 'vendor' chunk for node_modules
    //       if (id.includes('node_modules')) {
    //         if (id.includes('react') || 
    //             id.includes('react-dom') || 
    //             id.includes('react-router-dom') ||
    //             id.includes('@auth0')) {
    //           return 'common';
    //         }
    //         return 'vendor';
    //       }

    //       // Create separate chunks for each screen
    //       for (const screen of screens) {
    //         if (id.includes(`/screens/${screen}/`)) {
    //           return `screen-${screen.toLowerCase()}`;
    //         }
    //       }

    //       // Create a chunk for common components
    //       if (id.includes('/components/common/')) {
    //         return 'common-components';
    //       }
    //     },
    //     // Configure the output filenames
    //     entryFileNames: (chunkInfo) => {
    //       // For main entry
    //       if (chunkInfo.name === 'main') {
    //         return 'assets/[name]-[hash].js';
    //       }
    //       return 'assets/[name]/[name]-[hash].js';
    //     },
    //     chunkFileNames: (chunkInfo) => {
    //       // Special handling for screen chunks
    //       if (chunkInfo.name?.startsWith('screen-')) {
    //         const screenName = chunkInfo.name.replace('screen-', '');
    //         return `assets/${screenName}/${screenName}-[hash].js`;
    //       }
    //       // For common and vendor chunks
    //       return 'assets/[name]/[name]-[hash].js';
    //     },
    //     assetFileNames: (assetInfo) => {
    //       // Handle CSS files
    //       if (assetInfo.name?.endsWith('.css')) {
    //         // Check if this CSS is part of a screen
    //         for (const screen of screens) {
    //           const screenLower = screen.toLowerCase();
    //           if (assetInfo.name.includes(screenLower)) {
    //             return `assets/${screenLower}/${screenLower}-[hash][extname]`;
    //           }
    //         }
    //         return 'assets/[name]-[hash][extname]';
    //       }
    //       return 'assets/[name]-[hash][extname]';
    //     },
    //   },
    // },
    rollupOptions: {
      output: {
        entryFileNames: "index.js", // Single JavaScript output file
        assetFileNames: "index.css", // Single CSS output file
        manualChunks: () => "index.js", // Force single chunk
      },
    },
    minify: true,
    emptyOutDir: true,
    cssCodeSplit: false, // Disable CSS code-splitting to bundle CSS in one file
    sourcemap: true,
  },
  logLevel: 'error' // Only show errors
});