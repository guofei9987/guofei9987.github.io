---
layout: post
title: 【Mente Carlo 2】随机数发生器
categories:
tags: 0xa0_蒙特卡洛方法
keywords:
description:
order: 10002
---

本文介绍概念：  
随机数生成器（均匀分布）  
随机性的统计学证明  
给定分布的随机数生成器  

需要知识：  
对分布的检验（卡方检验）




## 历史上的随机数发生器

**机械结构**，例如彩票摇号机，缺点：
- 生成速度慢
- 不能被计算机直接调用
- 无法重复（有时要用同一组随机数测试两套模型策略）  


**预先生成随机数**，并且保存到一个外置设备上
- 例如兰德公司(RAND)出版过一本书《百万乱数表》  

**现代方法**，用确定的整数递归方程生成 **伪随机数** ，优点：  
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

易知，上面的线性同余发生器是存在周期的，且这个周期小于m，当然想让 **周期越大越好**，  

**定理**（Hull和Dobell，1962）。线性同余发生器生成一个满周期随机序列，当且仅当：  
- c与m互素
- a-1可以被m所有的素因子q整除
- 如果m是4的整数倍，a-1也是4的整数倍

### 混合线性同余发生器

当$c>0$时，叫做 **混合线性同余发生器**  

最好的做法是：  
- $m=2^b$,b是计算机可以存放整数的最大位数,例如有些系统用32位表示正整数，最大为为符号为，那么b=31  
- c是奇数，便可以满足c与m互素的条件  
- a-1是4的倍数  

**Python实现：**

```python
# 生成0~1均匀分布的随机数
def random_func(seed, n):
    x = []
    a = 906185749
    m = 2 ** 31
    c = 1
    state = seed
    for i in range(n):
        state = (a * state + c) % m
        x.append(state / m)
    return x
```

应用：  
```py
import matplotlib.pyplot as plt
plt.hist(random_func(seed=43322, n=10000), bins=20)
plt.show(block=True)
```

![randomgenerator1.png](/a/random_algo/randomgenerator1.png)  


### 乘性同余发生器

当$c=0$时，叫做 **乘性同余发生器**  

$X_i=(aX_{i-1})\mod  m$  

$X_i$不能取到0，因此可能的最大周期是m-1  
周期达到m-1的充要条件是：  
- m是素数
- a是m的素元  


## 随机性的检验

以上是服从 **均匀分布** 的随机数，如何检验它的随机性呢？  
我们建立一套数学模型来检验它。

### 格子结构

可视化简单判定其均匀随机性

```py
import matplotlib.pyplot as plt

random_list = random_func(seed=5, n=10000)
x = random_list[:-1]
y = random_list[1:]

plt.plot(x, y, '.', markersize=2)
plt.show(block=True)
```

![randomgenerator2.png](/a/random_algo/randomgenerator2.png)  

说明：
- 横、纵坐标分别是 $x_{t-1},x_t$
- 一个随机数发生器，其随机性的一个 **必要条件**，就是这个图上的点是均匀分布在整个区域内。（当然不是充分条件，用这个图片可以否决掉大部分的）





### 卡方检验

前提：$R_i$独立同分布  
H0：$R_i$服从均匀分布U(0,1)  
方法：卡方检验  
$\chi^2 =\sum\limits_i\dfrac{(f_i-e_i)^2}{e_i}$  
$f_i$是离散化后的，每个区间的样本个数。  
$e_i$是离散化后，每个区间的理论个数。  


### 序列检验
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

### 混沌迭代法

（另一篇文章）



## 生成某分布的随机数：CDF的逆

现在我们有一个“均匀分布随机数发生器”了，我们还想要一个“服从xx分布的随机数发生器”

目的：生成随机变量X对应的随机数。  
已知：  
- $R \sim U(0,1)$
- 随机变量X的CDF是$F(x)$,  

方法：$F(X)=R$,解出$X=F^{-1}(R)$就是符合要求的随机变量。  


### 例子1：指数分布

X是指数分布，$f(x)=\lambda e^{-\lambda x}, x\geq 0$  

解出$F(x)=1-e^{-\lambda x}$  

于是，$X=-\dfrac{1}{\lambda}\ln(1-R)$  

由于$1-R$与$R$是相同的分布，所以也可以写成$X=-\dfrac{1}{\lambda}\ln(R)$  


Python实现：
```py
import numpy as np

lambda_val = 2  # 指数分布的λ参数

uniform_random = random_func(seed=500, n=2000)
exp_random = -1 / lambda_val * np.log(1 - np.array(uniform_random))

import matplotlib.pyplot as plt

plt.hist(exp_random)
plt.show(block=True)
```

