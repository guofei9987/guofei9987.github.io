---
layout: post
title: 【随机过程】1
categories:
tags: 4-4-随机过程
keywords:
description:
order: 471
---

这篇是 coursera.com 上的 [Stochastic processes](https://www.coursera.org/learn/stochasticprocesses) *by National Research University Higher School of Economics* 的学习笔记

## week1
我们有3种工具
- probability theory
- mathematical statistics
- stochastic processes

### an example
在讲 mathematical statistics 的时候，举了个经典例子：
想估计池塘里多少鱼，第一次捞上来一批，打上标签，捞q次，统计每次捞上来的比例。  
假设：
- 总共N条鱼，这是需要我们估计的量
- 第一次捞上来M条鱼，并打标
- 第k次捞上来$n_k$条鱼，其中打标的有$m_k$条

计算得知，发生的概率为$P (marked=m_k) = \dfrac{C_M^m C_{N-M}^{n-m}}{C_N^n}$  
我们使用最大似然估计 $\max\limits_N \sum\limits_{k=1}^q \ln P (marked=m_k)$ 可以估计出N

### 定义：概率测度
$$\{ \Omega,F,P \}$$ ，其中
- $\Omega$ is sample space
- $F$ is sigma algebra，满足
    - $\Omega\in F$
    - $A\in F\Longrightarrow \Omega - A \in F$
    - $A_1,A_2,...,A_n \in F \Longrightarrow \cup A_i \in F$
- $P$ is probability measure
    - $P\{ \Omega \}=1$
    - $A_i \in F,P(\cup A_i)=\sum P(A_i)$



以扔硬币n次为例，$\Omega$ 中有$2^n$个元素，$F$中有$2^{2^n}$个元素  





Random variable is a function $\xi: \Omega \to \mathbb R$ such that $\forall B \in \mathbb {B(R)}:\xi^{-1}(B) \in F$  

Let us consider the following example. An agent flips a coin 2 times. In this model, $$\Omega={(h,h);(h,t);(t,h);(t,t)}$$, where t means tails and h means heads. σ-algebra $\mathbb F$ contains all possible combinations of those 4 elements in $\Omega$ (by the way, the number of elements in $\mathbb F$ is exactly $2^4$ ).  

Let, $\xi(h;h)=1, \xi(h;t)=2, \xi(t;h)=3, \xi(t;t)=4$. (Note that $$P\{\xi=k\}=14,k=\{1,2,3,4\}$$ and 0 otherwise.) Clearly, if we apply $\xi^{-1}$ to both sides of those equations, we obtain $\xi^{-1}(1)=(h;h), \xi^{-1}(2)=(h;t), \xi^{-1}(3)=(t;h), \xi^{-1}(4)=(t;t)$. Therefore, $\forall B \in \mathbb {B(R)}: \xi^{-1}(B) \subset F$.

### 定义：随机过程
$X:T\times \Omega \to \mathbb R$

https://www.coursera.org/learn/stochasticprocesses/lecture/mIqkz/week-1-5-trajectories-and-finite-dimensional-distributions



### counting process
$N_t=\arg\max\limits_k (\xi_k\leq t)$

## convolution
两个分布X, Y的convolution，实际上就是 $X+Y$ 的分布  
求出来就是：  
$F_X \ast F_Y = F_{X+Y}(x) = \int_R F_X(x-y)dF(y)$  
$P_{X+Y}(x)=\int_R P_X(x-y)P_Y(y)dy$


we define $F^{n\ast}=F\ast ...\ast F$  
properties：  
- $F^{n\ast}(x)\leq F^n(x)$ if $F(0)=0$  
这是因为 $$\{\xi_1+...+\xi_n\leq x\}\subset\{\xi_1\leq x,...,\xi_n\leq x\}$$
- $F^{n\ast}(x) \geq F^{(n+1)\ast}(x)$ if $F(0)=0$  


### Renewal process
$S_0=0,S_n=S_{n-1}+\xi_n,$  
$\xi_1,\xi_2,...,i.i.d>0$, as  
$P(\xi_i>0)=1$ (equals to $F(0)=0$）

properties:
- define $u(t)=\sum\limits_{n=1}^\infty F^{n\ast}$  
then $u(t)<\infty$
- define $$N_t = ???$$  
then $EN_t=u(t)$, because $EN_t=??$  
这一段没太明白

### laplace transform
先去另一篇blog复习一下 laplace transform  

我们研究一下 $\mathscr L_f(s) = \mathscr L[f(s)]=\int_0^{+\infty}f(t)e^{-st}dt$，其中$f$是概率密度函数  
properties：
- $\mathscr L_f(s) = E[e^{-s\xi}]$
- $\mathscr L_{f_1\ast f_2}(s) = \mathscr L_{f_1}(s) \ast \mathscr L_{f_2}(s)$
- 如果$F(0)=0$，那么$\mathscr L_f(s) = \dfrac{\mathscr L_f(s)}{s}$（证法是分部积分法）


week 1.8 week 1.9 有几个漂亮的定理，可以再复习一下
