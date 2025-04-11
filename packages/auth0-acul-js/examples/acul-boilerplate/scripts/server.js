import { spawn } from 'child_process';
import path from 'path';
import ora from 'ora';
import { CONFIG, isPortInUse } from './utils/server-config.js';
import { watchAndUpload } from './utils/watcher.js';
import { logger } from './utils/logger.js';
import { handleFatalError } from './utils/error-handler.js';

/**
 * Start development servers
 * @param {string} mode - The mode (standard/advanced) being used
 * @param {string} screenName - The screen name being served
 * @returns {Object} - Server processes
 */
export const startServers = async (mode, screenName) => {
  logger.section('Initializing Development Environment');

  // Check ports
  const spinner = ora({
    text: '🔍 Verifying required ports...',
    color: 'cyan'
  }).start();
  
  try {
    // Define ports and their purposes
    const portsInfo = [
      { port: CONFIG.port, name: 'ACUL assets server' },
      { port: CONFIG.reactPort, name: 'React screen tester application' }
    ];
    
    // Check each port
    for (const { port, name } of portsInfo) {
      if (await isPortInUse(port)) {
        spinner.fail(`Port ${port} required by ${name} is already in use`);
        throw new Error(`Port ${port} required by ${name} is already in use`);
      }
    }
    
    spinner.succeed('Network ports verified');

    // Service info
    logger.info('Launching development servers:');
    portsInfo.forEach(({ port, name }) => {
      logger.info(`• ${name}: Port ${port}`);
    });
    
    // Server processes
    const servers = {
      serve: spawn('npm', ['run', 'serve'], { 
        stdio: 'inherit', 
        shell: true,
        env: { ...process.env, FORCE_COLOR: true }
      }),
      next: spawn('npm', ['run', 'dev'], {
        cwd: path.resolve(process.cwd(), 'nextjs-quickstart'),
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, FORCE_COLOR: true }
      })
    };
    
    // Handle server processes
    setupProcessHandlers(servers);
    
    logger.success('Development environment initialized');
    
    // Start file watcher for advanced mode
    let watcherCleanup = null;
    if (mode === 'advanced') {
      logger.section('Starting File Watcher');
      logger.info(`Watching for changes to ${screenName} files...`);
      watcherCleanup = await watchAndUpload(screenName);
    }
    
    // Server logs header
    logger.serverLogsHeader();

    // Setup process-wide handlers
    setupProcessHandlers({
      ...servers,
      cleanup: {
        kill: () => {
          if (watcherCleanup) watcherCleanup();
        }
      }
    });
    
    return servers;
  } catch (error) {
    // Don't duplicate error messages - handleFatalError will log appropriately
    spinner.stop();
    handleFatalError(error, 'Failed to initialize development environment');
  }
};

/**
 * Set up process handlers for graceful shutdown
 * @param {Object} processes - Object containing server processes
 */
function setupProcessHandlers(processes) {
  // Handle server process events
  Object.entries(processes).forEach(([name, process]) => {
    if (process && typeof process.on === 'function') {
      process.on('error', (err) => {
        logger.error(`Error in ${name} server`, err);
      });
      
      process.on('exit', (code) => {
        if (code !== 0 && code !== null) {
          logger.error(`${name} server exited with code ${code}`);
        }
      });
    }
  });
  
  // Handle process exit
  const handleExit = () => {
    logger.warn('Shutting down servers...');
    
    // Kill all processes
    Object.values(processes).forEach(proc => {
      if (proc && typeof proc.kill === 'function') {
        proc.kill('SIGTERM');
      } else if (proc && typeof proc.kill === 'undefined' && typeof proc.close === 'function') {
        proc.close();
      }
    });
    
    // Exit without waiting for cleanup to complete (avoid hanging)
    setTimeout(() => {
      process.exit(0);
    }, 500);
  };
  
  // Setup handlers if they haven't been set up yet
  if (!process.listenerCount('SIGINT')) {
    process.once('SIGINT', handleExit);
    process.once('SIGTERM', handleExit);
    process.once('SIGHUP', handleExit);
  }
} 