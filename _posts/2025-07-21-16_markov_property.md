---
layout:     post
title:      "The Markov Property"
permalink: "16"
subtitle:   
date:       2025-07-21
image: "assets/img/16/main.png"
published: true
tags: [ml, causal]
code: 
image_width: 50%
---

I’ve bumped into the Markov property a bit in the last few years: it's mentioned in the book [Causal Inference and Discovery in Python by Aleksander Molak](https://alxndr.io/), it came up in a job interview and also in a paper about [emergent behaviour in complex systems](https://arxiv.org/abs/2402.09090). 

## Definition
The Markov property states that the future state of a system only depends on the current state.

## System Design
Most truly Markovian processes are actually made by people. If a traffic light is red then we know that green is coming next. So you don’t need to store any historical state, just the current state, which reduces computational complexity. 

## Modelling
The Markov property is superseded by the principle of parsimony when modelling a system where the underlying mechanism is unknown. This is the case for many higher level natural processes. We just want the simplest model that gives good enough predictions. If no lagged variables are included in your model and the results are “good enough” you might be able to say the system is approximately Markovian. 

## Causal Modelling
There is also a causal version of the Markov property which, more or less, says that in a causal graph the descendants of a node are conditionally independent of the nodes ancestors when the value of the node itself is fixed. So if A causes B and B causes C then C is independent of A given B. This is justification for simplifying the causal graph and just including the most recent ancestors. 

___