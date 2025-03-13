---
layout: post
title: 🔥 统计推断
categories:
tags: 0x41_统计模型
keywords:
description:
order: 406
---


<link rel="stylesheet" href="/c/wide_table.css">


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


## 对均值的检验

| 条件 | H0 | 检验名字 | 构建随机变量 | 服从分布 | Python(scipy.stats as stats, statsmodel.api as sm) | 备注 |
|--|--|--|--|--|--|--|
| 方差已知 | u<=u0 <br> u>=u0 <br> u==u0 |z检验| $Z=\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}$|N(0,1)| ds1=sm.stats.DescrStatsW(data1) <br> tstat, pvalue = ds1.ztest_mean(value=2, alternative='two-sided') <br> ds1.zconfint_mean(alpha=0.05,alternative='larger')|"two-sided" <br> "larger" <br> "smaller"
| 方差未知 | u<=u0 <br> u>=u0 <br> u==u0 | t检验 | $t=\dfrac{\bar X-u}{S/\sqrt n}$ | t(n-1) | tstat, pvalue, df = ds1.ttest_mean(value=2, alternative='two-sided')	 ||
| 两独立样本<br>方差已知 |  | z检验 | $Z=\dfrac{\bar X - \bar Y -(u_x-u_y)}{\sqrt{\sigma_X^2/n_X+\sigma_Y^2/n_Y}}$ | N(0,1) | cm = sm.stats.CompareMeans(ds1, ds2) <br> tstat, pvalue = cm.ztest_ind(alternative='two-sided', usevar='pooled', value=0) | "two-sided" <br> "larger" <br> "smaller" <br> <br> "pooled" <br> "unequal" |
| 两独立样本<br>方差未知 | u1-u2<=delta <br> u1-u2>=delta <br> u1-u2==delta | t检验 | 方差齐性：<br> $t=\dfrac{\bar X-\bar Y-(u_X-u_Y)}{\sqrt{\frac{1}{n_X}+\dfrac{1}{n_Y}} \sqrt{\dfrac{(n_X-1)S_X^2+(n_Y-1)S_Y^2}{n_X+n_Y-2}}}$ <br><br> 方差不齐：<br> $t=\dfrac{\bar X-\bar Y -(u_X-u_Y)}{\sqrt{S_X^2/n_X+S_Y^2/n_Y}}$| $t(n_X+n_Y-2)$ <br><br> 方差不齐 <br>用 Welch–Satterthwaite 公式<br>近似得到t分布<br> $t(\frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1} + \frac{(s_2^2/n_2)^2}{n_2-1}})$ | cm = sm.stats.CompareMeans(ds1, ds2) <br> tstat, pvalue, df = cm.ttest_ind(alternative='two-sided', usevar='pooled', value=0) |  "two-sided" <br> "larger" <br> "smaller" <br> <br> "pooled" <br> "unequal" <br><br> 标准流程：<br>1. 检验正太性(ks,sw) <br> 2. 方差齐型检验(F) <br> 3. `ttest_ind`|
| 两配对样本 |  | t检验 | $d_i=X_i-Y_i$ <br> $S_d = \dfrac{\sum(d_i-\bar d)^2}{n-1}$ <br> $t=\dfrac{\bar d -(u_x-u_y)}{\bar S_d/\sqrt n}$|  | stats.ttest_rel(a,b)	 |  |
| 三组以上 <br> 单因素 | $\mu_1=\mu_2=...=\mu_r$ | 单因素方差分析 <br>One-Way ANOVA| $SST=\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(x_{ij}-\bar{\bar x})^2$<br>$=\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(x_{ij}-\bar x_i)+\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(\bar x_i-\bar{\bar x})^2$<br>=SSE(组内误差)+SSA(组间误差) <br><br> $F=\dfrac{SSA/\sigma^2/(r-1)}{SSE/\sigma^2/(n-r)}$ | $F(r-1,n-r)$ | tstat, pvalue = stats.f_oneway(data1, data2, data3) <br><br> from statsmodels.formula.api import ols <br> sm.stats.anova_lm(ols('target ~ C(motor)',data=df).fit()) | 前提:<br> 独立、正态、等方差<br> $X_{ij}=u_i+\varepsilon_{ij}$<br>$\varepsilon_{ij} \sim N(0,\sigma^2)$ |
| 三组以上<br>双因素 | $$\left\{ \begin{array}{l} X_{ij}=u+a_i+b_j+\varepsilon_{ij} \\ \varepsilon_{ij}\sim(i.i.d) N(0,\sigma^2) \end{array}\right.$$ <br><br>  $H_{0a}:a_1=a_2=...=a_r=0$ <br> $H_{0b}:b_1=b_2=...=b_k=0$ | 双因素方差分析 <br> ANOVA2| SST=SSA+SSB+SSE <br>...<br> 比较复杂，单独写 |  | sm.stats.anova_lm(ols('target ~ C(motor) + C(screw)',data=df).fit()) <br><br> 带交互项：<br> ana = ols('target ~ C(motor) + C(screw) +C(motor)*C(screw)', data= df).fit() <br> sm.stats.anova_lm(ana) |  |


### ANOVA2

这里对三组以上数据，双因素，带交叉项的均值检验，使用 双因素方差分析（ANOVA2）

先定义命名和数据:  
$x_{ijk}=u+\alpha_i+\beta_j+(\alpha\beta)_ {ij}+\varepsilon_{ijk}$
- 序号i表示在A因素中的标号，总共a个
- 序号j表示在B因素中的标号，总共b个
- 序号j表示在AB因素相同时，多次抽取的样本的标号。然后假设每组数量都一样，都是n个
- $\bar x_{i\cdot\cdot}$ 代表某个 i，遍历其它所有下标，然后得到的平均值



H0:$\alpha_i=0,\beta_j=0,\forall i,j$  



那么，


| 方差来源 | 公式 | 若H0成立，那么 | F统计量 |
|---------|-----|--------------|--------|
| 因子A | $SSA=bn\sum\limits_{i=1}^a(\bar x_{i\cdot\cdot}-\bar x_{\cdot\cdot\cdot})^2$ | $SSA/\sigma^2\sim \chi^2(a-1)$|$\dfrac{SSA/(a-1)}{SSE/(ab(n-1))}$ |
| 因子B | $SSB=an\sum\limits_{i=1}^b(\bar x_{\cdot j \cdot}-\bar x_{\cdot\cdot\cdot})^2$ | $SSB/\sigma^2\sim \chi^2(b-1)$ | $\dfrac{SSB/(b-1)}{SSE/(ab(n-1))}$ |
| 因子A×B | $SSAB=n\sum\limits_{i=1}^a\sum\limits_{j=1}^b(\bar x_{ij\cdot}-\bar x_{i\cdot\cdot}-\bar x_{\cdot j \cdot}+\bar x_{\cdot\cdot\cdot})^2$ | $SSAB/\sigma^2\sim \chi^2((a-1)(b-1))$ | $\dfrac{SSA/((a-1)(b-1))}{SSE/(ab(n-1))}$ |
| 组内误差 | $SSE=\sum\limits_{i=1}^a\sum\limits_{j=1}^b\sum\limits_{k=1}^n(x_{ijk}-\bar x_{ij\cdot})^2$ | $SSE/\sigma^2\sim \chi^2(ab(n-1))$ | |
| 总和 | SST=SSA+SSB+SSAB+SSE <br> $=\sum\limits_i \sum\limits_j \sum\limits_z (x_{ijz}-\bar x_{ij\cdot})^2$ | $SST/\sigma^2\sim \chi^2(abn-1)$ | |


[参考](https://wenku.baidu.com/view/3cda71e75727a5e9846a616b.html)  


## 对方差的检验

| 条件 | H0 | 检验名字 | 构建随机变量 | 服从分布 | Python(scipy.stats as stats, statsmodel.api as sm) | 备注 |
|--|--|--|--|--|--|--|
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |




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



