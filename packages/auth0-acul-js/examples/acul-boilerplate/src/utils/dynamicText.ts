/**
 * Utility functions for handling dynamic text based on allowed identifiers
 */

/**
 * Get the appropriate placeholder text based on allowed identifiers
 * @param allowedIdentifiers Array of allowed identifier types (email, phone, username)
 * @param texts Text configuration object from screen instance
 * @param appendAsterisk Whether to append an asterisk (*) to the placeholder
 * @returns Appropriate placeholder text
 */
export const getDynamicPlaceholder = (
  allowedIdentifiers: string[] = [],
  texts: Record<string, string> = {},
  appendAsterisk: boolean = true
): string => {
  // Create a map of identifier combinations to placeholders
  const placeholderMap = {
    'email,phone,username': texts.phoneOrUsernameOrEmailPlaceholder || 'Phone or Username or Email',
    'email,phone': texts.phoneOrEmailPlaceholder || 'Phone number or Email address',
    'phone,username': texts.phoneOrUsernamePlaceholder || 'Phone Number or Username',
    'email,username': texts.usernameOrEmailPlaceholder || 'Username or Email address',
    'email': texts.emailPlaceholder || 'Email address',
    'phone': texts.phonePlaceholder || 'Phone number',
    'username': texts.usernameOnlyPlaceholder || 'Username',
    'default': 'Enter your login ID'
  };
  
  // Sort identifiers to create a consistent key
  const key = [...allowedIdentifiers].sort().join(',');
  const placeholder = placeholderMap[key as keyof typeof placeholderMap] || placeholderMap.default;
  
  return appendAsterisk ? `${placeholder}*` : placeholder;
};

/**
 * Get the appropriate description text based on allowed identifiers
 * @param allowedIdentifiers Array of allowed identifier types (email, phone, username)
 * @param texts Text configuration object from screen instance
 * @param defaultText Default text to use if no specific description is found
 * @returns Appropriate description text
 */
export const getDynamicDescription = (
  allowedIdentifiers: string[] = [],
  texts: Record<string, string> = {},
  defaultText: string = ""
): string => {
  // Create a map of identifier combinations to descriptions
  const descriptionMap = {
    'email,phone,username': texts.phoneOrUsernameOrEmailDescription || 'Enter your Phone number or Username or Email address and we will send you instructions to reset your password.',
    'email,phone': texts.phoneOrEmailDescription || 'Enter your Phone number or Email address and we will send you instructions to reset your password.',
    'phone,username': texts.phoneOrUsernameDescription || 'Enter your Phone number or Username and we will send you instructions to reset your password.',
    'email,username': texts.usernameOrEmailDescription || 'Enter your Username or Email address and we will send you instructions to reset your password.',
    'email': texts.emailDescription || 'Enter your Email address and we will send you instructions to reset your password.',
    'phone': texts.phoneDescription || 'Enter your Phone number and we will send you instructions to reset your password.',
    'username': texts.usernameOnlyDescription || 'Enter your Username and we will send you instructions to reset your password.',
    'default': defaultText
  };
  
  // Sort identifiers to create a consistent key
  const key = [...allowedIdentifiers].sort().join(',');
  
  return descriptionMap[key as keyof typeof descriptionMap] || descriptionMap.default;
}; 