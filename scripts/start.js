const {spawn} = require('child_process');
const path = require('path');

const isRender = process.env.RENDER === 'true';

if (isRender) {
  const child = spawn('npm', ['start'], {
    cwd: path.join(__dirname, '..', 'JapaSiddhi-Backend'),
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || 'production',
      DB_ENGINE: process.env.DB_ENGINE || 'sqlite',
    },
  });
  child.on('exit', code => process.exit(code ?? 1));
} else {
  const child = spawn(
    'npx',
    ['react-native', 'start', ...process.argv.slice(2)],
    {
      stdio: 'inherit',
      shell: true,
    },
  );
  child.on('exit', code => process.exit(code ?? 1));
}
