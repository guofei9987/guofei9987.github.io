---
layout: post
title: 【数学分析】习题
categories:
tags: 0x51_代数与分析
keywords:
description:
order: 5131
---


## 基本知识

函数

## 实数、确界、不等式

## 序列的极限

计算题，主要思路：
- 夹逼准则。两边都是收敛的序列，并且收敛到同一个值。或者一边是常数，另一边是收敛的序列
- 用 $\delta \sim \varepsilon$ 语言（极限的定义）
- 遇到迭代式，可先证明极限存在，然后两边取 $\lim$，解方程得到结果。
- 洛必达法则
- 有一些常见的高阶无穷小关系

证明题，主要思路
- 单调有界定理。
    - 单调递增有上界必有极限
    - 单调递减有下界必有极限
- Cauchy 收敛原理。一个序列 $x_n$ 收敛的 **充分必要条件是** $\forall \varepsilon >0 , \exists N, s.t. m,n>N \Rightarrow |x_n-x_m|< \varepsilon$
    - 做题时经常用下标 $n,n+p$
- 区间套定理。若 $[a_{n+1}, b_{n+1}] \subseteq [a_n, b_n]$ 对于 所有 n 都成立，并且 $\lim\limits_{n\to \infty} (b_n-a_n)=0$（称为区间套），则存在一个实数 $\xi$，并且$\lim\limits_{n\to \infty} a_n=\lim\limits_{n\to \infty} b_n=\xi$ 
- 魏尔施特拉斯定理：任意有界序列至少有一个收敛的子列。

一些常见的极限，可以用来快速判断谁是更高阶的无穷大
- $e = \lim\limits_{n \to \infty} \left( 1 + \frac{1}{n} \right)^n$，约为 2.7
    - 这个引理使用频率很高：$(1+1/n)^n$ 单调递增，且小于 e; $(1+1/n)^{n+1}$ 单调递减，且大于 e
- $\gamma = \lim\limits_{n \to \infty} \left( \sum\limits_{k=1}^n \dfrac{1}{k} - \ln n \right)$ 这是欧拉常数，约为 0.577，证明思路如下
    - 证明 $1/(n+1) < ln(1+1/n) < 1/n$
    - 要证明上面的式子，只需要用关于 e 的引理
- $\lim\limits_{n\to\infty} \dfrac{a^n}{n!}=0$
    - 可以用定义来证明
- $\lim\limits_{n\to\infty} \dfrac{n!}{n^n}=0$
    - 可以用定义证明
    - 也可以造一个迭代式 $x_{n+1}/x_n$ 证明单调有界，然后两边取 $\lim$
- $\lim\limits_{n\to\infty} \sqrt[n]{n}=1$
    - 证法1放缩。 $n^{1/n} = {\sqrt n \cdot \sqrt n \cdot 1 \cdot1 ... \cdot 1}^{1/n} \leq \dfrac{2\sqrt n+n-2}{n}$
    - 证法2，先证明其单调递减有下界，从而有极限。然后构造迭代式：$a_n, a_{2n}$
- $\lim\limits_{n\to\infty}{\dfrac{1}{\sqrt[n]{n!}}}=0$
    - 证法放缩。$(n!)^2\geq n^n$


例子，证明 $\lim\limits_{n\to\infty}(1+\frac{1}{2^2})(1+\frac{1}{3^2})...(1+\frac{1}{n^2})$ 存在。
- 使用关于 e 的引理