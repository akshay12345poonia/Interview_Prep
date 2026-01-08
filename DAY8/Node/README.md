# Database Fundamentals

## What is a database? What are the types of databases?
A database is an organized collection of data that allows efficient storage, retrieval, updating, and management of information. Databases are broadly categorized into relational databases, document databases, key-value stores, column-oriented databases, and graph databases, each designed to handle different data models and use cases.

## What is the difference between SQL and NoSQL databases?
SQL databases are relational and use structured schemas with predefined tables and relationships, relying on SQL for querying. NoSQL databases are non-relational and use flexible or schema-less data models, making them more suitable for handling large volumes of unstructured or semi-structured data and for scaling horizontally.

## When would you choose SQL over NoSQL and vice versa?
SQL databases are preferred when data consistency, complex relationships, and transactions are critical. NoSQL databases are chosen when scalability, flexibility, and high performance with large datasets are more important, especially in distributed systems and rapidly evolving applications.

## What is ACID in databases? Explain each property.
ACID represents a set of properties that ensure reliable database transactions. Atomicity ensures that a transaction is fully completed or fully rolled back. Consistency guarantees that a transaction moves the database from one valid state to another. Isolation ensures that concurrent transactions do not interfere with each other. Durability ensures that once a transaction is committed, it remains persisted even in case of system failure.

## What is BASE in NoSQL databases?
BASE stands for Basically Available, Soft state, and Eventual consistency. It emphasizes availability and performance over strict consistency, allowing the system to return responses even during failures and eventually reach a consistent state over time.

## What is database normalization? Explain 1NF, 2NF, 3NF.
Database normalization is the process of organizing data to reduce redundancy and improve data integrity. First Normal Form ensures atomic values and no repeating groups. Second Normal Form removes partial dependencies by ensuring non-key attributes depend on the whole primary key. Third Normal Form removes transitive dependencies so that non-key attributes depend only on the primary key.

## What is denormalization? When would you denormalize data?
Denormalization is the process of intentionally introducing redundancy into a database to improve read performance. It is typically used in read-heavy systems where faster query performance is more important than strict normalization and where data consistency can be managed at the application level.

## What are database indexes? How do they improve performance?
Database indexes are data structures that improve the speed of data retrieval operations. They work by allowing the database engine to quickly locate rows without scanning the entire table, significantly improving query performance, especially for large datasets.

## What are the trade-offs of using indexes?
While indexes improve read performance, they increase storage usage and slow down write operations such as inserts, updates, and deletes. Maintaining too many indexes can negatively impact performance and increase complexity in database management.

## What is a primary key? What is a foreign key?
A primary key is a unique identifier for each record in a table, ensuring that no duplicate or null values exist. A foreign key is a field in one table that references the primary key of another table, establishing and enforcing relationships between tables.
