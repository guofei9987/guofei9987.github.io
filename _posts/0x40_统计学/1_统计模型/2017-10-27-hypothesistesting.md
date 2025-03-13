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



## 对均值的检验

| 条件 | H0 | 检验名字 | 构建随机变量 | 服从分布 | Python(scipy.stats as stats, statsmodel.api as sm) | 备注 |
|--|--|--|--|--|--|--|
| 方差已知 <br> 或样本量>30 | u<=u0 <br> u>=u0 <br> u==u0 |z检验| $Z=\dfrac{\bar X-\mu}{\sigma/\sqrt{n}}$|N(0,1)| ds1=sm.stats.DescrStatsW(data1) <br> tstat, pvalue = ds1.ztest_mean(value=2, alternative='two-sided') <br> ds1.zconfint_mean(alpha=0.05,alternative='larger')|"two-sided" <br> "larger" <br> "smaller"
| 方差未知 <br> 且样本量<30 | u<=u0 <br> u>=u0 <br> u==u0 | t检验 | $t=\dfrac{\bar X-u}{S/\sqrt n}$ | t(n-1) | tstat, pvalue, df = ds1.ttest_mean(value=2, alternative='two-sided')	 ||
| 两独立样本<br>方差已知 | u1-u2==delta | z检验 | $Z=\dfrac{\bar X - \bar Y -(u_x-u_y)}{\sqrt{\sigma_X^2/n_X+\sigma_Y^2/n_Y}}$ | N(0,1) | cm = sm.stats.CompareMeans(ds1, ds2) <br> tstat, pvalue = cm.ztest_ind(alternative='two-sided', usevar='pooled', value=0) | "two-sided" <br> "larger" <br> "smaller" <br> <br> "pooled" <br> "unequal" |
| 两独立样本<br>方差未知<br><br>标准流程：<br>1. 检验正态性(ks,sw) <br> 2. 方差齐型检验(F) <br> 3. 检验 | u1-u2<=delta <br> u1-u2>=delta <br> u1-u2==delta | t检验 | 方差齐性：<br> $t=\dfrac{\bar X-\bar Y-(u_X-u_Y)}{\sqrt{\frac{1}{n_X}+\dfrac{1}{n_Y}} \sqrt{\dfrac{(n_X-1)S_X^2+(n_Y-1)S_Y^2}{n_X+n_Y-2}}}$ <br><br> 方差不齐：<br> $t=\dfrac{\bar X-\bar Y -(u_X-u_Y)}{\sqrt{S_X^2/n_X+S_Y^2/n_Y}}$| $t(n_X+n_Y-2)$ <br><br> 方差不齐： <br>用 Welch–Satterthwaite 公式<br>近似得到t分布<br> $t(\frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1} + \frac{(s_2^2/n_2)^2}{n_2-1}})$ | cm = sm.stats.CompareMeans(ds1, ds2) <br> tstat, pvalue, df = cm.ttest_ind(alternative='two-sided', usevar='pooled', value=0) |  "two-sided" <br> "larger" <br> "smaller" <br> <br> "pooled" <br> "unequal"|
| 两配对样本 | u1-u2<=delta <br> u1-u2>=delta <br> u1-u2==delta | t检验 | $d_i=X_i-Y_i$ <br> $S_d = \dfrac{\sum(d_i-\bar d)^2}{n-1}$ <br> $t=\dfrac{\bar d -(u_x-u_y)}{\bar S_d/\sqrt n}$| $t$ | stats.ttest_rel(a,b)	 |  |
| 三组以上 <br> 单因素 <br><br> 前提:<br> 独立、正态、等方差<br> $X_{ij}=u_i+\varepsilon_{ij}$<br>$\varepsilon_{ij} \sim N(0,\sigma^2)$ | $\mu_1=\mu_2=...=\mu_r$ | 单因素方差分析 <br>One-Way ANOVA| $SST=\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(x_{ij}-\bar{\bar x})^2$<br>$=\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(x_{ij}-\bar x_i)+\sum\limits_{i=1}^r\sum\limits_{j=1}^{n_i}(\bar x_i-\bar{\bar x})^2$<br>=SSE(组内误差)+SSA(组间误差) <br><br> $F=\dfrac{SSA/\sigma^2/(r-1)}{SSE/\sigma^2/(n-r)}$ | $F(r-1,n-r)$ | tstat, pvalue = stats.f_oneway(data1, data2, data3) <br><br> from statsmodels.formula.api import ols <br> sm.stats.anova_lm(ols('target ~ C(motor)',data=df).fit()) |  |
| 三组以上<br>双因素<br><br> $X_{ij}=u+a_i+b_j+\varepsilon_{ij}$ <br> $\varepsilon_{ij} \stackrel{\text{i.i.d.}} \sim N(0,\sigma^2)$ | $a_1=a_2=...=a_r=0$ <br> $b_1=b_2=...=b_k=0$ | 双因素方差分析 <br> ANOVA2| SST=SSA+SSB+SSE <br>...<br> 比较复杂，单独写 | $F$ | sm.stats.anova_lm(ols('target ~ C(motor) + C(screw)',data=df).fit()) <br><br> 带交互项：<br> ana = ols('target ~ C(motor) + C(screw) +C(motor)*C(screw)', data= df).fit() <br> sm.stats.anova_lm(ana) |  |