![caption: 指数分布发生器](/a/random_algo/gen_exp.jpg)


### 例子2：离散分布

$p_x=p^x(1-p)^{1-x}$  

$X=[\dfrac{\ln R}{\ln p}+1]$  




## 生成某分布的随机数：包围取舍采样法

### 问题提出：不存在解析解的情况

“CDF的逆”方法确实好用，但是往往遇到“CDF的逆不存在解析表达式”的情况。
- 通过 $X\sim f(x)$ 有时无法求出 $F^{-1}(x)$ 的解析解
- 我们第一想到，没有解析解，是否可以用数值解。但是仿真中需要大量生成随机数，数值解的性能就跟不上了


例如，正态分布，做逆变换法时遇到 $\int_{-\infty}^X\dfrac{1}{\sqrt{2\pi}}e^{-u^2/2} du$，**它无法求出解析解**


### 算法过程

下面的算法中有很巧妙的思想，请反复读。  

**step1** ：对$f(x)$的定义域分段，  
例如，对正态分布可以只生成正实数区域，然后依概率取相反数即可。  
也可以有其它分段方法，例如分n段，每段上生成随机数，根据预先求出的每段的概率，每次依概率选择对应的区间段就行了。  

**step2**： 只研究step1中的某一段，找到另一个随机变量Y，使得：  
1. $f_X(x)\leq f_Y(y)$在这一区间段上恒成立。
2. Y上的随机数容易用其它方法生成
    - Y 选的越好，整个算法性能就越高
    - 还有个保底的 Y，就是区间内的均匀分布，当然这个算法性能较低。

**step3**：
1. 生成一个Y的随机数y
2. 生成一个$U(0,1)$的随机数r
3. 如果$r>\dfrac{f_X(y)}{f_Y(y)}$，回到1，否则输出y

经过以上算法后，生成的y就是服从X分布（在选定区间段上的）的随机数

注意：step1中的分段，不是随意分的，要满足以下条件：
- 使得step2可以实现，也就是说，可以找到满足条件的随机变量Y
- 预先知道落在每个区间段上的概率，这样才能拼接为一个完整的分布。例如，对于正态分布，如果按中心分2段，那么预先知道落在2个区间段上的概率各为0.5。  
- 研究算法，发现$f_X$的乘数系数并不重要。  
$\lambda f_X(x)\leq f_Y(y)$，找到这样的$\lambda$即可。  
当然，$\lambda$越大，step3中返回1的概率就越小，算法效率越高  


### 例子

目的：找到一个 **标准正态分布** 的随机数生成器 $f(x)=\sqrt{\dfrac{2}{\pi}}e^{-\dfrac{x^2}{2}}$  

**step1** : 分为两段$(-\infty ,0),[0,+\infty)$  
注意到其 **对称性**：  
1. 只需生成$[0,+\infty)$的随机变量  
2. 我们知道落在各个区间上的概率为0.5：所以按照0.5的概率加负号就可以得到结果

**step2** ：研究$[0.5,+\infty)$，找到随机变量$Y\sim \exp(0.5-x)$  
前面说了，系数不重要，$\exp(-0.5*x^2) \leq \exp (0.5-x)$  

**step3** : $f_Y(x)=\exp(0.5-x)$很容易生成$y\sim f_Y$，依概率$\dfrac{f_X(x)}{f_Y(y)}$接受y  

而在 $[0,0.5]$ 区间内，选取均匀分布作为 Y 即可


## 某分布随机数生成器：特殊分布

对于正态分布等特殊的分布，可以通过一些定理推导出更高效的随机数生成器。

算法（**Box-Muller**）：
1. 生成 $U_1,U_2 \sim U(0,1)$
2. 假设
    - $Z_1=\sqrt{-2\ln U_1} \cos (2\pi U_2)$
    - $Z_2=\sqrt{-2\ln U_1} \cos (2\pi U_2)$
3. 则 $Z_1,Z_2$ 独立服从标准正态分布。



```py
import numpy as np
import matplotlib.pyplot as plt


def normal_box_muller(size=10000):
    u1 = np.random.rand(size // 2)
    u2 = np.random.rand(size // 2)
    z1 = np.sqrt(-2 * np.log(u1)) * np.cos(2 * np.pi * u2)
    z2 = np.sqrt(-2 * np.log(u1)) * np.sin(2 * np.pi * u2)
    return np.concatenate([z1, z2])


samples = normal_box_muller()

plt.hist(samples, bins=50, density=True)
x = np.linspace(-4, 4, 100)
plt.plot(x, (1 / np.sqrt(2 * np.pi)) * np.exp(-x ** 2 / 2))
plt.show(block=True)
```


![caption: 生成正态分布](/a/random_algo/gen_norm2.png)