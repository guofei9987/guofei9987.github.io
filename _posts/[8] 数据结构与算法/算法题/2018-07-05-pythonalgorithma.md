---
layout: post
title: 【Python】【算法题集3】
categories:
tags: 0x80_数据结构与算法
keywords:
description:
order: 591
---

- 入门级题目：[【Python】【算法题集1】](http://www.guofei.site/2017/05/03/TrickPython.html)
- 《编程之美》中的题目：[【Python】【算法题集2】](http://www.guofei.site/2017/08/28/someproblems.html)
- LeetCode上的题目：[【Python】【算法题集3】](http://www.guofei.site/2018/07/05/pythonalgorithma.html)


这一部分是我刷LeetCode的感想（限于数据结构和算法部分），刷完的题目见于这个[GitHub库](https://github.com/guofei9987/leetcode_python)


## 287. Find the Duplicate Number
https://leetcode.com/problems/find-the-duplicate-number/solution/  
有两个思想
1. 1-n这n个数组成一个list，必然可以遍历
2. fast，slow 两个指针必然可以做到任意两个元素一一对应

## 658. Find K Closest Elements
https://leetcode.com/explore/learn/card/binary-search/135/template-iii/945/

使用Python的 sorted ，其time complexity 是O(log(n))


## 160. Intersection of Two Linked Lists
把 two pointer technique 用到极致了
https://leetcode.com/explore/learn/card/linked-list/214/two-pointer-technique/1215/discuss/49798/Concise-python-code-with-comments/156662  

另一个巧妙使用 two pointer technique 的题目 ([142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/description/))

## collection
### 题目
https://leetcode.com/explore/learn/card/hash-table/184/comparison-with-other-data-structures/1178/discuss/82269/Short-Python-C++

来自大佬的解答
```python
import collections

nums1 = [1, 2, 2, 1, 2]
nums2 = [2, 2, 2]

a, b = map(collections.Counter, (nums1, nums2))

list((a & b).elements())
```
- map函数有并行能力
- 两个collection对象用&可以做交集
- elements是一个iterable对象

top k
```python
a = collections.Counter(nums)
sorted(a, key=lambda i: a[i],reverse=True)[:k]
```

## Recursion
https://leetcode.com/explore/learn/card/recursion-i/255/recursion-memoization/1662

这是一个类似斐波那契的题目，自然想到用 Recursion，但还有个更好的方法，且更快（不知道为啥更快）

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n==1:
            return 1
        if n==2:
            return 2
        return self.climbStairs(n-1)+self.climbStairs(n-2)

    def climbStairs2(self, n: int) -> int:
     a=b=1
     for _ in range(n):
         a,b=b,a+b
     return a
```

## 链表带环问题

这是个名问题了，学的时候没做笔记，后来被问到的时候蒙了，所以还是写一写。

思路简单，一个快指针和一个慢指针。

定理1：带环的充要条件是两个指针交汇

定理2：交汇时，慢指针一定还没有走完1圈

![](http://www.guofei.site/picture_for_blog/algorithm/%E9%93%BE%E8%A1%A8%E5%B8%A6%E7%8E%AF%E9%97%AE%E9%A2%98.jpg)


**假设** 快指针走2s步，慢指针走s步。相遇时快指针已经走了n圈，那么  
2(a+x)=a+x+nr

a=(n-1)(x+y)+y  

所以算法下一步是，在O，B各放两个慢指针，往下走，一定在A点相遇
