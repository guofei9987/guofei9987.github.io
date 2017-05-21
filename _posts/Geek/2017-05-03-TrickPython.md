---
layout: post
title: 【编程技巧】Python
categories: Geek
tags: Python特性
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

## 3

问题：在一个较大的list中，找到彼此最接近但不相等的数
很自然的想到遍历
```py
import numpy as np
seq=np.random.rand(10**5)
dd=float('inf')
for x in seq:
    for y in seq:
        if x==y:continue
        d=abs(x-y)
        if d<dd:
            xx,yy,dd=x,y,d
xx,yy
```
显然，这种算法的复杂度为$\Theta(n^2)$，对于大量数据是灾难  

改进：很自然想到sort的算法复杂度为$\Theta(n \lg n)$,先排序，然后只计算临近数，算法复杂度是$\Theta(n \lg n+n)=\Theta(n \lg n)$   
```py
import numpy as np
seq=np.random.rand(10**5)
seq.sort()
dd=float('inf')
for i in range(len(seq)-1):
    x,y=seq[i],seq[i+1]
    if x==y:continue
    d=abs(x-y)
    if d<dd:
        xx,yy,dd=x,y,d
xx,yy
```

## 4
题目：对set进行排序  
```py
unsorted_set={'a':6,'b':3,'c':9,'d':2}
```
解法1：  
```py
unsorted_set={'a':6,'b':3,'c':9,'d':2}
dict1= sorted(a.items(), key=lambda d:d[1], reverse = True)
```

解法2：
```py
unsorted_set={'a':6,'b':3,'c':9,'d':2}
value_key_pairs=[(value,key) for key,value in unsorted_set.items()]
value_key_pairs.sort()
```


额外提一句，想要做频率统计，可以从一开始就不用set，而是把raw data放到DataFrame里，然后这样：
```
frame['col1'].value_counts
```
