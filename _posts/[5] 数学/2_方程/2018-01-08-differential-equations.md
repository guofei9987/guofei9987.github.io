---
layout: post
title: 微分方程
categories:
tags: 5-1-代数与分析
keywords:
description:
order: 92401
---

虽然大多数微分方程很难找到解析解，但某些特殊的微分方程还是可以找到解析解的
## 一阶微分方程
一般形式是$F(x,y,y')=0$  
包括 **可分离变量方程**， **一阶线性微分方程**  


### 可分离变量方程
$\dfrac{dy}{dx}=f(x)\varphi(y)$  


解法：
$\dfrac{dy}{\varphi(y)}=f(x)dx$


### 齐次微分方程
$\dfrac{dy}{dx}=g(\dfrac{y}{x})$


解法：  
令$u=\dfrac{y}{x}$,于是$\dfrac{dy}{dx}=\dfrac{dux}{dx}=u+\dfrac{du}{dx}x$,转化为变量分离方程。  

按变量分离方程的一般解法  $u+\frac{\mathrm{d}u}{\mathrm{d}x}x=g(u)$. 分离变量,得到 $\frac{1}{g(u)-u}du=\frac{1}{x} dx$. 两边同时积分,得到 $\int \frac{1}{g(u)-u}du=\ln|x|$  
即 $x=\mathrm{e}^{\int \frac{1}{g(u)-u}du}$

#### 一次分式
$\dfrac{dy}{dx}=\dfrac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$  


解法：先用变量替换消去C，然后变成$\dfrac{y}{x}$形式，这是一个齐次微分方程  


### 一阶线性非齐次方程
$\dfrac{dy}{dx}+P(x)y=Q(x)$  


**常数变易法**  
假设:
$y_1$是$\dfrac{dy}{dx}+P(x)y=0$的解  
$y=C(x)y_1$是$\dfrac{dy}{dx}+P(x)y=Q(x)$的解  
那么，可以推导出通解是$y=\exp(-\int P(x)dx)[C+\int Q(x)\exp(\int P(x)dx]$  


## 二阶线性微分方程

$y''+p(x)y'+q(x)y=f(x)$  


### 定理1
如果$y_1,y_2$是$y''+p(x)y'+q(x)y=0$的线性无关的特解，那么  
$y=C_1y_1+C_2y_2$是方程的通解  
### 定理2
如果$y^ * $是线性非齐次方程的一个特解，Y是对应的线性齐次方程的通解，那么  
$y=Y+y^* $是线性非齐次方程的通解。  

## 高阶常系数微分方程
**n阶常系数齐次线性微分方程** 表示为：  
$\dfrac{d^n x}{dt^n}+a_1\dfrac{d^{n-1}x}{dt^{n-1}}+...+a_{n-1}\dfrac{dx}{dt}+a_nx=0$   


解法：  
如果$\lambda=\alpha+i\beta$是对应的特征方程的k重根,那么  
$\lambda=\alpha-i\beta$也是k重根  
齐次方程有2k个线性无关的特解：  
$e^{at}\cos\beta t,te^{at}\cos \beta t, t^2e^{at}\cos\beta t,...,t^{k-1}e^{at}\cos\beta t$  
$e^{at}\sin\beta t,te^{at}\sin \beta t, t^2e^{at}\sin\beta t,...,t^{k-1}e^{at}\sin\beta t$  



## 参考文献
《常微分方程》高等教育出版社
