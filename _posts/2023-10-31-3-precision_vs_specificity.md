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

## Binary Tests

* A binary test comes in many forms for example:

  - A binary machine learning classifier.

  - A Covid-19 antigen test.

  - Guessing whether a flipped coin will come up heads or tails.

* A confusion matrix evaluates the efficacy of such tests. It's called a confusion matrix because it measures how much the test is confusing the two classes. It has 4 entries:
  - True Positives (TP)

  - False Positives (FP)

  - True Negatives (TN)

  - False Negatives (FN)

* Metrics such as Precision, Recall, Specificity, Sensitivity and many more can be calculated from the entries in a confusion matrix.

* There are two points of view when conducting a test: the tester and the testee. This is important when considering how to evaluate the efficacy of a particular test.

## Precision
* `TP/(TP+FP)`

* `P(TP | P)` 

* The probability of being a true positive if a positive result was received.

## Specificity 
* `TN/(TN+FP)` 

* `P(TN | N)`

* The probability of recieving a negative result if truly negative.

## What about Recall and Sensitivity?

* When evaluating a test:
  - Precision is often paired with Recall e.g. Precision Recall curves.

  - Specificity is often paired with Sensitivity e.g. Receiving Operating Characteristic (ROC) curves.

* Recall is `P(TP | P)`.

* Sensitivity is `P(TP | P)`.

* _So Recall and Sensitivity are the same thing._

* Recall/Sensitivity is the probability of receiving a positive result if truly positive (How _'sensitive'_ is this test?). Or from the testers point of view it's the % of positive cases that the test will catch (How many positive cases will this _'recall'_?).

* Notice that Specificity mirrors Recall/Sensitivity except it focuses on True Negatives i.e. `P(TN | N)` vs `P(TP | P)`. So specificity really seems like a natural metric to use along side to Recall/Sensitivity.

## Possible _Costs_ when doing a test

* Cost of performing the test
  - Possible human discomfort for the testee.

  - Monetory cost of test for the tester.

* Cost of actions following the tests:
  - Emotional cost of treatment for testee.

  - Financial cost of treatment for tester.

  - Cost of False Positive/Negative for testee.

  - Cost of False Positive/Negative for tester.

  * Since we're focusing on Precision and Specificity let's just consider the costs associated with False Positives.

## When to use Precision?
* Imagine a machine learning classifier classifies customers as likely to churn or not. Say all customers with a positive result are given a €10 voucher. To simplify things let's say they get the voucher whether they stay or not.

* The cost of doing the test for the customer (testee) is zero since doing the test just involves inputting the customers data into the model. Of course this assumes the customers privacy is respected.

* The marginal cost (i.e. excluding the various costs of training the model) for the test for the business (tester) is just the compute cost and is probably low.

* The cost of treatment to the customer is zero since they get a €10 voucher.

* The cost of treament for the business is €10.

* Since the main False Positive cost relates to the treatment it makes sense to measure what % of treatments were not actually required i.e. Precision.

* There are other cost relating to False Negatives which we're not considering here and also potential costs relating to True Positives if the voucher doesn't prevent churn!

* Note also that if the cost of treatment, monetory or otherwise, is zero then the test is pointless, since we can just give all testees treatment with no cost.

## When to use Specificity
* Imagine it's your wedding and you ask all guests to test for Covid before hand.

* Say there are 100 guests.

* Cost of treatment is large for testee they miss out on wedding. It's also large for the tester as they lose a guest.

* Specificity is important because we want to know what proportion of guests who don't have Covid who we are excluded from the wedding. What % of guests will unnecessarily experience this cost?

* From the testers point of the cost relates to missing guests from the wedding. What % of this cost was needless.

* imagine 10 guests hae positive results. There are no False Negatives. 5 guests are False positives. 5/95 guests were impacted unnecessarily Specificity. 50% of the guests we excluded fromt the wedding were excluded unnecessarily Precision.

* Nut imagine that we don't mind about losing 10 guests and the cost to us is much less important. Then Specificity is the measure we are interested in. The cost to the testee is much more than the tester.

False Postiives - Cost to Tester vs Cost to Testee
False Negatives - Cost of test

_____