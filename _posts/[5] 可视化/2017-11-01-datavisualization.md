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


### qq图

看看是否服从特定分布

```
from scipy.stats import norm
import pandas as pd

df = pd.DataFrame(norm(loc=0, scale=1).rvs(size=70))
import statsmodels.api as sm
from matplotlib import pyplot as plt

fig = sm.qqplot(df.loc[:, 0], fit=True, line='45')
plt.show()
```

<img src='http://www.guofei.site/public/postimg/datavisualization1.png'>
