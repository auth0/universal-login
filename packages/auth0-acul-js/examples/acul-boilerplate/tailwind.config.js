import { colors } from './src/tokens/colors';
import { spacing } from './src/tokens/spacing';
import { typography } from './src/tokens/typography';

// Helper to extract default value from var(--css-var, defaultValue)
const extractDefault = (cssVarString) => {
  if (!cssVarString || typeof cssVarString !== 'string') return cssVarString;
  const match = cssVarString.match(/,(?![^()]*\))\s*([^)]+)\)$/);
  return match ? match[1].trim() : cssVarString;
};

// Extract raw values from tokens for static Tailwind theme config
// We keep the 'var()' for values intended to be dynamically set by ThemeProvider
const themeColors = {
  primary: {
    main: 'var(--color-primary, #635dff)', // Dynamic
    light: 'var(--color-primary-light, rgba(99, 93, 255, 0.1))', // Dynamic (derived)
    dark: 'var(--color-primary-dark, rgba(99, 93, 255, 0.8))', // Dynamic (derived)
    contrast: extractDefault(colors.primary.contrast),
  },
  secondary: {
    main: extractDefault(colors.secondary.main),
    light: extractDefault(colors.secondary.light),
    dark: extractDefault(colors.secondary.dark),
    contrast: extractDefault(colors.secondary.contrast),
  },
  text: {
    primary: extractDefault(colors.text.primary),
    secondary: extractDefault(colors.text.secondary),
    disabled: extractDefault(colors.text.disabled),
    hint: extractDefault(colors.text.hint),
    // Link color often depends on primary, keep dynamic potential
    links: 'var(--color-links, var(--color-primary, #635dff))',
  },
  background: {
    default: extractDefault(colors.background.default),
    paper: extractDefault(colors.background.paper),
    disabled: extractDefault(colors.background.disabled),
    // Page background is dynamic
    page: 'var(--color-page-background, #f2f2f2)',
  },
  button: {
    primary: {
      // Button background often depends on primary, keep dynamic
      background: 'var(--color-primary-button, var(--color-primary, #635dff))',
      text: 'var(--color-primary-button-label, #ffffff)', // Often contrast of primary
      border: extractDefault(colors.button.primary.border),
      hover: 'var(--color-primary-button-hover, var(--color-primary-dark, #4a45d1))', // Often derived from primary
    },
    secondary: {
      background: extractDefault(colors.button.secondary.background),
      text: extractDefault(colors.button.secondary.text),
      border: extractDefault(colors.button.secondary.border),
      hover: extractDefault(colors.button.secondary.hover),
    },
  },
  form: {
    input: {
      background: extractDefault(colors.form.input.background),
      text: extractDefault(colors.form.input.text),
      border: extractDefault(colors.form.input.border),
      // Focus color often depends on primary, keep dynamic
      focus: 'var(--color-input-focus, var(--color-primary, #635dff))',
      error: extractDefault(colors.form.input.error),
    },
    label: extractDefault(colors.form.label),
    placeholder: extractDefault(colors.form.placeholder),
  },
  status: {
    success: extractDefault(colors.status.success),
    error: extractDefault(colors.status.error),
    warning: extractDefault(colors.status.warning),
    info: extractDefault(colors.status.info),
  },
  ui: { // Keep existing ui structure for compatibility or rename as needed
    // Renamed some keys to match extracted tokens
    'page-bg': 'var(--color-page-background, #f2f2f2)', // Dynamic
    background: extractDefault(colors.background.default), // Reuse from background section
    border: extractDefault(colors.form.input.border), // Reuse from form border
    'input-border': extractDefault(colors.form.input.border),
    'input-bg': extractDefault(colors.form.input.background),
    icons: extractDefault(colors.icons),
    error: extractDefault(colors.status.error), // Reuse from status
    success: extractDefault(colors.status.success), // Reuse from status
    divider: extractDefault(colors.divider),
    overlay: extractDefault(colors.overlay),
    shadow: extractDefault(colors.shadow),
    focus: 'var(--color-focus, var(--color-primary, #635dff))', // Dynamic focus
  },
};

const themeSpacing = {
  ...spacing, // Include all base spacing like xs, sm, md etc.
  // Extract defaults for component-specific, though using base (md, lg) might be better
  'button-x': extractDefault(spacing.button.paddingX),
  'button-y': extractDefault(spacing.button.paddingY),
  'input-x': extractDefault(spacing.input.paddingX),
  'input-y': extractDefault(spacing.input.paddingY),
  // Keep dynamic widget padding from original config? Or use tokens?
  // 'widget-padding-x': 'var(--widget-padding-x, 2.5rem)',
  // 'widget-padding-y': 'var(--widget-padding-y, 2rem)',
};

// Convert token font sizes/weights to raw values
const themeFontSizes = Object.keys(typography.fontSize).reduce((acc, key) => {
  acc[key] = extractDefault(typography.fontSize[key]);
  return acc;
}, {});

const themeFontWeights = Object.keys(typography.fontWeight).reduce((acc, key) => {
  acc[key] = extractDefault(typography.fontWeight[key]);
  return acc;
}, {});

const themeLineHeights = Object.keys(typography.lineHeight).reduce((acc, key) => {
  acc[key] = extractDefault(typography.lineHeight[key]);
  return acc;
}, {});

const themeLetterSpacing = Object.keys(typography.letterSpacing).reduce((acc, key) => {
    acc[key] = extractDefault(typography.letterSpacing[key]);
    return acc;
}, {});


/** @type {import('tailwindcss').Config} */
export default {
  // Configure content paths for purging (Note: Less relevant for v4 automatic detection, but keep for clarity/potential fallback)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add paths to screen tester if it uses Tailwind classes
    // "./screen-tester/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Use processed tokens for the theme
      colors: themeColors,
      spacing: themeSpacing,
      fontSize: themeFontSizes,
      fontWeight: themeFontWeights,
      lineHeight: themeLineHeights,
      letterSpacing: themeLetterSpacing,

      // Keep relevant customizations from original config
      borderRadius: {
        // Use values from variables.css defaults for now
        button: 'var(--border-button-radius, 3px)',
        input: 'var(--border-input-radius, 3px)',
        widget: 'var(--border-widget-radius, 5px)',
        tooltip: 'var(--tooltip-border-radius, 4px)', // From common.css
      },
      borderWidth: {
        // Use values from variables.css defaults for now
        button: 'var(--border-button-weight, 1px)',
        input: 'var(--border-input-weight, 1px)',
        widget: 'var(--border-widget-weight, 0px)',
      },
      boxShadow: {
        widget: 'var(--widget-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))',
      },
      opacity: {
        'disabled': 'var(--opacity-disabled, 0.5)',
      },
      transitionProperty: {
        'auth0': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      },
      transitionDuration: {
        'auth0': 'var(--transition-duration, 100ms)',
      },
       // Keep simple width/height helpers if needed
      width: {
        '5': '1.25rem', // 20px
      },
      height: {
        '5': '1.25rem', // 20px
      },
    },
  },
  plugins: [],
};
