# getCurrentThemeOptions Example

This example demonstrates how to use the `getCurrentThemeOptions` function to access flattened theme configuration from the Auth0 Universal Login branding context.

## Basic Usage

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

// Get current theme options
const themeOptions = getCurrentThemeOptions();

if (themeOptions) {
  console.log('Theme options available:', themeOptions);
} else {
  console.log('No theme options available');
}
```

## Accessing Color Configuration

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

const themeOptions = getCurrentThemeOptions();

if (themeOptions?.colors) {
  console.log('Primary color:', themeOptions.colors.primary);
  console.log('Primary contrast:', themeOptions.colors.primaryContrast);
  console.log('Base focus color:', themeOptions.colors.baseFocusColor);
  console.log('Base hover color:', themeOptions.colors.baseHoverColor);
  
  // Apply colors to custom elements
  const customButton = document.querySelector('.custom-button');
  if (customButton) {
    customButton.style.backgroundColor = themeOptions.colors.primary;
    customButton.style.color = themeOptions.colors.primaryContrast;
  }
}
```

## Working with Fonts

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

const themeOptions = getCurrentThemeOptions();

if (themeOptions?.fonts) {
  console.log('Font family:', themeOptions.fonts.fontFamily);
  console.log('Font size:', themeOptions.fonts.fontSize);
  console.log('Font weight:', themeOptions.fonts.fontWeight);
  console.log('Line height:', themeOptions.fonts.lineHeight);
  
  // Apply font styles to custom elements
  const customText = document.querySelector('.custom-text');
  if (customText) {
    customText.style.fontFamily = themeOptions.fonts.fontFamily;
    customText.style.fontSize = themeOptions.fonts.fontSize;
    customText.style.fontWeight = themeOptions.fonts.fontWeight;
    customText.style.lineHeight = themeOptions.fonts.lineHeight;
  }
}
```

## Using Border Styles

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

const themeOptions = getCurrentThemeOptions();

if (themeOptions?.borders) {
  console.log('Border radius:', themeOptions.borders.borderRadius);
  console.log('Border width:', themeOptions.borders.borderWidth);
  console.log('Border color:', themeOptions.borders.borderColor);
  
  // Apply border styles to input fields
  const inputFields = document.querySelectorAll('.custom-input');
  inputFields.forEach(input => {
    input.style.borderRadius = themeOptions.borders.borderRadius;
    input.style.borderWidth = themeOptions.borders.borderWidth;
    input.style.borderColor = themeOptions.borders.borderColor;
  });
}
```

## Configuring Page Background

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

const themeOptions = getCurrentThemeOptions();

if (themeOptions?.pageBackground) {
  console.log('Background color:', themeOptions.pageBackground.backgroundColor);
  console.log('Background image URL:', themeOptions.pageBackground.backgroundImageUrl);
  console.log('Background size:', themeOptions.pageBackground.backgroundSize);
  console.log('Background position:', themeOptions.pageBackground.backgroundPosition);
  console.log('Background repeat:', themeOptions.pageBackground.backgroundRepeat);
  
  // Apply background to page
  document.body.style.backgroundColor = themeOptions.pageBackground.backgroundColor;
  
  if (themeOptions.pageBackground.backgroundImageUrl) {
    document.body.style.backgroundImage = `url(${themeOptions.pageBackground.backgroundImageUrl})`;
    document.body.style.backgroundSize = themeOptions.pageBackground.backgroundSize;
    document.body.style.backgroundPosition = themeOptions.pageBackground.backgroundPosition;
    document.body.style.backgroundRepeat = themeOptions.pageBackground.backgroundRepeat;
  }
}
```

## Widget Styling

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

const themeOptions = getCurrentThemeOptions();

if (themeOptions?.widget) {
  console.log('Widget background color:', themeOptions.widget.backgroundColor);
  console.log('Widget border radius:', themeOptions.widget.borderRadius);
  console.log('Widget box shadow:', themeOptions.widget.boxShadow);
  console.log('Widget padding:', themeOptions.widget.padding);
  console.log('Widget margin:', themeOptions.widget.margin);
  
  // Apply widget styles to custom container
  const widgetContainer = document.querySelector('.custom-widget');
  if (widgetContainer) {
    widgetContainer.style.backgroundColor = themeOptions.widget.backgroundColor;
    widgetContainer.style.borderRadius = themeOptions.widget.borderRadius;
    widgetContainer.style.boxShadow = themeOptions.widget.boxShadow;
    widgetContainer.style.padding = themeOptions.widget.padding;
    widgetContainer.style.margin = themeOptions.widget.margin;
  }
}
```

## Complete Theme Application Example

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

