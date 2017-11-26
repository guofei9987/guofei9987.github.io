---
layout: post
title: 【pandas】练习题
categories:
tags: 1数据清洗
keywords:
description:
order: 106
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
