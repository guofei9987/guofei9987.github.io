---
layout: post
title: 【Python】绘图方法汇总2
categories:
tags: 7-可视化
keywords:
description:
order: 722
---

## 单变量

### 分布图 sns.distplot()

```py
from scipy import stats
import matplotlib.pyplot as plt  # 导入
import seaborn as sns

fig,ax=plt.subplots(2,1)
x = stats.norm.rvs(loc=0, scale=1, size=100)
sns.distplot(x, bins=20, kde=True, hist=True, rug=True, fit=stats.gamma,ax=ax[0]);
# bins直方图多少个矩阵条
# hist=True显示直方图
# kde=True 显示核密度分布图
# fit=stats.gamma 拟合
# rug=True 在x轴上显示每个观测上生成的小细条（边际毛毯）

sns.distplot(x, hist=False, color="g", kde_kws={"shade": True}, ax=ax[1])
# kde图上阴影
plt.show()
```

|displot的输入参数|解释|
|--|--|
|bins|直方图多少个矩阵条|
|hist|是否显示直方图|
|kde|是否显示核密度估计图|
|fit|是否显示拟合图|
|rug|是否显示边际毛毯|


![seaborn1_1.png](/pictures_for_blog/postimg2/seaborn1_1.png)  



### box图
sns.boxplot  
<a href='http://seaborn.pydata.org/examples/grouped_boxplot.html' target="title7">官方示例</a>  
[matplotlib版本示例](http://www.guofei.site/2016/04/05/datavisualization1.html#title0)  

```py
import seaborn as sns
df = sns.load_dataset("tips")

sns.boxplot(data=df, x="day", y="total_bill", hue="sex", palette="PRGn")
```
>palette='Set1','Set2','Set3','PRGn'...  


![boxplot.png](/pictures_for_blog/postimg/boxplot.png)  


### 小提琴图

*基于seaborn[^violinplot]*  
<a href='http://seaborn.pydata.org/generated/seaborn.violinplot.html' target="violinplot">官方网站看这里</a>  



#### 小提琴图1
每一列数据作为一个小提琴
```py
import seaborn as sns
df = sns.load_dataset("tips")

sns.violinplot(data=df, palette="Set3", bw=.2, cut=3, linewidth=1)
```

![violinplot.png](/pictures_for_blog/postimg/violinplot.png)  


#### 小提琴图2
定义x列和y列，定义分类hue（可选）
```py
import seaborn as sns
df = sns.load_dataset("tips")

sns.violinplot(data=df, x="day", y="total_bill", hue="sex", bw=.2, cut=3, linewidth=1, palette="PRGn")
```
![violinplot1.png](/pictures_for_blog/postimg/violinplot1.png)  

#### 小提琴图3
```py
import seaborn as sns
df = sns.load_dataset("tips")

sns.violinplot(data=df, x="day", y="total_bill", hue="sex",split=True, bw=.2, cut=3, linewidth=1, palette="PRGn")
#split=True
```


![violinplot2.png](/pictures_for_blog/postimg/violinplot2.png)  


### qq图

用来看看是否服从特定分布[^qqplot]

*(所用库：statsmodels)*

```py
from scipy.stats import t
data = t(df=5).rvs(size=1000)

import statsmodels.api as sm
from matplotlib import pyplot as plt
fig = sm.qqplot(data=data, dist=t, distargs=(3,), fit=True, line='45')
plt.show()
```

![datavisualization1.png](/pictures_for_blog/postimg/datavisualization1.png)  


## 多变量

散点图

### regplot

```python
df = pd.DataFrame(np.random.rand(200).reshape(-1, 2), columns=['x', 'resid'])
df.loc[:, 'y'] = df.loc[:, 'x'] + df.loc[:, 'resid'] + 1

sns.regplot(x=df.x, y=df.y,
            scatter=True,  # 画散点图
            fit_reg=True,  # 回归并画回归线
            ci=95,  # 置信区间 [0,100]
            color='r',  # 颜色
            marker='^',  # 点的形状
            ax=None  # 使用哪个 axes
            )

# 另一种用法
# sns.regplot(x='x', y='y', data=df)
```
![regplot.png](/pictures_for_blog/postimg/regplot.png)  

还有些其它用法：
- order=2, 多项式回归
- sns.lmplot 可以分组把多个图画下来
- jointplot, pairplot 这两个画图方法可以设定 `kind="reg"`，从而调用 regplot


### jointplot

```py
df = pd.DataFrame(np.random.rand(200).reshape(-1, 2), columns=['x', 'resid'])
df.loc[:, 'y'] = df.loc[:, 'x'] + df.loc[:, 'resid'] + 1

sns.jointplot(x=df.x, y=df.y, kind='kde', space=0)
# sns.jointplot(x='x', y='y', data=df, kind='hex', space=0)

# space 是三个子图之间的空隙
# kind='kde', 'hex', 'scatter', 'reg'
```

kind='kde':  
![jointplot_kde.png](/pictures_for_blog/postimg/jointplot_kde.png)  



kind='hex'  
![jointplot_hex.png](/pictures_for_blog/postimg/jointplot_hex.png)  


kind='scatter'  
![jointplot_scatter.png](/pictures_for_blog/postimg/jointplot_scatter.png)  


kind='reg'  
![jointplot_reg.png](/pictures_for_blog/postimg/jointplot_reg.png)  

### PairGrid

[去seaborn官网查看](http://seaborn.pydata.org/tutorial/axis_grids.html#plotting-pairwise-relationships-in-a-dataset)  

```Python
import matplotlib.pyplot as plt
import seaborn as sns

iris = sns.load_dataset("iris")

# 1. 用什么数据
g = sns.PairGrid(iris, vars=["sepal_length", "sepal_width"], hue="species")
# vars：指定画哪几个变量。默认全画
# hue：按照这一列分组


# 2. 在哪画图
# g.map = g.map_diag（对角线） + g.map_offdiag（非对角线）
# g.map_offdiag = g.map_upper + g.map_lower

# 3. 画什么图
# g.map_diag(plt.hist)
g.map_diag(sns.kdeplot, lw=3, legend=False)
# 主对角线，可以画的图有：
# a) plt.scatter（默认）
# b) plt.hist
# c) g.map_diag(sns.kdeplot, lw=3, legend=False)

g.map_upper(plt.scatter)
g.map_lower(sns.kdeplot)
# 可以画的图有：
# plt.scatter（默认）
# sns.kdeplot：对角线上就是kde，其它地方是二维kde，所以画成等高线图
# sns.regplot：带回归线和预测范围的 scatter


# 4. 美化：针对有分类 hue 的情况，会在右边显示 label
g.add_legend()
```
<img src='/pictures_for_blog/data_visualization/pair_grid_1.png'>

<img src='/pictures_for_blog/data_visualization/pair_grid_2.png'>

另外，还可以更精细地指定画哪些图
```py
g = sns.PairGrid(iris, x_vars=['petal_length','sepal_width'], y_vars=['petal_length'], hue="species")
```

### clustermap
[去seaborn官网查看](http://seaborn.pydata.org/examples/structured_heatmap.html)



```py
import pandas as pd
import scipy.stats as stats
df = pd.DataFrame(stats.uniform(loc=0, scale=2).rvs(size=1000).reshape(-1, 5))


import matplotlib.pyplot as plt
import seaborn as sns
sns.clustermap(df)
plt.show()
```
![clustermap1.png](/pictures_for_blog/postimg/clustermap1.png)  


对应的参数：  
```py
col_cluster=False
row_cluster=False
```

还有第二种图：
```py
sns.clustermap(df.corr())
plt.show()
```
![clustermap2.png](/pictures_for_blog/postimg/clustermap2.png)  




## 常用自定义画图

一种回归并画图的例子

```py
# 导入包与数据
import pandas as pd
from statsmodels.sandbox.regression.predstd import wls_prediction_std
import matplotlib.pyplot as plt
import numpy as np
df=pd.DataFrame(np.random.rand(200).reshape(-1,2),columns=['x','resid'])
df.loc[:,'y']=2*df.loc[:,'x']+0.5*df.loc[:,'resid']+1

# 建模
import statsmodels.formula.api as smf
lm_s = smf.ols(formula='y ~ x', data=df).fit()

# 画图
prstd, iv_l, iv_u = wls_prediction_std(lm_s)
fig, ax = plt.subplots()
ax.plot(df.x, df.y, 'o', label="data")
ax.plot(df.x, lm_s.fittedvalues, 'r-', label="OLS")
ax.plot(df.x, iv_u, 'b--')
ax.plot(df.x, iv_l, 'b--')
ax.legend(loc='best')
plt.title('R2={a:.2f},y={b:.3f}x+{c:.3f}'.format(a=lm_s.rsquared,b=lm_s.params[0],c=lm_s.params[1]))
plt.show()
```

![regression_plot](https://www.guofei.site/pictures_for_blog/regression_plot.png)


## 参考文献
[^violinplot]:  http://seaborn.pydata.org/generated/seaborn.violinplot.html  

[^qqplot]:  http://www.statsmodels.org/stable/generated/statsmodels.graphics.gofplots.qqplot.html
[^jointplot]: http://seaborn.pydata.org/generated/seaborn.jointplot.html
