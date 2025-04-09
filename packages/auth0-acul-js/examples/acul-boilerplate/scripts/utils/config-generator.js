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
    const assets = findAssets(screenName);
    
    spinner.succeed(`Assets discovered for ${screenName}`);
    
    // Log asset details
    logger.info(`Asset summary for ${screenName}:`);
    
    // Create a better asset summary
    const assetSummary = [
      {
        type: 'CSS Files',
        count: assets.cssFiles.length,
        details: assets.cssFiles.length <= 3 
          ? assets.cssFiles.map(f => `${f.location}/${f.path}`).join(', ')
          : `(${assets.cssFiles.length} files across multiple locations)`
      },
      {
        type: 'Screen JS',
        count: assets.screenJsFiles.length,
        details: assets.screenJsFiles.join(', ')
      },
      {
        type: 'Framework JS',
        count: assets.frameworkFiles.length,
        details: assets.frameworkFiles.length 
          ? `${assets.frameworkFiles.length} file(s)` 
          : 'None'
      },
      {
        type: 'Library JS',
        count: assets.libraryFiles.length,
        details: assets.libraryFiles.length 
          ? `${assets.libraryFiles.length} file(s)` 
          : 'None'
      },
      {
        type: 'Utility JS',
        count: assets.utilityFiles.length,
        details: assets.utilityFiles.length 
          ? `${assets.utilityFiles.length} file(s)` 
          : 'None'
      },
      {
        type: 'Main Entry',
        count: assets.mainJsFiles.length,
        details: assets.mainJsFiles.join(', ') || 'None'
      }
    ];
    
    // Display asset summary
    assetSummary.forEach(asset => {
      const countDisplay = `(${asset.count})`.padStart(5);
      logger.info(`• ${asset.type.padEnd(15)} ${countDisplay} ${asset.details}`);
    });
    
    // Create head tags configuration
    const headTags = createHeadTags(CONFIG.port, assets, screenName);
    
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