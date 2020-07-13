import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (input) {
  if (input.length == 0) {
    rl.close();
  }

  const output = input.split('').reverse().join('');
  console.log(output + '\n');
});

rl.on('close', function () {
  process.exit(0);
});
