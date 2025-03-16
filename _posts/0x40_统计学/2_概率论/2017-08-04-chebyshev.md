---
layout: post
title: 大数定律
categories:
tags: 0x42_概率论
keywords:
description:
order: 423
---

## 基本不等式
### The Markov inequality
a nonnegative random variable Y, for every y > 0, $Pr(Y>=y)$ satisfies  
$Pr(Y>=y)<=EY/y$  

进一步，$\lim\limits_{y \to \infty}yP(Y>=y)=0$


### 切比雪夫不等式
（Chebyshev inequality）  
**切比雪夫不等式**  
X的均值是u,方差是$\sigma^2$,那么，$\forall t>0,Pr[\mid X-u \mid \geq t \sigma] \leq \dfrac{1}{t^2}$  
等价表示：  
$Pr[\mid X-u \mid \geq s] \leq \dfrac{\sigma^2}{s^2}$  

证明提要：  
$\sigma^2=\sum\limits_{x_i}(x_i-u)^2f(x_i) \geq \sum\limits_{\mid x_i -u \mid \geq s}(x_i-u)^2f(x_i)$  
$ \geq \sum\limits_{\mid x_i -u\mid \geq s}s^2f(x_i)=s^2\sum\limits_{\mid x_i -u\mid \geq s}f(x_i)$  
$=s^2 Pr[\mid X-u \mid \geq s]$  

（其实根据Markov inequality，也容易证明，如下）  
$P((X-EX)^2\geq y)\leq \dfrac{E(X-EX)^2}{y}$  
然后得到结论。

**切比雪夫不等式的推广**  
X的均值是u，n阶中心距$u_{\mid n \mid}=E[\mid X-u \mid ^n],(n \geq 1)$,有  
$Pr[\mid X-u \mid \geq t]\leq \dfrac{u_{\mid n\mid}}{t^n}$  

证明方法相同  

**切比雪夫单边不等式**  
X的均值是u,方差是$\sigma^2$,那么，$\forall s>0,Pr[ X-u  \geq s] \leq \dfrac{\sigma^2}{s^2+\sigma^2}$  

### Cherno bounds
根据 the Markov inequality  
$P(\exp(rZ)\geq y)\leq \dfrac{E\exp(rZ)}{y}$  

我们把y换成$\exp(rb)$，然后这个不等式变换为：  
$P(Z\geq b)\leq E\exp(rZ) \exp{(-rb)}$  


这个不等式有个重要应用：随机过程中的加和问题$S_n=X_1+X_2+...+X_n$，有：  
$P(S_n\geq na)\leq E\exp(rS_n) \exp{(-rna)}$  
所以，$P(S_n\geq na)\leq (E\exp{(rX)})^n \exp{(-rna)}$

## 大数定律

### 弱大数定律

如果$X_i$独立同分布，$u=EX,\bar X=1/n \sum X_i $,  
$\forall \epsilon >0,n\to \infty ,Pr[\mid \bar X-u \mid >\epsilon] \to 0$


### 辛钦大数定律
条件：$X_k$独立同分布
对任意$\varepsilon>0$  
$$\lim\limits_{n\to \infty} P\{ \mid \dfrac{1}{n} \sum\limits_{k=1}^n X_k -u\mid < \varepsilon \}=1$$  

（用切比雪夫不等式去证明）
### 伯努利大数定理
$f_A$是n次独立实验中，事件A发生的概率。  
p是事件A在每次实验中发生的概率。  

$$\lim\limits_{n\to \infty} P\{ \mid \dfrac{f_A}{n} -p\mid < \varepsilon \}=1$$  

（用辛钦大数定律去证明）
## 中心极限定理
（Lindberg-Levy中心极限定理）  
前提：$X_1,X_2,...$独立同分布，且$EX_i=u, DX_i=\sigma^2$，总有  

$$\lim\limits_{n\to \infty} P\{ \dfrac{\sum\limits_{i=1}^n X_i -n \mu}{\sqrt n \sigma} \leq x\} =\Phi(x)$$  

也就是说，独立同分布的均值，服从$N(\mu,\sigma^2)$  

### De Moivre-Laplace 中心极限定理
其实就是 Levy 的特殊情况

$X_i$是0-1分布，那么  
$$\lim\limits_{n\to \infty} P\{ \dfrac{\sum\limits_{i=1}^n X_i -n p}{\sqrt n p(1-p)} \leq x\} =\Phi(x)$$  

二项分布趋近于正态分布。  
（有时可以用来做一些近似计算之类的）
