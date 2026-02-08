import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Code Executor Service
 * Executes code in various languages with timeout and security measures
 */
class CodeExecutor {
  constructor() {
    this.tempDir = path.join(__dirname, '../../temp');
    this.timeout = 10000; // 10 seconds
    this.maxOutputLength = 10000; // 10KB
    this.ensureTempDir();
  }

  async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true });
    }
  }

  /**
   * Execute code based on language
   */
  async executeCode(code, language, input = '') {
    try {
      const startTime = Date.now();
      let result;

      switch (language.toLowerCase()) {
        case 'javascript':
        case 'js':
          result = await this.executeJavaScript(code, input);
          break;
        case 'python':
        case 'py':
          result = await this.executePython(code, input);
          break;
        case 'java':
          result = await this.executeJava(code, input);
          break;
        case 'cpp':
        case 'c++':
          result = await this.executeCpp(code, input);
          break;
        case 'c':
          result = await this.executeC(code, input);
          break;
        case 'go':
          result = await this.executeGo(code, input);
          break;
        case 'typescript':
        case 'ts':
          result = await this.executeTypeScript(code, input);
          break;
        default:
          return {
            success: false,
            error: `Language "${language}" is not supported for execution`,
            output: '',
            executionTime: 0
          };
      }

      const executionTime = Date.now() - startTime;

      return {
        ...result,
        executionTime
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: '',
        executionTime: 0
      };
    }
  }

  /**
   * Execute JavaScript code
   */
  async executeJavaScript(code, input) {
    try {
      const fileName = `temp_${Date.now()}.js`;
      const filePath = path.join(this.tempDir, fileName);

      // Wrap code to capture console output
      const wrappedCode = `
const originalLog = console.log;
let output = '';
console.log = (...args) => {
  output += args.join(' ') + '\\n';
};

try {
  ${code}
  console.log = originalLog;
  process.stdout.write(output);
} catch (error) {
  console.log = originalLog;
  process.stderr.write(error.stack || error.message);
  process.exit(1);
}
`;

      await fs.writeFile(filePath, wrappedCode);

      const { stdout, stderr } = await execAsync(`node "${filePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      await this.cleanup(filePath);

      return {
        success: !stderr,
        output: stdout || stderr,
        error: stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute Python code
   */
  async executePython(code, input) {
    try {
      const fileName = `temp_${Date.now()}.py`;
      const filePath = path.join(this.tempDir, fileName);

      await fs.writeFile(filePath, code);

      const { stdout, stderr } = await execAsync(`python "${filePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      await this.cleanup(filePath);

      return {
        success: !stderr,
        output: stdout || stderr,
        error: stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute Java code
   */
  async executeJava(code, input) {
    try {
      // Check if javac is available
      try {
        await execAsync('javac -version', { timeout: 5000 });
      } catch (checkError) {
        return {
          success: false,
          output: '',
          error: 'Java compiler (javac) is not installed or not in PATH. Please install JDK (Java Development Kit).\n\nDownload JDK from: https://www.oracle.com/java/technologies/downloads/\nOr install OpenJDK: https://adoptium.net/'
        };
      }

      // Extract class name from code
      const classNameMatch = code.match(/public\s+class\s+(\w+)/);
      if (!classNameMatch) {
        return {
          success: false,
          output: '',
          error: 'No public class found. Java code must contain: public class ClassName { ... }'
        };
      }
      const className = classNameMatch[1];
      
      const fileName = `${className}.java`;
      const filePath = path.join(this.tempDir, fileName);
      const classFilePath = path.join(this.tempDir, `${className}.class`);

      await fs.writeFile(filePath, code);

      // Compile with better error handling
      let compileResult;
      try {
        compileResult = await execAsync(`javac "${filePath}"`, {
          timeout: this.timeout,
          maxBuffer: this.maxOutputLength,
          cwd: this.tempDir
        });
      } catch (compileError) {
        await this.cleanup(filePath);
        return {
          success: false,
          output: '',
          error: `Compilation Error:\n${compileError.stderr || compileError.message}`
        };
      }

      if (compileResult.stderr) {
        await this.cleanup(filePath);
        return {
          success: false,
          output: '',
          error: `Compilation Error:\n${compileResult.stderr}`
        };
      }

      // Run with proper classpath and handle Scanner/input gracefully
      let runResult;
      try {
        // Provide empty stdin to handle Scanner gracefully
        runResult = await execAsync(`echo. | java -cp "${this.tempDir}" ${className}`, {
          timeout: 5000, // Shorter timeout for Scanner cases
          maxBuffer: this.maxOutputLength,
          shell: true
        });
      } catch (runError) {
        await this.cleanup(filePath);
        await this.cleanup(classFilePath);
        
        // Provide detailed error information
        let errorMessage = 'Runtime Error:\n';
        if (runError.stderr) {
          errorMessage += runError.stderr;
        } else if (runError.message) {
          errorMessage += runError.message;
        }
        
        // Add helpful hints
        if (runError.killed || runError.signal === 'SIGTERM') {
          errorMessage += '\n\n⚠️ Execution timeout (5 seconds)';
          if (code.includes('Scanner') || code.includes('System.in')) {
            errorMessage += '\n\nNote: Scanner input detected. The program received empty input.';
            errorMessage += '\nFor testing, replace Scanner with hardcoded test values:';
            errorMessage += '\n  String s = "test input";  // Instead of sc.nextLine()';
          }
        } else if (runError.stderr && runError.stderr.includes('NoClassDefFoundError')) {
          errorMessage += '\n\nHint: Class file was not found. Make sure your class name matches the public class in your code.';
        } else if (runError.stderr && runError.stderr.includes('NoSuchMethodError: main')) {
          errorMessage += '\n\nHint: Missing or incorrect main method. Required:\npublic static void main(String[] args) { ... }';
        } else if (runError.stderr && runError.stderr.includes('NoSuchElementException')) {
          errorMessage += '\n\n⚠️ Scanner tried to read input but none was available.';
          errorMessage += '\nFor online execution, use hardcoded test data instead:';
          errorMessage += '\n  String s = "hello";  // Instead of sc.nextLine()';
        }
        
        return {
          success: false,
          output: runError.stdout || '',
          error: errorMessage
        };
      }

      // Cleanup
      await this.cleanup(filePath);
      await this.cleanup(classFilePath);

      return {
        success: true,
        output: runResult.stdout || 'Program executed successfully (no output)',
        error: runResult.stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute C++ code
   */
  async executeCpp(code, input) {
    try {
      const fileName = `temp_${Date.now()}.cpp`;
      const filePath = path.join(this.tempDir, fileName);
      const exePath = filePath.replace('.cpp', '.exe');

      await fs.writeFile(filePath, code);

      // Compile with g++
      const compileResult = await execAsync(`g++ "${filePath}" -o "${exePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      if (compileResult.stderr && !compileResult.stderr.includes('warning')) {
        await this.cleanup(filePath);
        return {
          success: false,
          output: '',
          error: compileResult.stderr
        };
      }

      // Run
      const { stdout, stderr } = await execAsync(`"${exePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      // Cleanup
      await this.cleanup(filePath);
      await this.cleanup(exePath);

      return {
        success: !stderr,
        output: stdout || stderr,
        error: stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute C code
   */
  async executeC(code, input) {
    try {
      const fileName = `temp_${Date.now()}.c`;
      const filePath = path.join(this.tempDir, fileName);
      const exePath = filePath.replace('.c', '.exe');

      await fs.writeFile(filePath, code);

      // Compile with gcc
      const compileResult = await execAsync(`gcc "${filePath}" -o "${exePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      if (compileResult.stderr && !compileResult.stderr.includes('warning')) {
        await this.cleanup(filePath);
        return {
          success: false,
          output: '',
          error: compileResult.stderr
        };
      }

      // Run
      const { stdout, stderr } = await execAsync(`"${exePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      // Cleanup
      await this.cleanup(filePath);
      await this.cleanup(exePath);

      return {
        success: !stderr,
        output: stdout || stderr,
        error: stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute Go code
   */
  async executeGo(code, input) {
    try {
      const fileName = `temp_${Date.now()}.go`;
      const filePath = path.join(this.tempDir, fileName);

      await fs.writeFile(filePath, code);

      const { stdout, stderr } = await execAsync(`go run "${filePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      await this.cleanup(filePath);

      return {
        success: !stderr,
        output: stdout || stderr,
        error: stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute TypeScript code
   */
  async executeTypeScript(code, input) {
    try {
      const fileName = `temp_${Date.now()}.ts`;
      const filePath = path.join(this.tempDir, fileName);

      await fs.writeFile(filePath, code);

      const { stdout, stderr } = await execAsync(`npx ts-node "${filePath}"`, {
        timeout: this.timeout,
        maxBuffer: this.maxOutputLength
      });

      await this.cleanup(filePath);

      return {
        success: !stderr,
        output: stdout || stderr,
        error: stderr || null
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle execution errors
   */
  handleError(error) {
    if (error.killed) {
      return {
        success: false,
        output: '',
        error: `Execution timeout (exceeded ${this.timeout}ms)`
      };
    }

    return {
      success: false,
      output: error.stdout || '',
      error: error.stderr || error.message
    };
  }

  /**
   * Cleanup temporary files
   */
  async cleanup(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      // Ignore cleanup errors
    }
  }
}

export default CodeExecutor;
