---
layout: post
title: 【时间序列】基本原理.
categories:
tags: 4统计学
keywords:
description:
order: 433
---

## 基本概念
### 概率分布族
$F_{t_1,t_2,...,t_m}(x_1,x_2,...,x_m)$

### 特征统计量
均值$u_t=EX_t=\int_{-\infty}^{+\infty}xdF_t(x)$  
方差$DX_t=\int_{-\infty}^{+\infty}(x-u_t)dF_t(x)$  
自协方差$\gamma(t,s)=E(X_t-u_t)(X_s-u_s)$  
自相关系数$\rho(t,s)=\dfrac{\gamma(t,s)}{\sqrt{DX_t DX_s}}$  


## 时间序列的平稳性

### 严格平稳过程

**定义：**  
${Y_t}$是一个严格随机过程，如果$\forall n,h,$  
$F_{Y_{t_1},Y_{t_2},...,Y_{t_n}}(Y_1,...,Y_n)=F_{Y_{t_1+h},Y_{t_2+h},...,Y_{t_n+h}}(Y_1,...,Y_n)$  

### 弱平稳过程

指的是${Y_t}$的期望、方差、协方差不随时间推移而变化  
**定义：**  
${Y_t}$是一个随机过程，如果$\forall t $  

$E(Y_t)=u$  
$Var(Y_t)=\sigma^2$  
$Cov(Y_t,Y_s)=Cov(Y_{t+h},Y_{s+h})=r_{t-s}$  
那么${Y_t}$是一个弱平稳随机过程  

在时间序列中讨论的平稳，通常指弱平稳  

### 非平稳的后果
伪回归的根本原因在于时间序列的非平稳性。  
用传统方法对彼此不相关的非平稳变量进行回归，那么t检验和F检验往往倾向于显著  

### DF检验
Dickey-Fuller（DF），Augmented Dickey-Fuller test（ADF）  

DF检验有三种形式：  
$y_t=\rho y_{t-1}+\varepsilon_t$  
$y_t=\alpha+\rho y_{t-1}+\varepsilon_t$  
$y_t=\alpha+\delta t+\rho y_{t-1}+\varepsilon_t$  

如果$\mid \rho \mid<1$，序列$y_t$是平稳的  
如果$\mid \rho \mid=1$，序列$y_t$是非平稳的，但一阶差分是平稳的。  
如果$\mid \rho \mid>1$，序列$y_t$是发散的  

step1:建立假设  
H0：$\rho =1$  
H1：$\mid \rho \mid<1$  

step2：进行t检验  


通常用这样的检验方程：  
$\Delta y_t=\gamma y_{t-1}+\varepsilon_t$  
$\Delta y_t=\alpha+\gamma y_{t-1}+\varepsilon_t$  
$\Delta y_t=\alpha+\delta t+\gamma y_{t-1}+\varepsilon_t$  

问题转化为检验$\gamma=0$  

### ADF检验
DF检验只适合一阶自相关的情况。  
ADF（augmented Dickey-Fuller test,增广的迪基-福勒检验法）检验适合`高阶自相关`的情况  

ADF检验有三种形式：  
$\Delta y_t=\gamma y_{t-1}+\sum\limits_{i=1}^l \beta_i \Delta y_{t-i}+\varepsilon_t$  
$\Delta y_t=\alpha+\gamma y_{t-1}+\sum\limits_{i=1}^l \beta_i \Delta y_{t-i}+\varepsilon_t$  
$\Delta y_t=\alpha+\delta t+\gamma y_{t-1}+\sum\limits_{i=1}^l \beta_i \Delta y_{t-i}+\varepsilon_t$  
