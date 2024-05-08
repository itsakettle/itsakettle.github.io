---
layout:     post
title:      "Ireland's Single Electricity Market: Self Q&A"
permalink: "9"
subtitle:   
date:       2024-03-31
image: "assets/img/9/main.png"
published: true
tags: [q&a]
image_width: 60%
---

I used to know a bit about the workings of the  Irish Single Electricity Market (SEM). But in 2018 the SEM changed to i-SEM, the "integrated" Single Electricity Market which made the Irish SEM compatible with the European electricity market. I've been reading the SEMO [training materials](https://www.sem-o.com/training/modules/) to get back up to speed. This is a self Q&A to document what I learned. 

## Great, so you understand i-SEM now?
Eh...no, i-SEM is a complex system and I've only covered the basics. Plus I may have misunderstood something or indeed maybe the theory doesn't match what happens in practice. I'm hoping this exercise will help me to improve my understanding. 

## What motivated the integration with Europe?
Treating Europe as a single market lets supply meet demand in a different country. For example generation in France could meet demand in Ireland.  If there is enough interconnector capacity then the whole of Europe will have the same energy price. 
    
## What markets are there?
There are many: The balancing market (BM), the intra day market (IDM), the day ahead market (DAM), forwards market (e.g. CfDs), financial transmission right aunctions (FTRs protect against price differences across interconnectors), and of course the capacity market (CM).

## What is the system balancing price?
From what I can tell, this is more or less the same as the system marginal price from the pre 2018 SEM. In each half hour, generator and demand side units are turned on and off to keep supply equal to demand. The balancing price is calculated based on the offer data from these units which is submitted in advance of each half hour. Market participants pay the balancing price on deltas between their metered generation/demand and their positions they have already established in the DAM and IDM. 

## How does the DAM work?
Market participants submit bids for each hour of the day up until D-1 (i.e. the day before delivery). So it is called the day ahead market because thats when it closes. It opens 19 days in advance. A bid can be to buy or sell a volume of electricity (MWH) at a certain price (€/MWH or £/MWH). Participants are buying/selling energy from the market operator, not other participants. For each hour an algorithm is used to calculate a clearing price. Bids to sell electricity are accepted if they are below the clearing price. Bids to buy are accepted if they are above the clearing price. The clearing price is the final price for all accepted bids. It's similar to how the old SMP was calculated but with bids to buy instead of demand.

## And the IDM, how does that work?
The IDM closes just before the trading period. In this case participants buy and sell energy from each other, in the sense that the market operator matches buys with sells. So in the IDM there is no clearing price.

## What's the purpose of the DAM and IDM? 
The idea is that these prompt markets should increase liquidity and reduce prices. For example, if a supplier (some entity with demand only customers) realises they will have higher demand than expected they have the opportunity of buying any extra supply in the IDM rather than having to accept the balancing price. Who knows there could be another supplier with less demand and an IDM trade removes the balancing market from the equation altogether. 

## But why is it good to avoid the balancing market?
Well, I guess, it's because the purpose of the balancing is, only, to maintain the integrity of the system. For example, if there is an unexpected generator outage then other generators would be fired up based on the price curves they submitted in advance. It could be expensive. The IDM offers the chance to avoid this uncertainty. Of course it doesn't mean it will workout financially better, it just removes the uncertainty. Perhaps on average it would work out better financially, I'm not sure, it would be great to understand that better.

## What financial exposures do market participants face?
The main exposure is to the balancing price. But this can be controlled using things like Contracts for Difference (CfD), buying gas (many generators run on natural gas) or indeed using the prompt markets discussed above.

## What about risk premiums? 
You would hope that the prompt markets would help suppliers manage their risk better which would reduce risk premiums and reduce electricity prices for end users. I have no idea if this is the case. Only the suppliers would know, I suppose.

## What would be a good strategy for a wind farm?
I'm not sure, I'd love to understand this, I'll need to do some more research. Uncertainty of output is obviously the main problem. How good is wind forecasting? I dont know. It must depend on the site. 

## Are the prompt markets popular? Which participants use them? 
I don't know. SEMOpx operates the prompt markets and it seems to publish data. I hope to look at that in the future. Perhaps strategies can be understood from the published data, perhaps not.

## What role do capacity payments play?
If I remember correctly the pre 2018 SEM had a half hourly capacity price as well as the system marginal price. I think all generators received this if they were just available and not even dispatched. I think. Not sure.

This seems to have been replaced with capacity auctions occurring very far in advance (years) and covering long periods (again years). Interestingly there is a strike price associated with capacity. If the balancing price goes above this price then the generators must pay the difference back to the suppliers. It's like a CfD. I don't really understand the intention or consequences of this yet, though it obviously reduces peak balancing prices for suppliers. 

## How about a simple example to tie it all together?
 
_____
