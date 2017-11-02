---
layout: post
title: 【Python】可视化方法汇总
categories:
tags: 可视化
keywords:
description:
---

## 单变量

### 分布图

sns.distplot

[看这里](http://www.guofei.site/2017/10/01/seabron.html#title1)  

<img src='http://www.guofei.site/public/postimg2/seaborn1_1.png'>

### box图
<a href='http://www.guofei.site/2017/09/25/matplotlib2.html#title7' target="title7">看这里</a>

<img src='http://www.guofei.site/public/postimg/boxplot.png'>

### 小提琴图

*基于seaborn*  

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

看看是否服从特定分布[^qqplot]

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




## 参考文献

[^qqplot] :http://www.statsmodels.org/stable/generated/statsmodels.graphics.gofplots.qqplot.html