【补充】当正态性或方差齐性不满足时，就不能用 ANOVA 了，作为替代：
- Mann-Whitney U test（两独立样本非参数检验）
- Wilcoxon Signed-Rank Test（配对样本非参数检验）
- Kruskal-Wallis H test（三组以上非参数检验）


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
| 单正态 | $\sigma^2=\sigma_0^2$ | 卡方检验 | $\chi^2=\dfrac{(n-1)S^2}{\sigma^2}$ |  | [h,p,ci,stats]=matlab.vartest(X,m,alpha,tail) |  |
| 双正态 |  | F检验 | $F=\dfrac{S_X^2}{S_Y^2}$ | $F(m-1,n-1)$ | matlab.vartest2(X1,X2,alpha,tail)	 |  |
| 三个以上正态 |  |  |  |  | matlab.vartest3<br> matlab.vartestn|  |



## 对分布的检验

| 条件 | H0 | 检验名字 | 构建随机变量 | 服从分布 | Python(scipy.stats as stats, statsmodel.api as sm) | 备注 |
|--|--|--|--|--|--|--|
| 离散样本 | 服从指定的离散分布 | 卡方拟合检验 | $n_i$：观察频数 <br> $p_i$：理论频率 <br> $np_i$：理论频数 <br> $\chi^2=\sum\dfrac{(n_i-np_i)^2}{np_i}$ | $\chi^2(r-1)$ | stats.chisquare([16, 16, 10], f_exp=[16, 16, 8]) <br>必须是基数相同的频数 | 原理：<br> 分组，计算每组的频数 |
| 连续样本 | 样本服从正态分布 | Jarque-Beran | $JB=\dfrac{n}{6}(s^2+\dfrac{(k-3)^2}{4})$ | $\chi(2)$ | statistic, pvalue = stats.jarque_bera(series)	 | 峰度和偏度	 |
| 连续样本 | 样本服从指定分布 | Kolmogorov–Smirnov<br> KS test| $KS=\max(F_n(x)-G(x))$ |  | stats.kstest(rvs=df_rv.data,cdf='norm') | cdf : str or callable(of cdf) |
| 连续样本 | 样本服从正态分布 | Shapiro–Wilk | $W=\dfrac{(\sum\limits_{i=1}^{n/2} a_i X_i)^2}{\sum\limits_{i=1}^n(X_i-\bar X)^2}$ |  | stats.shapiro(series) | 样本量n<2000，用sharpiro-wilk <br> n>2000，用kstest |


## 对其它的检验

| 条件 | H0 | 检验名字 | 构建随机变量 | 服从分布 | Python(scipy.stats as stats, statsmodel.api as sm) | 备注 |
|--|--|--|--|--|--|--|
| |  | 符号检验 |  |  |  |  |
| |  | 秩和检验 |  |  |  |  |
| |  | 中值检验 |  |  | stats.median_test |  |




## X-Y相关性检验



先定义变量类型：

| 变量类型 | 解释 | 例子 |
|--|--|--|
| **分类变量**<br>Categorical Variable | 变量的取值是 **离散的、无序的** | 性别（男/女）<br> 血型（A/B/O/AB） <br> 城市（北京/上海/广州） |
| **顺序变量**<br>Ordinal Variable | 变量的取值是 **离散的、有序的** | 教育水平（小学 < 初中 < 高中 < 大学）<br> 病情严重程度（轻度 < 中度 < 重度） |
| **连续变量**<br>Continuous Variable | 变量的取值是**数值型的、连续的** | 身高（cm）、体重（kg）、考试分数、收入（元） |




适用方法：

| X\ Y | **分类变量** | **顺序变量** | **连续变量** |
|--|--|--|--|
| **分类变量** | **列联表分析**<br>（卡方检验、费舍尔检验） | Mann-Whitney U（两组）<br> Kruskal-Wallis（多组） | **t 检验（双分类）**<br>**ANOVA（多分类）** |
| **顺序变量** | Mann-Whitney U 检验（两组）<br> Kruskal-Wallis 检验（多组） | **秩相关分析**<br>**Spearman、Kendall** | **Spearman** |
| **连续变量** | **t 检验（双分类）**<br>**ANOVA（多分类）** | **Spearman** | **Pearson** <br> 线性回归 |



