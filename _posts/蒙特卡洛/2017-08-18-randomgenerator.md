---
layout: post
title: 【Mento Carlo 2】随机数发生器.
categories: Geek
tags: 蒙特卡洛方法
keywords:
description:
---

本文介绍概念：  
随机数生成器（均匀分布）  
随机性的统计学证明  

需要知识：  
对分布的检验（卡方检验）




## 历史上的方法

### 机械结构

利用机械结构，例如彩票摇号机，缺点：
- 生成速度慢
- 不能被计算机直接调用
- 无法重复  
例如，有时要用同一组随机数测试两套模型策略  

### 预先生成随机数
预先生成随机数，并且保存到一个外置设备上。  
例如兰德公司(RAND)出版过一本书《百万乱数表》  

### 现代方法

用确定的整数递归方程生成 **伪随机数** ，优点：  
- 只用存储公式和种子
- 可重复

## 线性同余发生器

$X_i=(aX_{i-1}+c)\mod  m$  

- $m$:模数  

- $a\in [0,m-1]$:乘子  
- $X_0\in [0,m-1]$:种子  
- $c\in [0,m-1]$:增量  

当$c>0$时，叫做 **混合线性同余发生器**  
当$c=0$时，叫做 **乘性同余发生器**  

### 周期

易知，上面的线性同余发生器，是存在周期的，这个周期小于m  
实践中，当然想让 **周期越大越好**，  

（Hull和Dobell，1962），线性同余发生器生成一个满周期随机序列，当且仅当：  
- c与m互素
- a-1可以被m所有的素因子q整除
- 如果m是4的整数倍，a-1也是4的整数倍

### 混合线性同余发生器

当$c>0$时，叫做 **混合线性同余发生器**  

最好的做法是：  
$m=2^b$,b是计算机可以存放整数的最大位数,例如有些系统用32位表示正整数，最大为为符号为，那么b=31  
c是奇数，便可以满足c与m互素的条件  
a-1是4的倍数  

#### Python实现

```py
def random_func(seed,n):
    x=[]
    a=906185749
    m=2**31
    c=1
    temp = seed
    for i in range(n):
        temp=(a*temp+c)%m
        x.append(temp/m)
    return x
```

应用：  
```py
import matplotlib.pyplot as plt
seed=43322
plt.hist(random_func(seed,10000),bins=20)
plt.show()
```


<img src='http://www.guofei.site/public/postimg/randomgenerator1.png'>

### 乘性同余发生器

当$c=0$时，叫做 **乘性同余发生器**  

$X_i=(aX_{i-1})\mod  m$  

$X_i$不能取到0，因此可能的最大周期是m-1  
周期达到m-1的充要条件是：  
- m是素数
- a是m的素元  


## 随机数理论的检验

### 格子结构

```py
def random_func(seed,n):
    x=[]
    a=906185749
    m=2**8
    c=1
    temp = seed
    for i in range(n):
        temp=(a*temp+c)%m
        x.append(temp/m)
    return x

import matplotlib.pyplot as plt
seed=43322
a=random_func(seed,1000)
x=a+[0]
y=[0]+a
plt.plot(x,y,'.')
plt.show()
```

算法生成了一组随机数$R_i$,如何确定这个算法

<img src='http://www.guofei.site/public/postimg/randomgenerator1.png'>


### 卡方检验

假设：
