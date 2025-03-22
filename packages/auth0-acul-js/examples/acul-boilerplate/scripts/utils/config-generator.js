/**
 * Configuration Generator
 * 
 * This module creates the advanced mode configuration for Auth0 ACUL.
 * It generates the configuration for the Auth0 CLI.
 */

import fs from 'fs';
import path from 'path';
import { CONFIG } from './server-config.js';
import { findAssets, createHeadTags } from './assetUploader.js';
import { logger } from './logger.js';
import ora from 'ora';

/**
 * Generate the advanced mode configuration for a screen
 * @param {string} screenName - The name of the screen
 * @returns {Promise<Object>} - The advanced mode configuration
 */
export async function createAdvancedModeConfig(screenName) {
  const spinner = ora({
    text: `🔍 Discovering and preparing assets for ${screenName}...`,
    color: 'cyan'
  }).start();
  
  try {
    // Validate and locate all required assets
    const { 
      mainJsFile, 
      screenJsFile,
      vendorJsFile,
      auth0AculJsFile,
      dependenciesJsFile,
      cssFiles 
    } = findAssets(screenName);
    
    spinner.succeed(`Assets discovered for ${screenName}`);
    
    // Log asset details
    logger.info(`Asset summary for ${screenName}:`);
    const assetTable = [
      { type: 'Main JS', path: mainJsFile || 'None' },
      { type: 'Screen JS', path: `${screenName}/${screenJsFile}` },
      { type: 'Vendor JS', path: vendorJsFile ? `shared/${vendorJsFile}` : 'None' },
      { type: 'Auth0 ACUL JS', path: auth0AculJsFile ? `shared/${auth0AculJsFile}` : 'None' },
      { type: 'Dependencies JS', path: dependenciesJsFile ? `shared/${dependenciesJsFile}` : 'None' },
      { type: 'CSS Files', path: `${cssFiles.length} file(s)` }
    ];
    
    // Display asset table
    assetTable.forEach(asset => {
      logger.info(`• ${asset.type.padEnd(15)} ${asset.path}`);
    });
    
    // Create head tags configuration
    const headTags = createHeadTags(
      CONFIG.port, 
      mainJsFile, 
      screenJsFile, 
      screenName, 
      vendorJsFile,
      auth0AculJsFile,
      dependenciesJsFile,
      cssFiles
    );
    
    logger.info(`Created ${headTags.length} head tags for configuration`);
    
    // Create the full configuration payload
    const advancedConfig = {
      rendering_mode: "advanced",
      context_configuration: [
        "branding.settings",
        "branding.themes.default",
        "client.logo_uri",
        "client.description",
        "organization.display_name",
        "organization.branding",
        "screen.texts",
        "tenant.name",
        "tenant.friendly_name",
        "tenant.enabled_locales",
        "untrusted_data.submitted_form_data",
        "untrusted_data.authorization_params.ui_locales",
        "untrusted_data.authorization_params.login_hint",
        "untrusted_data.authorization_params.screen_hint"
      ],
      default_head_tags_disabled: false,
      head_tags: headTags
    };
    
    // Log configuration summary
    logger.data('Advanced mode configuration ready', {
      rendering_mode: advancedConfig.rendering_mode,
      head_tags_count: advancedConfig.head_tags.length,
      context_config_count: advancedConfig.context_configuration.length
    });
    
    return advancedConfig;
  } catch (error) {
    spinner.fail(`Failed to prepare assets: ${error.message}`);
    throw error;
  }
}

/**
 * Save the advanced mode configuration to a file
 * @param {string} screenName - The name of the screen
 * @param {Object} config - The advanced mode configuration
 * @param {string} [customPath] - Optional custom path for the settings file
 * @returns {Promise<string>} - The path to the saved settings file
 */
export async function saveAdvancedModeConfig(screenName, config, customPath = null) {
  // Determine where to save the file
  const settingsDir = customPath || path.join(process.cwd(), 'settings');
  
  // Ensure the directory exists
  if (!fs.existsSync(settingsDir)) {
    fs.mkdirSync(settingsDir, { recursive: true });
  }
  
  const settingsFileName = `${screenName}_advanced.json`;
  const settingsFilePath = path.join(settingsDir, settingsFileName);
  
  const spinner = ora({
    text: `💾 Saving configuration to ${settingsFilePath}...`,
    color: 'cyan'
  }).start();
  
  try {
    // Pretty-print the JSON for better readability
    fs.writeFileSync(settingsFilePath, JSON.stringify(config, null, 2));
    spinner.succeed(`Configuration saved to ${settingsFilePath}`);
    return settingsFilePath;
  } catch (error) {
    spinner.fail(`Failed to save configuration: ${error.message}`);
    throw error;
  }
} 