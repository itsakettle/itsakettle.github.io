---
layout:     post
title:      "Precision vs Specificity"
permalink: "3"
subtitle:   
date:       2023-11-01
image: "assets/img/3/main.png"
published: true
tags: [ML, refresh]
image_width: 100%
---

## Binary Classification vs Two Outcome Test 

* 

* 

## Precision
* `TP/(TP+FP)`

* `P(TP | P)` 

* The probability of being a true positive if a positive result was received.

## Specificity 
* `TN/(TN+FP)` 

* `P(TN | N)`

* The probability of receiving a negative result if truly negative.

## What about Recall and Sensitivity?

* When evaluating a some binary classifier:
  - Precision is often paired with Recall e.g. Precision Recall curves.

  - Specificity is often paired with Sensitivity e.g. Receiving Operating Characteristic (ROC) curves.

* Recall is `P(TP | P)`.

* Sensitivity is `P(TP | P)`.

* So Recall and Sensitivity are the same thing.

* Recall/Sensitivity is the probability of receiving a positive result if truly positive (How _sensitive_ is this test?). Or from the testers point of view it's the % of positive cases that the test will catch (How many positive cases will this _recall_?).

* Notice that Specificity mirrors Recall/Sensitivity except it focuses on True Negative i.e. `P(TN | N)` vs `P(TP | P)`. 

* So specificity really seems like a natural metric to use along side to Recall/Sensitivity.

## So why Precision?



## When to use Specificity


_____