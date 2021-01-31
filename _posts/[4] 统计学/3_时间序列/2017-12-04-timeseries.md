---
layout: post
title: 【统计时序2】平稳性
categories:
tags: 4-3-时间序列
keywords:
description:
order: 442
---

## 平稳性的定义

### 严平稳过程

**定义：**  
${Y_t}$是一个严格随机过程，如果$\forall n,h,$  
$F_{Y_{t_1},Y_{t_2},...,Y_{t_n}}(Y_1,...,Y_n)=F_{Y_{t_1+h},Y_{t_2+h},...,Y_{t_n+h}}(Y_1,...,Y_n)$  

### 宽平稳过程

指的是${Y_t}$的期望、方差、协方差不随时间推移而变化  
**定义：**  
${Y_t}$是一个随机过程，如果$\forall t $  
$E(Y_t)=u$  
$Var(Y_t)=\sigma^2$  
$Cov(Y_t,Y_s)=Cov(Y_{t+h},Y_{s+h})=\gamma_{t-s}$  
那么${Y_t}$是一个 **宽平稳随机过程**  


### 自相关系数性质
- 规范性，$\mid\rho\mid\leq1$  
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
1. 多个随机变量，但每个随机变量只有1个样本。（需要用观察值序列推断）
2. 平稳性可以极大减少随机变量的个数，增加待估变量的样本容量。例如，如果序列平稳，那么可以 **用全部观察值去估计均值、方差** 。
3. 减少分析难度，提高精度。  


伪回归的根本原因在于时间序列的非平稳性。  
用传统方法对彼此不相关的非平稳变量进行回归，那么t检验和F检验往往倾向于显著  

## 平稳性的检验
### 时序图
画图，图形在某个常数值附近随机波动，波动范围有界、无趋势、无周期，说明序列平稳。
### 自相关图
自相关系数很快衰减到0，说明序列平稳。  
如果自相关系数一直很高，或者自相关系数出现周期性，或者自相关系数先递减后递增，说明序列不平稳。  

```py
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
plot_acf(ts, lags=31, ax=ax1)
```
详细内容[看这里](https://www.guofei.site/StatisticsBlog/arma.html)


除了看图外，statsmodels.tsa.stattools.acf可以方便地给出有关统计量, [官方文档](http://www.statsmodels.org/stable/generated/statsmodels.tsa.stattools.acf.html)  
```py
statsmodels.tsa.stattools.acf(x, unbiased=False, nlags=40, qstat=False, fft=False, alpha=None, missing='none')[source]
# x : array,Time series data

# unbiased : bool, If True, then denominators for autocovariance are n-k, otherwise n

# nlags: int, optional, Number of lags to return autocorrelation for.

# qstat : bool, optional If True, returns the Ljung-Box q statistic for each autocorrelation coefficient. See q_stat for more information.

# fft : bool, optional. If True, computes the ACF via FFT.

# alpha : scalar, optional. If a number is given, the confidence intervals for the given level are returned.

# missing : str, optional. A string in [‘none’, ‘raise’, ‘conservative’, ‘drop’] specifying how the NaNs are to be treated.
```

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
DF检验只适合一阶自相关的情况。也就是假设$\varepsilon_t$没有自相关性，但实际数据大多不满足此假设，所以改进到ADF检验  
ADF（augmented Dickey-Fuller test,增广的迪基-福勒检验法）检验适合`高阶自相关`的情况  


ADF检验的三种基本模型：
$\Delta y_t=\gamma y_{t-1}+u_t$  
$\Delta y_t=\alpha+\gamma y_{t-1}+u_t$  
$\Delta y_t=\alpha+\delta t+\gamma y_{t-1}+u_t$  
其中$u_t$是一个平稳过程，允许$u_t$存在自相关性，如此ADF检验变为如下形式：


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
序列是白噪声过程，$H_0: \rho_1=\rho_2=...=\rho_m=0,\forall m\geq 1$  
(因为期数有限，所以只计算前m个相关系数)  
#### 3. 构造统计量
- **Q统计量**  
$Q=n\sum\limits_{k=1}^m \hat\rho_k^2 \sim \chi^2(n)$  
- **LB统计量**  
$LB=n(n+2)\sum\limits_{k=1}^m (\dfrac{\hat\rho_k^2}{n-k})\sim\chi^2(m)$  
(对于小样本的表现也良好)  
Ljung-Box q statistic


#### 4. 判别原则
$p<\alpha$,证明可以拒绝原假设，认为不是白噪声过程

**代码实现见于上文acf，只需要设定qstat=True**
