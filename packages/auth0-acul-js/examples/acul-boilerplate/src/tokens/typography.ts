/**
 * Typography tokens for the application
 * These tokens should be used instead of hardcoded typography values
 */

export const typography = {
  // Font families
  fontFamily: {
    primary: 'var(--font-family-primary, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    secondary: 'var(--font-family-secondary, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    monospace: 'var(--font-family-monospace, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace)',
  },
  
  // Font weights
  fontWeight: {
    light: 'var(--font-weight-light, 300)',
    regular: 'var(--font-weight-regular, 400)',
    medium: 'var(--font-weight-medium, 500)',
    semibold: 'var(--font-weight-semibold, 600)',
    bold: 'var(--font-weight-bold, 700)',
  },
  
  // Font sizes
  fontSize: {
    xs: 'var(--font-size-xs, 0.75rem)',     // 12px
    sm: 'var(--font-size-sm, 0.875rem)',    // 14px
    base: 'var(--font-size-base, 1rem)',    // 16px
    lg: 'var(--font-size-lg, 1.125rem)',    // 18px
    xl: 'var(--font-size-xl, 1.25rem)',     // 20px
    '2xl': 'var(--font-size-2xl, 1.5rem)',  // 24px
    '3xl': 'var(--font-size-3xl, 1.875rem)', // 30px
    '4xl': 'var(--font-size-4xl, 2.25rem)', // 36px
  },
  
  // Line heights
  lineHeight: {
    none: 'var(--line-height-none, 1)',
    tight: 'var(--line-height-tight, 1.25)',
    snug: 'var(--line-height-snug, 1.375)',
    normal: 'var(--line-height-normal, 1.5)',
    relaxed: 'var(--line-height-relaxed, 1.625)',
    loose: 'var(--line-height-loose, 2)',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: 'var(--letter-spacing-tighter, -0.05em)',
    tight: 'var(--letter-spacing-tight, -0.025em)',
    normal: 'var(--letter-spacing-normal, 0)',
    wide: 'var(--letter-spacing-wide, 0.025em)',
    wider: 'var(--letter-spacing-wider, 0.05em)',
    widest: 'var(--letter-spacing-widest, 0.1em)',
  },
  
  // Component-specific typography
  heading: {
    h1: {
      fontSize: 'var(--heading-h1-font-size, 2.25rem)',
      fontWeight: 'var(--heading-h1-font-weight, 700)',
      lineHeight: 'var(--heading-h1-line-height, 1.25)',
    },
    h2: {
      fontSize: 'var(--heading-h2-font-size, 1.875rem)',
      fontWeight: 'var(--heading-h2-font-weight, 700)',
      lineHeight: 'var(--heading-h2-line-height, 1.25)',
    },
    h3: {
      fontSize: 'var(--heading-h3-font-size, 1.5rem)',
      fontWeight: 'var(--heading-h3-font-weight, 600)',
      lineHeight: 'var(--heading-h3-line-height, 1.25)',
    },
    h4: {
      fontSize: 'var(--heading-h4-font-size, 1.25rem)',
      fontWeight: 'var(--heading-h4-font-weight, 600)',
      lineHeight: 'var(--heading-h4-line-height, 1.25)',
    },
    h5: {
      fontSize: 'var(--heading-h5-font-size, 1.125rem)',
      fontWeight: 'var(--heading-h5-font-weight, 600)',
      lineHeight: 'var(--heading-h5-line-height, 1.25)',
    },
    h6: {
      fontSize: 'var(--heading-h6-font-size, 1rem)',
      fontWeight: 'var(--heading-h6-font-weight, 600)',
      lineHeight: 'var(--heading-h6-line-height, 1.25)',
    },
  },
  
  button: {
    fontSize: 'var(--button-font-size, 0.875rem)',
    fontWeight: 'var(--button-font-weight, 500)',
    lineHeight: 'var(--button-line-height, 1.5)',
  },
  
  input: {
    fontSize: 'var(--input-font-size, 0.875rem)',
    fontWeight: 'var(--input-font-weight, 400)',
    lineHeight: 'var(--input-line-height, 1.5)',
  },
  
  label: {
    fontSize: 'var(--label-font-size, 0.75rem)',
    fontWeight: 'var(--label-font-weight, 500)',
    lineHeight: 'var(--label-line-height, 1.5)',
    letterSpacing: 'var(--label-letter-spacing, 0.025em)',
  },
};

export default typography; 