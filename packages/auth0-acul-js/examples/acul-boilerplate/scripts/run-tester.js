import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenTesterDir = path.resolve(__dirname, '../screen-tester');
const screenName = process.argv[2] || 'unknown';

console.log('[Screen Tester] Starting application (http://localhost:4040)...');

const child = execa('npm', ['run', 'start'], {
  cwd: screenTesterDir,
  env: { ...process.env, SCREEN_NAME: screenName, RUN_MODE: 'advanced' },
  stdio: ['inherit', 'pipe', 'pipe']
});

child.stdout.on('data', (data) => {
  const output = data.toString().trim();
  if (output.includes('Local:') && output.includes('http://localhost')) {
    console.log('\x1b[32m%s\x1b[0m', '[Screen Tester] Server running at http://localhost:4040');
  } else if (output) {
    console.log('[Vite]', output);
  }
});

child.stderr.on('data', (data) => {
  console.error('\x1b[31m%s\x1b[0m', '[Vite Error]', data.toString().trim());
});

// Listen for SIGINT to handle clean shutdown
process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit(0);
});

// Forward the exit code
child.on('exit', (code) => {
  process.exit(code);
});