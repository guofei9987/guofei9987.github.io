---
layout: post
title: 【Mento Carlo 3】给定分布生成随机数
categories:
tags: 0xa0_蒙特卡洛方法
keywords:
description:
order: 10003
---

另一篇博客[随机数发生器](http://www.guofei.site/2017/08/18/randomgenerator.html)，讲了如何利用迭代法生成随机的$U(0,1)$均匀分布。  
那么，如何利用均匀分布来生成特定的分布呢？  

## CDF的逆

目的：生成随机变量X对应的随机数。  
已知：  
$R \sim U(0,1)$
随机变量X的CDF是$F(x)$,  

方法：$F(X)=R$,解出$X=F^{-1}(R)$就是符合要求的随机变量。  


### 例子1：指数分布

X是指数分布，$f(x)=\lambda e^{-\lambda x}, x\geq 0$  

解出$F(x)=1-e^{-\lambda x}$  

于是，$X=-\dfrac{1}{\lambda}\ln(1-R)$  

由于$1-R$与$R$是相同的分布，所以也可以写成$X=-\dfrac{1}{\lambda}\ln(R)$  

### 例子2：离散的情况

$p_x=p^x(1-p)^{1-x}$  

$X=[\dfrac{\ln R}{\ln p}+1]$  

### 例子3：不存在解析解的情况

对norm用逆变换法时，  
$\int_{-\infty}^X\dfrac{1}{\sqrt{2\pi}}e^{-u^2/2} du$  
**上式无法求出解析解** ，虽然可以用数值方法解出来，但是仿真中需要大量这样的随机数。需要生成随机数的场景，一般规模很大，对运算速度要求很高。所以没法用了。  
用以下方法改进：  

## 包围取舍采样法

### 问题提出

$X\sim f(x)$无法求出$F^{-1}(x)$的解析解  
用数值方法运算效率又太低。  

### 算法过程

下面的算法中有很巧妙的思想，请反复读。  

**step1** ：对$f(x)$的定义域分段，  
例如，对正态分布可以只生成正实数区域，然后依概率取相反数即可。  
也可以有其它分段方法，例如分n段，每段上生成随机数，根据预先求出的每段的概率，每次依概率选择对应的区间段就行了。  

**step2**： 只研究step1中的某一段，找到另一个随机变量Y，使得：  
1. $f_X(x)\leq f_Y(y)$在这一区间段上恒成立。
2. Y上的随机数容易用其它方法生成

**step3**：
1. 生成一个Y的随机数y
2. 生成一个$U(0,1)$的随机数r
3. 如果$r>\dfrac{f_X(y)}{f_Y(y)}$，返回1，否则输出y

经过以上算法后，生成的y就是服从X分布（在选定区间段上的）的随机数

注意：step1中的分段，不是随意分的，要满足以下条件：
- 使得step2可以实现，也就是说，可以找到满足条件的随机变量Y
- 预先知道落在每个区间段上的概率。例如，对于正态分布，如果按中心分2段，那么预先知道落在2个区间段上的概率各为0.5。  
- 研究算法，发现$f_X$的乘数系数并不重要。  
$\lambda f_X(x)\leq f_Y(y)$，找到这样的$\lambda$即可。  
当然，$\lambda$越大，step3中返回1的概率就越小，算法效率越高  


### 例子

标准正态分布$f(x)=\sqrt{\dfrac{2}{\pi}}e^{-\dfrac{x^2}{2}}$  

**step1** : 分为两段$(-\infty ,0),[0,+\infty)$  
注意到：  
1. 对称性：所以只要生成$[0,+\infty)$的随机变量  
2. 预先知道落在各个区间上的概率为0.5：所以按照0.5的概率加负号就行了

**step2** ：研究$[0,+\infty)$，找到随机变量$Y\sim \exp(0.5-x)$  
前面说了，系数不重要，$\exp(-0.5*x^2) \leq \exp (0.5-x)$  

**step3** : $f_Y(x)=\exp(0.5-x)$很容易生成$y\sim f_Y$，依概率$\dfrac{f_X(x)}{f_Y(y)}$接受y  
