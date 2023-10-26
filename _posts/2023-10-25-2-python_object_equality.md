---
layout:     post
title:      "Equality in Python"
permalink: "2"
subtitle:   
date:       2023-10-26
image: "assets/img/python_object_equality/python_object_equality_main.png"
published: true
tags: [python3, refresh]
image_width: 100%
---

## Overview

In python3:
* Everything is an object.

* Each  object is stored at a memory address.

* Two objects are different if and only if they have different memory addresses.

* Use the identity operator `is` to check if two objects have the same memory address i.e. they are the same object.

* Use the equality operator `==` to check if two objects have the same value.

* For built in types like `int` and `list` the value used by `==` is already defined so `[1, 2] == [1, 2]` just works even though they are different objects. For objects created by custom classes the default value is the memory address meaning `is` and `==` will return the same thing unless a custom version of `__eq__` is implemented.

* If `is` returns `True` then `==` will return `True`. 

* If `is` returns `False` then `==` can return `True` or `False`.

* If `==` returns `True` then `is` can return `True` or `False`.

* If `==` returns `False` then `is` will also return `False`.

## Examples
### Objects from custom classes
Say we have a circle class and we create two instances.

{% highlight python %}
class Circle:
    def __init__(self, color):
        self.color = color

blue_circle_one = Circle("blue")
blue_circle_two = Circle("blue")

{% endhighlight %}

Now let's see what happens when we use `is` and `==` to compare the two circles.

{% highlight python %}
print(blue_circle_one is blue_circle_two) # False
print(blue_circle_one == blue_circle_two) # False
{% endhighlight %}

We get `False` from `is` because `a` and `b` point to different memory addresses and therefore two different objects. We get `False` from `==` because the values of `a` and `b` are different. Hold on how does it assign a 'value' to an object? Well the default is `id(object)` which just gives the memory address. So the check for equality here is the exact same for `is` and `==`. 

But we don't have to use the default value for `==`.

{% highlight python %}
class Circle:
    def __init__(self, color):
        self.color = color

    def __eq__(self, otherCircle):
        if isinstance(otherCircle, Circle):
            return otherCircle.color == self.color
        else:
            return NotImplemented
        
blue_circle_one = Circle("blue")
blue_circle_two = Circle("blue")

print(blue_circle_one is blue_circle_two) # False
print(blue_circle_one == blue_circle_two) # True
{% endhighlight %}

Now we get `True` for `==` because we've implemented the `__eq__` function to say that the circles are equal if their color is the same. The `__eq__` function of the object on the left hand side of `==` is used and if that returns `NotImplemented` then the `__eq__` function of the right hand object is used. If both return `NotImplemented` then `False` is returned overall. 

Note also that there is nothing that forces `__eq__` to return a `boolean`. For example in the code below `circle == square` returns `apple`.

{% highlight python %}
class Circle:
    def __init__(self, color):
        self.color = color

    def __eq__(self, otherCircle):
        return "apple"
        
class Square:
    def __init__(self, color):
        self.color = color

    def __eq__(self, otherSquare):
        if isinstance(otherSquare, Square):
            return otherSquare.color == self.color
        else:
            return NotImplemented

circle = Circle("blue")
square = Square("blue")

print(circle == square) # apple
{% endhighlight %}

### Built in types
For built in types such as `int`, `float` and `list` the value used by `==` to determine equality is predefined and just makes sense. 

{% highlight python %}
a = 1
b = 2
print(a == b) # False

a = [1, 2]
b = [1, 2, 3]
print(a == b) # False

a = "a"
b = "a"
print(a == b) # True
{% endhighlight %}

Let's look at the behaviour of `is`.

{% highlight python %}
a = 1
b = 2
print(a is b) # False

a = [1, 2]
b = [1, 2, 3]
print(a is b) # False

a = "a"
b = "a"
print(a is b) # True !!!
{% endhighlight %}

A slight surprise is that when `a` and `b` are assigned the same value (`"a"` in this case) then `is` returns `True` which doesn't seem to make sense because surely a seperate object is created each time. Let's check.

{% highlight python %}

a = "a"
b = "a"
a is b # True !!!

print(id(a)) # 4450444768
print(id(b)) # 4450444768

{% endhighlight %}

Nope, `a` and `b` are pointing to the same object. This seems to be an efficiency in Python where it tries not to create the same built in type twice.

### Checking for None
At first it looks like `x == None` works.

{% highlight python %}
x = 1
print(x == None) # False

x = None
print(x == None) # True
{% endhighlight %}

This is because None is an object in memory and `id(None)` returns a memory address. 

However, as we saw above, `__eq__` can return anything and in particular it could always return `True`, say. Here's an example.

{% highlight python %}
class Circle:
    def __init__(self, color):
        self.color = color

    def __eq__(self, otherCircle):
        return True

circle = Circle("blue")
print(circle == None) # True !!!
{% endhighlight %}

So when checking for `None` using `==` carries a small risk and it's safer to use `is`. 

_____