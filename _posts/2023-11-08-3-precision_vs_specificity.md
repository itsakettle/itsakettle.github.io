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

  * A test for an illness.

  * Guessing whether a flipped coin will come up heads or tails.

* A confusion matrix evaluates the efficacy of such tests. It's called a confusion matrix because it measures how much the test is confusing the two classes. It has 4 entries:

  * True Positives (TP)

  * False Positives (FP)

  * True Negatives (TN)

  * False Negatives (FN)

* Metrics such as Precision, Recall, Specificity, Sensitivity and many more can be calculated from the entries in a confusion matrix.

* There are two points of view when conducting a test:

  * The testee who is being tested.

  * The tester who is carrying out or designing the test.


## Precision
* `TP/(TP+FP)`

* `P(TP | P)` 

* The probability of being a true positive if a positive result was received.

## Specificity 
* `TN/(TN+FP)` 

* `P(TN | N)`

* The probability of receiving a negative result if truly negative.

## Example of when Precision is important
* Imagine a machine learning classifier classifies customers as likely to churn or not. The tester is the company trying to stop churn and the testee is each individual customer.

* Say all customers with a positive result are given a €10 voucher. To simplify things let's say they get the voucher whether they stay or not.

* The cost of treatment to the customer is zero since they get a €10 voucher.

* The cost of treament for the business is €10.

* Since the main False Positive cost relates to the treatment it makes sense to measure what % of treatments were not actually required i.e. Precision.

* There are other costs relating to False Negatives which we're not considering here and also potential costs relating to True Positives if the voucher doesn't prevent churn!

* If the cost of treatment, monetory or otherwise, is zero then the test is pointless, since we can just give all testees treatment with no cost.

## Example of when Specificity is important

*  Imagine a spam filter for email. The tester is the company that provide the email service and the testee is each user email that is classified as spam or not.

* The marginal cost of redirecting an email to the users spam folder is negligible. So there is no treatment cost for the tester.

* If an email is flagged as spam the user will not see it (assuming they don't check their spam folder) and could miss out on important information. So the treatment cost for the testee is greater.

* So Specificity is more important in this case as it measures how many legitimate emails were not shown to the recipient and each of these instances has a definite cost to the user.

* Precision is still an interesting metric but it's less important since there is no cost of treatment for the tester.

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