function applyCustomTheme() {
  const themeOptions = getCurrentThemeOptions();
  
  if (!themeOptions) {
    console.log('No theme options available, using default styles');
    return;
  }
  
  console.log('=== Applying Custom Theme ===');
  
  // Create CSS variables for easier management
  const root = document.documentElement;
  
  // Apply color variables
  if (themeOptions.colors) {
    root.style.setProperty('--primary-color', themeOptions.colors.primary);
    root.style.setProperty('--primary-contrast', themeOptions.colors.primaryContrast);
    root.style.setProperty('--base-focus-color', themeOptions.colors.baseFocusColor);
    root.style.setProperty('--base-hover-color', themeOptions.colors.baseHoverColor);
  }
  
  // Apply font variables
  if (themeOptions.fonts) {
    root.style.setProperty('--font-family', themeOptions.fonts.fontFamily);
    root.style.setProperty('--font-size', themeOptions.fonts.fontSize);
    root.style.setProperty('--font-weight', themeOptions.fonts.fontWeight);
    root.style.setProperty('--line-height', themeOptions.fonts.lineHeight);
  }
  
  // Apply border variables
  if (themeOptions.borders) {
    root.style.setProperty('--border-radius', themeOptions.borders.borderRadius);
    root.style.setProperty('--border-width', themeOptions.borders.borderWidth);
    root.style.setProperty('--border-color', themeOptions.borders.borderColor);
  }
  
  // Apply page background
  if (themeOptions.pageBackground) {
    document.body.style.backgroundColor = themeOptions.pageBackground.backgroundColor;
    
    if (themeOptions.pageBackground.backgroundImageUrl) {
      document.body.style.backgroundImage = `url(${themeOptions.pageBackground.backgroundImageUrl})`;
      document.body.style.backgroundSize = themeOptions.pageBackground.backgroundSize;
      document.body.style.backgroundPosition = themeOptions.pageBackground.backgroundPosition;
      document.body.style.backgroundRepeat = themeOptions.pageBackground.backgroundRepeat;
    }
  }
  
  // Apply widget styles to auth container
  const authContainer = document.querySelector('.auth0-lock-widget');
  if (authContainer && themeOptions.widget) {
    authContainer.style.backgroundColor = themeOptions.widget.backgroundColor;
    authContainer.style.borderRadius = themeOptions.widget.borderRadius;
    authContainer.style.boxShadow = themeOptions.widget.boxShadow;
    authContainer.style.padding = themeOptions.widget.padding;
    authContainer.style.margin = themeOptions.widget.margin;
  }
  
  console.log('Theme applied successfully');
}

// Apply theme when page loads
document.addEventListener('DOMContentLoaded', applyCustomTheme);
```

## Dynamic Theme Updates

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

// Function to watch for theme changes
function watchThemeChanges() {
  let currentTheme = getCurrentThemeOptions();
  
  setInterval(() => {
    const newTheme = getCurrentThemeOptions();
    
    // Simple comparison (in production, you might want a deep comparison)
    if (JSON.stringify(newTheme) !== JSON.stringify(currentTheme)) {
      console.log('Theme changed, reapplying styles');
      currentTheme = newTheme;
      applyCustomTheme();
    }
  }, 1000); // Check every second
}

function applyCustomTheme() {
  const themeOptions = getCurrentThemeOptions();
  
  if (themeOptions) {
    // Apply theme as shown in previous examples
    console.log('Applying updated theme');
  }
}
```

## Conditional Styling Based on Theme

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

function applyConditionalStyling() {
  const themeOptions = getCurrentThemeOptions();
  
  if (!themeOptions) {
    return;
  }
  
  // Example: Dark theme detection
  const isDarkTheme = themeOptions.colors?.primary === '#000000' || 
                     themeOptions.pageBackground?.backgroundColor === '#000000';
  
  if (isDarkTheme) {
    document.body.classList.add('dark-theme');
    console.log('Dark theme detected');
  } else {
    document.body.classList.add('light-theme');
    console.log('Light theme detected');
  }
  
  // Example: High contrast mode
  const isHighContrast = themeOptions.colors?.primaryContrast === '#ffffff' &&
                        themeOptions.colors?.primary === '#000000';
  
  if (isHighContrast) {
    document.body.classList.add('high-contrast');
    console.log('High contrast mode detected');
  }
}
```

## Custom CSS Generation

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

function generateCustomCSS() {
  const themeOptions = getCurrentThemeOptions();
  
  if (!themeOptions) {
    return '';
  }
  
  let css = '';
  
  // Generate CSS for colors
  if (themeOptions.colors) {
    css += `
      .custom-button {
        background-color: ${themeOptions.colors.primary};
        color: ${themeOptions.colors.primaryContrast};
        border: ${themeOptions.borders?.borderWidth || '1px'} solid ${themeOptions.colors.primary};
      }
      
      .custom-button:hover {
        background-color: ${themeOptions.colors.baseHoverColor || themeOptions.colors.primary};
      }
      
      .custom-button:focus {
        outline: 2px solid ${themeOptions.colors.baseFocusColor || themeOptions.colors.primary};
      }
    `;
  }
  
  // Generate CSS for fonts
  if (themeOptions.fonts) {
    css += `
      .custom-text {
        font-family: ${themeOptions.fonts.fontFamily};
        font-size: ${themeOptions.fonts.fontSize};
        font-weight: ${themeOptions.fonts.fontWeight};
        line-height: ${themeOptions.fonts.lineHeight};
      }
    `;
  }
  
  // Inject CSS into page
  const styleElement = document.createElement('style');
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
  
  return css;
}

// Generate and apply custom CSS
generateCustomCSS();
```

