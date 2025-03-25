---
title: How to reduce inventory under high concurrency?
tags:
  - Big Data
  - Middleware
permalink: /en/article/designing-inventory-deduction-systems-under-high-concurrency/
createTime: 2025/03/19 15:56:13
---
This is a common scenario in e-commerce. Currently, Internet giants have very mature solutions for it. I wrote this article just to give some of my own thoughts.

Suppose we now have a relational table for inventory: INVENTORY, and its structure is as follows:

| ID          | PRODUCT_ID                | STOCK             |
| ----------- | ------------------------- | ----------------- |
| Primary key | Product unique identifier | Inventory (units) |

Obviously, the program's steps for inventory reduction for products should be:
::: steps
1. Query the current inventory.
2. Confirm that the inventory is still greater than or equal to 0 after the target quantity is reduced.
3. `UPDATE` the reduced data in the table.
:::
However, in this process, it is necessary to avoid conflicts in the modification of the same data by multiple threads in a concurrent situation. Here we discuss four solutions, of which the first three rely on the MySQL database itself, and the last one relies on Redis to implement distributed locks.

## Optimistic lock
Atomic updates plus optimistic locks can be used to prevent errors in the deduction results. We add a field: VERSION to the INVENTORY table to identify the version and implement a simple optimistic lock.

```sql
-- Query the current version number first
SELECT version, stock FROM INVENTORY WHERE product_id = #{product_id};

-- Update with version number
UPDATE INVENTORY
	SET
		stock = stock - #{deduct_num},
		version = version + 1
	WHERE
		product_id = #{product_id}
		AND version = #{queried_version}
		AND stock >= #{deduct_num};
```

In this solution, the retry mechanism needs to be considered. If the SQL execution fails, it should be retried in a limited manner.

## Pessimistic lock
We can use very strict pessimistic locks for updates, but the performance of this method is extremely low, and it is easy to cause database deadlock under high concurrency. Generally speaking, this method is not recommended.

```sql
START TRANSACTION;

-- Add row-level exclusive lock
SELECT * FROM INVENTORY WHERE product_id = #{product_id} FOR UPDATE;

UPDATE INVENTORY
	SET stock = stock - #{deduct_num}
	WHERE product_id = #{product_id};

COMMIT;

```

## Segmented lock
The performance of the above pessimistic lock method is too low, so we can optimize it to some extent. Add a BUCKET_ID field to the INVENTORY table and split the inventory into multiple buckets. This can reduce conflicts to a certain extent under high concurrency load balancing.
```sql
-- Split the inventory into multiple buckets
UPDATE INVENTORY
	SET stock = stock - #{deduct_num}
	WHERE
		product_id = #{product_id}
		AND bucket_id = #{hash(order_id)}
		AND stock >= #{deduct_num}
```

## Redis distributed lock
### Lock
```shell
SET lock_key unique_value NX PX 10000
```
- NX means that the lock is only added when lock_key does not exist.
- PX 10000 means setting the expiration time to 10s. In order to avoid the client being unable to release the lock when an exception or downtime occurs.

### Unlock
There are two operations when unlocking: determining whether the locked thread is itself and unlocking (deleting the KEY). At this time, we use Lua scripts to ensure atomicity.
```lua
if redis.call("get", KEYS[1]==ARGV[1]) then
	return redis.call("del", KEYS[1])
else
	return 0
end
```

::: tip Generally, a watchdog thread is set up. This thread checks every few seconds whether the thread that acquires the lock is still alive. If it is alive, the lock expiration time is extended. This is to avoid the locking process failing to complete the task successfully within the expiration time.
:::

## Summary
- Optimistic lock.

	Essentially, the version number is used to complete a CAS operation.
- Pessimistic lock.

	Use the `SELECT ... FOR UPDATE` statement to lock the data. In fact, due to its low performance and easy to cause database deadlock, this method is not easily used.
- Segment lock.

	Divide the inventory data into multiple buckets, and randomly select a bucket of data for deduction each time the deduction is made. Regular inventory consolidation checks are required.
- Redis distributed lock.

	Use Redis to implement a distributed lock to avoid concurrent thread operations. Pay attention to the release of the lock in Redis and the setting of the expiration time.

In actual applications, there are actually multiple methods combined, using message queues to handle peak loads and valley loads, and performing pre-withholding operations to narrow the execution window and reduce conflicts.