/**
 * URL utility functions
 */

/**
 * Builds a URL using the current page's origin
 * @param path The path to append to the origin
 * @returns A complete URL with the current origin and the provided path
 */
export const buildUrlWithCurrentOrigin = (path: string): string => {
  // If the path already has a protocol, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If we're in a browser environment
  if (typeof window !== 'undefined') {
    // Make sure path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${window.location.origin}${normalizedPath}`;
  }

  // Fallback to just the path (for SSR environments)
  return path;
};

/**
 * Navigates to a URL built with the current origin
 * @param path The path to navigate to
 */
export const navigateWithCurrentOrigin = (path: string): void => {
  if (typeof window !== 'undefined') {
    window.location.href = buildUrlWithCurrentOrigin(path);
  }
}; 