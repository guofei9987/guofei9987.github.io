---
layout: post
title: 【Real analysis(4)】级数，巴拿赫空间与希尔伯特空间
categories: 
tags: 9实分析
keywords:
description:
---

本文讲解的概念：  
级数  
绝对收敛，条件收敛  
黎曼级数定理（条件收敛的重排）  
收敛性的检验  
lp空间  
巴拿赫空间（Banach Space）  
希尔伯特空间（Hilbert Space）  


## 级数

Def: 级数  
$$\{\sum\limits_{j=1}^\infty x_j\}$$  

`positive series`正项级数：$\forall j ,x_j>0$  
`negetive series`负项级数：$\forall j,x_j<0$  
`alternating series`交错级数  

`deverge series`发散级数：$\sum\limits_{j=1}^\infty x_j$不收敛  
`converge absolutely`绝对收敛：$\sum\limits_{j=1}^\infty \mid x_j \mid$收敛  
`converge conditionally`条件收敛：$\sum\limits_{j=1}^\infty \mid x_j \mid$不收敛，而$\sum\limits_{j=1}^\infty x_j $收敛  


Th： 级数绝对收敛，那么级数收敛  
Th： 收敛级数的和也是收敛级数  

Th： 两个级数绝对收敛，和也绝对收敛  
Th： 两个级数绝对收敛，积也绝对收敛  
(但是两个级数收敛，积不一定收敛)  

### 典型的级数

**power harmonic series** :$x_j=j^{-a}$  

a=1时，是 **harmonic series** ,这个级数发散  
a>1时，级数收敛  

证明思路：$x_j=j^{-a}=\sum\limits_{j=1}^m j^{-a}+\sum\limits_{j=m+1}^{m^2} j^{-a}+\sum\limits_{j=m^2+1}^{m^3} j^{-a}+...$  


## 条件收敛的重排

Th：黎曼级数定理  
一个`条件收敛`的级数$\sum\limits_{j=1}^\infty x_j =s$,对于任意$r\in R$,存在重排函数$\pi(j)$，使得，$\sum\limits_{j=1}^\infty x_{\pi(j)} =r$  
也就是说，`条件收敛` 的级数重排后，可以收敛于任何一个值。  


Th： 那么，哪些`重排函数`不改变`条件收敛`的收敛值呢？  
一个`条件收敛`的级数$\sum\limits_{j=1}^\infty x_j =s$,如果重排函数$\pi$有这种性质，那么$\sum\limits_{j=1}^\infty x_j =s$：$\exists P,\forall j , \pi (j)<=j+P$  


Th: 当然，对于`绝对收敛`的级数来说，不存在重排的问题  
一个`绝对收敛`的级数$\sum\limits_{j=1}^\infty x_j =s$,对于任意的重排函数$\pi(j)$，级数和不变，$\sum\limits_{j=1}^\infty x_{\pi(j)} =s$  

## 收敛性的检验

### 比较判别法

$x_j$`绝对收敛`，如果$\exists N,\forall j>N,\mid y_j\mid<\mid x_j \mid$,那么$y_j$也绝对收敛  

### 比值判别法1

$x_j$`绝对收敛`，如果$\mid \dfrac{y_j}{x_j} \mid$收敛, 那么$y_j$也绝对收敛  

### 比值判别法2

如果$\lim\limits_{n \to \infty} \sup{\mid \dfrac{x_{n+1}}{x_n} \mid} =L <1$, 那么$x_j$绝对收敛  

如果$\lim\limits_{n \to \infty} \inf {\mid \dfrac{x_{n+1}}{x_n} \mid} =L >1$, 那么$x_j$发散  

### 交错级数判别法

**如果** ：  
1. $x_j$是交错级数
2. $\exists N,\forall j>N, \mid x_{j+1} \mid <\mid x_j \mid $  
3. $x_j \to 0$

**那么** ，$\sum\limits_{j=1}^\infty x_j $收敛  

