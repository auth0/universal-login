import { execSync, spawn } from 'child_process';
import net from 'net';
import path from 'path';

const PORT = 3032;

async function checkHttpServer() {
  try {
    execSync('which http-server', { stdio: 'ignore' });
    console.log('✅ http-server is already installed');
  } catch (error) {
    console.log('⚠️  http-server not found, installing...');
    execSync('npm install -g http-server', { stdio: 'inherit' });
  }
}

async function buildAculProject() {
  try {
    console.log('🏗️  Building ACUL project...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

async function uploadAssets() {
  // TODO: Implement API upload
  console.log('📤 Would upload dist/index.js and dist/index.css to API');
}

async function startServers() {
  try {
    // Start ACUL server with HMR
    const aculServer = spawn('npm', ['run', 'dev:watch'], {
      stdio: 'inherit',
      shell: true
    });

    // Start Next.js app in a new terminal
    const nextAppPath = path.resolve(process.cwd(), 'nextjs-quickstart');
    const nextServer = spawn('npm', ['run', 'dev'], {
      cwd: nextAppPath,
      stdio: 'inherit',
      shell: true
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      aculServer.kill();
      nextServer.kill();
      process.exit();
    });

  } catch (error) {
    console.error('❌ Server start failed:', error);
    process.exit(1);
  }
}

async function manageServer() {
  try {
    // 1. Check for http-server
    await checkHttpServer();

    // 2. Kill existing process on 3032 if running
    if (await isPortInUse(PORT)) {
      console.log(`⚠️  Port ${PORT} in use. Killing process...`);
      await killProcessOnPort(PORT);
    }

    // 3. Build initial ACUL project
    await buildAculProject();

    // 4. Start both servers with HMR
    await startServers();

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Helper functions
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}

async function killProcessOnPort(port) {
  try {
    const cmd = process.platform === 'win32'
      ? `netstat -ano | findstr :${port}`
      : `lsof -i tcp:${port} | grep LISTEN | awk '{print $2}' | xargs kill -9`;
    execSync(cmd, { stdio: 'ignore' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`✅ Killed process on port ${PORT}`);
  } catch (error) {
    // Ignore if no process found
  }
}

manageServer().catch(console.error);