---
layout:     post
title:      "Stack Overflow Much?"
permalink: "5"
subtitle:   
date:       2024-02-09
image: "assets/img/5/main.png"
published: true
tags: [python3, curiosity]
code: https://github.com/itsakettle/blog-content/tree/main/5-stack_overflow_much
image_width: 60%
---

Recently I was looking at recursion and it surprised me that it wasn't easy to get a stack overflow error using Python.

## CPython 
Long story short, CPython stores all python objects on a heap. So whilst CPython itself has a stack that it uses to run Python, it's not the stack of the Python code. Check out the example below:

{% highlight python %}
import sys
import resource

def endless_recursion(depth=0):
    memory_gb = round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss/1024/1024, 3)
    big_list = list(range(10**5))
    print(f"depth={depth} memory_gb={memory_gb}")
    endless_recursion(depth+1)

def main():
    stack_size = resource.getrlimit(resource.RLIMIT_STACK)
    print(f"Stack (soft, hard) =  {stack_size}")
    sys.setrecursionlimit(10**7)
    endless_recursion(0)

if __name__ == "__main__":
    main()

{% endhighlight %}

The recursive function:
* Creates a list of 100,000 ints (~2.67 mb, an int object is 28 bytes).

* Prints the depth of the recursion and the memory used in gigabytes.

* Calls itself. The python recursion limit is set to 10,000,000 so that the Python interpreter doesn't stop the recursion.

When you run this in a debian docker container you get a `137` error code, which is the code for out of memory. Here's the output:

```
Stack (soft, hard) =  (8388608, -1)
depth=0 memory_gb=0.011
.
.
.
depth=494 memory_gb=1.572
137
```

The soft stack limit is 8,388,608 bytes which is 8 megabytes and the hard limit is unlimited (-1 in the case of Python's `getrlimit`). This means that the process has been allocated 8 megabytes for its stack but can request an unlimited amount. The process gets to a recursion depth of 491, uses 1.4 gigabytes of memory which exausts the container memory giving error code 137.

Let's run this again with a smaller stack size and see what happens. We do this by running `ulimit -s 80` before running the python script which set the soft and hard limit to 80 kilobytes (81,920 bytes). This time we get the same result, more or less.

```
Stack (soft, hard) =  (81920, 81920)
.
.
.
depth=507 memory_gb=1.373
137
```

The smaller stack size had no effect because the stack is used by CPython, not our python code. Setting the stack limit to below 80 kilobytes immediately gives a `139` error code which is a segmentation fault. It's the closest I can get to a stack overflow error in Python and it is not caused by recursion.

## C++

Let's try to get a stack overflow error using c++.

{% highlight cpp %}
#include <iostream>
#include <sys/resource.h>

int endlessRecursion(int x) {
  std::cout << "depth: " << x << std::endl;
  float big_array[100000];
  endlessRecursion(x+1);
}

int main() { 
  struct rlimit stack_rlimit;

  if (getrlimit(RLIMIT_STACK, &stack_rlimit) == 0) {
      std::cout << "Stack size soft:" << stack_rlimit.rlim_cur << " bytes\n";
      std::cout << "Stack size hard: " << stack_rlimit.rlim_max << " bytes\n";
  } 

  endlessRecursion(0);   
}

{% endhighlight %}

Here's the output:

```
Stack (soft, hard) = (8388608, 18446744073709551615)
depth: 1
.
.
.
depth: 19
139
```

Notice that c++ represents an unlimited hard limit differently than Python. 

Anyway, this time we get an error code 139 (segmentation fault). It is probably a stack overflow error caused by the recursion since a depth of 20 (19+1) roughly matches the stack size. But I would really like to see an error that says "Stack Overflow"!



## Java

Let's try Java.

{% highlight java %}

class EndlessRecursion {

    public static void endlessRecursion(int x) {
        System.out.println("Depth: " + x);
        int y = 200;
        endlessRecursion(x+1);
    }

    public static void main(String[] args) {
        endlessRecursion(0);
    }
}

{% endhighlight %}

```
Depth: 1
.
.
.
Depth: 6130
Exception in thread "main" java.lang.StackOverflowError
```

Hurray! In Java primitive values and references to objects are stored on the stack. The objects themselves are on the heap. So using a big array in the example above would give a similar result.


_____