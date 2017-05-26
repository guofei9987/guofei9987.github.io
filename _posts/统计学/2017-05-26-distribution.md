---
layout: post
title: 常见统计分布.
categories: 模型
tags: 统计学
keywords:
description:
---

## 离散分布

## 0-1分布Bernoulli distribution

## 二项分布Binomial distribution

特点：  
0-1分布是一种特殊的二项分布  

二项分布是0个独立同分布的0-1分布的加和  

$X \sim b(n,p)$

### 概率分布
$P(X=k)=\dbinom{n}{k}p^k(1-p)^{n-k}$

### 特征
$EX=np$
$DX=np(1-p)$

### 性质
可加性：  
$b(n_1,p)+b(n_2,p)=b(n_1+n_2,p)$

## 负二项分布
对于一系列独立同分布的实验，每次实验成功概率为p，实验直到r次成功为止，总实验次数的概率分布。  
$P(X=x,r,p)=\dbinom{x-1}{r-1}p^r(1-p)^{x-r}$
$x \in [r,r+1,r+2,...,\infty]$

如果r=1，就是几何分布

## 泊松分布

$X\sim \pi(\lambda)$  
$P(X=k)=\dfrac{\lambda^k e^{-\lambda}}{k!}$
$(k=0,1,2,...)$

### 特征
$EX=\lambda$
$DX=\lambda$

### 性质
可加性：  
$\pi(\lambda_1)+\pi(\lambda_2)=\pi(\lambda_1+\lambda_2)$

泊松分布有广泛的应用，  
- 某一服务设施一定时间内到达的人数
- 电话交换机接到的呼叫次数
- 汽车站台的后可人数
- 机器出现的故障数
- 自然灾害发生的次数
- 一块产品上的缺陷数
- 显微镜下单位分区内的细菌数
- 某放射性物质单位时间发射的粒子数






下面是连续分布
## 均匀分布Uniform distribution
$X \sim U(n,p)$

## 指数分布Exponential distribution

$$f(x)=\left \{ \begin{array}{ccc}
\lambda e^{-\lambda x}&x>0 \\
0&o/w
\end{array}\right.$$

$EX=1/\lambda$  
$DX=1/\lambda$  

### 性质
无记忆性(Memoryless)

$P(x>s+t \mid x>s )=P(x>t)$  
$s,t>=0$

## 正态分布
Normal distribution  
Gaussian distribution  
$X \sim N(\mu,\sigma^2)$
$f(x)=\dfrac{1}{\sqrt{2\pi}\sigma}e^{-\dfrac{(x-\mu)^2}{2 \sigma^2}}$

$EX=\mu$  
$DX=\sigma^2$  

### 性质1
可加性：  
$X_i \sim N(\mu_i,\sigma_i^2)$，并且相互独立  
那么$\sum X_i \sim N(\sum\mu,\sum\sigma^2)$  

### 性质2
如果同时满足以下两条：  
$X_i \sim(i.i.d)N(\mu,\sigma_i^2)$ 独立同分布  
$S^2=\dfrac{1}{n-1}\sum(X_i - \bar X)^2$  
那么，  
$\bar X \sim N(u,\dfrac{\sigma^2}{n})$  
$\dfrac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$  
$ES^2=\sigma^2$  
$\bar X, S^2$相互独立  
$\dfrac{\bar X-\mu}{S/\sqrt{n}} \sim t(n-1)$  
