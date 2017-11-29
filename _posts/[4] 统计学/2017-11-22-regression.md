---
layout: post
title: 【回归分析】理论与实现.
categories:
tags: 4统计学
keywords:
description:
order: 408
---


|X\ Y|分类|连续|分类+连续|
|--|--|--|--|
|分类|列联表分析<br>LR|LR|LR|
|连续|ttest<br>ANOVA|OLS回归|协方差分析ANCOVA|


## 线性回归
大图见于<a href='http://www.guofei.site/StatisticsBlog/regression.htm' target="HypothesisTesting">这里</a>  


<iframe src="http://www.guofei.site/StatisticsBlog/regression.htm" width="100%" height="3600em" marginwidth="10%"></iframe>

大图见于<a href='http://www.guofei.site/StatisticsBlog/regression.htm' target="HypothesisTesting">这里</a>  

## 正则化方法
- 岭回归
- lasso
- 弹性网络

## Python实现


大图见于<a href='http://www.guofei.site/StatisticsBlog/回归分析.html' target="HypothesisTesting">这里</a>  


<iframe src="http://www.guofei.site/StatisticsBlog/回归分析.html" width="100%" height="3600em" marginwidth="10%"></iframe>

大图见于<a href='http://www.guofei.site/StatisticsBlog/回归分析.html' target="HypothesisTesting">这里</a>  

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
有可能产生死循环，所以进入和剔除时对显著性水平不同，从而防止死循环。  


## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
[^EM]: 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)  
[^AppliedRegression]: 《应用回归分析》，人民大学出版社  
