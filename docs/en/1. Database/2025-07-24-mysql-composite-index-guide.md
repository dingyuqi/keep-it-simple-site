---
title: MySQL Composite Index Practical Guide
tags:
  - Relational Database
cover: /cover/mysql-composite-index-en.png
permalink: /en/article/mysql-composite-index-practical-guide/
createTime: 2025/07/25 17:45:06
---
In the actual development process, it is inevitable to create composite indexes for MySQL. However, considering the leftmost matching principle and some index failure scenarios, there are still some tricks to create indexes. This article will give some simple scenarios and discuss how to create MySQL composite indexes most effectively based on these scenarios.
<!-- more -->

## WHERE a = 1 AND b = 2 AND c = 3
```
SELECT * FROM <table> WHERE a = 1 AND b = 2 AND c = 3;
```
It can be noted that the three restrictions in the `WHERE` statement are all `=`, which will not cause the index to fail. So you can create three types of joint indexes: (a, b, c), (c, b, a) or (b, a, c). The key point is to put the fields with high discrimination in the front and the fields with low discrimination in the back. Fields like gender and status have low discrimination, so we usually put them in the back.

## WHERE a > 1 AND b = 2
```
SELECT * FROM <table> WHERE a > 1 AND b = 2;
```
Since `>` will cause the index to fail, according to the leftmost matching principle, we should create an index for (b, a). If you create an index for (a, b), only the a field can be used, after all, the leftmost matching principle stops matching when encountering a range query.

If you create an index for (b, a), both fields can be used, and the optimizer will help us adjust the order of a and b after `WHERE` so that we can use the index.

## WHERE a > 1 AND b = 2 AND c > 3
```
SELECT * FROM <table> WHERE a > 1 AND b = 2 AND c > 3;
```
Similar to the previous scenario, in this case, either (b, a) or (b, c) can be created.

## WHERE a = 1 ORDER BY b
```
SELECT * FROM <table> WHERE a = 1 ORDER BY b;
```
At this time, (a, b) should be indexed. Because in this way, when a = 1 in the index tree, b is relatively ordered, which can avoid re-sorting.

## WHERE a > 1 ORDER BY b
```
SELECT * FROM <table> WHERE a > 1 ORDER BY b;
```
Different from the previous scenario, this time the a field is a range query, and the b values in this range are unordered. So we should index (a), and there is no need to index (a, b).

## WHERE a = 1 AND b = 2 AND c > 3 ORDER BY c
```
SELECT * FROM <table> WHERE a = 1 AND b = 2 AND c > 3 ORDER BY c;
```
In this scenario, (a, b, c) should be indexed. Including the c field can avoid re-sorting.

## WHERE a IN (1, 2, 3) AND b > 1
```
SELECT * FROM <table> WHERE a IN (1, 2, 3) AND b > 1;
```

Index (a, b). Because `IN` can be regarded as an equal reference here, it will not terminate the index matching.