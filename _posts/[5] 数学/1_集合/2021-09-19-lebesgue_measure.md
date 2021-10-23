---
layout: post
title: 【集合】开集、度量空间勒贝格测度
categories:
tags: 5-1-代数与分析
keywords:
description:
order: 5123
---



## 关于集合的一些基本定义

下面在 R 上讨论：

**【定义】聚点** a 的任一邻域均含有 E 中异于 a 的点，称为 a 是 E 的聚点
- E 的聚点未必属于 E
- 如果 a 是 E 的聚点，那么 a 的任一邻域都含有 E 的无穷多个点。（反证法证明）

定义了：
- 开集：E 的所有内点都属于 E，叫做 E 是开集


定义：
- 导集：E 的所有聚点组成的集合 $E'$ 称为导集
- $E - E'$ 中的点称为 E 的孤立点
- **定义** 闭集：R - E 为开集，那么 E 是闭集。

定理
- **定理** E 是闭集的充要条件是 $E'\subset E$
- 导集都是闭集


## 测度

**【定义】开集的测度** 根据定理，某开集可以表示为 $G = \bigcup\limits_k (a_k, b_k)$，其中 $(a_k, b_k)$ 互不相交。定义开集 $G$ 的测度 $mG=\sum\limits_k(b_k-a_k)$

**【定义】闭集的测度** 根据定义，如果 F 是闭集，那么 $G = (a,b)-F$是开集，那么定义 F 的测度为 $mF=b-a-mG$

（定理）若干个开集有可加性，若干个闭集有可加性。

## 勒贝格可测

定义。E是有界集。
- E 的 **外测度** 定义为 一切包含 E 的开集的测度的下确界，记为 $m^*E = \inf\limits_{G\supset E} mG $
- E 的 **内测度** 定义为 一切含于 E 的闭集的测度的上确界，记为 $m_* E = \sup\limits_{F\subset E} mF$
- 如果 $m^\star E = m_\star E$，称为 E 是 **勒贝格可测** 的，简称 **可测**，这个值称为 E 的测度。


一些性质
- 零测度集的任何子集都是可测的，且测度为0
- $E_0$ 是零测度集，那么 $E\cup E_0$ 的可测性与 $E$ 相同，并且 $m(E\cup E_0) = mE$

一些性质
- 有界集 E 可测的充要条件是：$\forall \varepsilon>0, \exists G\supset E, F\subset E$ 使得 $m(G-F)<\varepsilon$
- 如果 $E_1, E_2$ 可测，那么 $E_1\cap E_2, E_1\cup E_2, E_1 - E_2$ 都可测
  - 如果 $E_1, E_2$ 不相交，那么 $m (E_1\cup E_2) = mE_1 + mE_2$
- （测度的单调性）若两个可测集 $E_1 \subset E_2$，那么 $mE_1 \leq mE_2$
- 如果 $E_k$ 可测，那么 $\bigcup\limits_k E_k$ 可测。如果它们互不相交，那么 $m \bigcup\limits_k E_k = \sum\limits_k mE_k$
- 如果 $E_k$ 可测，那么 $\bigcap\limits_k E_k$ 可测


**定理**
1. $E_k$ 可测，且 $E_1\subset E_2 \subset ...$，那么 $E = \bigcup\limits_{k=1}^\infty E_k$ 可测，且 $mE=\lim\limits_{k\to\infty} mE_k$
2. $E_k$ 可测，且 $E_1\supset E_2 \supset ...$，那么 $E = \bigcap\limits_{k=1}^\infty E_k$ 可测，且 $mE=\lim\limits_{k\to\infty} mE_k$

据此可以定义无界可测集。$mE = \lim\limits_{a\to\infty} m((-a,a)\cap E)$


### 环上的测度

**【定义】环上的测度** ： $X$ 是基本集，$\mathscr R$ 是 X 的拓扑，集函数 $u:\mathscr R \to $ 实数集，如果满足以下几条，u就是测度
1. u 非负
2. u 可加（对环只要求有限可加）
3. $u(\varnothing) = 0$

另外，如果不满足条件1，而只满足条件2和条件3，叫做广义测度。



