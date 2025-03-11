---
layout: post
title: 🔥【统计推断】理论与实现
categories:
tags: 0x41_统计模型
keywords:
description:
order: 406
---


理论篇大图见于<a href='https://www.guofei.site/StatisticsBlog/HypothesisTesting.htm' target="HypothesisTesting">这里</a>  
jupyter原文见于<a href='https://www.guofei.site/StatisticsBlog/%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD%E5%9F%BA%E7%A1%80.html' target="HypothesisTesting">这里</a>  


## 理论篇
第一类错误：H0为真，但错误地拒绝了H0  
第二类错误：H0为假，但错误地接受了H0

用公式表示就是
- 第一类错误$\alpha=P(x \in w \mid H_0)$
- 第二类错误$\beta=P(x \in w \mid H_1)$

统计推断一般使用 $\alpha$，例如：
- 如果 $\alpha$ 很小（比如小于0.05），就意味着有充分理由拒绝 $H_0$


大图见于<a href='https://www.guofei.site/StatisticsBlog/HypothesisTesting.htm' target="HypothesisTesting">这里</a>  


<iframe src="https://www.guofei.site/StatisticsBlog/HypothesisTesting.htm" width="100%" height="1600em" marginwidth="10%"></iframe>


大图见于<a href='https://www.guofei.site/StatisticsBlog/HypothesisTesting.htm' target="HypothesisTesting">这里</a>  

## 额外

用excel来存这个知识，始终别扭，现在把其中一部分重新在这里写一写。

### 均值检验

|名字|H0|前提条件|构建随机变量|服从分布|代码|备注|
|--|--|--|--|--|--|--|
| **单因子方差分析** <br> **ANOVA** | $\mu_1=\mu_2=...=\mu_r$ | 独立、正态、等方差<br> $X_{ij}=u_i+\varepsilon_{ij}$<br>$\varepsilon_{ij} \sim N(0,\sigma^2)$|$SST=\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(x_{ij}-\bar{\bar x})^2$<br>$=\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(x_{ij}-\bar x_i)+\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(\bar x_i-\bar{\bar x})^2$<br>=SSE(组内误差)+SSA(组间误差)|$F=\dfrac{SSA/\sigma^2/(r-1)}{SSE/\sigma^2/(n-r)}\sim F(r-1,n-r)$|tstat, pvalue = stats.f_oneway(data1, data2, data3) <br> from statsmodels.formula.api import ols <br> sm.stats.anova_lm(ols('target ~ C(motor)',data=df).fit())||

#### 双因子方差分析带交叉项
[参考](https://wenku.baidu.com/view/3cda71e75727a5e9846a616b.html)  
先定义命名和数据:  
$x_{ijk}=u+\alpha_i+\beta_j+(\alpha\beta)_ {ij}+\varepsilon_{ijk}$
- 序号i表示在A因素中的标号，总共a个
- 序号j表示在B因素中的标号，总共b个
- 序号j表示在AB因素相同时，多次抽取的样本的标号。然后假设每组数量都一样，都是n个

H0:$\alpha_i=0,\beta_j=0,\forall i,j$  

那么，


|方差来源|公式|若H0成立，那么|F统计量|
|--|--|--|--|
|因子A|$SSA=bn\sum\limits_{i=1}^a(\bar x_{i\cdot\cdot}-\bar x_{\cdot\cdot\cdot})^2$|$SSA/\sigma^2\sim \chi^2(a-1)$|$\dfrac{SSA/(a-1)}{SSE/(ab(n-1))}$|
|因子B|$SSB=an\sum\limits_{i=1}^b(\bar x_{\cdot j \cdot}-\bar x_{\cdot\cdot\cdot})^2$|$SSB/\sigma^2\sim \chi^2(b-1)$|$\dfrac{SSB/(b-1)}{SSE/(ab(n-1))}$|
|因子A×B|$SSAB=n\sum\limits_{i=1}^a\sum\limits_{j=1}^b(\bar x_{ij\cdot}-\bar x_{i\cdot\cdot}-\bar x_{\cdot j \cdot}+\bar x_{\cdot\cdot\cdot})^2$|$SSAB/\sigma^2\sim \chi^2((a-1)(b-1))$|$\dfrac{SSA/((a-1)(b-1))}{SSE/(ab(n-1))}$|
|组内误差|$SSE=\sum\limits_{i=1}^a\sum\limits_{j=1}^b\sum\limits_{k=1}^n(y_{ijk}-\bar y_{ij\cdot})^2$|$SSE/\sigma^2\sim \chi^2(ab(n-1))$||
|总和|SST=SSA+SSB+SSAB+SSE|$SST/\sigma^2\sim \chi^2(abn-1)$||





```
sm.stats.anova_lm(ols('target ~ C(motor) + C(screw)',data=df).fit())

带交互项：<br> ana = ols('target ~ C(motor) + C(screw) +C(motor)*C(screw)', data= df).fit()
sm.stats.anova_lm(ana)
```

## 实践篇

大网页见于<a href='https://www.guofei.site/StatisticsBlog/%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD%E5%9F%BA%E7%A1%80.html' target="HypothesisTesting">这里</a>  


<iframe src="https://www.guofei.site/StatisticsBlog/%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD%E5%9F%BA%E7%A1%80.html" width="100%" height="1600em" marginwidth="10%"></iframe>

大网页见于<a href='https://www.guofei.site/StatisticsBlog/%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD%E5%9F%BA%E7%A1%80.html' target="HypothesisTesting">这里</a>  


点击<a href='https://www.guofei.site/StatisticsBlog/%E7%BB%9F%E8%AE%A1%E6%8E%A8%E6%96%AD%E5%9F%BA%E7%A1%80.ipynb' target="HypothesisTesting">下载ipynb文件</a>  


## 额外知识

kstest 不但可以传入指定的分布字符串（上文），也可以传入一个分布对象（如下）

```py
stats.kstest(rvs=[1, 2, 3, 4, 5], cdf='norm')
stats.kstest(rvs=[1, 2, 3, 4, 5], cdf=stats.norm(loc=0, scale=1).cdf)
```
