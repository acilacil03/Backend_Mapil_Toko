import { spawn } from 'child_process';

const server = spawn('node', ['server.js'], { stdio: 'inherit' });

// Wait 2 seconds for server to start, then run tests
setTimeout(async () => {
  try {
    const testProcess = spawn('node', ['test-endpoints.js'], { stdio: 'inherit' });
    testProcess.on('exit', (code) => {
      server.kill();
      process.exit(code);
    });
  } catch (e) {
    server.kill();
    process.exit(1);
  }
}, 2000);
