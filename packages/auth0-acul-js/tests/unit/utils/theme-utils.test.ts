import {
  flattenColors,
  flattenFonts,
  flattenBorders,
  flattenPageBackground,
  flattenWidget,
} from '../../../src/utils/branding-theme';

describe('Theme Utils', () => {
  describe('flattenColors', () => {
    it('should return theme colors when no settings colors provided', () => {
      const themeColors = {
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
      };

      const result = flattenColors(themeColors);

      expect(result).toEqual({
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
      });
    });

    it('should merge theme colors with settings primary color', () => {
      const themeColors = {
        primary: '#007bff',
        secondary: '#6c757d',
      };
      const settingsColors = {
        primary: '#ff6b35',
      };

      const result = flattenColors(themeColors, settingsColors);

      expect(result).toEqual({
        primary: '#ff6b35', // overridden by settings
        secondary: '#6c757d',
      });
    });

    it('should handle string pageBackground from settings', () => {
      const themeColors = {
        primary: '#007bff',
        pageBackground: '#ffffff',
      };
      const settingsColors = {
        pageBackground: '#f8f9fa',
      };

      const result = flattenColors(themeColors, settingsColors);

      expect(result).toEqual({
        primary: '#007bff',
        pageBackground: '#f8f9fa',
      });
    });

    it('should handle gradient pageBackground from settings', () => {
      const themeColors = {
        primary: '#007bff',
      };
      const settingsColors = {
        pageBackground: {
          type: 'gradient',
          start: '#ff6b35',
          end: '#f7931e',
          angleDegree: 45,
        },
      };

      const result = flattenColors(themeColors, settingsColors);

      expect(result).toEqual({
        primary: '#007bff',
        pageBackground: 'linear-gradient(45deg, #ff6b35, #f7931e)',
      });
    });

    it('should handle both primary and pageBackground overrides', () => {
      const themeColors = {
        primary: '#007bff',
        secondary: '#6c757d',
        pageBackground: '#ffffff',
      };
      const settingsColors = {
        primary: '#ff6b35',
        pageBackground: '#f8f9fa',
      };

      const result = flattenColors(themeColors, settingsColors);

      expect(result).toEqual({
        primary: '#ff6b35',
        secondary: '#6c757d',
        pageBackground: '#f8f9fa',
      });
    });

    it('should handle empty settings colors', () => {
      const themeColors = {
        primary: '#007bff',
        secondary: '#6c757d',
      };
      const settingsColors = {};

      const result = flattenColors(themeColors, settingsColors);

      expect(result).toEqual({
        primary: '#007bff',
        secondary: '#6c757d',
      });
    });

    it('should handle undefined settings colors', () => {
      const themeColors = {
        primary: '#007bff',
        secondary: '#6c757d',
      };

      const result = flattenColors(themeColors, undefined);

      expect(result).toEqual({
        primary: '#007bff',
        secondary: '#6c757d',
      });
    });
  });

  describe('flattenFonts', () => {
    it('should preserve string font values', () => {
      const themeFonts = {
        family: 'Arial, sans-serif',
        size: '14px',
        weight: 'bold',
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        family: 'Arial, sans-serif',
        size: '14px',
        weight: 'bold',
      });
    });

    it('should preserve string and boolean values', () => {
      const themeFonts = {
        family: 'Arial, sans-serif',
        bold: true,
        italic: false,
        size: '14px', // Keep as string to match function signature
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        family: 'Arial, sans-serif',
        bold: true,
        italic: false,
        size: '14px',
      });
    });

    it('should preserve object values', () => {
      const fontObject = {
        family: 'Roboto',
        weight: 'normal', // Changed from number to string
        style: 'normal',
      };
      const themeFonts = {
        primary: fontObject,
        fallback: 'serif',
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        primary: fontObject,
        fallback: 'serif',
      });
    });

    it('should parse JSON string values', () => {
      const themeFonts = {
        config: '{"family": "Helvetica", "weight": "light"}', // Changed number to string
        family: 'Arial',
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        config: { family: 'Helvetica', weight: 'light' },
        family: 'Arial',
      });
    });

    it('should handle invalid JSON strings as regular strings', () => {
      const themeFonts = {
        invalid: '{"invalid": json}', // malformed JSON
        family: 'Arial',
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        invalid: '{"invalid": json}',
        family: 'Arial',
      });
    });

    it('should handle string that looks like JSON but is not', () => {
      const themeFonts = {
        notJson: '{font-family: Arial}', // CSS-like syntax, not JSON
        family: 'Arial',
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        notJson: '{font-family: Arial}',
        family: 'Arial',
      });
    });

    it('should handle mixed data types', () => {
      const themeFonts = {
        string: 'Arial',
        size: '16px', // Changed from number to string
        boolean: true,
        object: { weight: 'bold' },
        jsonString: '{"parsed": true}',
      };

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({
        string: 'Arial',
        size: '16px',
        boolean: true,
        object: { weight: 'bold' },
        jsonString: { parsed: true },
      });
    });

    it('should handle empty object', () => {
      const themeFonts = {};

      const result = flattenFonts(themeFonts);

      expect(result).toEqual({});
    });
  });

  describe('flattenBorders', () => {
    it('should return the same border configuration as input', () => {
      const themeBorders = {
        radius: '4px',
        width: 2,
        style: 'solid',
        color: '#dee2e6',
        rounded: true,
      };

      const result = flattenBorders(themeBorders);

      expect(result).toEqual({
        radius: '4px',
        width: 2,
        style: 'solid',
        color: '#dee2e6',
        rounded: true,
      });
    });

    it('should handle string values', () => {
      const themeBorders = {
        radius: '8px',
        style: 'dashed',
        color: '#007bff',
      };

      const result = flattenBorders(themeBorders);

      expect(result).toEqual({
        radius: '8px',
        style: 'dashed',
        color: '#007bff',
      });
    });

    it('should handle number values', () => {
      const themeBorders = {
        width: 1,
        radius: 0,
        opacity: 0.8,
      };

      const result = flattenBorders(themeBorders);

      expect(result).toEqual({
        width: 1,
        radius: 0,
        opacity: 0.8,
      });
    });

    it('should handle boolean values', () => {
      const themeBorders = {
        rounded: true,
        shadow: false,
        visible: true,
      };

      const result = flattenBorders(themeBorders);

      expect(result).toEqual({
        rounded: true,
        shadow: false,
        visible: true,
      });
    });

    it('should handle empty object', () => {
      const themeBorders = {};

      const result = flattenBorders(themeBorders);

      expect(result).toEqual({});
    });
  });

  describe('flattenPageBackground', () => {
    it('should return theme background when no settings provided', () => {
      const themeBackground = {
        color: '#ffffff',
        image: 'url(background.jpg)',
        repeat: 'no-repeat',
      };

      const result = flattenPageBackground(themeBackground);

      expect(result).toEqual({
        color: '#ffffff',
        image: 'url(background.jpg)',
        repeat: 'no-repeat',
      });
    });

    it('should override with string pageBackground from settings', () => {
      const themeBackground = {
        color: '#ffffff',
        image: 'url(background.jpg)',
      };
      const settingsPageBackground = '#f8f9fa';

      const result = flattenPageBackground(themeBackground, settingsPageBackground);

      expect(result).toEqual({
        color: '#ffffff',
        image: 'url(background.jpg)',
        background_color: '#f8f9fa',
      });
    });

    it('should handle gradient pageBackground from settings', () => {
      const themeBackground = {
        color: '#ffffff',
      };
      const settingsPageBackground = {
        type: 'gradient',
        start: '#ff6b35',
        end: '#f7931e',
        angleDegree: 90,
      };

      const result = flattenPageBackground(themeBackground, settingsPageBackground);

      expect(result).toEqual({
        color: '#ffffff',
        background_color: 'linear-gradient(90deg, #ff6b35, #f7931e)',
      });
    });

    it('should handle gradient with different angle', () => {
      const themeBackground = {
        position: 'center',
      };
      const settingsPageBackground = {
        type: 'gradient',
        start: '#667eea',
        end: '#764ba2',
        angleDegree: 135,
      };

      const result = flattenPageBackground(themeBackground, settingsPageBackground);

      expect(result).toEqual({
        position: 'center',
        background_color: 'linear-gradient(135deg, #667eea, #764ba2)',
      });
    });

    it('should handle undefined settings', () => {
      const themeBackground = {
        color: '#ffffff',
        size: 'cover',
      };

      const result = flattenPageBackground(themeBackground, undefined);

      expect(result).toEqual({
        color: '#ffffff',
        size: 'cover',
      });
    });

    it('should handle empty theme background', () => {
      const themeBackground = {};
      const settingsPageBackground = '#f0f0f0';

      const result = flattenPageBackground(themeBackground, settingsPageBackground);

      expect(result).toEqual({
        background_color: '#f0f0f0',
      });
    });
  });

  describe('flattenWidget', () => {
    it('should return the same widget configuration as input', () => {
      const themeWidget = {
        padding: '16px',
        margin: '8px',
        borderRadius: '4px',
        width: 400,
        height: 300,
        opacity: 0.9,
      };

      const result = flattenWidget(themeWidget);

      expect(result).toEqual({
        padding: '16px',
        margin: '8px',
        borderRadius: '4px',
        width: 400,
        height: 300,
        opacity: 0.9,
      });
    });

    it('should handle string values', () => {
      const themeWidget = {
        background: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontSize: '14px',
      };

      const result = flattenWidget(themeWidget);

      expect(result).toEqual({
        background: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontSize: '14px',
      });
    });

    it('should handle number values', () => {
      const themeWidget = {
        width: 500,
        height: 600,
        zIndex: 1000,
        opacity: 1,
      };

      const result = flattenWidget(themeWidget);

      expect(result).toEqual({
        width: 500,
        height: 600,
        zIndex: 1000,
        opacity: 1,
      });
    });

    it('should handle mixed string and number values', () => {
      const themeWidget = {
        padding: '20px',
        width: 300,
        background: '#f8f9fa',
        borderWidth: 2,
        borderColor: '#dee2e6',
      };

      const result = flattenWidget(themeWidget);

      expect(result).toEqual({
        padding: '20px',
        width: 300,
        background: '#f8f9fa',
        borderWidth: 2,
        borderColor: '#dee2e6',
      });
    });

    it('should handle empty object', () => {
      const themeWidget = {};

      const result = flattenWidget(themeWidget);

      expect(result).toEqual({});
    });
  });
});
