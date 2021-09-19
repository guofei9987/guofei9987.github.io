---
layout: post
title: 【离散数学3】代数系统
categories:
tags: 5-9-应用数学
keywords:
description:
order: 5903
---



## 代数系统概念的引入

**【定义】代数系统** 一个非空集合 A 以及若干定义在它上的运算 $f_1, f_2,..., f_k$ 组成的系统叫做一个代数系统，记为 $<A , f_1, f_2, ..., f_k>$

**【定义】运算的性质** 下面默认指代一个二元运算的代数系统 $(A,\star)$
- **封闭性** $\forall x,y \in A $，有 $x\star y \in A$
- **可交换性** $\forall x,y \in A $，有 $x\star y = y\star x$
- **可结合性** $\forall x,y,z \in A $，有 $(x\star y)\star z = x\star (y\star z)$
- 另外还有可分配性、吸收律、等幂，等等。就不多写了。

**【定义】幺元**
- 对于 $e_l\in A$，如果有 $\forall x \in A \to e_l\star x \in A$，叫做 $e_l$ 是关于 $\star$ 的 **左幺元**
- 对于 $e_r\in A$，如果有 $\forall x \in A \to x\star e_r \in A$，叫做 $e_l$ 是关于 $\star$ 的 **右幺元**


**【定理】** 如果 $(A,\star)$ 存在左幺元 $e_l$ 和右幺元 $e_r$，那么 $e_l=e_r$ 且 A 上的幺元唯一。  
（使用定义证明）

**【定义】零元**
- 对于 $\theta_l$，如果有 $\forall x\in A \to \theta_l\star x = \theta_l$，叫做 $\theta_l$ 是关于 $\star$ 的 **左零元**
- 对于 $\theta_r$，如果有 $\forall x\in A \to  x \star \theta_r = \theta_r$，叫做 $\theta_r$ 是关于 $\star$ 的 **右零元**

**【定理】** 类似幺元，如果左零元和右零元都存在，那么它们相等且零元唯一。（证明方法同上）

**【定理】** 如果 A 中的元素个数多于1，且幺元 $e$ 和 零元 $\theta$ 都存在，那么 $e \not = \theta$


**【定义】逆元** 如果$a\star b = e$，称为 a 是 b 的 **左逆元**，b 是 a 的 **右逆元**。如果既是左逆元又是右逆元，叫做 **逆元**  
**【性质】**
- 逆元是相互的：如果 a 是 b 的逆元，那么 b 也是 a 的逆元。
- 一般来说，左逆元未必等于右逆元，有左逆元未必有右逆元，甚至一个元素的左/右逆元未必唯一


### 半群

**【定义】广群** $(S,\star)$ 是一个代数系统，$\star$ 是二元运算，如果 $\star$ 是封闭的，称为 $(S,\star)$ 是一个广群

**【定义】半群** $(S,\star)$ 是一个代数系统，$\star$ 是二元运算，如果满足以下条件，称为 $(S,\star)$ 是一个半群:
1. $\star$ 是封闭的，
2. $\star$ 是可结合的，也就是说 $(x\star y)\star z = x \star (y \star z)$

**【定理1】** 如果 $(S,\star)$ 是一个半群，且$B\subseteq S$，且 $\star$ 对 B 封闭，那么，$(B,\star)$ 也是一个半群

**【定理2】**  $(S,\star)$ 是一个半群，且 $S$ 是一个有限集，那么 $\exists a \to a \star a = a$  
证明过程稍微绕：
1. S 是有限的，所以存在 $i<j$ 使得 $a^i = a^j$
2. 两边同时乘以 $a^{i(j-i)-i}$
3. 左边 = $a^{i(j-i)}$，右边 = $a^{j-i} a^{i(j-i)}$
4. 令 $b = a^{i(j-i)}$，就有这个结论：$b=a^{j-i}b$
5. 上式使用i次，得到 $b = a^{i(j-j)}b$ ，也就是 $b=b\star b$，就证完了


**【定义】独异点** 含有幺元的半群称为独异点

**【定理】3** $(S,\star)$ 是一个独异点，那么，$\star$ 的运算表中，没有不可能有相同的两行或两列。  
证明：
1. 假设有相同的两列，也就是说 $\forall x \in S \to x\star b_1 = x\star b_2$
2. 令 $x=e$，有 $b_1 = b_2$

































## 参考文献

《离散数学》上海科学技术出版社，左孝凌