## lp空间

$l_p$空间与$L_p$空间不同，这里研究的是$l_p$空间，注意区别  

Def：$l_p$空间的定义  
$$l_P=\{  x=\{x_j\}_{j=1}^\infty \mid \space \mid \mid x \mid \mid_p<\infty \}$$  

换句话说，$l_p$是一系列无限维向量组成的集合，这些向量的p-范数存在。  


Th：  
如果$1\leq p<p'\leq\infty$, 那么 $l_p \subset l_{p'}$  

Th:   
$l_p$是一个完备的赋范线性空间  

## 巴拿赫空间
Def： 定义巴拿赫空间为，`完备`的`赋范线性空间`  


Th: $l_p$是一个完备的赋范线性空间，也就是巴拿赫空间。  

需要证明这两个命题：  
1. $l_p$空间作为赋范线性空间闭合。也就是说，  
$\forall x,y \in l_p \Rightarrow x+y \in l_p $为真  
2. $l_p$空间完备。也就是说，$l_p$上的柯西序列收敛于$l_p$内某一点。



*（证明略，下面是一些说明）*  

Def：$R^n,Q^n$  
$$R^n =\{x=(x_1,x_2,...x_n) \mid x_j \in R\}$$  
$$Q^n =\{x=(x_1,x_2,...x_n) \mid x_j \in Q\}$$  

显然，$R_0^\infty \subset l_p \subset R^\infty$


Def：$R_p^n$  
$$R_p^n=\{x\in R^n\mid \space \exists \{x_j\} \in Q^n,\ni\mid\mid x-x_j\mid\mid_p \to 0        \}   (p\geq 1)$$  
Th:$\forall p \geq 1,R^n_p=R^n$    
也就是说，有理数集生成的完备集合，就是$R^n$  

<img src='http://www.guofei.site/public/postimg/seriesrealanalysis.jpg'>

## 希尔伯特空间

Def：  
定义希尔伯特空间为：`完备`，且含`內积`的`赋范线性空间`  


下面把希尔伯特空间应用于级数：  


Def： 定义內积  
$x\centerdot y=\sum\limits_{j=1}^\infty x_i \bar y_i ,\space\space  x,y\in l_2$(复数域或实数域)  


p=2这种特殊情况是由`赫德尔不等式`给出的：  
对于$p,q\in[0,+\infty),p^{-1}+q^{-1}=1$  
都有$\mid(x,y)\mid \leq \mid\mid x\mid\mid_p \mid\mid y\mid\mid_q$  
`赫德尔不等式`强调了p=q=2这种情况。  

#### 标准正交基
Def：标准正交基  
$$(e_i,e_j)=\left \{ \begin{array}{ccc}
0&i\neq j\\
1&i=j
\end{array}\right.$$


Th：（Parseval identity)  
$$\{e_j\}_{j=1}^\infty$$是$l_2$上的任意标准正交基，那么$\forall x\in l_2$,都有$x=\sum\limits_{j=1}^\infty y_j e_j$,  
其中系数为$y_j=(x,e_j)$  
并且$$\mid\mid x \mid\mid_2^2 =\sum\limits_{j=1}^\infty \mid y_j \mid^2$$  

**傅里叶变换** 等，与以上定理有关。  

## 幂级数

幂级数的定义：  
$f(x)=\sum\limits_{n=0}^\infty c_n x^n$  

### 幂级数收敛性的判断
定义：  
$L=\overline{\lim\limits_{n\to \infty}}\mid \dfrac{c_{n+1}}{c_n}\mid$  
$R=1/L$是收敛半径  

判断1：
- $\mid x \mid <R$时，绝对收敛
- $\mid x \mid >R$时，不收敛
- $\mid x \mid =R$时，不确定

判断2：
- 如果$x=a$时绝对收敛。那么$\mid x\mid \leq a$时也绝对收敛
- 如果$x=a$时发散。那么$\mid x\mid \geq a$时也发散
