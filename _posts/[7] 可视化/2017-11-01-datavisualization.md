---
layout: post
title: 【Python】可视化方法汇总
categories:
tags: 7可视化
keywords:
description:
---

## 单变量

### 分布图

sns.distplot

[看这里](http://www.guofei.site/2017/10/01/seabron.html#title1)  

<img src='http://www.guofei.site/public/postimg2/seaborn1_1.png'>

### box图
sns.boxplot  
<a href='http://seaborn.pydata.org/examples/grouped_boxplot.html' target="title7">看这里</a>  

```py
import seaborn as sns
sns.set(style="ticks")

# Load the example tips dataset
tips = sns.load_dataset("tips")

# Draw a nested boxplot to show bills by day and sex
sns.boxplot(x="day", y="total_bill", hue="sex", data=tips, palette="PRGn")
sns.despine(offset=10, trim=True)
plot.show()
```





<img src='http://www.guofei.site/public/postimg/boxplot.png'>

### 小提琴图

*基于seaborn[^violinplot]*  
<a href='http://seaborn.pydata.org/generated/seaborn.violinplot.html' target="violinplot">官方网站看这里</a>  


```py
import pandas as pd
import scipy.stats as stats
df = pd.DataFrame(
    {'a': stats.uniform(0, 1).rvs(size=20), 'b': stats.norm(1, 1).rvs(size=20), 'c': stats.norm(1, 1).rvs(size=20)})


import seaborn as sns
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(11, 6))
sns.violinplot(data=df, palette="Set3", bw=.2, cut=3, linewidth=1)
plt.show()
```

<img src='http://www.guofei.site/public/postimg/violinplot.png'>

#### 小提琴图2

数据准备：  
```py
import pandas as pd
import scipy.stats as stats
df=pd.DataFrame({'a':stats.uniform(0,1).rvs(size=200),'b':stats.norm(1,1).rvs(size=200),'c':stats.randint(low=1,high=4).rvs(size=200),'col_bool':stats.uniform(0,1).rvs(size=200)>0.5})
df
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>a</th>
      <th>b</th>
      <th>c</th>
      <th>col_bool</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.283142</td>
      <td>1.046024</td>
      <td>3</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.421666</td>
      <td>0.413187</td>
      <td>2</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.448498</td>
      <td>0.841689</td>
      <td>2</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.306374</td>
      <td>1.811465</td>
      <td>2</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.606838</td>
      <td>2.348296</td>
      <td>2</td>
      <td>True</td>
    </tr>
  </tbody>
</table>

第一种画法：
```py
import seaborn as sns
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(11, 6))
sns.violinplot(data=df, x='c', y='a', hue="col_bool", palette="Set3", bw=0.2, cut=2, linewidth=1)
plt.show()

```

<img src='http://www.guofei.site/public/postimg/violinplot1.png'>  


第二种画法：  
```py
import seaborn as sns
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(11, 6))
sns.violinplot(data=df, x='c', y='a', hue="col_bool", palette="Set3", bw=0.2, cut=2, linewidth=1, split=True)
plt.show()
```

<img src='http://www.guofei.site/public/postimg/violinplot2.png'>  

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

<img src='http://www.guofei.site/public/postimg/datavisualization1.png'>


## 多变量

散点图

### jointplot
数据准备
```py
import pandas as pd
import scipy.stats as stats

df=pd.DataFrame({'a':stats.norm(loc=0,scale=1).rvs(size=200),'b':stats.uniform(loc=3,scale=4).rvs(size=200)})
```

画图有2种方法[^jointplot]

```py
import pandas as pd
import scipy.stats as stats
df = pd.DataFrame({'a': stats.norm(loc=0, scale=1).rvs(size=200), 'b': stats.uniform(loc=3, scale=4).rvs(size=200)})

import matplotlib.pyplot as plt
import seaborn as sns
sns.jointplot(x='a', y='b', data=df, kind="kde", size=5, space=0)# 方法1
# sns.jointplot(x=df.a, y=df.b, kind="kde", size=5, space=0)# 方法2
plt.show()
```

kind='kde':  
<img src='http://www.guofei.site/public/postimg/jointplot_kde.png'>  


kind='hex'  
<img src='http://www.guofei.site/public/postimg/jointplot_hex.png'>  


kind='scatter'  
<img src='http://www.guofei.site/public/postimg/jointplot_scatter.png'>  


kind='reg'  
<img src='http://www.guofei.site/public/postimg/jointplot_reg.png'>  

### PairGrid

[去seaborn官网查看](http://seaborn.pydata.org/tutorial/axis_grids.html#plotting-pairwise-relationships-in-a-dataset)  


<img src='http://seaborn.pydata.org/_images/axis_grids_50_0.png'>

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
<img src='http://www.guofei.site/public/postimg/clustermap1.png'>


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
<img src='http://www.guofei.site/public/postimg/clustermap2.png'>   


## 参考文献
[^violinplot]:  http://seaborn.pydata.org/generated/seaborn.violinplot.html  

[^qqplot]:  http://www.statsmodels.org/stable/generated/statsmodels.graphics.gofplots.qqplot.html
[^jointplot]: http://seaborn.pydata.org/generated/seaborn.jointplot.html
