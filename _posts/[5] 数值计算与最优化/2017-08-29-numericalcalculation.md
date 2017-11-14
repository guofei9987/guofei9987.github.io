---
layout: post
title: 【数值计算】若干简介.
categories:
tags: 数值计算与最优化
keywords:
description:
---


## 求解定积分
$\int_a^b f(x)dx$
### 矩形法
the midpoint rule  
用常函数去近似原函数  
$\int_a^b f(x)dx=(b-a)f(\dfrac{a+b}{2})$  
### 梯形法
用一次函数去近似原函数  
$\int_a^b f(x)dx=0.5(b-a)(f(a)+f(b))$  

### Simpson法
[Simpson's rule](https://en.wikipedia.org/wiki/Simpson%27s_rule)  
用二次函数去近似原函数。  

对于任意m点:  
$P(x) = f(a) \tfrac{(x-m)(x-b)}{(a-m)(a-b)} + f(m) \tfrac{(x-a)(x-b)}{(m-a)(m-b)} + f(b) \tfrac{(x-a)(x-m)}{(b-a)(b-m)}$  

取$m=\frac{a+b}{2}$,  
$\int_{a}^{b} P(x) \, dx =\tfrac{b-a}{6}\left[f(a) + 4f\left(\tfrac{a+b}{2}\right)+f(b)\right]$  

### cotes formulas
[Newton–Cotes formulas](https://en.wikipedia.org/wiki/Newton%E2%80%93Cotes_formulas)  

## 牛顿法解方程

原理是这样的：  
问题是要求解$f(x)=0$，  
假设我们已经找到一个接近真实解的近似解$x_k$,  
那么根据泰勒分解，$f(x)\thickapprox f(x_k)+f'(x_k)(x-x_k)$  
$f(x)=0 \Longrightarrow x=x_k-\dfrac{f(x_k)}{f'(x_k)}$，这个$x$更加精确  

根据以上推导，得出一个合理的迭代式$x_{k+1}=x_k-\dfrac{f(x_k)}{f'(x_k)}$


## 欧拉法解微分方程
问题：  
$y'=f(x,y)$  
$y(x_0)=y_0$  

分析：  
如果已经求出近似解 $y(x_k)=y_k$, 那么：  
$y'(x_k)=f(x_k,y_k)$(1)  

近似$y'(x_k) \thickapprox \dfrac{y(x_k+h)-y(x_k)}{h}$(2)  

联立(1)(2), $f(x_k+h)=y(x_k)+hf(x_k,y_k)$  

这种算法虽然 **不精确** ，但很 **简单** ，实现如下：  

### Python实现欧拉法

$y'=y-2x/y$  
$y(0)=1$  

求$y(1)$  

为了画图，用x_list, y_list表示全部遍历过的数据，如果只想求$y(1)$则不必要  

```py
def func(x, y):  # f(x,y)
    return y - 2 * x / y

#欧拉法主函数
def solve_fun(x_0, y_0, x_n, h=0.001):
    if x_n < x_0: h = -h
    x_i = x_0
    y_i = y_0
    x_list = []
    y_list = []
    while x_i < x_n:
        x_list.append(x_i)
        y_list.append(y_i)
        y_i += h * func(x_i, y_i)
        x_i += h
    return x_list, y_list

#画图
import matplotlib.pyplot as plt
x_0 = 0
y_0 = 1
x_n = 1
x_list, y_list = solve_fun(x_0=0, y_0=1, x_n=1, h=0.001)

plt.plot(x_list, y_list, '.')
plt.show()
```

画图如下：  
<img src='http://www.guofei.site/public/postimg/numericalcalculation1.png'>


## 雅克比迭代法求线性方程组

对于方程组：$\sum\limits_{j=1}^n a_{ij}x_j=b_i , (i=1,2,...,n)$  
提取一个未知数，$x_i=\dfrac{1}{a_{ii}}(b_i-\sum\limits_{j=1,j \neq i}^n a_{ij} x_j)$  
迭代公式可以这样：  
$x_i(n+1)=\dfrac{1}{a_{ii}}(b_i-\sum\limits_{j=1,j \neq i}^n a_{ij} x_j(n))$  

当然，这种迭代法有可能不收敛，如果不收敛就不能用这种方法了。  
