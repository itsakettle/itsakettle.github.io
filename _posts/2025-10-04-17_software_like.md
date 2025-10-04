---
layout:     post
title:      "Software Like"
permalink: "17"
subtitle:   
date:       2025-10-03
image: "assets/img/17/main.png"
published: true
tags: [curiosity]
code: 
image_width: 70%
---

Occasionally, in everyday conversation unrelated to computers, people say “it’s a software issue, not hardware”. It’s an analogy we understand intuitively, but it makes me wonder what, exactly, is software? Does it exist organically? So when Sabine Hossenfelder discussed a paper about [emergent behaviour in complex systems through the lens of software](https://arxiv.org/abs/2402.09090), I put it at the top of my reading list. It is rigorous, defining concepts such as “software like” in terms of causally closed epsilon machines, but I am more interested in growing my intuition of the core concept. 

## What is Software
The example given is when we assign a variable ‘x=1’, or whatever, which updates the state of the software. At a lower level the state of the underlying hardware is also updated to reflect the assignment. A key feature of software is that it is agnostic to how the hardware implements its state. 

## Constructed State Machine ~ Observed Markovian Process 
When we write software we have constructed a state machine at the software layer. We mostly forget about the hardware layer below. The software runs and moves between states, as coded, with a causal structure. If this, then that etc. 

But what if we could only observe the state of the hardware and we didn’t know about the software layer? Could we tell that the software exists at all? And if we could see the human inputs to the software - click, type, scroll - but had no idea of the software driving the process, we wouldn’t know whether we are seeing “input” data or “output” data, we would just see data. As an observer we would have little visibility into the causal mechanism of the underlying process. 

The paper calls this duality. It means that when we observe the outputs of a process we can think of it as a Markovian state machine and apply that theory. If we are observing any process, where we have no knowledge of the underlying causal mechanism, there could be software like processes running that are transparent to us. 

## Epsilon Machines
Let’s be a tiny bit more formal. Even though we might be trying to understand a stream of data, we can think about the underlying process as a Markovian state machine. An Epsilon machine reduces down these states by grouping them into equivalence classes such that two states are in the same class if they have the same probability of future outcomes. The equivalence relation just removes any redundancy and the epsilon machine is the most compact representation of the underlying computation. 

## Causal Closure
Now let’s say we have the hardware process, but let’s call it the micro process, and there is some way of simplifying the states of the process which creates a macro process. For example, a gas is made up of particles bouncing around, this is the micro process, and its temperature, pressure etc form a macro process i.e. thermodynamics. When the epsilon machine of the macro process is independent of any of the data from the micro process it is called causally closed. This means you don’t need the micro states anymore, you can just use the macro states to understand the future behaviour of the macro process. 

## So what?
We can think of the macro states as an emergent software like process “running” on the micro states. That’s the basic intuition I want to remember - there’s much more in the paper. Frameworks like this might help us better understand natural processes such as the weather, or even the emergent behaviour of LLMs.

___