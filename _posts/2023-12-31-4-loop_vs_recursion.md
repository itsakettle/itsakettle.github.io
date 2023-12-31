---
layout:     post
title:      "Loop vs Recursion"
permalink: "4"
subtitle:   
date:       2023-12-31
image: "assets/img/4/main.png"
published: true
tags: [python3, refresh]
image_width: 50%
---

Consider a function that is given a list of words and needs to return the number of occurrences of a given letter across all the words.

## Loop

Here's a version using a normal loop:

{% highlight python %}
def count_letter_using_loop(words: list, letter: str) -> int:
    # Avoiding list comprehension to make the loop obvious
    total = 0
    for current_word in words:
        total += current_word.count(letter)
      
    return total
{% endhighlight %}

## Recursion

It's obvious that a recursive version is overkill but it's a interesting exercise to actually try to write one:

{% highlight python %}
def count_letter_using_recursion(words: list, letter: str) -> int:
    if not words:
        return 0
    
    current_word = words.pop()
    letter_count = current_word.count(letter)
    remaining_letter_count = count_letter_using_recursion(words, letter)
    return letter_count + remaining_letter_count
{% endhighlight %}

The recursive function:

* takes (much) longer to write

* is (much) harder to understand

* and alters the initial list of words. To avoid this you need to make a copy of the initial list and then pass it to the recursive function resulting in a memory trade off.

## When is recursion a good idea?

It depends. There are lot of factors to consider such as:

* The underlying data structure. For example a function involving some processing of a tree might be quicker to write and easier to understand using recursion.

* The nature of the problem. For example a problem could have a divide and conquer solution that might be quicker to write and easier to understand using recursion.

* Likelihood of stack overflow errors. If each recursive function call holds a lot of data it could lead to stack overflow errors. Some languages implement "tail recursion" which helps avoid this problem but Python does not. 

I tried to cause a stack overflow error on a macbook using Python but wasn't able to. More on that later maybe.

_____