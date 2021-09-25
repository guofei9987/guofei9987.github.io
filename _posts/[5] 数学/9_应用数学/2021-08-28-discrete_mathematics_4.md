---
layout: post
title: 【离散数学3】格和布尔代数
categories:
tags: 5-9-应用数学
keywords:
description:
order: 5904
---


## 格

**【定义】格**：（前面写了，偏序关系是一个自反、反对称、传递的关系）。$(A,\preccurlyeq)$ 是一个偏序集，如果 A 中任意两个元素都有最小上界和最大下界，称为 $(A,\preccurlyeq)$ 是格。
- **最小上界** 记为 $a \lor b$
- **最大下界** 记为 $a \land b$
- $(A,\lor, \land)$ 称为 **格所诱导的代数系统**

**【定义】子格**： 格 $(A,\preccurlyeq)$ 诱导的代数系统是 $(A,\lor, \land)$，如果 $B \subseteq A, B \not = \varnothing$，而且 $\land, \lor$ 对 B 粉笔，那么称为 $(B, \preccurlyeq)$ 是 $(A, \preccurlyeq)$ 的子格
- **【定理】** 子格是格

**【定理1】**：
- $a\preccurlyeq a\lor b$
- $b\preccurlyeq a\lor b$
- $a\land b \preccurlyeq b$
- $a\land b \preccurlyeq a$

**【定理2】**：如果 $a\preccurlyeq b, c\preccurlyeq d$，那么
- $a\lor c \preccurlyeq b\lor d$
- $a\land c \preccurlyeq b\land d$

**【定理3】保序性**： 如果 $b\preccurlyeq c$，那么 $a\lor b \preccurlyeq a\lor c, a\land b \preccurlyeq a\land c$ （用定理2推导）


**【定理3】运算律**
- 交换律。$a \lor b = b \lor a, a\land b = b\land a$
- 结合律。$a\lor(b \lor c) = (a\lor b)\lor c, a\land (b\land c) = (a\land b) \land c$
- 幂等律。$a\lor a = a, a\land a = a$
- 吸收率。 $a\lor (a\land b) = a, a\land (a\lor b) = a$

证明：根据定义，交换律、幂等律显然成立。  
结合律的证明：第一步，借用定理1得到结论 $a\preccurlyeq (a\lor b)\lor c, b\preccurlyeq (a\lor b)\lor c, c\preccurlyeq (a\lor b)\lor c$；第二步，对三个式子用定理2，得到 $a\lor(b\lor c) \preccurlyeq (a\lor b)\lor c$ （右边做了幂等律）；第三步，用类似的方式，可证 $(a\lor b) \lor c \preccurlyeq a \lor(b\lor c)$，然后等式成立。  
吸收率的证明思路类似  

**【定理4】分配律**
- $a\lor(b\land c) \preccurlyeq (a\lor b)\land (a\lor c)$
- $(a\land b)\lor (a\land c) \preccurlyeq a \land (b\lor c)$

证明：  
一方面，$a=a\land a \preccurlyeq (a\lor b)\land (a\lor c)$  
另一方面 $b\land c\preccurlyeq b\preccurlyeq a\lor b, b\land c\preccurlyeq c \preccurlyeq a\lor c$，合起来得到 $b\land c \preccurlyeq (a\lor b)\land (a\lor c)$  
上面两个合起来，得到 $a\lor (b\land c) \preccurlyeq (a\lor b)\land (a\lor c)$


## 分配格

上面指出了一个定理：
- $a\lor(b\land c) \preccurlyeq (a\lor b)\land (a\lor c)$
- $(a\land b)\lor (a\land c) \preccurlyeq a \land (b\lor c)$

我们研究这样一类特殊的格，使得上式以等号的形式成立

**【定义】分配格**： $(A,\lor,\land)$ 是格 $(A,\preccurlyeq)$ 引导的代数系统，如果同时满足以下条件，称为 $(A,\preccurlyeq)$ 是分配格
1. $a\lor(b\land c) = (a\lor b)\land (a\lor c)$
2. $(a\land b)\lor (a\land c) = a \land (b\lor c)$










## 参考文献

《离散数学》上海科学技术出版社，左孝凌
