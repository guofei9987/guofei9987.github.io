---
layout: post
title: 【回归分析】理论与实现
categories:
tags: 4-1-统计模型
keywords:
description:
order: 408
---


|X\ Y|分类|连续|分类+连续|
|--|--|--|--|
|分类|列联表分析<br>LR|LR|LR|
|连续|ttest<br>ANOVA|OLS回归|协方差分析ANCOVA|


## 线性回归
大图见于<a href='https://www.guofei.site/StatisticsBlog/regression.htm' target="HypothesisTesting">这里</a>  


<iframe src="https://www.guofei.site/StatisticsBlog/regression.htm" width="100%" height="3600em" marginwidth="10%"></iframe>

大图见于<a href='https://www.guofei.site/StatisticsBlog/regression.htm' target="HypothesisTesting">这里</a>  

## 一元线性模型
为简化记号，记：  
$l_{xy}=\sum\limits_{i=1}^n (x_i-\bar x)(y_i-\bar y)=\sum\limits_{i=1}^n x_i y_i-n\bar x\bar y$  
$l_{xx}=\sum\limits_{i=1}^n(x_i-\bar x)^2=\sum\limits_{i=1}^n x_i^2 -n\bar x^2$  
$l_{yy}=\sum\limits_{i=1}^n(y_i-\bar y)^2=\sum\limits_{i=1}^n y_i^2-n\bar y^2$  


对于一元线性回归模型:  
$$\left \{ \begin{array}{l}
y_i=\beta_0+\beta_1 x_i+\varepsilon_i\\
\varepsilon_i \sim (i.i.d) N(0,\sigma^2)
\end{array}\right.
$$


用最小二乘法得到：  
$\hat\beta_1=\dfrac{l_{xy}}{l_{xx}}$  
$\hat\beta_0=\bar y -\hat\beta_1\bar x$  


可以证明：  
$\hat\beta_1\sim N(\beta_1,\dfrac{\sigma^2}{l_{xx}})$  
$\hat\beta_0 \sim  N(\beta_0, (\dfrac{1}{n} + \dfrac{\bar x^2}{l_{xx}}) \sigma^2)$  
$Cov(\hat\beta_0,\hat\beta_1)=-\dfrac{\bar x}{l_{xx}}\sigma^2$  

#### 参数的区间估计
(上面的结论用于显著性检验，下面以$\beta_1$为例)
$H_0:\beta_1=0,H_1:\beta_1 \not=0$  
已知$\hat\beta_1\sim N(\beta_1,\dfrac{\sigma^2}{l_{xx}})$，  
其中$\sigma^2$未知，所以构造t统计量  
$t=\dfrac{\hat \beta_1}{s_{\hat\beta_1}}\sim t(n-2)$   
其中，$s_{\hat\beta_1}=\sqrt{\dfrac{\hat\sigma^2}{l_{xx}}},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$  


#### y的区间估计
（上面三条结论也可以用来求出预测值的置信区间）  
（根据正态分布的加法）  
对 $x=x_0$ 处做预测 $\hat y_0=\beta_1 x_0 +\beta_0\sim N(\beta_1 x_0+\beta_0,(\dfrac{1}{n}+\dfrac{(x_0-\bar x)^2}{l_{xx}})\sigma^2)$  
得到区间估计$(\hat y-t_{1-\alpha/2}(n-2) s_{\hat y},\hat y+t_{1-\alpha/2}(n-2) s_{\hat y})$  
其中，$s_{\hat y}=\sqrt{\dfrac{(x_0-\bar x)^2}{l_{xx}})\hat\sigma^2},\hat\sigma^2=\dfrac{\sum\limits_{i=1}^n (y_i-\hat y_i)^2}{n-2}$

### 另一种写法
$SST=\sum\limits_{i=1}^n(y_i-\bar y)^2$
$SSR=\sum\limits_{i=1}^n(\hat y_i-\bar y)^2=\dfrac{l_{xy}}{l_{xx}}$
$SSE=\sum\limits_{i=1}^n(y_i-\hat y_i)^2$

结论：  
$SST=SSR+SSE$  
$F=\dfrac{SSR/1}{SSE/(n-2)}$
相关系数$r^2=\dfrac{l_{xy}^2}{l_{xx}l_{yy}}=\dfrac{SSR}{SST}$
## 正则化方法
- 岭回归
- lasso
- 弹性网络

## Python实现


大图见于<a href='https://www.guofei.site/StatisticsBlog/回归分析.html' target="HypothesisTesting">这里</a>  


<iframe src="https://www.guofei.site/StatisticsBlog/回归分析.html" width="100%" height="3600em" marginwidth="10%"></iframe>

大图见于<a href='https://www.guofei.site/StatisticsBlog/回归分析.html' target="HypothesisTesting">这里</a>  

### AIC
模型的似然函数为$L(\theta, x)$,其中$\theta$的维度为p，那么[^AppliedRegression]:  
$AIC=-2\ln L(\theta,x)+2p$  


把AIC用于回归，等价于$AIC=n \ln (SSE)+2p$


### 逐步回归

#### 1. 前进法
每次增加一个feature进入模型，按照F检验的显著性作为评判指标
#### 2. 后退法
每次剔除一个最不重要的feature，仍然是F检验作为指标
#### 3. 逐步法
每引入一个feature，对已经进入模型的feature组个检验，直到最后。  
有可能产生死循环，所以进入和剔除时对显著性水平的要求不同，从而防止死循环。  


## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^EM]: 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)  
[^AppliedRegression]: 《应用回归分析》，人民大学出版社  
