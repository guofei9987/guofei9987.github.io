---
layout: post
title: scipy的stats库.
categories:
tags: 4统计学
keywords:
description:
order: 450
---

[scipy.stats](https://docs.scipy.org/doc/scipy/reference/stats.html)

## 分布

官方文档里面放了很多分布，这里放上常用的（就是我认识的(⊙﹏⊙)b）    
beta	A beta continuous random variable.    
chi2	A chi-squared continuous random variable.  
dweibull	A double Weibull continuous random variable.  
erlang	An Erlang continuous random variable.  
expon	这个有点奇怪，不像指数分布An exponential continuous random variable.   

f	An F continuous random variable.  

gamma	A gamma continuous random variable.  
这个gamma分布也有问题，少了个参数

t	A Student’s T continuous random variable.  

uniform	A uniform continuous random variable.  


离散的：  

bernoulli	A Bernoulli discrete random variable.
binom	A binomial discrete random variable.

poisson	A Poisson discrete random variable.
randint	A uniform discrete random variable.



### 生成分布
```py
from scipy import stats
X=stats.norm(loc=1,scale=2)#标准差，不是方差
```
### 期望和方差stats()
```py
X.stats()#返回方差，而不是标准差
```
### rvs生成随机数

pdf：概率密度
cdf：累积概率密度
sf：生存函数
ppf：cdf的反函数
stat：印刷错误？
fit：拟合
