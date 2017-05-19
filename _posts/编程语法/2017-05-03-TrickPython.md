---
layout: post
title: 【编程技巧】Python
categories: Geek
tags: 语法速查
keywords:
description:
---

## 1
问题：从40个数中随机选取30个。要求等概率，无放回抽样  

解答：
```py
import numpy as np
nums=np.random.randint(5,50,size=40)#待选择的array

#算法开始
mask=np.random.rand(40)
for i in mask:
    if sum(mask>i)==30:
        break
nums[mask>i]
```
以上代码没用用到高级命令，用Matlab等其它语言实现相同目的时，可以拿来作为借鉴，Python有更好的解决方案：  
```py
import numpy as np
nums=np.random.randint(5,50,size=40)
np.random.shuffle(nums)
nums[:30]
```


如果是有放回抽样：  
```py
import numpy as np
nums=np.random.randint(5,30,size=(40,1))
np.random.choice(nums,30)
```

-----
## 2

问题：list中取数
```
[c1[i] for i in [0,1,3]]#不规律的标号，这样取
```
-----
