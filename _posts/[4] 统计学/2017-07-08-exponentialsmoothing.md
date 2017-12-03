---
layout: post
title: 指数平滑法.
categories:
tags: 4统计学
keywords:
description:
order: 431
---

指数平滑法（Exponential Smoothing，ES）是常用的趋势预测方法。  
指数平滑法是在 **移动平均法** 基础上发展起来的一种时间序列分析预测法，它是通过计算指数平滑值，配合一定的时间序列预测模型对现象的未来进行预测。其原理是任一期的指数平滑值都是本期实际观察值与前一期指数平滑值的加权平均。  



## 一次指数平滑法

$\hat Y_{t+1}=\alpha Y_t +(1-\alpha)\hat Y_t,0<\alpha<1$  



**分析1** （推导）：  
$\hat Y_{t+1}=\hat Y_t +\dfrac{1}{T}(Y_t-\hat Y_t) =\alpha Y_t +(1-\alpha)\hat Y_t,0<\alpha<1$  
当$\alpha$接近0时，过去的值占较大的比重  
当$\alpha$接近1时，过去的值占较小的比重  

**分析2** ：  
$\alpha$是主观定的  
当序列变化平缓时，$\alpha$可以较小  
当序列变化剧烈时，$\alpha$可以较大  

**分析3**：  
$Y_t-\hat Y_t$是误差  

## 二次指数平滑法

### Brown单一参数线性指数平滑
**step1** ：计算指数平滑值  
$S_t^{(1)}=\alpha Y_t+(1-\alpha)S_{t-1}^{(1)}$  
$S_t^{(2)}=\alpha S_t^{(1)}+(1-\alpha)S_{t-1}^{(2)}$   

**step2** ：估计参数  
$a_t=2S_t^{(1)}-S_t^{(2)}$  
$b_t=\dfrac{\alpha}{1-\alpha}[S_t^{(1)}-S_t^{(2)}]$  
**step3** :进行预测  
$F_{t+m}=a_t+b_t m$  
$m>0$为预测超前期数

### Holt-Winter no seasonal
与Brown单一参数线性指数平滑很相似，其思路是，不对预测值进行二次平滑，而是对原序列的趋势进行平滑  

$S_t=\alpha Y_t+(1-\alpha)(S_{t-1}+b_{t-1})$    
$b_t=\beta (S_t-S_{t-1})+(1-\beta)b_{t-1}$  
$F_{t+m}=S_t+b_t m$

## 三次指数平滑法

### Brown三次指数平滑
step1：计算指数平滑值  
$S_t^{(1)}=\alpha Y_t+(1-\alpha)S_{t-1}^{(1)}$  
$S_t^{(2)}=\alpha S_t^{(1)}+(1-\alpha)S_{t-1}^{(2)}$   
$S_t^{(3)}=\alpha S_t^{(2)}+(1-\alpha)S_{t-1}^{(3)}$   

step2：估计参数  
$a_t=3S_t^{(1)}-3S_t^{(2)}+S_t^{(3)}$  
$b_t=\dfrac{\alpha^2}{2(1-\alpha)^2}[(6-5\alpha)S_t^{(1)}-(10-8\alpha)S_t^{(2)}+(4-3\alpha)S_t^{(3)}]$  
$c_t=\dfrac{\alpha^2}{(1-\alpha)^2}[S_t^{(1)}-2S_t^{(2)}+S_t^{(3)}]$  

step3:预测  
$F_{t+m}=a_t+b_t m+c_t^2 m^2$  

### Holter-Winter季节乘积模型
Holter-Winter Multiplicative  
$F_{t+m}=(S_t+b_tm)I_{t-L+m}$  
其中，$S_t$是平稳性，$b_t$是趋势性，$I_t$是季节性  

$S_t=\alpha \dfrac{Y_t}{I_{t-L}}+(1-\alpha)(S_{t-1}+b_{t-1}),0<\alpha<1$  
$b_t=\gamma(S_t-S_{t-1})+(1-\gamma)b_{t-1},0<\gamma<1$  
$I_t=\beta \dfrac{Y_t}{S_t}+(1-\beta)I_{t-L},0<\beta<1$  

### Holter-Winter季节加法模型
Holter-Winter additive  
$F_{t+m}=(S_t+b_tm)+I_{t-L+m}$  
