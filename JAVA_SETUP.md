# Java Setup Guide

## Problem: Java Compiler Not Found

If you're getting the error "Java compiler (javac) is not installed or not in PATH", this means you have Java Runtime Environment (JRE) but not Java Development Kit (JDK).

## Solution: Install JDK

### Option 1: Oracle JDK (Recommended for Development)

1. Download from: https://www.oracle.com/java/technologies/downloads/
2. Choose the Windows installer for your system (x64)
3. Run the installer
4. **Important**: During installation, select "Add to PATH" option

### Option 2: OpenJDK (Free and Open Source)

1. Download from: https://adoptium.net/
2. Select "Windows x64" and download the installer
3. Run the installer
4. **Important**: Check "Add to PATH" and "Set JAVA_HOME" options

## Verify Installation

After installation, restart your terminal and run:

```powershell
javac -version
```

You should see output like:

```
javac 23.0.0
```

## Update Your Path (If needed)

If `javac` is still not found after installation:

1. Find your JDK installation directory (usually `C:\Program Files\Java\jdk-23` or similar)
2. Add the `bin` folder to your PATH:
   - Press Windows + X, select "System"
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find and edit "Path"
   - Add new entry: `C:\Program Files\Java\jdk-23\bin` (adjust path to your JDK version)
   - Click OK on all dialogs
   - **Restart VS Code and your terminal**

## Testing Java Code

Once JDK is installed, try this simple Java program:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Java is working!");
    }
}
```

**Important Notes:**

- The class name must match the code: If your code has `public class Test`, the file must be named `Test.java`
- Java requires a `public static void main(String[] args)` method
- Use `System.out.println()` for output

## Common Java Errors

### 1. "No public class found"

**Solution:** Make sure your code has:

```java
public class ClassName {
    public static void main(String[] args) {
        // Your code here
    }
}
```

### 2. "Class names don't match"

**Solution:** If you get this error, ensure the class name in your code matches exactly (case-sensitive).

### 3. "Main method not found"

**Solution:** Add the main method:

```java
public static void main(String[] args) {
    // Your code here
}
```

## Other Languages

The collaborative editor also supports:

- JavaScript/Node.js (already works)
- Python (requires Python installation)
- C/C++ (requires GCC/MinGW)
- Go (requires Go installation)
- TypeScript (requires ts-node)

Each language needs its compiler/interpreter installed on the server machine.
