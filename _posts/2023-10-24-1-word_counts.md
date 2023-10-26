---
layout:     post
title:      "Word Counts"
permalink: "1"
subtitle:   
date:       2023-10-24
image: 
published: true
tag: word count
image_width: 100%
---

## Why not reading time?
I could divide the number of words by some 'average' time it takes to read a word and display a reading time instead. However reading/understanding speed varies per person so I've decided to display a word count which has zero variance.

## Accurate word count

I'm using the liquid tag `post.content | strip_html | number_of_words` to get the word count of a post. Without `strip_html` the word count is inflated particularly when `code` is included. Let's add some more code to this post.

{% highlight python %}
x = 1
y = x*2
z = y*3
{% endhighlight %}

When I manually count the words in this article I get about 126. Close enough.

_____




