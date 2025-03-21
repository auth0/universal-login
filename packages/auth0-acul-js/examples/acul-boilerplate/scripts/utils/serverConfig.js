import net from 'net';

// Development server configuration
export const CONFIG = {
  port: 3032,  // Port for serving static assets
  apiPort: 3001  // Port for the Next.js API server
};

/**
 * Checks if a port is already in use
 * @param {number} port - The port to check
 * @returns {Promise<boolean>} - True if port is in use, false otherwise
 */
export const isPortInUse = async (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}; 