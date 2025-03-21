import axios from 'axios';
import dotenv from 'dotenv';
import ora from 'ora';
import { logger } from './logger.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Token storage with simple caching
let cachedToken = null;

/**
 * Gets an Auth0 Management API token
 * 
 * @param {boolean} forceRefresh - Whether to force a token refresh
 * @returns {Promise<string>} - The Auth0 token
 */
export const getAuthToken = async (forceRefresh = false) => {
  // Use cached token if available and not forcing refresh
  if (cachedToken && !forceRefresh) {
    logger.info('🔐 Using cached Auth0 token');
    return cachedToken;
  }

  logger.section('Auth0 Authentication');
  
  const spinner = ora({
    text: '🔐 Authenticating with Auth0...',
    color: 'cyan'
  }).start();

  try {
    // Validate required environment variables
    const requiredVars = [
      'AUTH0_M2M_DOMAIN', 
      'AUTH0_M2M_CLIENT_ID', 
      'AUTH0_M2M_CLIENT_SECRET'
    ];
    
    const missingVars = requiredVars.filter(v => !process.env[v]);
    
    if (missingVars.length > 0) {
      spinner.fail(`Missing environment variables: ${missingVars.join(', ')}`);
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    // Prepare request data
    const url = `${process.env.AUTH0_M2M_DOMAIN}/oauth/token`;
    const body = {
      client_id: process.env.AUTH0_M2M_CLIENT_ID,
      client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
      audience: process.env.AUTH0_M2M_AUDIENCE,
      grant_type: 'client_credentials'
    };
    
    // Request token from Auth0
    const response = await axios.post(url, body, {
      headers: { 'content-type': 'application/json' }
    });

    // Validate response
    if (!response.data?.access_token) {
      spinner.fail(`Invalid response: Missing access token`);
      throw new Error('Invalid response: Missing access token');
    }

    // Store the token
    cachedToken = response.data.access_token;
    spinner.succeed(`🔐 Auth0 token obtained successfully`);
    
    // Print partial token for verification
    const tokenPreview = cachedToken.substring(0, 15) + '...';
    logger.info(`Token: ${tokenPreview}`);
    
    return cachedToken;
  } catch (error) {
    spinner.fail(`Authentication failed: ${error.message}`);
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

/**
 * Uploads screen configuration to Auth0
 * 
 * @param {string} screenName - The name of the screen to configure
 * @param {object} config - The configuration to upload
 * @returns {Promise<void>}
 */
export const uploadScreenConfig = async (screenName, config) => {
  // Important: First get Auth0 token BEFORE showing the upload spinner
  // This ensures we show token fetch first, then configuration upload
  try {
    // Get token (use cached if available)
    const token = await getAuthToken();
    
    // Now show the upload section
    logger.section('Uploading Configuration');
    
    const domain = process.env.AUTH0_ISSUER_BASE_URL;
    const url = `${domain}/api/v2/prompts/${screenName}/screen/${screenName}/rendering`;
    
    // Log what we're about to upload with proper spacing
    logger.info(`Target: ${screenName}`);
    logger.url('API Endpoint', url);
    logger.data('Payload', config);
    
    // Upload with spinner
    const spinner = ora({
      text: `📤 Uploading configuration for ${screenName}...`,
      color: 'cyan'
    }).start();
    
    try {
      // First attempt with current token
      await uploadConfig(url, token, config);
      spinner.succeed(`Configuration uploaded for ${screenName}`);
    } catch (error) {
      // If we get a 401 Unauthorized, the token might have expired
      if (error.response && error.response.status === 401) {
        spinner.text = `🔄 Auth token expired, refreshing...`;
        
        // Force token refresh
        const freshToken = await getAuthToken(true);
        
        // Try again with a fresh token
        spinner.text = `📤 Retrying upload with new token...`;
        await uploadConfig(url, freshToken, config);
        spinner.succeed(`Configuration uploaded for ${screenName} (with refreshed token)`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    logger.error(`Failed to upload configuration`, error);
    throw new Error(`Failed to upload configuration: ${error.message}`);
  }
};

/**
 * Helper function to upload configuration to Auth0
 * 
 * @param {string} url - The API endpoint URL
 * @param {string} token - The Auth0 token
 * @param {object} config - The configuration to upload
 * @returns {Promise<void>}
 */
async function uploadConfig(url, token, config) {
  return axios.patch(url, config, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
} 