# Test Examples for All Supported Languages

## ✅ JavaScript (Works without JDK)

```javascript
console.log("Hello from JavaScript!");
console.log("Current time:", new Date().toLocaleTimeString());

// Simple calculation
const sum = 10 + 20;
console.log("Sum:", sum);

// Loop example
for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}
```

## ☕ Java (Requires JDK Installation)

**IMPORTANT:** You need to install JDK first! See [JAVA_SETUP.md](JAVA_SETUP.md)

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        System.out.println("Java is working!");

        // Simple calculation
        int sum = 10 + 20;
        System.out.println("Sum: " + sum);

        // Loop example
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}
```

**Important Java Notes:**

- Class name in code must match (case-sensitive)
- Must have `public class ClassName`
- Must have `public static void main(String[] args)` method
- Use `System.out.println()` for output

## 🐍 Python (Requires Python Installation)

```python
print("Hello from Python!")
print("Python is working!")

# Simple calculation
sum_val = 10 + 20
print(f"Sum: {sum_val}")

# Loop example
for i in range(1, 6):
    print(f"Count: {i}")

# List example
fruits = ["apple", "banana", "orange"]
print("Fruits:", fruits)
```

## 🔷 C++ (Requires GCC/MinGW Installation)

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    cout << "C++ is working!" << endl;

    // Simple calculation
    int sum = 10 + 20;
    cout << "Sum: " << sum << endl;

    // Loop example
    for (int i = 1; i <= 5; i++) {
        cout << "Count: " << i << endl;
    }

    return 0;
}
```

## 🔵 C (Requires GCC/MinGW Installation)

```c
#include <stdio.h>

int main() {
    printf("Hello from C!\n");
    printf("C is working!\n");

    // Simple calculation
    int sum = 10 + 20;
    printf("Sum: %d\n", sum);

    // Loop example
    for (int i = 1; i <= 5; i++) {
        printf("Count: %d\n", i);
    }

    return 0;
}
```

## 🐹 Go (Requires Go Installation)

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")
    fmt.Println("Go is working!")

    // Simple calculation
    sum := 10 + 20
    fmt.Printf("Sum: %d\n", sum)

    // Loop example
    for i := 1; i <= 5; i++ {
        fmt.Printf("Count: %d\n", i)
    }
}
```

## 📘 TypeScript (Requires ts-node Installation)

```typescript
console.log("Hello from TypeScript!");
console.log("TypeScript is working!");

// Typed variables
const sum: number = 10 + 20;
console.log(`Sum: ${sum}`);

// Loop example
for (let i: number = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}

// Interface example
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "John",
  age: 25,
};

console.log(`Person: ${person.name}, Age: ${person.age}`);
```

## 🔧 Installation Requirements

### JavaScript

- ✅ **Already Works** - Node.js is installed with the server

### Java

- ❌ **Requires JDK** - See [JAVA_SETUP.md](JAVA_SETUP.md)
- Download: https://adoptium.net/ or https://www.oracle.com/java/technologies/downloads/

### Python

- Check: `python --version` in terminal
- Download: https://www.python.org/downloads/
- **Important:** Check "Add Python to PATH" during installation

### C/C++

- Windows: Install MinGW-w64 or Visual Studio Build Tools
- Download: https://www.mingw-w64.org/
- Or install via Chocolatey: `choco install mingw`

### Go

- Download: https://go.dev/dl/
- **Important:** Add to PATH during installation

### TypeScript

- Requires Node.js (already installed)
- Install globally: `npm install -g ts-node typescript`

## 🚀 How to Use

1. **Start the server:** `cd server && npm run dev`
2. **Start the client:** `cd client && npm run dev`
3. **Create a room** and share the link with collaborators
4. **Select your language** from the dropdown
5. **Write or paste code** in the editor
6. **Click "Run"** or press `Ctrl+Enter` to execute

## ⚠️ Common Errors

### "Java compiler (javac) is not installed"

**Solution:** Install JDK (not just JRE). See [JAVA_SETUP.md](JAVA_SETUP.md)

### "python is not recognized"

**Solution:** Install Python and check "Add to PATH" option

### "g++ is not recognized"

**Solution:** Install MinGW or GCC compiler for Windows

### "No public class found" (Java)

**Solution:** Add `public class ClassName { public static void main(String[] args) { ... } }`

### "Execution timeout"

**Solution:** Code took longer than 10 seconds. Avoid infinite loops!

## 💡 Tips

- Use `console.log()` for JavaScript/TypeScript
- Use `System.out.println()` for Java
- Use `print()` for Python
- Use `cout <<` for C++
- Use `printf()` for C
- Use `fmt.Println()` for Go

- **Infinite loops will timeout** after 10 seconds
- **Maximum output** is limited to prevent crashes
- **Multiple users** can run code simultaneously
- **Everyone sees all outputs** in the same room
