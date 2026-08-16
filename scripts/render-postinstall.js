const {execSync} = require('child_process');
const path = require('path');

if (process.env.RENDER !== 'true') {
  process.exit(0);
}

execSync('npm install && npm run build', {
  cwd: path.join(__dirname, '..', 'JapaSiddhi-Backend'),
  stdio: 'inherit',
  env: process.env,
});
