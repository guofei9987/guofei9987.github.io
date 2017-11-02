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
