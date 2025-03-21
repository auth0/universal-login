import { spawn } from 'child_process';
import path from 'path';
import { CONFIG, isPortInUse } from './utils.js';
import { watchAndUpload } from './watcher.js';

// Start development servers
export const startServers = async (mode, screenName) => {
  // Check ports
  console.log('\n🔍 Checking port availability...');
  const portsToCheck = [CONFIG.port, CONFIG.apiPort];
  for (const port of portsToCheck) {
    if (await isPortInUse(port)) {
      throw new Error(`Port ${port} is already in use`);
    }
  }
  console.log('✅ Ports available');

  // Start servers
  console.log('\n🚀 Starting development servers...');
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

  // Start file watcher for advanced mode
  if (mode === 'advanced' && screenName) {
    await watchAndUpload(screenName);
  }

  // Handle graceful shutdown
  process.once('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    Object.values(servers).forEach(server => server.kill('SIGTERM'));
    process.exit(0);
  });
  
  return servers;
}; 