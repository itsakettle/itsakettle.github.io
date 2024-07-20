---
layout:     post
title:      "Minimal database"
permalink: "12"
subtitle:   
date:       2024-07-20
image: "assets/img/self_qa.png"
published: true
tags: [q&a, databases]
code: 
image_width: 60%
---
 
#### I want to store tabular data. I want there to be zero infrastructure so as to reduce cost, maintenance and minimise system complexity. I just want to write to a file and read it, update it and read it. Keep it simple. What I’ll do is just write a parquet file and when I want to write to it again, I’ll read it using polars, append the rows and then overwrite the file. What do you think?

Any chance of concurrent reads and writes? 


#### No no that won’t happen…em…well…yes that’s possible. Why?

Oh. Well then you could try to read when the file doesn’t exist or is in a corrupt state. What about concurrent writes? 

#### No. Well maybe. What’s wrong with that?

Oh ok well you might lose one of your writes then. Whichever finishes last, it’s a race condition. It’s not durable and the writes aren’t isolated. 

#### What are other options?

You need something that implements ACID transactions. Atomic, Consistent, Isolated, and Durable. Atomic means that a transaction is all or nothing, all the data is written or nothing. Consistent means that the transaction must transition the data from one valid state to another (e.g. constraints). Isolation means that simultaneous transactions to not interact resulting in an incorrect result. Durability means that once a transaction completes the change is safe. Relational databases provide ACID transactions. But if you want to stick to just a file system and code then you’ll need to use a file format like delta, iceberg or hudi.

#### How about SQLite?

SQLite stores it’s data in a single file and there is no server. So things look good until you realise it needs a file system to operate directly. S3 is just object storage. It’s not a file system. So things like transactions won’t work. 

#### Ok which is best for me?

If ACID transactions is what you need then delta is best as it supports these natively. So it will work with spark, polars or whatever you use to read/write data. Iceberg doesn’t support ACID transactions natively. 



_____
