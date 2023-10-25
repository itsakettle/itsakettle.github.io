---
layout:     post
title:      "Word Counts"
subtitle:   
date:       2023-10-25
image: 
published: true
tag: word count
image_width: 100%
---

## They look a bit big?

I'm using the liquid tag `post.content | number_of_words` to get the word count of a post. A few experiments indicate that this double counts 'words' in code blocks and a word in code blocks will also include things like `=`. So this causes the word counts to be inflated. 

But the purpose of the word count is to give a hint towards how long it will take to read/understand the article. If there is a lot of code this could take longer, so maybe this 'accidental heuristic' works out...

## Why not reading time?
I could divide the number of words by some 'average' time it takes to read a word and display a reading time instead. However reading/understanding speed varies per person so I've decided to dipslay a word count which is easier to measure.

