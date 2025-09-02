# getCurrentScreenOptions Example

This example demonstrates how to use the `getCurrentScreenOptions` function to access authentication context data in your Auth0 Universal Login customizations.

## Basic Usage

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

// Get all current screen context information
const screenOptions = getCurrentScreenOptions();
console.log('Screen options:', screenOptions);
```

## Accessing Client Information

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Check if client information is available
if (screenOptions.client) {
  console.log('Client ID:', screenOptions.client.id);
  
  // Access client metadata (if available)
  if (screenOptions.client.metadata) {
    console.log('Client metadata:', screenOptions.client.metadata);
  }
}
```

## Checking Current Screen

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Get the current screen name
if (screenOptions.screen) {
  console.log('Current screen:', screenOptions.screen.name);
  
  // Conditional logic based on screen
  switch (screenOptions.screen.name) {
    case 'login':
      console.log('User is on login screen');
      break;
    case 'signup':
      console.log('User is on signup screen');
      break;
    case 'mfa-challenge':
      console.log('User is on MFA challenge screen');
      break;
    default:
      console.log('Unknown screen:', screenOptions.screen.name);
  }
}
```

## Handling Transaction Errors

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Check for transaction errors
if (screenOptions.transaction?.errors) {
  console.log('Transaction has errors:');
  
  screenOptions.transaction.errors.forEach((error, index) => {
    console.error(`Error ${index + 1}:`, error);
  });
  
  // You can also check specific error types
  const hasInvalidCredentials = screenOptions.transaction.errors.some(
    error => error.code === 'invalid_user_password'
  );
  
  if (hasInvalidCredentials) {
    console.log('Invalid credentials detected');
  }
} else {
  console.log('No transaction errors');
}
```

## Accessing Organization Context

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Check organization information
if (screenOptions.organization) {
  console.log('Organization ID:', screenOptions.organization.id);
  
  // Access organization metadata
  if (screenOptions.organization.metadata) {
    console.log('Organization metadata:', screenOptions.organization.metadata);
  }
} else {
  console.log('No organization context available');
}
```

## Working with Locales

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Check available locales from tenant
if (screenOptions.tenant?.enabledLocales) {
  console.log('Available locales:', screenOptions.tenant.enabledLocales);
  
  // Check if a specific locale is supported
  const isSpanishSupported = screenOptions.tenant.enabledLocales.includes('es');
  console.log('Spanish supported:', isSpanishSupported);
  
  // Get current transaction locale
  if (screenOptions.transaction?.locale) {
    console.log('Current locale:', screenOptions.transaction.locale);
  }
}
```

## Accessing Authorization Parameters

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Access untrusted authorization parameters
if (screenOptions.untrustedData?.authorizationParams) {
  console.log('Authorization params:', screenOptions.untrustedData.authorizationParams);
  
  // Example: Check for specific parameters
  const params = screenOptions.untrustedData.authorizationParams;
  
  if (params.scope) {
    console.log('Requested scopes:', params.scope);
  }
  
  if (params.audience) {
    console.log('Target audience:', params.audience);
  }
}
```

## Complete Example with Error Handling

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

function handleScreenOptions() {
  try {
    const screenOptions = getCurrentScreenOptions();
    
    // Log current context
    console.log('=== Auth0 Screen Context ===');
    
    // Client info
    if (screenOptions.client) {
      console.log(`Client: ${screenOptions.client.id}`);
    }
    
    // Current screen
    if (screenOptions.screen) {
      console.log(`Screen: ${screenOptions.screen.name}`);
    }
    
    // Organization
    if (screenOptions.organization) {
      console.log(`Organization: ${screenOptions.organization.id}`);
    }
    
    // Transaction state
    if (screenOptions.transaction) {
      console.log(`Transaction State: ${screenOptions.transaction.state}`);
      console.log(`Locale: ${screenOptions.transaction.locale}`);
      
      // Handle errors
      if (screenOptions.transaction.errors && screenOptions.transaction.errors.length > 0) {
        console.warn('Transaction Errors:');
        screenOptions.transaction.errors.forEach(error => {
          console.error(`- ${error.code}: ${error.message}`);
        });
      }
    }
    
    // Tenant info
    if (screenOptions.tenant) {
      console.log(`Enabled Locales: ${screenOptions.tenant.enabledLocales.join(', ')}`);
    }
    
    // Prompt context
    if (screenOptions.prompt) {
      console.log(`Prompt: ${screenOptions.prompt.name}`);
    }
    
    return screenOptions;
    
  } catch (error) {
    console.error('Error getting screen options:', error);
    return null;
  }
}

// Usage
const options = handleScreenOptions();
```

## Use Cases

### Conditional UI Rendering

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

const screenOptions = getCurrentScreenOptions();

// Show different content based on screen
if (screenOptions.screen?.name === 'login') {
  // Add custom login screen enhancements
  document.querySelector('.custom-login-help')?.classList.remove('hidden');
}

// Show organization branding
if (screenOptions.organization) {
  // Apply organization-specific styling
  document.body.setAttribute('data-org', screenOptions.organization.id);
}
```

### Error Display

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

function displayErrors() {
  const screenOptions = getCurrentScreenOptions();
  const errorContainer = document.querySelector('#custom-errors');
  
  if (screenOptions.transaction?.errors && errorContainer) {
    const errorMessages = screenOptions.transaction.errors.map(error => 
      `<div class="error-message">${error.message}</div>`
    ).join('');
    
    errorContainer.innerHTML = errorMessages;
  }
}
```

### Locale-based Content

```typescript
import { getCurrentScreenOptions } from '@auth0/auth0-acul-js';

function showLocalizedContent() {
  const screenOptions = getCurrentScreenOptions();
  
  if (screenOptions.transaction?.locale) {
    const locale = screenOptions.transaction.locale;
    
    // Load locale-specific content
    const welcomeMessage = getLocalizedMessage('welcome', locale);
    document.querySelector('#welcome-text').textContent = welcomeMessage;
  }
}
```

## Return Type Structure

The `getCurrentScreenOptions()` function returns an object with the following structure:

```typescript
interface CurrentScreenOptions {
  client: {
    id: string;
    metadata: any | null;
  } | null;
  
  organization: {
    id: string;
    metadata: any | null;
  } | null;
  
  prompt: {
    name: string;
  } | null;
  
  screen: {
    name: string;
  } | null;
  
  tenant: {
    enabledLocales: string[];
  } | null;
  
  transaction: {
    errors: Error[] | null;
    state: string;
    locale: string;
  } | null;
  
  untrustedData: {
    authorizationParams: any | null;
  } | null;
}
```

## Tips

1. **Always check for null values** - Most properties can be null depending on the authentication state
2. **Use optional chaining** - Use `?.` operator to safely access nested properties
3. **Handle errors gracefully** - Wrap usage in try-catch blocks for production code
4. **Cache results when appropriate** - The function reads from context, so consider caching if called frequently
5. **Use TypeScript** - The function provides full type safety when used with TypeScript
