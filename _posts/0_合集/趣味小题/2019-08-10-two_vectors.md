---
layout: post
title: 【民科向】随机向量的投影问题
categories: 趣文
tags:
keywords:
description:
---

感谢 @shouldsee , @Joe-C-Ding 一起 [讨论](https://github.com/MathAndAlgo/DiscussionBoard)

## 缘起
一年前读量子力学科普时，学到对量子力学的解释。  
除了哥本哈根解释外，还有一种多重宇宙解释（MWI，many worlds interpretation）。大概意思是，每次量子效应，实际上分裂成两个世界。  
我们研究的对象实际上可以表示为一个向量。如果研究对象很复杂，那么必须用很高维度的向量来表示；如果比较简单，例如只有一个光子，那么就对应一个低维向量。  


有这么一个事实：在n维空间上任意取出两个向量，如果维度n很高，那么他们大概率近似垂直。如果维度n很低，那么大概率不垂直。例如，n=2时，任意两个向量，必然相互平行；n=3时，任意两个向量基本上也不会垂直。n很大时，几乎总是可以在两个向量上找到相互垂直的线性子空间。

## 随机模拟验证

```py
import numpy as np
import matplotlib.pyplot as plt

n_dim = 3
cos_all = []
for i in range(10000):
    vec_1 = 2 * np.random.rand(n_dim) - 1
    vec_2 = 2 * np.random.rand(n_dim) - 1
    print(sum(vec_1 ** 2))
    if sum(vec_1 ** 2) <= 1 and sum(vec_2 ** 2) <= 1: # 保证两个向量都在球面上
        cos_tmp = (sum(vec_1 * vec_2)) / np.sqrt(sum(vec_1 ** 2) * sum(vec_2 ** 2))
        cos_all.append(cos_tmp)

plt.hist(cos_all)
plt.show()
```
验证发现上面写的事实是正确的。

## 新的现象

在验证过程中，我们发现一个有趣的现象，当维度 n_dim=3 时，余弦（也就是向量的投影）是一个均匀分布。

![n_dim](https://user-images.githubusercontent.com/8034156/62821516-0ff4aa00-bb6e-11e9-83ad-9a7359393ae0.png)

本博客就对这一现象做分析

## 定义
我们定义随机向量是什么，一般能想到这三种：
1. “多维球面”上任意一点
2. “多维球体”内任意一点
3. “多维正方形”内任意一点


通过模拟实验，发现这三种定义下，各个 n_dim 下，余弦的分布都很相似。  
```py
# %%方形随机
import numpy as np
import matplotlib.pyplot as plt

n_dim = 3

cos_all = []
for i in range(10000):
    vec_1 = np.random.rand(n_dim) - 0.5
    vec_2 = np.random.rand(n_dim) - 0.5
    cos_tmp = (sum(vec_1 * vec_2)) / np.sqrt(sum(vec_1 ** 2) * sum(vec_2 ** 2))
    cos_all.append(cos_tmp)

plt.hist(cos_all)
plt.show()
```

多维球面不太容易模拟，似乎应该再开一个 issue 讨论一下“如何在任意曲面上随机选取一点，以达成曲面上的随机分布”  
好在球面上的点和球体内的点可以有一种一致性的映射，也就是说，在讨论夹角余弦时，可以把样本总体定位球体内的点集，其结论应当等价于“球面上的点集”结果。  

```py
# 球形随机
import numpy as np
import matplotlib.pyplot as plt

n = 3
cos_all = []
for i in range(10000):
    vec_1 = 2 * np.random.rand(n) - 1
    vec_2 = 2 * np.random.rand(n) - 1
    print(sum(vec_1 ** 2))
    if sum(vec_1 ** 2) <= 1 and sum(vec_2 ** 2) <= 1:
        cos_tmp = (sum(vec_1 * vec_2)) / np.sqrt(sum(vec_1 ** 2) * sum(vec_2 ** 2))
        cos_all.append(cos_tmp)

print(len(cos_all))
plt.hist(cos_all)
plt.show()
```

## 推导

### 第一次等价变换
假设两个向量分别是 $X=(x_1,...,x_n), Y=(y_1,...,y_n)$  


进一步，不妨假设 $Y=(1,0,...,0)$,
那么$\cos(degree(X,Y))=x_1/|X|$
做一个平方，得到 $x_1^2/(x_1^2+x_2^2+...+x_n^2)$,其中，$x_i$是相互独立的均匀分布

### 第二次等价变换

问题转化为研究 $\pm\sqrt{x_1^2/(x_1^2+x_2^2+...+x_n^2)}$  


$\pm\sqrt{x_1^2/(x_1^2+x_2^2+...+x_n^2)}
=\pm \sqrt{1/(1+(x_2^2+...+x_n^2)/x_1^2)}
$

进而，  
$(x_2^2+...+x_n^2)/x_1^2$ 这一部分可以用卷积+拉普拉斯变换来求解概率密度函数，需要不少计算量

### 第三次等价变换
为了规避计算量，我们再做一个变换，来让问题简化：  
我们不妨假设$x_i$不再服从均匀分布，而是正态分布，结论大概不会变化。好处是我们可以用 chi-distribution, t-distribution 或 Fisher z distribution 的现成结论。  
下面只讨论 n_dim=3 的情况，用 t-distribution 的相关结论

### 求解
目标分布是对称的，所以可以忽略负半部分，研究 $\sqrt{1/(1+(n-1)/t^2(n-1))}$  
（t(n-1)表示参数为n-1的t-distribution）

当n=3时，  
把$\sqrt{1/(1+2/t^2(2))}$这个分布记为K


$P(K\leq k)=P(t^2(2)\leq 2/(1/k^2-1))=2P(0\leq t(2)\leq \sqrt{2/(1/k^2-1)})$
$=2P(t(2)\leq \sqrt{2/(1/k^2-1)})-1$

而，  
$P(t(2)\leq \sqrt{2/(1/k^2-1)})=\int_0^{\sqrt{2/(1/k^2-1)}} f_T(k) dk+0.5$  
求导数，（记$b(k)=\sqrt{2/(1/k^2-1)}$）  
得到 $f_K(k)=b'(k)f_T(b(k))$  
把T分布的概率密度函数代入上式，化简得到一个常数。

如此证明了 **目标分布确实是一个均匀分布**


## 结语
证明是完事了，但还有问题：
1. 只是证明了球体和球面上的集合成立，但没有证明或者证否正方形上的情况（补充：后来证明，在正方形上不成立）
2. n_dim 为其它值的时候，也可以用类似方法推导出分布律，但计算量还是不小，所以没去计算
3. 没有回答我最初的问题，只有3维向量互相投影为均匀分布，这是否与现实的三维空间有关？
