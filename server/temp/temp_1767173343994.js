
const originalLog = console.log;
let output = '';
console.log = (...args) => {
  output += args.join(' ') + '\n';
};

try {
  // Welcome to the collaborative code editor!
// Start coding together...

const name= "harshith";
const city= "hyd";
let age=6;
city="vizag";
console.log(name);
console.log(city);
console.log(age);

  console.log = originalLog;
  process.stdout.write(output);
} catch (error) {
  console.log = originalLog;
  process.stderr.write(error.stack || error.message);
  process.exit(1);
}
