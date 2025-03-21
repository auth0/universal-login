/**
 * Centralized logging utility
 */

// Define enhanced colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m'
};

// Exported logger functions
export const logger = {
  /**
   * Log a section header
   * @param {string} message - Header message
   */
  section: (message) => {
    console.log(`\n${colors.bright}${colors.blue}=== ${message} ====${colors.reset}\n`);
  },
  
  /**
   * Log success message
   * @param {string} message - Success message
   */
  success: (message) => {
    console.log(`${colors.bright}${colors.green}✅ ${message}${colors.reset}`);
  },
  
  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error} [error] - Optional error object
   */
  error: (message, error) => {
    console.error(`${colors.bright}${colors.red}❌ ${message}${error ? ': ' + error.message : ''}${colors.reset}`);
  },
  
  /**
   * Log warning message
   * @param {string} message - Warning message
   */
  warn: (message) => {
    console.log(`${colors.bright}${colors.yellow}⚠️ ${message}${colors.reset}`);
  },
  
  /**
   * Log info message
   * @param {string} message - Info message
   */
  info: (message) => {
    console.log(`${colors.cyan}${message}${colors.reset}`);
  },
  
  /**
   * Log URL or file path with indentation for better readability
   * @param {string} label - Label for the URL/path
   * @param {string} url - The URL or path to display
   */
  url: (label, url) => {
    console.log(`${colors.cyan}${label}:${colors.reset}`);
    console.log(`  ${colors.bright}${url}${colors.reset}`);
  },
  
  /**
   * Log formatted data (JSON, etc) with proper indentation
   * @param {string} label - Label for the data
   * @param {string|object} data - The data to display
   */
  data: (label, data) => {
    const formattedData = typeof data === 'string' 
      ? data 
      : JSON.stringify(data, null, 2);
    
    const indented = formattedData
      .split('\n')
      .map((line, i) => i === 0 ? line : `  ${line}`)
      .join('\n');
    
    console.log(`${colors.cyan}${label}:${colors.reset}`);
    console.log(`${indented}`);
  },
  
  /**
   * Log a startup banner
   * @param {string} mode - The mode (standard/advanced)
   * @param {string} screenName - The screen name
   */
  startupBanner: (mode, screenName) => {
    console.log(`\n${colors.bright}${colors.green}🚀 ACUL ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode${colors.reset}`);
    console.log(`${colors.cyan}Screen: ${screenName}${colors.reset}`);
    console.log(`${colors.bright}${colors.blue}===========================================${colors.reset}`);
  },
  
  /**
   * Log server logs header
   */
  serverLogsHeader: () => {
    console.log(`\n${colors.bright}${colors.blue}===================== Server Logs =====================${colors.reset}\n`);
  }
};

// Export colors for direct usage if needed
export { colors }; 