包含回归分析的：

| X\ Y | **分类变量** | **顺序变量** | **连续变量** |
|--|--|--|--|
| **分类变量** | **列联表分析**（卡方检验、费舍尔检验）<br> **Logistic 回归** | **有序 Logistic 回归（Ordinal Logistic Regression）** | **Logistic 回归（如果 Y 是二分类）**<br>**线性回归（如果 Y 是连续变量）** |
| **顺序变量** | **有序 Logistic 回归（Ordinal Logistic Regression）** | **有序 Probit 回归** | **Spearman 相关分析 / Kendall 相关分析** |
| **连续变量** | **Logistic 回归（如果 Y 是二分类）**<br>**线性回归（如果 Y 是连续变量）** | **Spearman 相关分析 / Kendall 相关分析** | **线性回归（OLS）、多元回归** |



### 列联表分析
以两离散变量分别都是两类举例  


H0：X，Y独立  
H1：X，Y不独立  


step1：取得源数据  


||0|1|
|--|--|--|
|0|n11|n12|
|1|n21|n22|


step2：求边缘密度  


||0|1||
|--|--|--|--|
|0|n11|n12|a1=(n11+n12)/n|
|1|n21|n22|a2=(n21+n22)/n|
||b1=(n11+n21)/n|b2=(n12+n22)/n||


step3：求期望概率（假设独立）  


||0|1||
|--|--|--|--|
|0|a1×b1|a1×b1|a1|
|1|a1×b1|a1×b1|a2|
||b1|b2||


step4:求期望频数  


||0|1|
|--|--|--|
|0|a1×b1×n|a1×b1×n|
|1|a1×b1×n|a1×b1×n|


step5：期望频数与原频数的差，得到的数字平方和后服从卡方分布


step6：卡方检验


### 相关分析


|相关系数|定义|描述|H0|统计量|代码
|-------|---|---|---|----|---|
| Pearson | $r=\dfrac{cov(x,y)}{\sqrt{DxDy}}$ | 成对的连续数据<br>接近正态的单峰分布 | r=0 | $t=\dfrac{r\sqrt{n-2}}{1-r^2}\sim t(n-2)$ | r, p_value <br> = stats.pearsonr |
| Spearman | 计算秩的pearson，等价于：<br>$r=1-\dfrac{6\sum d_i^2}{n(n^2-1)}$<br>$d_i=R_i-Q_i$|成对的等级数据<br>无论分布|r=0 | 小样本：参数为n-2的 Spearman 分布<br> 大样本：$t=\dfrac{r\sqrt{n-2}}{1-r^2}\sim t(n-2)$|stats.spearmanr |
| Kendall | （公式在下面）| 小样本 | r=0 | 小样本：Kendall分布<br>大样本$U=3\tau\sqrt{\dfrac{n(n-1)}{2(2n-5)}}$ | stats.kendalltau<br>stats.weightedtau |



- 范围(-1,1)，-1:完全负相关，1：完全正相关，0：不相关
- pearson的358原则:  
    - $\mid r\mid \geq 0.8$表示两个变量高度相关  
    - $\mid r\mid \in [0.5,0.8]$表示两个变量中度相关  
    - $\mid r\mid \in [0.3,0.5]$表示两个变量低度相关  
    - $\mid r\mid \in [0,0.3]$表示两个变量几乎不相关  
- Kendall 有两个版本
    - tau-a (1938 版本): $\tau_a=2(C-D)/(n(n-1))$
        - 不考虑数据中可能的并列关系。
    - tau-b (1945 版本)：$\tau_b = (P - Q) / \sqrt{(P + Q + T) * (P + Q + U)}$
        - 考虑了有并列值的数据
        - P is the number of concordant pairs, Q the number of discordant pairs, T the number of ties only in `x`, and U the number of ties only in `y`.  If a tie occurs for the same pair in both `x` and `y`, it is not added to either T or U.  


**相关性代码** 
```python
from scipy import stats
import numpy as np
n = 10
x = np.random.rand(n)
y = np.random.rand(n)

# Pearson
r, p_value = stats.pearsonr([1,2,3,4,5], [5,6,7,8,7])

# Spearman
tau, pvalue = stats.spearmanr(x,y)

# 如果输入 n×m 的数据，返回的是相关系数矩阵
x = np.random.rand(n,3)
tau, p_value = stats.spearmanr(x)

# Kendall
tau, p_value = stats.kendalltau(x,y)
# 用的是 tau_b 算法
```

其它：
```python
stats.theilslopes
stats.weightedtau
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






## 参考资料

大图见于<a href='https://www.guofei.site/StatisticsBlog/HypothesisTesting.htm' target="HypothesisTesting">这里</a>  


- [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
- 我的另一篇博客[EM算法理论篇](http://www.guofei.site/2017/11/09/em.html)
