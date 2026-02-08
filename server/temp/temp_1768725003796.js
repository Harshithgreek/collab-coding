
const originalLog = console.log;
let output = '';
console.log = (...args) => {
  output += args.join(' ') + '\n';
};

try {
  // Welcome to the collaborative code editor!
// Start coding together.
class Got{
  public static void main(String[] args){
    int n=1;
    if(n==1){
      System.out.println("winter is comming");
    }else{
      System.out.println("Nikhil is lannister");
    }

  }
    

  }

  console.log = originalLog;
  process.stdout.write(output);
} catch (error) {
  console.log = originalLog;
  process.stderr.write(error.stack || error.message);
  process.exit(1);
}
