---
layout: post
title: 【统计时序】基本原理.
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
$Cov(Y_t,Y_s)=Cov(Y_{t+h},Y_{s+h})=\gamma_{t-s}$  
那么${Y_t}$是一个弱平稳随机过程  


### 自相关系数
- 规范性，$\rho\leq0$  
- 对称性，$\rho_k=\rho_{-k}$  
- 非负定性，自相关矩阵非负定
- 非唯一性，平稳序列对应唯一的自相关系数，自相关系数对应多个平稳过程  
这给我们建模有诸多挑战


### 严平稳与宽平稳的关系
- 在时间序列中讨论的平稳，通常指弱平稳  
- 如果低阶距存在，那么严平稳过程能推出宽平稳成立  
- 如果服从多元正态分布，那么宽平稳可以推出严平稳


如果低阶距不存在，那么严平稳不能推出宽平稳。  
例如柯西分布  


### 平稳性的意义
1. 多个随机变量，但每个随机变量只有1个样本
2. 平稳性可以极大减少随机变量的个数，增加待估变量的样本容量
3. 减少分析难度，提高精度。  


伪回归的根本原因在于时间序列的非平稳性。  
用传统方法对彼此不相关的非平稳变量进行回归，那么t检验和F检验往往倾向于显著  

## 平稳性的检验
### 时序图
画图，图形中波动范围有界、无趋势、无周期
### 自相关图
自相关系数很快衰减到0
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


## 白噪声过程
满足两个性质：  
1. $EX_t=u,\forall t\in T$  
2. $$\gamma(t,s)=\left \{ \begin{array}{ccc} \sigma^2,t=s\\ 0, t\neq s \end{array}\right.$$,$\forall t,s \in T$


显然，**白噪声过程是平稳过程**。  

### 白噪声过程的性质

#### 1. 纯随机性
$\forall k\neq 0,\gamma(k)\neq 0$
#### 2. 方差齐性
$DX_t=\gamma(0)=0$  
根据马尔科夫定理，只有方差齐性时，用OLS得到的参数估计值才是准确的、有效的。  
### 白噪声的检验


#### 1. 检验原理
**Barlett定理**：  
如果$X_t$是白噪声过程，$$\{ x_t \}$$是观察期数为n的观察序列，$\hat\rho_k$是观察序列的自相关系数，  
那么$\hat\rho_k\dot\sim N(0,1/n),\forall k\neq 0$  
(近似服从正态分布，是因为期数有限)


推论：  $\sum\limits_{k=1}^n n \hat\rho_k^2 \sim \chi^2(n)$  


#### 2. 假设
$H_0: \rho_1=\rho_2=...=\rho_m=0,\forall m\geq 1$  

#### 3. 构造统计量
- **Q统计量**  
$Q=n\sum\limits_{k=1}^m \hat\rho_k^2 \sim \chi^2(n)$  
(因为期数有限，所以只计算前m个相关系数)  
- **LB统计量**  
$LB=n(n+2)\sum\limits_{k=1}^m (\dfrac{\hat\rho_k^2}{n-k})\sim\chi^2(m)$  
(小样本时，表现也良好)
#### 4. 判别原则
$p<\alpha$,证明可以拒绝原假设，认为不是白噪声过程
