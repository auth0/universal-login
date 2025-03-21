/**
 * Color tokens for the application
 * These tokens should be used instead of hardcoded color values
 */

export const colors = {
  // Primary colors
  primary: {
    main: 'var(--color-primary, #635dff)',
    light: 'var(--color-primary-light, #8a85ff)',
    dark: 'var(--color-primary-dark, #4a45d1)',
    contrast: 'var(--color-primary-contrast, #ffffff)',
  },
  
  // Secondary colors
  secondary: {
    main: 'var(--color-secondary, #44c7f4)',
    light: 'var(--color-secondary-light, #7dd8f7)',
    dark: 'var(--color-secondary-dark, #2a9cc5)',
    contrast: 'var(--color-secondary-contrast, #ffffff)',
  },
  
  // Text colors
  text: {
    primary: 'var(--color-text-primary, #212121)',
    secondary: 'var(--color-text-secondary, #757575)',
    disabled: 'var(--color-text-disabled, #9e9e9e)',
    hint: 'var(--color-text-hint, #9e9e9e)',
  },
  
  // Background colors
  background: {
    default: 'var(--color-background, #ffffff)',
    paper: 'var(--color-background-paper, #f5f5f5)',
    disabled: 'var(--color-background-disabled, #e0e0e0)',
  },
  
  // Button colors
  button: {
    primary: {
      background: 'var(--color-primary-button, #635dff)',
      text: 'var(--color-primary-button-label, #ffffff)',
      border: 'var(--color-primary-button-border, transparent)',
      hover: 'var(--color-primary-button-hover, #4a45d1)',
    },
    secondary: {
      background: 'var(--color-secondary-button, #ffffff)',
      text: 'var(--color-secondary-button-label, #212121)',
      border: 'var(--color-secondary-button-border, #e0e0e0)',
      hover: 'var(--color-secondary-button-hover, #f5f5f5)',
    },
  },
  
  // Form colors
  form: {
    input: {
      background: 'var(--color-input-background, #ffffff)',
      text: 'var(--color-input-text, #212121)',
      border: 'var(--color-input-border, #e0e0e0)',
      focus: 'var(--color-input-focus, #635dff)',
      error: 'var(--color-input-error, #ff5252)',
    },
    label: 'var(--color-label, #757575)',
    placeholder: 'var(--color-placeholder, #9e9e9e)',
  },
  
  // Status colors
  status: {
    success: 'var(--color-success, #4caf50)',
    error: 'var(--color-error, #ff5252)',
    warning: 'var(--color-warning, #ff9800)',
    info: 'var(--color-info, #2196f3)',
  },
  
  // Misc
  divider: 'var(--color-divider, #e0e0e0)',
  overlay: 'var(--color-overlay, rgba(0, 0, 0, 0.5))',
  shadow: 'var(--color-shadow, rgba(0, 0, 0, 0.2))',
  focus: 'var(--color-focus, #635dff)',
  icons: 'var(--color-icons, #65676e)',
};

export default colors; 