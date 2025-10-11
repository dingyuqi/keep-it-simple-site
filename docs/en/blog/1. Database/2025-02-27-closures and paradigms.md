---
title: How to find database closure, candidate code and paradigm?
tags:
  -   Big Data
permalink: /en/article/find-database-closure-candidate-and-paradigm/
createTime: 2025/02/27 08:50:40
---
## How To Find Closure
::: note Closure is the set of all attributes directly or indirectly derived from an attribute. Suppose we now know the function dependency set $F$ of a table and want to find the closure of the table.
:::

::: steps
1.  Let the attribute set that will eventually become the closure be $Y$, and initialize $Y$ to $X$.

2.  Check each function dependency $A \rightarrow B$ in $F$. If all attributes in the attribute set $A$ are in $Y$, and some attributes in $B$ are not in $Y$, add them to $Y$.

3.  Repeat the second step until no attributes can be added to the attribute set $Y$.

The final $Y$ is $X^{+*}$.
:::

## How To Find A Candidate Key
::: note If the value of a certain attribute group in a relation can uniquely identify a tuple, then the attribute group is called a **candidate key**.
:::

::: steps
1.  Find all attributes that do not appear on the right side of $FD$ to form an attribute group $X$. $X$ must appear in any candidate key.

2.  Calculate the closure of $X$.

3.  If $X^+=U$, then $X$ is the only candidate key, otherwise continue to step 4.

4.  Calculate $Y=U-X^+$​.

5.  For each subset $\alpha$ of $Y$, check whether $X \alpha$ is a candidate key ( same method as 2,3 ) .
:::

::: details Calculation example
Given $R ( A,B,C,D,E,G )$, $F\{D \rightarrow G, CD \rightarrow E, E \rightarrow D, A \rightarrow B\}$.
::: steps
1.  Find all attributes that do not appear on the right side of $FD$ and form an attribute group $X$. $X$ must appear in any candidate code.

$X = AC$

2.  Calculate the closure of $X$

$X^+ = ( AC )^+=\{A,C,B\}$​

3.  If $X^+=U$, then $X$ is the only candidate code, otherwise continue to step 4.

Obviously, the current $X^+$ does not satisfy it, so continue.

4.  Calculate $Y=U-X^+$.

$Y=\{D,E,G\}$​

5.  For each subset $\alpha$ of $Y$, see if $X \alpha$ is a candidate code ( the method is the same as step 2 and step 3 ) .

$( ACD )^+=\{A,C,D,B,G,E\}$ : heavy_check_mark:

$( ACE )^+=\{A,C,E,B,D,G\}$ : heavy_check_mark:

$( ACG )^+=\{A,C,G,B\}$ : heavy_multiplication_x:

**So the candidate keys are {ACD}, {ACE}.** The attributes included in any candidate key are called **primary attributes**.
:::

## Lossless Links And Functional Dependencies
### Lossless Connectivity
::: note To determine whether two tables are lossless links is actually to determine whether their contents are equivalent.
:::

:::: steps
1.  Find the intersection of the two decomposed tables ( set as $R_1$ and $R_2$ ) .

2.  Determine whether this intersection is a superkey of $R_1$ or $R_2$ 's supercode.

::: note Supercode: A set of one or more attributes, the combination of which allows us to uniquely identify an entity in an entity set.
:::
::::

### Preserving Dependencies
::: note To determine whether two tables have preserved dependencies is actually to determine whether the data dependencies are equivalent.
:::

Directly determine whether the attributes on the left and right sides of each functional dependency in the original undecomposed table are in the same decomposed table. That is, whether all derivations $F_1$ that can be constructed in $R_1$ and all derivations $F_2$ that can be constructed in $R_2$ satisfy $F_1 \cup F_2 = F^+$​.

## Normal Form
### 1NF
In the relational model $R$ ​, 1NF is satisfied if and only if all attributes contain only atomic values, that is, each component is an indivisible data item.

### 2NF
If and only if the relational model $R$ ​satisfies 1NF, and each non-key attribute is completely dependent on the candidate key, it satisfies 2NF. That is, on the basis of satisfying 1NF, let all attributes depend on the candidate key.

For example: the candidate key is BC, the non-primary attribute is D, and in addition to BC->D, there are also B->D or C->D in the functional dependency. This pattern does not meet 2NF.

### 3NF
If and only if the relational model $R$ satisfies 1NF, and no non-key attribute in $R$ ​transitively depends on the candidate key, it satisfies 3NF. That is, on the basis of 2NF, the indirect dependence of all attributes on the candidate key is eliminated, and all attributes are directly dependent on the candidate key.
