---
layout: post
title: 🔥 数据结构
categories:
tags: 0x10_计算机基础
keywords:
description:
permalink: /:title:output_ext
order: 500
---




## 目录

数据结构写了很多篇，点击查看：

1. [线性结构](https://www.guofei.site/2018/06/30/linear_list.html)
    - 数组。Array, 动态数组,
    - 链表。单链表, 双向链表, 循环链表, 跳跃表
    - stack/queue, 循环队列
2. [哈希](https://www.guofei.site/2017/09/18/hash.html)
    - HashTable, HashSet, HashMap
4. [递归](https://www.guofei.site/2017/08/24/recursion.html)
5. [查找](https://www.guofei.site/2018/07/06/search.html)
    - 二分法
    - 并查集
    - 布隆过滤器
6. [排序](https://www.guofei.site/2018/11/20/sort.html)
    - 简单排序：冒泡、选择、插入、希尔排序
    - 分置排序：快速排序、归并排序
    - 其他：堆排序、基数排序
7. [树](https://www.guofei.site/2021/01/02/tree.html)
    - 二叉树
    - 哈夫曼树与编码
    - 平衡树：AVL树、红黑树
    - B树与B+树
    - 线段树
    - 前缀树
    - 堆
    - [Python实现树](https://www.guofei.site/2021/01/03/tree_algorithm.html)
8. [图](https://www.guofei.site/2017/05/18/graph.html)
    - 各种基础概念（有向/无向，有权/无权，等等）
    - 各种表示方法（指针，list-set，邻接矩阵）
    - 最短距离算法。Dijkstra, Floyd
    - [图论](https://www.guofei.site/2021/10/23/graph2.html)
9. [动态规划](https://www.guofei.site/2021/01/09/greedy.html)


其他专题
- [AC自动机](https://www.guofei.site/2023/02/04/ac.html)
- [最小生成树](https://www.guofei.site/2017/09/12/minimumspanningtree.html)


## 基本算法


- DFS/BFS
  - 递归
  - 遍历（借助queue做BFS，借助stack做DFS）
- 二分法
- 排序
- 贪心


树
- 平衡树。插入、删除、搜索，O(ln n) ，且保持平衡树
- AA树：一种自平衡二叉树


图
- 最短路径算法
    - A-star 算法，启发式
    - Bellman-Ford 算法，适用于含负数权重的加权图 $O(n^3)$
    - Dijkstra 算法，不含负数权重 $O(n^2)$
    - 双向 Dijkstra 算法，减少后一半的搜索空间，因此比 Dijkstra 快一些

## 复杂度

一些定义：
### 定义1  
$O(g)$代表一组函数，  
$f\in O(g) \Leftrightarrow$  
$ \exists n_0 ,c $使得$\forall n \geq n_0 , f(n) \leq cg(n)$
### 定义2
$\Omega (g)$的定义恰恰相反    
$ \exists n_0 ,c $使得$\forall n \geq n_0 , f(n) \geq cg(n)$   
### 定义3
$\Theta(g)=O(g) \cap \Omega(g)$

## 递归中复杂度主定理
如果递归计算量是这样的：  
$T(n)=aT(n/b)+f(n)$
那么，复杂度为：  
$\Theta(n^{log_{b} a})$
