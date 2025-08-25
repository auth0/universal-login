// Theme utility functions for processing branding data

import type { BrandingSettings } from '../../interfaces/models/branding';

/**
 * Flattens and merges theme colors with settings colors
 * @param themeColors - Colors from the theme configuration
 * @param settingsColors - Colors from branding settings
 * @returns Merged color configuration
 */
export function flattenColors(
  themeColors: Record<string, string>,
  settingsColors?: BrandingSettings['colors']
): Record<string, string> {
  const result: Record<string, string> = { ...themeColors };

  if (settingsColors?.primary) {
    result.primary = settingsColors.primary;
  }

  if (settingsColors?.pageBackground) {
    if (typeof settingsColors.pageBackground === 'string') {
      result.pageBackground = settingsColors.pageBackground;
    } else {
      // Convert gradient object to CSS string or handle as needed
      result.pageBackground = `linear-gradient(${settingsColors.pageBackground.angleDegree}deg, ${settingsColors.pageBackground.start}, ${settingsColors.pageBackground.end})`;
    }
  }

  return result;
}

/**
 * Processes and returns theme fonts configuration
 * @param themeFonts - Font configuration from theme
 * @returns Processed font configuration
 */

export function flattenFonts(
  themeFonts: Record<string, string | boolean | object>
): Record<string, string | number | boolean | object> {
  const result: Record<string, string | number | boolean | object> = {};

  for (const [key, value] of Object.entries(themeFonts)) {
    if (typeof value === 'string') {
      // Check if the string is actually a JSON object that needs parsing
      if (value.startsWith('{') && value.endsWith('}')) {
        try {
          result[key] = JSON.parse(value) as object;
        } catch {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      result[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      // Keep objects as objects
      result[key] = value;
    }
  }

  return result;
}


/**
 * Processes and returns theme borders configuration
 * @param themeBorders - Border configuration from theme
 * @returns Processed border configuration
 */
export function flattenBorders(themeBorders: Record<string, string | boolean | number>): Record<string, string | boolean | number> {
  return themeBorders;
}

/**
 * Flattens and merges theme page background with settings background
 * @param themeBackground - Page background from theme
 * @param settingsPageBackground - Page background settings override
 * @returns Merged background configuration
 */
export function flattenPageBackground(
  themeBackground: Record<string, string>,
  settingsPageBackground?: string | { type: string; start: string; end: string; angleDegree: number }
): Record<string, string> {
  const result: Record<string, string> = { ...themeBackground };

  if (settingsPageBackground) {
    if (typeof settingsPageBackground === 'string') {
      result.background_color = settingsPageBackground;
    } else {
      // Convert gradient object to CSS string
      result.background_color = `linear-gradient(${settingsPageBackground.angleDegree}deg, ${settingsPageBackground.start}, ${settingsPageBackground.end})`;
    }
  }

  return result;
}

/**
 * Processes and returns theme widget configuration
 * @param themeWidget - Widget configuration from theme
 * @returns Processed widget configuration
 */
export function flattenWidget(themeWidget: Record<string, string | number>): Record<string, string | number> {
  return themeWidget;
}

