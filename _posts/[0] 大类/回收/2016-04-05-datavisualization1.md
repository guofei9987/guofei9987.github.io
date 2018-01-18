---
layout: post
title: 【回收】【可视化方法】
categories: 回收
tags:
keywords: model evaluation
description:

---



### boxplot

**回收原因：plt.boxplot的x轴只能是数字，用sns.boxplot代替**  
```py
import pandas as pd
import scipy.stats as stats
df = pd.DataFrame({'a': stats.uniform(0, 1).rvs(size=20), 'b': stats.norm(1, 1).rvs(size=20)})

import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.boxplot(df.values)
plt.show()
```

<img src='http://www.guofei.site/public/postimg/boxplot.png'>

|参数|意义|
|--|--|
|notch=True|形状变成扁的|
|flierprops={'markerfacecolor':'g', 'marker':'D'}|离群点的样式|
|showfliers=False|是否显示离群点|
|vert=False|变成横的box图|
