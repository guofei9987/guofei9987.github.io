---
layout: post
title: 常见统计分布(2).
categories: 模型
tags: 统计学
keywords:
description:
---




## 引入Gamma Function
$\Gamma(\alpha)=\int_0^{+\infty} x^{\alpha-1}e^{-x}dx$

### Gamma Function的性质
$\Gamma(1)=1,\Gamma(0.5)=\sqrt{(\pi)}$
$\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$
$\int_0^{-\infty}x^{\alpha-1}e^{-x}=\Gamma(\alpha)/\lambda^\alpha$



## Gamma distribution
$$f(x)=\left \{ \begin{array}{ccc}
\dfrac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}&x \geq 0\\
0&others
\end{array}\right.$$

### 特征

$EX=\dfrac{\alpha}{\lambda}$  
$DX=\dfrac{\alpha}{\lambda^2}$

### 性质

$Ga(1,\lambda)=exp(\lambda)$
$Ga(n/2,1/2)=\chi^2(n) \sim f(x)=\dfrac{1}{2^{n/2}\Gamma(n/2)}x^{n/2-1}e^{-x/2}(x>0)$  

顺便得到卡方分布的特征  
$E\chi^2=n$  
$DX=2n$  


## Beta distribution

$f=\dfrac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)+\Gamma(\beta)}x^{\alpha-1}(1-x)^{\beta-1}$  

## 特征
$EX^k=\dfrac{\Gamma(\alpha+k)\Gamma(\alpha+\beta)}{\Gamma(\alpha)+\Gamma(\alpha+\beta+k)}$

$EX=\dfrac{\alpha}{\alpha+\beta}$  
$DX=\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$  

## Fisher Z
$f=\dfrac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}\dfrac{x^{a-1}}{(1+x)^{a+b}}$
### 特征

$EX^k=\dfrac{(a+k-1)(a+k-2)...a}{(b-1)(b-2)...(b-k)}$  
(k<b)

$EX=\dfrac{a}{b-1}$  
(b>1)  
$DX=\dfrac{a(a+b-1)}{(b-1)^2(b-2)}$  
(b>2)  

### 性质
