---
layout: post
title: 微分方程
categories:
tags: 9实分析
keywords:
description:
order: 923
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
令$u=\dfrac{y}{x}$,于是$\dfrac{dy}{dx}=\dfrac{dux}{dx}$,转化为变量分离方程。  

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



## 参考文献
《常微分方程》高等教育出版社
