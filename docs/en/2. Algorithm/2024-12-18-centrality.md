---
title: "Centrality Algorithms: Degree Centrality | Closeness Centrality | Betweenness Centrality"
cover: /cover/centrality-algorithm.png
tags:
  - Distributed
  - Big Data
createTime: 2024/12/18 09:48:04
permalink: /en/article/centrality-algorithms/
---
Centrality algorithms are used to understand the influence of specific nodes in a graph and their impact on the network, which can help us identify the most important nodes.
<!-- more -->

This article will introduce the following algorithms:
- [Degree Centrality Algorithm](/en/article/centrality-algorithms/#degree-centrality): It can be used as a benchmark indicator of connectivity.
- [Closeness Centrality Algorithm](/en/article/centrality-algorithms/#closeness-centrality): It is used to measure the centrality of a node in a group.
- [Betweenness Centrality Algorithm](/en/article/centrality-algorithms/#betweenness-centrality): Used to find control points in a graph.

## Degree Centrality
Used to measure the number of relationships a node has. The larger the value, the higher its centrality.
- Input: `G = (V, E)`.
- Output: Each node and its degree centrality value.

### Implementation Principle
$$
C'_D(N_i) = \frac{N_{degree}}{n - 1}
$$

Where:
- $N_{degree}$ represents the degree of the node.
- $n$ represents the number of nodes.

::: tip This formula has been standardized.
:::

### Adaptation For Heterogeneous Graphs
- This indicator calculation does not involve attributes, only the degree of the graph structure.
- Only the degree under the same label is calculated.

## Closeness Centrality
Used to discover nodes that can efficiently propagate information through subgraphs, The higher the value, the shorter the distance between it and other nodes. This algorithm can be used when you need to know which node has the fastest propagation speed.
- Input: `G = (V, E)`.
- Output: Each node and its closeness centrality.

### Implementation Principle
The indicator for measuring the centrality of a node is its average distance to other nodes. The closeness centrality algorithm calculates the sum of its distances to other nodes on the basis of calculating the shortest path between all node pairs, and then calculates the inverse of the result.
$$
C(u) = \frac{1}{\sum_{v=1}^{n-1}d(u,v)}
$$

Where:
- $u$ represents a node.
- $n$ represents the number of nodes in the graph.
- $d(u,v)$ represents the shortest distance between another node $v$ and node $u$.

It is more common to normalize the calculation result to represent the average length of the shortest path, rather than the sum of the shortest paths. The normalization formula is as follows:
$$
C_{norm}(u) = \frac{n-1}{\sum_{v=1}^{n-1}d(u,v)}
$$

### Adaptation For Heterogeneous Graphs
- Only calculate nodes with the same label.
- Actually only calculate the close centrality in each connected subgraph.

::: card title="Wasserman & Faust algorithm"
This algorithm is a variant for non-connected graphs.
$$
C_{WF}(u) = \frac{n-1}{N-1}\left(\frac{n-1}{\sum_{v=1}^{n-1}d(u,v)} \right)
$$
Where:
- $u$ represents a node.
- $N$ represents the total number of nodes.
- $n$ represents the number of nodes in the same component as $u$.
- $d(u, v)$ represents another node The shortest distance from $v$ to $u$.
:::

## Betweenness Centrality
Used to detect the degree of influence of a node on the information flow or resources in the graph, usually used to find nodes that bridge one part of the graph with another.
- Input: `G = (V, E)`.
- Output: Each node and its betweenness centrality value.

### Implementation Principle
$$
B(u) = \sum_{s \neq u \neq t} \frac{p(u)}{p}
$$

Where:
- $u$ represents a node.
- $p$ represents the sum of the shortest paths between nodes $s$ and $t$.
- $p(u)$ represents the number of shortest paths between $s$ and $t$ through node $u$.

The following figure shows the steps to calculate the betweenness score.

![Betweenness centrality calculation example](/illustration/betweenness-centrality-example.png =400x)

The calculation process for node D is as follows:
| Shortest path node pairs through D | Total number of shortest paths between node pairs $p$ | Percentage of the number of shortest paths through D $\frac{p(u)}{p}$ |
| ----------------------- | ----------------------------- | ---------------------------------------------- |
| (A, E) | 1 | 1 |
| (B, E) | 1 | 1 |
| (C, E) | 1 | 1 |
| (B, C) | 2 (B->A->C and B->D->C respectively) | 0.5 |

So according to the formula, the betweenness score of node D is: `1 + 1 + 1 + 0.3 = 3.5`.

### Adaptation For Heterogeneous Graphs
- The calculation of this indicator does not involve attributes, but only focuses on the degree of the graph structure.
- Only the degree under the same label is calculated.

<br /><br /><br />

::: info References for this article
1. ["Graph Algorithms for Data Analysis: Based on Spark and Neo4j"](https://book.douban.com/subject/35217091/)
:::