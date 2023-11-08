---
layout:     post
title:      "Precision vs Specificity"
permalink: "3"
subtitle:   
date:       2023-11-08
image: "assets/img/3/main.png"
published: true
tags: [ML, refresh]
image_width: 100%
---

## Summary

* Specificity makes sense when there is a treatment cost for the testee.

* Precision makes sense when there is a treatment cost for the tester.

* Both of these may apply.

## Binary Tests

* A binary test comes in many forms for example:

  * A binary machine learning classifier.

  * A Covid-19 antigen test.

  * Guessing whether a flipped coin will come up heads or tails.

* A confusion matrix evaluates the efficacy of such tests. It's called a confusion matrix because it measures how much the test is confusing the two classes. It has 4 entries:

  * True Positives (TP)

  * False Positives (FP)

  * True Negatives (TN)

  * False Negatives (FN)

* Metrics such as Precision, Recall, Specificity, Sensitivity and many more can be calculated from the entries in a confusion matrix.

* There are two points of view when conducting a test: the tester and the testee. This is important when considering how to evaluate the efficacy of a particular test. The tester and testee could be the same person.

## Precision
* `TP/(TP+FP)`

* `P(TP | P)` 

* The probability of being a true positive if a positive result was received.

## Specificity 
* `TN/(TN+FP)` 

* `P(TN | N)`

* The probability of receiving a negative result if truly negative.

## Precision Example
* Imagine a machine learning classifier classifies customers as likely to churn or not. Say all customers with a positive result are given a €10 voucher. To simplify things let's say they get the voucher whether they stay or not.

* The cost of doing the test for the customer (testee) is zero since doing the test just involves inputting the customers data into the model. Of course this assumes the customers privacy is respected.

* The marginal cost (i.e. excluding the various costs of training the model) for the test for the business (tester) is just the compute cost and is probably low.

* The cost of treatment to the customer is zero since they get a €10 voucher.

* The cost of treament for the business is €10.

* Since the main False Positive cost relates to the treatment it makes sense to measure what % of treatments were not actually required i.e. Precision.

* There are other costs relating to False Negatives which we're not considering here and also potential costs relating to True Positives if the voucher doesn't prevent churn!

* If the cost of treatment, monetory or otherwise, is zero then the test is pointless, since we can just give all testees treatment with no cost.

## When to use Specificity
* Imagine it's your wedding and you ask all guests to test for Covid beforehand. If they get a positive result you ask them not to attend.

* The cost of treatment is large for a testee since they miss out on wedding. It also could be large for the tester if they lose a lot of guests but if they just lose a few then it's not so bad.

* Say there are 100 guests, 10 guests have positive results, there are no False Negatives and 5 guests are False positives. 

* Precison tells us that 50% of the guests we excluded (5/10) from the wedding were excluded unnecessarily.

* Specificity tells us 94.7% of truly negative guests (90/95) were unimpacted by the policy which means that 5.3% were impacted. 

* Losing a few guests from a wedding is standard so while 50% Precision looks big, the cost to the tester is actually low. So Precision is less important.

* On the other hand missing out on the wedding is a bigger deal for the excluded guests who were False Positives. So Specificity is the better metric to use in this case.

## What about Recall and Sensitivity?

* When evaluating a test:

  - Precision is often paired with Recall e.g. Precision Recall curves.

  - Specificity is often paired with Sensitivity e.g. Receiving Operating Characteristic (ROC) curves.

* Recall is `P(TP | P)`.

* Sensitivity is `P(TP | P)`.

* _So Recall and Sensitivity are the same thing._

* Recall/Sensitivity is the probability of receiving a positive result if truly positive (How _'sensitive'_ is this test?). Or from the testers point of view it's the % of positive cases that the test will catch (How many positive cases will this _'recall'_?).

* Notice that Specificity mirrors Recall/Sensitivity except it focuses on True Negatives i.e. `P(TN | N)` vs `P(TP | P)`. So specificity really seems like a natural metric to use along side Recall/Sensitivity.

* Recall/Sensitivity is important when considering the cost of doing the test rather than the cost of the treatment. For example if a test has low Recall/Sensitivity, say 5%, you wouldn't take it if it cost lots of money, but if it was free and effortless, then why not. 

_____