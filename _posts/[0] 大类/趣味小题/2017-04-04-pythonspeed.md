---
layout: post
title: 【Python】运行效率研究.
categories: 趣文
tags:
keywords:
description:
order: 1111
---



## 1. 自加和赋值加法的效率比较

```python
import time

n=100000
start=time.time()
i=1
for j in range(n):
    i+=1
print(time.time()-start)

start=time.time()
i=1
for j in range(n):
    i=i+1

print(time.time()-start)
```


>0.01636791229248047
0.01322317123413086

结论：自加和每次赋值效率几乎相同，这一点与C语言有区别

## 2. ufunc方法

### 数据准备

```python
import numpy as np
def tri_func(x,a=1,b=0):
    x=x-int(x)
    if x<0.3:
        y=x
    elif x<0.7:
        y=0.3
    else:
        y=1-x
    y=a*y+b
    return y
```

### 运行效率比较

```python
import time

x=np.linspace(0,5,100000)
start_time=time.time()
y1=[tri_func(i) for i in x]
print(time.time()-start_time)

start_time=time.time()
func1=np.frompyfunc(tri_func,3,1)
y2=func1(x,1,0)
print(time.time()-start_time)
```

out:

0.12008452415466309

0.06804776191711426

ufunc方法比[for ]效率高


## 反向排序效率比较

```
import time
n=5
count=10**n
start=time.time()
nums=[]
for i in range(count):
    nums.append(i)
nums.reverse()
print(time.time()-start)

start=time.time()
nums=[]
for i in range(count):
    nums.insert(0,i)
print(time.time()-start)

start=time.time()
import numpy as np
nums=np.array([])
for i in range(count):
    np.append(nums,i)
a=nums[:-1:]
print(time.time()-start)

start=time.time()
import numpy as np
nums=[]
for i in range(count):
    nums.append(i)
num_reverse=np.array(nums)[:-1:]
print(time.time()-start)
```

out:
0.02801966667175293
2.725426435470581
0.7875568866729736
0.02852034568786621

>list.insert速度最慢，2.7秒才运行完
>numpy虽然不是最快，但慢在了np.append环节，反转操作并不慢，由于np.append的适用范围更广，所以还是比较有用的




*直接在jupyter里插入%%timeit，便可以主动运行上万次并测速，这比MATLAB效率研究方便太多了*  

## 生成随机数速度比较
准备：  
```py
import numpy as np
from scipy.stats import randint
rv=randint(low=0,high=2)
```
1. numpy
```py
%%timeit
a=np.random.randint(low=0,high=2,size=(50,30))
```
>7.15 µs ± 768 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)

2. scipy.stats
```py
%%timeit
a=rv.rvs(size=(50,30))
```
>1.94 ms ± 58.4 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