**【定义】环上的外测度**： $X$ 是基本集，$\mathscr R_\sigma$ 是 X 子集形成的环，$\lambda: \mathscr R_\sigma \to R$ 是集函数，如果满足以下条件，称为 $\lambda$ 是 $\mathscr R_\sigma$ 上的外测度
1. $\lambda E\geq 0, \lambda \varnothing = 0$
2. 半可加性。$\lambda (\bigcup\limits_{n=1}^\infty E_n ) \leq \sum\limits_{n=1}^\infty \lambda E_n$
3. 如果 $E_1 \subset E_2$，那么 $\lambda E_1 \leq \lambda E_2$


## 勒贝格可测函数

$f:E\to R$，其中 E 是一个可测集，定义 $E(f>a)$ 是使得 $f>0$ 的所有元素的集合。

**【定义】可测函数**： 如果对于任意实数 $a$，$E(f>a)$ 都可测，那么称为 f 是 E 上的 **（勒贝格）可测函数**

**【等价定义】可测函数** 可测函数的这几个定义是等价的
1. $E(f>a)$ 恒可测
2. $E(f\geq a)$ 恒可测
3. $E(f < a)$ 恒可测
4. $E(f \leq a)$ 恒可测
5. $E(f=\infty),E(a<f<b)$ 恒可测




**【定义】连续函数**： 任意点列 $x_n\to x (x_n\in E)$，都有 $f(x_n) = f(x)$，叫做 $f(x)$ 在 x 点连续。对于 E 上的孤立点，总认为在此点连续
- 如果 $f(x)$ 在 E 上每个点连续，叫做 $f(x)$ 在 E 上连续

**定理1** 闭集 E 上的连续函数是可测的

**【定义】命题S几乎处处成立** S 在集合 E 上除了某个零测度子集之外处处成立，叫做命题 S 几乎处处成立

**定理2** $f_n(x)$ 是一组定义在可测集上的可测函数，那么 $\sup\limits_n f_n(x), \inf\limits_n f_n(x)$ 都是可测的。

**【定义】正部、负部**
- f 的 正部 $f_+(x) = \max(f(x), 0)$
- f 的 负部 $f_-(x) = \max (-f(x), 0)$

**定理3** $f(x)$ 是可测集 E 上的可测函数，那么 $f_+(x), f_-(x), \mid f(x) \mid$ 都可测

**定理4** $f(x)$ 是可测集 E 上的可测函数，那么 $\overline{\lim\limits_n} f_n(x) , \underline\lim_n f_n(x) $ 都可测



## 勒贝格积分




**【定义】勒贝格积分** $f(x)$ 是有界可测集 E 上的可测函数，（且只考虑 $f(x)\geq 0)$，定义 勒贝格积分 $\int_E f(x) d m = \sup\limits_{0\leq\varphi \leq f} \int \varphi(x) dm$，其中 $\varphi$ 是简单函数。

以上定义中，我们需要先定义简单函数的勒贝格积分：  
**【定义】简单函数的勒贝格积分** $\int_E\varphi(x)dm = \sum\limits_{k=1}^ny_kme_k$




一些定理
- **有限可加性**，$E=E_1\cap E_2 \cap ... \cap E_n$，且两两不相交，均可测，那么 $\int_E f(x)dm = \int_{E_1} f(x) dm +...+\int_{E_n} f(x)dm$
- **绝对连续性**，$\forall \varepsilon >0, \exists \delta $，使得当 $me <\delta$ 时，$\mid \int_e f(x) dm \mid <\varepsilon$
- $\int_E cf(x)dm = c \int_E f(x) dm$
- $\int_E (f+g)dm = \int_E f dm + \int_E g dm$
- 如果 $f\leq g$，那么 $\int_E f dm \leq \int_E g dm$


### 一些性质

$f(x),u_n(x)$ 都在 E 上可测，且 $f(x)=\sum\limits_{n=1}^\infty u_n(x)$，那么 $\int_E f(x) dm = \sum\limits_{n=1}^\infty \int_E u_n(x) dm$


如果黎曼可积，那么勒贝格可积，且积分值相同。


## Lp 空间

**【定义】$L^p$空间**： $p\geq 1$，所有满足 $\mid f(x) \mid^p$ 可积的 $f(x)$ 的集合，组成 $L^p$ 空间
- **【定理】** 这是一个线性空间
- 引入符号 $\mid\mid f \mid\mid_p = (\int_E\mid f\mid^p dm)^{1/p}$，那么 **【定理】**： $L^p$ 是一个赋范线性空间

**【定理】**  $L^p$ 完备

**【定理】**  $L^p$ 稠密




























## 参考文献

《实变函数与泛函分析概要》高等教育出版社，郑维行
