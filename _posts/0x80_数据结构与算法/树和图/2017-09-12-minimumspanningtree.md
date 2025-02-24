---
layout: post
title: 【最小生成树】Prim和Kruskal
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 572
---

## 问题介绍

最小生成树问题（Minimum Spanning Tree Problem）是贪心算法中的一个著名问题。  

- 什么是最小生成树？`最小生成树`的定义，见于[另一篇博客](https://www.guofei.site/2021/01/02/tree.html#%E7%94%9F%E6%88%90%E6%A0%91)  
- 有哪些经典算法？Prim算法和Kruskal算法，他们的算法复杂度都是$O(m\ln n)$  


**【定理】** Kruskal算法可以得到最小生成树：
1. 选取最小的边 $e_i$ ，边数 i:=1
2. i=n-1 结束，否则赚到3
3. 设已经选择的边是 $e_1, e_2, ..., e_i$，那么选取这样的 $e_{i+1}$:
    - $e_{i+1}$ 不同于 $e_1, e_2, ..., e_i$
    - $(e_1, e_2, ..., e_i, e_{i+1})$ 不会构成回路
    - $e_{i+1}$ 是满足以上条件的最小的边
4. i:=i+1 转到2



## Python实现：Kruskal算法朴素版

### step1：Kruskal

```py
def naive_find(C, u):
    while C[u] != u:
        u = C[u]
    return u


def naive_union(C, u, v):
    u = naive_find(C, u)
    v = naive_find(C, v)
    C[u] = v


def naive_kruskal(G):
    E = [(G[u][v], u, v) for u in G for v in G[u]]
    T = set()
    C = {u: u for u in G}
    for _, u, v in sorted(E):
        if naive_find(C, u) != naive_find(C, v):
            T.add((u, v))
            naive_union(C, u, v)
    return T
```

### step2：生成源数据
```py
a, b, c, d, e, f, g, h = range(8)
G = {
    a: {b, c, d, e, f},
    b: {c, e},
    c: {d},
    d: {e},
    e: {f},
    f: {c, g, h},
    g: {f, h},
    h: {f, g}
}
from scipy.stats import uniform

rv = uniform(loc=0, scale=1)
V = {i: rv.rvs(size=2) for i in range(8)}
```

### step3：处理源数据
根据顶点位置，计算每个边的长度
```py
import numpy as np

G = {u: {v: np.linalg.norm(V[u] - V[v], ord=2) for v in G[u]} for u in G}
```
处理后的G是这样的：
```py
{0: {1: 0.64350318067251699,
  2: 0.32295401183865463,
  3: 0.51010160179841613,
  4: 0.45295616601832445,
  5: 0.34598888219525081},
 1: {2: 0.5987237463745575, 4: 0.19677045227515677},
 2: {3: 0.36425593157427333},
 3: {4: 0.23395295642549108},
 4: {5: 0.7416922814813679},
 5: {2: 0.64835524727633864, 6: 0.99210311952923735, 7: 0.82003926434628127},
 6: {5: 0.99210311952923735, 7: 0.22362975308802449},
 7: {5: 0.82003926434628127, 6: 0.22362975308802449}}
```
(用dict嵌套dict来)
### 调用Kruskal算法并作图

```py
k = naive_kruskal(G)

from scipy.stats import uniform

import matplotlib.pyplot as plt

for i in V:
    plt.plot(V[i][0], V[i][1], 'o')
for i in G:
    for j in G[i]:
        temp = list(zip(V[i], V[j]))
        plt.plot(temp[0], temp[1], 'k')

for i in k:
    temp = list(zip(V[i[0]], V[i[1]]))
    plt.plot(temp[0], temp[1], 'r', lw=8, alpha=0.6)
plt.show()
```


结果：（点是随机生成的，所以每次运行图未必一样）  
![minimumspanningtree1.png](/pictures_for_blog/postimg/minimumspanningtree1.png)  


## Python实现：Kruskal算法改进版

```py
def find(C, u):
    if C[u] != u:
        C[u] = find(C, C[u])
    return C[u]


def union(C, R, u, v):
    u, v = find(C, u), find(C, v)
    if R[u] > R[v]:
        C[v] = u
    else:
        C[u] = v
    if R[u] == R[v]:
        R[v] += 1


def kruskal(G):
    E = [(G[u][v], u, v) for u in G for v in G[u]]
    T = set()
    C, R = {u: u for u in G}, {u: 0 for u in G}
    for _, u, v in sorted(E):
        if find(C, u) != find(C, v):
            T.add((u, v))
            union(C, R, u, v)
    return T


a, b, c, d, e, f, g, h = range(8)
G = {
    a: {b, c, d, e, f},
    b: {c, e},
    c: {d},
    d: {e},
    e: {f},
    f: {c, g, h},
    g: {f, h},
    h: {f, g}
}
from scipy.stats import uniform

rv = uniform(loc=0, scale=1)
V = {i: rv.rvs(size=2) for i in range(8)}

import numpy as np

G = {u: {v: np.linalg.norm(V[u] - V[v], ord=2) for v in G[u]} for u in G}

k = kruskal(G)

from scipy.stats import uniform

import matplotlib.pyplot as plt

for i in V:
    plt.plot(V[i][0], V[i][1], 'o')
for i in G:
    for j in G[i]:
        temp = list(zip(V[i], V[j]))
        plt.plot(temp[0], temp[1], 'k')

for i in k:
    temp = list(zip(V[i[0]], V[i[1]]))
    plt.plot(temp[0], temp[1], 'r', lw=8, alpha=0.6)
plt.show()

```


## Python实现prim算法
```py
from heapq import heappop, heappush


def prim(G, s):
    P, Q = {}, [(0, None, s)]
    while Q:
        _, p, u = heappop(Q)
        if u in P: continue
        P[u] = p
        for v, w in G[u].items():
            heappush(Q, (w, u, v))
        return P

```




参考资料：  
http://www.cnblogs.com/biyeymyhjob/archive/2012/07/30/2615542.html（原文的图表很详细）  
Python算法教程  
《Python算法教程》[挪威]Magnus Lie Hetland
