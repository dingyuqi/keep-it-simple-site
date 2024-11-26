---
title: What is a consistent hash algorithm?
cover: /illustration/hash-ring-data-server-map.png
tags:
  - Big Data
  - Distributed
createTime: 2024/11/26 10:18:51
permalink: /en/article/s1n21jo1/
---
"Consistent hash" seems to be a confusing name, because the result of the hash function should be the same no matter where it is calculated, so why is there a consistency problem? 
<!-- more -->

In fact, we proposed the concept of consistent hash to solve the problem in distributed storage. In distributed storage, different machines will store data of different objects, and we use hash functions to establish a mapping relationship between data and servers. So why is there "inconsistency"?


## What does hash inconsistency mean?
Let's consider a distributed storage scenario:

Now we need to store 10 data $D_1, D_2, \dots, D_{10}$ in 3 machine nodes ($M_0, M_1, M_2$). We can certainly use a mapping table to maintain the mapping relationship between data and machines, but that means we need to store an additional table and have to maintain it constantly. Even this table may not be able to store as the data increases. Then we naturally think of using a Hash function to calculate the mapping between data and machine nodes, so we have the following formula:
$$
m = hash(o) \ \ mod \ \ n
$$
Where $o$ is the name of the data object, $n$ is the number of machines, and $m$ is the machine node number where the storage object is calculated.

According to this formula, we can easily get the following mapping:

| Machine number | Data |
| -------- | ----------------------- |
| 0 | $D_3, D_6, D_9$ |
| 1 | $D_1, D_4, D_7, D_{10}$ |
| 2 | $D_2, D_5, D_8$ |

If we add a machine at this time, After $n = 4$, the mapping can be recalculated:

| Machine number | Data |
| -------- | ------------------ |
| 0 | $D_4, D_8$ |
| 1 | $D_1, D_5, D_9$ |
| 2 | $D_2, D_6, D_{10}$ |
| 3 | $D_3, D_7$ |

Obviously, except for $D_1 and D_2$, which have not changed the machine node, all other data have changed the storage machine. This means that when a machine node is added to the storage cluster, a large amount of data migration will occur, which undoubtedly adds a lot of pressure to the network and disk, and may even cause the database to crash in severe cases.

So the consistency of Hash does not mean that the results of repeated calculations of the Hash function are inconsistent, but that this calculation leads to data migration. So is it possible for us to reduce this data migration? Yes, ==Consistency Hash algorithm can ensure that when machine nodes are increased or decreased, data migration between nodes is limited to two nodes, Without causing global network problems.==

## Consistent Hash usage scenarios
The consistent hash algorithm is a very important algorithm in distributed systems, mainly used in:
- Load balancing
- Cache data partitioning
- Distributed relational database node mapping
- RPC framework Duddo is used to select service providers

## Algorithm implementation
The entire algorithm mainly transfers the hash value space to a ring-shaped virtual space, and then maps the machine nodes and data. Let's take a look at the implementation process based on the example of data and machine node mapping mentioned above:

::: steps
1. Create a hash ring
Unlike general hash functions that map data to a linear space, we consider mapping the hash value space into a virtual ring space. If the value of the entire hash space is: $0 \sim 2^{32}-1$, then we arrange it clockwise so that the last node $2^{32}-1$ overlaps at the starting position 0.

![Ring Hash Space](/illustration/hash-ring.png)

2. Map data to the Hash ring
Assume that there are 4 data objects $o_1, o_2, o_3, o_4$, calculate the Hash value for each of them, and get the result $m_1, m_2, m_3, m_4$. Place these four results on the Hash ring.

![Data objects mapped to the Hash ring](/illustration/hash-ring-data.png)

3. Map the server to the Hash ring
Perform Hash calculation on the IP addresses of the 3 servers $c_1, c_2, c_3$, and perform $2^{32}$ modulo on the Hash value to get an integer $t_1, t_2, t_3$ with a value between $0 \sim 2^{32}-1$. Map the integer after modulo on the Hash ring.

![Mapping machine nodes to the Hash ring](/illustration/hash-ring-server.png)

4. Selecting machine nodes for data storage
Each data object selects the machine closest to it in a clockwise direction for storage.

![Data object selects machine node](/illustration/hash-ring-data-server-map.png)

:::

The above has completed the calculation process of the entire consistent Hash algorithm. Next, let's take a look at the two scenarios mentioned at the beginning of the article: what changes will occur in the mapping between data and machines in adding machine nodes and deleting machine nodes.

### Adding machine nodes
Now add a machine $c_4$, and get the integer $t_4$ after taking the Hash value modulo, and add it to the Hash ring.

![Hash ring after adding machine nodes](/illustration/hash-ring-add-server.png)

It can be seen that unlike the situation at the beginning of the article where a large amount of data needs to change the machine node, now we only need to change a data object $o_4$, and remove it from $t_3$ is reallocated to $t_4$.

### Reduce machine nodes
Similarly, if we reduce a machine $c_1$, after reallocating the machines, we find that only object $o_2$ is reallocated to $c_3$, and other data does not need to be changed.

![Hash ring after reducing machine nodes](/illustration/hash-ring-reduce-server.png)

## Possible problems

==Load imbalance==

This is a problem that consistent hashing can easily encounter. Generally speaking, we hope that data is evenly distributed on all machines, including after adding or removing machines. But observing the example of [adding nodes](/article/vpa4ql0t/#Adding machine nodes) mentioned earlier, after adding machine $c_4$, it only shares the pressure of $c_2$. We can imagine that if we add node $c_5$ again, unfortunately the hash value of the new node falls between $t_4$ and $t_2$ again, Then the newly added nodes cannot be assigned any data. **It can be seen that adding machine nodes may not necessarily reduce the pressure of data load.**

So how to solve it?

::: card title="Solution: Virtual Node"
Let's use the above example: For machines $c_1, c_2, c_3$, in addition to being directly mapped to the Hash ring to form three nodes, each node also has two additional virtual nodes. The more virtual nodes there are, the more evenly the data is distributed on the machine.

![After adding virtual nodes to the Hash ring](/illustration/hash-ring-virtual-node.png)

You can understand that we have added another layer of mapping from virtual machine nodes to actual machine nodes.
:::

## Summary
The consistent Hash algorithm solves the problem that when machines are added or reduced in a distributed environment, simple modulus operations cannot obtain a high hit rate.

Through the use of virtual nodes, the consistent Hash algorithm can evenly share the load of the machine, making this algorithm more realistic.