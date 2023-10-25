---
layout:     post
title:      "Equality in Python"
subtitle:   
date:       2023-10-23
image: "assets/img/python_object_equality/python_object_equality_main.png"
published: true
tags: [python3, refresher]
image_width: 100%
---

## Overview

In python3:
* Everything is an object.

* Each  object is stored at a memory address.

* Two objects are different if and only if they have different memory addresses.

* Use `is` to check if two objects have the same memory address i.e. they are the same object.

* Objects have a value that is used by `==` to determine equality. So use `==` to check if the objects stored at two memory addresses have the same value.

* For built in types like `int` and `list` the value used by `==` is already defined so `[1, 2] == [1, 2]` just works even though they are different objects. 

* For objects created by custom classes the default value is the memory address meaning `is` and `==` will return the same thing.

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
print(blue_circle_one is blue_circle_two)
# False
print(blue_circle_one == blue_circle_two)
# False
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

    print(blue_circle_one is blue_circle_two)
    # False
    print(blue_circle_one == blue_circle_two)
    # True
{% endhighlight %}

Now we get `True` for `==` because we've overridden the `__eq__` function to say that the circles are equal if their color is the same.

BUT HOW DOES IT DECIDE WHICH CLASSES EQ function to use???

### Built in types
For built in types such as `int`, `float` and `list` the value used by `==` to determine equality is predefined and just makes sense. 

{% highlight python %}
a = 1
b = 2
a == b
# False

a = [1, 2]
b = [1, 2, 3]
a == b
# False

a = "a"
b = "a"
a == b
# True
{% endhighlight %}

Let's look at the behaviour of `is`.

{% highlight python %}
a = 1
b = 2
a is b
# False

a = [1, 2]
b = [1, 2, 3]
a is b
# False

a = "a"
b = "a"
a is b
# True !!!

{% endhighlight %}

A slight surprise is that when `a` and `b` are assigned the same value `"a"` then `is` returns `True` which doesn't seem to make sense because surely a seperate object is created each time. Let's check.

{% highlight python %}

a = "a"
b = "a"
a is b
# True !!!

id(a)
# 4422530528
id(b)
# 4422530528

{% endhighlight %}

Nope, `a` and `b` are pointing to the same object. This seems to be an efficiency in Python where it tries not to create the same built in type twice.

### Checking for None
At first it looks like `x == None` works.

{% highlight python %}
x = 1
x == None
# False

x = None
x == None
# True
{% endhighlight %}

This is because None is an object in memory and `id(None)` returns a memory address.