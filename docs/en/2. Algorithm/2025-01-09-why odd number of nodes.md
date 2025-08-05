---
title: Why is the number of distributed nodes usually an odd number?
cover: /cover/why-odd-number.png
tags:
  -   Distributed
permalink: /en/article/why-use-odd-number-of-nodes-in-distributed-system/
createTime: 2025/01/09 10:42:53
---
As a backend engineer, I often deal with various distributed systems in my daily work, such as ETCD, Redis, k8s, etc. When deploying these distributed clusters, we usually set the number of nodes to an odd number, which seems to be a conventional rule. But why? In addition to the fact that even-numbered nodes are prone to voting tie, are there other reasons?
<!-- more -->

::: note If you don't know much about distributed consensus algorithms, you can read other article of mine: [Detailed Explanation of Raft Protocol](/en/article/b7r3zg4p/) first.
:::

In the Raft protocol, even if some nodes fail, the cluster can still reach a consensus. Then the voting process requires the agreement of ==most== nodes. At this time, we can derive a Quorum formula:

$$
Quorum = ( N / 2 ) + 1
$$

Based on this formula, we can calculate the following table. It is easy to find that when we use an even number of nodes, we can actually achieve the same fault tolerance by using fewer odd nodes.

| Cluster size | Quorum | Number of nodes that can tolerate downtime | Fault tolerance |
| -------- | ------ | ------------------ | -------- |
| 3 nodes | 2 | 1 | High |
| 4 nodes | 3 | 1 | No improvement |
| 5 nodes | 3 | 2 | Higher |
| 6 nodes | 4 | 2 | No improvement |
| 7 nodes | 4 | 3 | Very high |

Obviously, when using an odd number of nodes, we will get the following benefits.

1.  Maximize fault tolerance
-   In a 3-node cluster, 1 node can fail and the remaining 2 nodes still form the quorum.
-   In a 5-node cluster, 2 nodes can fail and the remaining 3 nodes still form the quorum.

1.  Avoiding split-brain scenarios
-   In the case of an even number of nodes ( e.g. 4 ) , if half of the nodes fail ( 2 nodes ) , the remaining 2 nodes cannot form a majority, resulting in the system being unable to determine which side is the correct split-brain scenario.
-   Odd numbers eliminate the possibility of equal splits.

1.  Efficiency
-   Using odd numbers minimizes the number of nodes required to achieve higher fault tolerance.
-   Adding more nodes than necessary increases complexity without producing proportional benefits.

![Does it mean that we must use an odd number of nodes?](/cover/why-odd-number.png)

**So does it mean that we must use an odd number of nodes? No.** We usually recommend an odd number of nodes because an odd number of nodes can achieve the same fault tolerance with fewer nodes.

<br /><br /><br />

::: info References for this article
1.  [Why Kubernetes Clusters Should Have an Odd Number of Nodes](https://cloudcuddler.com/why-kubernetes-clusters-should-have-an-odd-number-of-nodes/)
2.  [Let』s talk about distributed systems from the perspective of why the number of etcd master nodes in a k8s cluster is an odd number](https://www.cnblogs.com/LLj-cnblogs/articles/17443126.html)
:::
