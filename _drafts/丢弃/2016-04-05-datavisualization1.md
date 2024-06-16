---
layout: post
title: 【丢弃】【可视化方法】
categories:
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

![boxplot](/pictures_for_blog/postimg/boxplot.png)

|参数|意义|
|--|--|
|notch=True|形状变成扁的|
|flierprops={'markerfacecolor':'g', 'marker':'D'}|离群点的样式|
|showfliers=False|是否显示离群点|
|vert=False|变成横的box图|




## 多图表&多子图
**回收原因：多图表当然用面向对象的方式去画才更为清晰，转当前图表这种方法在Matlab中也显得不高级和杂乱**  
- plt.figure(1)可以转换当前的画布
- plt.sca(ax1)转换到指定的axes


```py
# 一个案例
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 10)

plt.figure(1)
ax1_211 = plt.subplot(221)
ax1_212 = plt.subplot(223)
ax1_122 = plt.subplot(122)

plt.figure(2)
ax2_211 = plt.subplot(211)
ax2_212 = plt.subplot(212)

plt.sca(ax1_211)
plt.plot(x, np.sin(x))
plt.sca(ax1_212)
plt.plot(x, np.cos(x))
plt.sca(ax1_122)
plt.plot(x, x)

plt.sca(ax2_211)
plt.plot(x, x)
plt.plot(x, -x)
plt.sca(ax2_212)
plt.plot(x, np.sin(x))

plt.show()
```
