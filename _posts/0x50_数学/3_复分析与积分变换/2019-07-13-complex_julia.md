---
layout: post
title: 【Complex Analysis2】Julia set
categories:
tags: 0x53_复变与积分变换
keywords:
description:
order: 92502
---


## julia set

我们讨论这个迭代式 $f(z)=z^2+c$  

### 问题1
为什么不用更一般化的迭代式呢 $p(z)=az^2+bz+d$？  
令$\phi(z)=az+b/2, c=ad+b/2+(b/2)^2$，有$\phi(p(z))=f(\phi(z))$  

也就是，有下面这个图。  


![complex1](/a/math/complex/complex1.jpeg)


进一步的，$p=\phi^{-1} \circ f \circ \phi $  
再进一步，$p^{n \circ } = \phi^{-1} \circ f^{n\circ} \circ \phi $  

结论是，我们只需要研究 $f(z)=z^2+c$ 就可以了

(本节$f^n$表示 $f^{n\circ}$)  
### 定义
Julia set 是x的这样一个集合，其邻域对迭代表现出混沌性。  
相反，Fatou set 是x的这样一个集合，其邻域对迭代不表现出混沌性。  
Julia set 和 Fatou set 是补集  


**例子**  
以$f(z)=z^2$为例，对应的 julia set 是 $$\{ z\mid \mid z \mid =1\}$$，对应的 Fatou set 是补集。  


定义$$A(\infty)=\{z: f^n(z) \to\infty \}$$，那么这个集合有如下性质：  
- $A(\infty)$ is open, connected, unbounded
- $A(\infty)$是 Fatou set 的子集
- $A(\infty)$的边界是 Julia set

推论：
- Fatou set is open and unbounded
- Julia set is closed and bounded set
- $J(f) \cap F(f) = \varnothing$
- completely invariant $f(J)=J, f(F)=F$


**例子** $f(z)=z^2-2$  
引入$\phi(w)=w+1/w$,就有$z^2=\phi^{-1} \circ f \circ \phi (z)$  
可以找到$A(\infty)$, 进而找到边界 Julia set is $[-2,2]$  
（过程不难，但有点绕，可以在纸上画一画）


### 数值方法
我们有这个定理：  
对于$f(z)=z^2+c, R=\dfrac{1+\sqrt{1+4\mid c\mid}}{2}$  
如果$\mid z_0 \mid >R$，那么$z_0 \in A(\infty)$ （也就是说$\lim\limits_{n\to \infty} f^{n\circ}(z_0)=\infty$）  


所以，$\exists n, f^{n\circ}(z_0)>R \Longrightarrow z_0 \in A(\infty)$  
（在迭代过程中，如果任意一次迭代，其值大于R，那么后面的值就趋近于无界）  


这给我们一种用迭代法找 Julia set 的方法：  
在迭代过程中，任意一次迭代值大于 R，就剔除 Julia set，到 max_iter 后画图  
进一步，根据第一次出现R的迭代步骤的不同，可以涂上不同的颜色。  


```py
import numpy as np
import matplotlib.pyplot as plt

c = -0.75 + 0.2j
R = (1 + np.sqrt(1 + 4 * abs(c))) / 2

n_grid = 1000
Z = np.linspace(-2, 2, n_grid).reshape(1, n_grid) + np.linspace(2, -2, num=n_grid).reshape(n_grid, 1) * 1j
Julia_set = np.zeros_like(Z)
max_iter = 50
for i in range(max_iter):
    Z = np.where(Julia_set == 0, np.square(Z) + c, 2 * R)  # 已归入 Julia set 的点，记为大数，之后不再参与计算
    Julia_set = np.where((Julia_set == 0) & (np.abs(Z) > R), i, Julia_set)
    # 第一次归入Julia set，记入其迭代次数，如果不想画彩图，把i改为1

Julia_set = np.where(Julia_set == 0, 2 * max_iter, Julia_set)  # 到最后都没有剔除的点，赋值为 2*max_iter
plt.imshow(np.abs(Julia_set))
plt.show()
```

## Mandelbrot set
c的集合，使得 $J(f)$是连通集。  
精确的定义：$$M=\{c\in \mathbb C: J(z^2+c) \mathrm{\ is \ connected} \}$$  


例如，$0, -2, 0.25 \in M, 1\not \in M$

**TH1**  
$J(f) \mathrm{\ is \ connected} \Longleftrightarrow 0\not \in A(\infty)$

**TH2**  
$c\in M \Longleftrightarrow \mid f^{n\circ} \mid \leq 2, \forall n\geq 1$






```py
import numpy as np
import matplotlib.pyplot as plt

n_grid = 1000
c = np.linspace(-2, 2, n_grid).reshape(1, n_grid) + 1j * np.linspace(2, -2, n_grid).reshape(n_grid, 1)
Mandelbrot = np.zeros_like(c)
f_z = 0
max_iter = 30

for i in range(max_iter):
    f_z = np.where(Mandelbrot == 0, np.square(f_z) + c, 1e8)  # 已经被归入 Mandelbrot set 的点，记为很大，之后不再参与计算
    Mandelbrot = np.where((Mandelbrot == 0) & (np.abs(f_z) > 2), i, Mandelbrot)  # 记录首次大于2的迭代次数，如果不想画彩图，把 i 换成 1

Mandelbrot = np.where(Mandelbrot == 0, max_iter, Mandelbrot)
plt.imshow(np.abs(Mandelbrot))
plt.show()
```
（强烈建议跑一下这段代码，缩小c的范围，同时扩大迭代次数）

性质：
- M is connected
- $M\subset B_2(0)$
- M的边界点叫做 Misiurewicz points，其性质是 $f^{n\circ}(0)$ is pre-periodic, but not periodic  
（$c=i$就是一个 Misiurewicz point，以此为例形象化说明，根据定义，c使Julia set介于连通集和非连通集之间，所以Julia set更像一条线，无限放大这条线，看起来就像分形曲线。与此同时，因为Mandelbrot的稠密和花纹性质，在i周围无限放大，也得到分形曲线）
- Misiurewicz points 这条边界线稠密

**Big Open Conjecture**  
The Mandelbrot set is locally connected, that is, for every $c\in M$ and every open set V with $c\in v$, there exists an open set U such that $c\in U\subset V$ and $U\cap M$ is connected.



## 参考资料
coursera:[Introduction to Complex Analysis](https://www.coursera.org/learn/complex-analysis/)  
