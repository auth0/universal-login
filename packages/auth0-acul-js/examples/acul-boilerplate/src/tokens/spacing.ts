/**
 * Spacing tokens for the application
 * These tokens should be used instead of hardcoded spacing values
 */

export const spacing = {
  // Base unit in pixels
  unit: 4,
  
  // Spacing values
  xs: 'var(--spacing-xs, 4px)',
  sm: 'var(--spacing-sm, 8px)',
  md: 'var(--spacing-md, 16px)',
  lg: 'var(--spacing-lg, 24px)',
  xl: 'var(--spacing-xl, 32px)',
  xxl: 'var(--spacing-xxl, 48px)',
  
  // Component-specific spacing
  button: {
    paddingX: 'var(--spacing-button-x, 16px)',
    paddingY: 'var(--spacing-button-y, 8px)',
    gap: 'var(--spacing-button-gap, 8px)',
  },
  
  input: {
    paddingX: 'var(--spacing-input-x, 12px)',
    paddingY: 'var(--spacing-input-y, 8px)',
    marginBottom: 'var(--spacing-input-margin-bottom, 16px)',
  },
  
  form: {
    gap: 'var(--spacing-form-gap, 16px)',
    marginBottom: 'var(--spacing-form-margin-bottom, 24px)',
  },
  
  // Helper function to get spacing in pixels
  getSpacing: (multiplier: number) => `${multiplier * 4}px`,
};

export default spacing; 