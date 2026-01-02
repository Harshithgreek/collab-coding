# Code Execution Test Examples

## JavaScript

```javascript
console.log("Hello from JavaScript!");
const sum = (a, b) => a + b;
console.log("5 + 3 =", sum(5, 3));

for (let i = 1; i <= 5; i++) {
  console.log(`Number ${i}`);
}
```

## Python

```python
print("Hello from Python!")

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")
```

## Java

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");

        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;

        for (int num : numbers) {
            sum += num;
        }

        System.out.println("Sum: " + sum);
    }
}
```

## C++

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;

    int n = 10;
    cout << "First " << n << " squares:" << endl;

    for(int i = 1; i <= n; i++) {
        cout << i << "^2 = " << (i * i) << endl;
    }

    return 0;
}
```

## Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")

    numbers := []int{1, 2, 3, 4, 5}
    sum := 0

    for _, num := range numbers {
        sum += num
    }

    fmt.Printf("Sum: %d\n", sum)
}
```
