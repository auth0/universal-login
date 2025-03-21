import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Token storage - simple, no expiration tracking
let cachedToken = null;

/**
 * Gets an Auth0 Management API token
 * @param {boolean} forceRefresh - Whether to force a token refresh
 * @returns {Promise<string>} - The Auth0 token
 */
export const getAuthToken = async (forceRefresh = false) => {
  // Use cached token if available and not forcing refresh
  if (cachedToken && !forceRefresh) {
    return cachedToken;
  }

  const requiredVars = ['AUTH0_M2M_DOMAIN', 'AUTH0_M2M_CLIENT_ID', 'AUTH0_M2M_CLIENT_SECRET'];
  const missingVars = requiredVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
  }

  const url = `${process.env.AUTH0_M2M_DOMAIN}/oauth/token`;
  const body = {
    client_id: process.env.AUTH0_M2M_CLIENT_ID,
    client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
    audience: process.env.AUTH0_M2M_AUDIENCE,
    grant_type: 'client_credentials'
  };

  console.log('\n🔑 Fetching Auth0 token...');
  
  try {
    const response = await axios.post(url, body, {
      headers: { 'content-type': 'application/json' }
    });

    if (!response.data?.access_token) {
      throw new Error('Invalid response: Missing access token');
    }

    // Store the token
    cachedToken = response.data.access_token;
    console.log('✅ Auth token received');
    
    return cachedToken;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

/**
 * Uploads screen configuration to Auth0
 * @param {string} screenName - The name of the screen to configure
 * @param {object} config - The configuration to upload
 */
export const uploadScreenConfig = async (screenName, config) => {
  try {
    console.log(`\n📤 Uploading ${config.rendering_mode} mode configuration for ${screenName}`);
    
    // Get token (use cached if available)
    let token = await getAuthToken();
    const domain = process.env.AUTH0_ISSUER_BASE_URL;
    const url = `${domain}/api/v2/prompts/${screenName}/screen/${screenName}/rendering`;
    
    try {
      await axios.patch(url, config, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Configuration uploaded for ${screenName}`);
    } catch (error) {
      // If we get a 401 Unauthorized, the token might have expired
      if (error.response && error.response.status === 401) {
        console.log('🔄 Auth token expired, refreshing...');
        
        // Force token refresh
        token = await getAuthToken(true);
        
        // Try again with a fresh token
        await axios.patch(url, config, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`✅ Configuration uploaded for ${screenName} with refreshed token`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    throw new Error(`Failed to upload configuration: ${error.message}`);
  }
}; 