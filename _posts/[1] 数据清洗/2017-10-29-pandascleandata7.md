---
layout: post
title: 【pandas】练习题
categories:
tags: 1数据清洗
keywords:
description:
order: 120
---

## 抽扑克
先生成一个DataFrame，是一套扑克。编写一套程序，使其可以方便的从每个花色中抽n张扑克

生成扑克：
```py
name1=list('HSCD')
name2=['A']+list(range(2,11))+list('JQK')
value=(list(range(1,11))+[10]*3)*4
card_names=[]
card_names=[str(j)+i for i in name1 for j in name2]

import pandas as pd
deck=pd.DataFrame(value,index=card_names)
```

抽牌：（2张）
```py
import numpy as np
def draw(deck,n=1):
    return deck.iloc[np.random.permutation(len(deck)),:][:n]
deck.groupby(lambda i:i[-1]).apply(draw,n=2)
```

这里有几个点：
1. groupby接函数时，函数的输入是每次1个index（笔记中有）
2. apply后面的参数是func的参数

## 分组线性回归
数据随机给出：
```py
from scipy.stats import norm,uniform
import pandas as pd
import statsmodels.api as sm
from statsmodels.formula.api import ols
df=pd.DataFrame(uniform(loc=0,scale=5).rvs(size=100),columns=['x'])
df.loc[:,'y']=df.x+norm(loc=0,scale=1).rvs(size=100)
df.loc[:,'label']=[1]*50+[0]*50
```

问题是：在每组上做线性回归，并输出参数

```py
def regress_func(data,xname,yname):
    lm_s=ols(yname+'~'+xname,data=data).fit()
    return lm_s.params
df.groupby('label').apply(regress_func,'x','y')
```
