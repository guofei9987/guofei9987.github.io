---
layout: post
title: 【Mento Carlo 2】随机数发生器
categories:
tags: A蒙特卡洛方法
keywords:
description:
order: 10002
---

本文介绍概念：  
随机数生成器（均匀分布）  
随机性的统计学证明  

需要知识：  
对分布的检验（卡方检验）




## 历史

### 机械结构

利用机械结构，例如彩票摇号机，缺点：
- 生成速度慢
- 不能被计算机直接调用
- 无法重复（有时要用同一组随机数测试两套模型策略）  


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

易知，上面的线性同余发生器是存在周期的，这个周期小于m  
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

![randomgenerator1.png](/pictures_for_blog/postimg/randomgenerator1.png)  


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

![randomgenerator2.png](/pictures_for_blog/postimg/randomgenerator2.png)  

横、纵坐标分别是$x_{t-1},x_t$  

### 统计检验

算法生成了一组随机数$R_i$,如何确定这个算法

#### 卡方检验

前提：$R_i$独立同分布  
H0：$R_i$服从均匀分布U(0,1)  
方法：卡方检验  
$\chi^2 =\sum\limits_i\dfrac{(f_i-e_i)^2}{e_i}$  
$f_i$是离散化后的，每个区间的样本个数。  
$e_i$是离散化后，每个区间的理论个数。  


#### 序列检验
前提：$R_i$独立同分布，且服从均匀分布U(0,1)  
H0：$(R_i,R_{i+1})$服从均匀分布$U(0,1)^2$  
方法：卡方检验  
划分为网格，统计每个小格子内的样本数量，进行同样的卡方检验。  


## 其它的随机数发生器

### 组合发生器
例如：  
$X_{i+1}=(171X_i)\mod 30269$  
$Y_{i+1}=(172Y_i)\mod 30307$  
$Z_{i+1}=(170Z_i)\mod 30323$  

组合发生器就是这个：  
$R_i=(\dfrac{X_i}{30269}+\dfrac{Y_i}{30307}+\dfrac{Z_i}{30323})\mod 1$  

组合发生器的周期是3个发生器周期的最小公倍数。  

### 斐波那契发生器

$X_{i+1}=(X_i+X_{i-1})\mod m$  

1. 最大可能周期是多少呢？
$(X_i,X_{i-1})$有$m^2$种可能性  

优点：  
无须乘法运算  
缺点：  
序列随机性不高  
改进：  
混合其它发生器  