## Error Handling and Fallbacks

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

function applyThemeWithFallbacks() {
  try {
    const themeOptions = getCurrentThemeOptions();
    
    if (!themeOptions) {
      console.log('No theme options available, using fallback styles');
      applyFallbackTheme();
      return;
    }
    
    // Apply primary color with fallback
    const primaryColor = themeOptions.colors?.primary || '#007bff';
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    
    // Apply font family with fallback
    const fontFamily = themeOptions.fonts?.fontFamily || 'Arial, sans-serif';
    document.documentElement.style.setProperty('--font-family', fontFamily);
    
    // Apply border radius with fallback
    const borderRadius = themeOptions.borders?.borderRadius || '4px';
    document.documentElement.style.setProperty('--border-radius', borderRadius);
    
    console.log('Theme applied with fallbacks');
    
  } catch (error) {
    console.error('Error applying theme:', error);
    applyFallbackTheme();
  }
}

function applyFallbackTheme() {
  // Default theme values
  const fallbackTheme = {
    '--primary-color': '#007bff',
    '--primary-contrast': '#ffffff',
    '--font-family': 'Arial, sans-serif',
    '--font-size': '14px',
    '--border-radius': '4px',
    '--border-width': '1px'
  };
  
  Object.entries(fallbackTheme).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value);
  });
  
  console.log('Fallback theme applied');
}
```

## Return Type Structure

The `getCurrentThemeOptions()` function returns a `FlattenedTheme` object with the following structure:

```typescript
interface FlattenedTheme {
  colors: {
    primary: string;
    primaryContrast: string;
    baseFocusColor: string;
    baseHoverColor: string;
    // ... other color properties
  };
  
  fonts: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    // ... other font properties
  };
  
  borders: {
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
    // ... other border properties
  };
  
  pageBackground: {
    backgroundColor: string;
    backgroundImageUrl: string;
    backgroundSize: string;
    backgroundPosition: string;
    backgroundRepeat: string;
    // ... other background properties
  };
  
  widget: {
    backgroundColor: string;
    borderRadius: string;
    boxShadow: string;
    padding: string;
    margin: string;
    // ... other widget properties
  };
}
```

## Use Cases

### Custom Login Form Styling

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

function styleLoginForm() {
  const themeOptions = getCurrentThemeOptions();
  
  if (themeOptions) {
    const loginForm = document.querySelector('.custom-login-form');
    
    if (loginForm && themeOptions.widget) {
      loginForm.style.backgroundColor = themeOptions.widget.backgroundColor;
      loginForm.style.borderRadius = themeOptions.widget.borderRadius;
      loginForm.style.padding = themeOptions.widget.padding;
      loginForm.style.boxShadow = themeOptions.widget.boxShadow;
    }
    
    // Style input fields
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
      if (themeOptions.borders) {
        input.style.borderRadius = themeOptions.borders.borderRadius;
        input.style.borderWidth = themeOptions.borders.borderWidth;
        input.style.borderColor = themeOptions.borders.borderColor;
      }
      
      if (themeOptions.fonts) {
        input.style.fontFamily = themeOptions.fonts.fontFamily;
        input.style.fontSize = themeOptions.fonts.fontSize;
      }
    });
  }
}
```

### Brand-Consistent Buttons

```typescript
import { getCurrentThemeOptions } from '@auth0/auth0-acul-js';

function createBrandedButton(text: string, onClick: () => void) {
  const themeOptions = getCurrentThemeOptions();
  const button = document.createElement('button');
  
  button.textContent = text;
  button.onclick = onClick;
  
  if (themeOptions?.colors) {
    button.style.backgroundColor = themeOptions.colors.primary;
    button.style.color = themeOptions.colors.primaryContrast;
    button.style.border = 'none';
  }
  
  if (themeOptions?.borders) {
    button.style.borderRadius = themeOptions.borders.borderRadius;
  }
  
  if (themeOptions?.fonts) {
    button.style.fontFamily = themeOptions.fonts.fontFamily;
    button.style.fontSize = themeOptions.fonts.fontSize;
    button.style.fontWeight = themeOptions.fonts.fontWeight;
  }
  
  // Add hover effect
  button.addEventListener('mouseenter', () => {
    if (themeOptions?.colors?.baseHoverColor) {
      button.style.backgroundColor = themeOptions.colors.baseHoverColor;
    }
  });
  
  button.addEventListener('mouseleave', () => {
    if (themeOptions?.colors?.primary) {
      button.style.backgroundColor = themeOptions.colors.primary;
    }
  });
  
  return button;
}
```

## Tips

1. **Always check for null** - The function returns `null` if no branding is available
2. **Use fallback values** - Provide default styles when theme options are unavailable
3. **Cache theme data** - Consider caching the result if accessing frequently
4. **CSS Custom Properties** - Use CSS variables for easier theme management
5. **Watch for changes** - Theme may update during the authentication flow
6. **Test without branding** - Ensure your application works when no theme is configured
7. **Performance considerations** - Apply themes efficiently to avoid layout thrashing
