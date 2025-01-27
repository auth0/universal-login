const { defineConfig } = require('cypress');
const dotenv = require('cypress-dotenv');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      config = dotenv(config, { path: './cypress/.env' });
      return config;
    },
  },
});
