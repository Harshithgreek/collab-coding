
const originalLog = console.log;
let output = '';
console.log = (...args) => {
  output += args.join(' ') + '\n';
};

try {
  // Welcome to the collaborative code editor!
// Start coding together...
var count=42;
console.log(count);
  console.log = originalLog;
  process.stdout.write(output);
} catch (error) {
  console.log = originalLog;
  process.stderr.write(error.stack || error.message);
  process.exit(1);
}
