# Day 9: Database Scaling & Performance

## What is database scaling? Explain vertical vs horizontal scaling.
Database scaling refers to the process of increasing a database’s capacity to handle more data and higher traffic. Vertical scaling involves adding more resources such as CPU, RAM, or storage to a single server, which is simpler but has hardware limits. Horizontal scaling involves adding more servers and distributing data or load across them, offering better scalability and fault tolerance.

## What is database replication? Explain master-slave replication.
Database replication is the process of copying data from one database server to others to improve availability and performance. In master-slave replication, the master database handles write operations while one or more slave databases replicate the data and handle read operations, reducing load on the master and providing redundancy.

## What is database sharding? How does it work?
Database sharding is a form of horizontal scaling where data is split across multiple databases called shards. Each shard contains a subset of the data, determined by a sharding key such as user ID or region. Queries are routed to the appropriate shard, allowing the system to handle large datasets and high traffic efficiently.

## What are the challenges of sharding?
Sharding introduces challenges such as complex query logic, difficulty in performing joins across shards, uneven data distribution, rebalancing shards when data grows, and increased operational complexity in maintaining consistency and reliability.

## What is database partitioning? How does it differ from sharding?
Database partitioning divides a single database or table into smaller, more manageable parts called partitions, usually within the same database instance. Sharding, in contrast, distributes data across multiple database servers. Partitioning improves performance and manageability, while sharding focuses on scalability across machines.

## What is a connection pool? Why is it important?
A connection pool is a cache of reusable database connections maintained by the application. It is important because creating and closing database connections is expensive. Connection pooling improves performance, reduces latency, and prevents the database from being overwhelmed by too many simultaneous connections.

## What are N+1 queries? How do you solve this problem?
The N+1 query problem occurs when an application makes one query to fetch a list of records and then makes additional queries for each record to fetch related data. It can be solved by using joins, eager loading, batching queries, or optimizing ORM configurations to fetch related data in fewer queries.

## What is caching? Explain different caching strategies (cache-aside, write-through, write-back).
Caching stores frequently accessed data in faster storage such as memory to reduce database load and latency. Cache-aside loads data into the cache on demand and updates it after a database read. Write-through writes data to the cache and database simultaneously. Write-back writes data only to the cache initially and updates the database asynchronously, offering high performance with added complexity.

## What is the CAP theorem?
The CAP theorem states that a distributed system can guarantee only two out of three properties at the same time: Consistency, Availability, and Partition Tolerance. In the presence of network partitions, a system must choose between consistency and availability.

## What are database transactions? What is the MVCC (Multi-Version Concurrency Control)?
Database transactions are sequences of operations executed as a single unit of work, ensuring data integrity through ACID properties. MVCC is a concurrency control mechanism that allows multiple transactions to access data simultaneously by maintaining multiple versions of records, reducing locking and improving performance in high-concurrency environments.
