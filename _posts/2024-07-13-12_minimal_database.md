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
 
#### I want to store tabular data in s3. I want there to be zero infrastructure so as to reduce cost, maintenance and minimise system complexity. I just want to write to a file and read it, update it and read it. Keep it simple. I’m thinking I’ll just write to a parquet file and when I want to write to it again, I’ll read it using 
Polars, append the rows and then overwrite the file. What do you think?

Who will be using this “database”?

#### Just me. I will have jobs fetching and writing data. Other jobs will read this data and do analysis, ML and publishing to the web. I’ll probably use lambda functions for compute. Does that make sense?

Ok so latency and handling a large number of concurrent connections isn’t really a concern.  You won’t need to have granular user permissions either. Will there be a large volume of data?

#### Not initially but over time it could grow and there could potentially be something like a feature store. 

Ok so it would be good for it to scale nicely. I guess for data recovery you could use s3 backup features like versioning and replication across regions. 

Any chance of concurrent reads and writes? 

#### No no that won’t happen…em…no wait…well…yes that’s possible. Two lambdas could fire at the same time I guess. Why?

Well then you could try to read when writing and the parquet file might not exist or could be in a corrupt state . What about concurrent writes?

#### No. Well maybe. What’s wrong with that?

You might lose one of your writes. Whichever finishes first could be lost, it’s a race condition. It’s not durable and the writes aren’t isolated. 

#### What are other options?

You need something that implements ACID transactions. Atomic, Consistent, Isolated, and Durable. Atomic means that a transaction is all or nothing, all the data is written or nothing. Consistent means that the transaction must transition the data from one valid state to another (e.g. doesn’t break constraints). Isolation means that simultaneous transactions to not interact resulting in an incorrect result. Durability means that once a transaction completes the change is safe. RDBMS databases provide ACID transactions. But if you want to stick to just files and code then you’ll need to use a file format like delta, iceberg or hudi.

#### How about SQLite?

SQLite stores it’s data in a single file and there is no server. So things look good until you realise it needs a file system to operate directly. S3 is just object storage. It’s not a file system. So things like transactions probably won’t work, though I haven’t checked. 

#### Ok which is best for me?
Hudi is generally considered more complex, I haven’t looked into the detail of that but let’s put it to one side.  Delta is obviously first and foremost used with Databricks but it is an open table format and is supported by tools like Polars. Iceberg is well supported as well. Delta and Iceberg both give you ACID transactions and will work on s3. They probably both meet the requirements so the only way to choose is to test them out and see which suits best. 



_____
