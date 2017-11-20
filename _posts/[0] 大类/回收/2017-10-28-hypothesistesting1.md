---
layout: post
title: 【假设检验】Python实现.
categories: 回收
tags:
keywords:
description:
---


*回收原因：发现了用ipython notebook直接嵌入网页的方法，阅读更加清晰，见于[这里](http://www.guofei.site/2017/10/27/hypothesistesting.html#title1)*  


参见[【假设检验】理论篇](http://www.guofei.site/2017/10/27/hypothesistesting.html)  


## 数据准备

```py
import pandas as pd
import scipy.stats as stats
df=pd.DataFrame(stats.norm.rvs(loc=0,scale=1,size=120).reshape(-1,3),columns=list('abc'))
df.loc[:,'c']=(df.loc[:,'c']>0)*1#c这一列换成离散值
```

## 置信区间

```py
import statsmodels.api as sm

ds = sm.stats.DescrStatsW(df)
ds.tconfint_mean(alpha=0.05)
```
output:  

(array([-0.29225042, -0.36459267, -0.25896104]),  
 array([ 0.31800701,  0.2203038 ,  0.42702711]))  


分别是每列数的置信上界，置信下界。  


## 均值检验

p-value指的是H0为真的概率。  

### 方差未知

t检验  

```py
ds.ttest_mean(value=0.1)
```

输出的3个量分别是t-statistic, p-value, df  
p-value<0.05，拒绝原假设，均值不是0.1  



### 两独立样本

step1：方差齐次性检验

```py
(_,df1),(_,df2)=df.groupby('c')['a']
leveneTestRes = stats.levene(df1, df2, center='median')
print('w-value=%6.4f, p-value=%6.4f' %leveneTestRes)
```

如果p-value比较大，无法拒绝原假设。认为方差是齐性的  

step2：ttest
```py
stats.stats.ttest_ind(df1, df2, equal_var=True)#equal_var表示方差齐次
# Or Try: sm.stats.ttest_ind(df1, df2, usevar='pooled')
```
