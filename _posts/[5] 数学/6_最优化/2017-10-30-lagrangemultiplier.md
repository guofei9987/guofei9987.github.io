---
layout: post
title: 【约束非线性优化】拉格朗日法与KKT
categories:
tags: 5-6-最优化
keywords:
description:
order: 7210
---

拉格朗日乘子法（Lagrange Multiplier)是解决有约束条件的优化问题的重要方法  


## 问题
回忆非线性最优化的问题表达形式
### 无约束优化问题
$\min f(x)$  
[另一篇文章](http://www.guofei.site/2018/05/26/nonlinearprogramming.html)中给出了几种方法，分别是对一维问题的搜索法、梯度下降法（和变种）、牛顿法（和变种）  


### 等式约束优化问题
$\min f(x)$,   
s.t. $h_i(x) = 0; i =1, ..., n $  

用拉格朗日乘子法解决（本文内容）  

### 不等式约束优化问题

$\min f(x)$,   
s.t. $g_i(x) <= 0; i =1, ..., n$  
$h_i(x) = 0; i =1, ..., n $  

常用KKT条件（本文内容）

## 拉格朗日乘子法
### 一个看似可行的方案

考察这样的问题：  
目标函数$f(x)=f(x_1,x_2,...x_{m+p})$  
约束条件:$$\left \{ \begin{array}{ccc}
g_1(x)=g_1(x_1,x_2,...x_{m+p})\\
.........\\
g_p(x)=g_p(x_1,x_2,...x_{m+p})\\
\end{array}\right.$$  


当然要求$$rank \left [ \begin{array}{ccc}
\dfrac{\partial g_1}{\partial x_1}&...&\dfrac{\partial g_1}{\partial x_{m+p}}\\
...&.....&...\\
\dfrac{\partial g_p}{\partial x_1}&...&\dfrac{\partial g_p}{\partial x_{m+p}}\\
\end{array}\right]=p$$  

移动变量位置，使得$$rank \left [ \begin{array}{ccc}
\dfrac{\partial g_1}{\partial x_1}&...&\dfrac{\partial g_1}{\partial x_p}\\
...&.....&...\\
\dfrac{\partial g_p}{\partial x_1}&...&\dfrac{\partial g_p}{\partial x_p}\\
\end{array}\right]=p$$  


那么，可以解出$$\left \{ \begin{array}{ccc}
x_{m+1}=\psi_1 (x_1,x_2,...x_m)\\
...\\
x_{m+p}=\psi_p (x_1,x_2,...x_m)\\
\end{array}\right.$$  

带入目标函数，得到  
$\phi((x_1,...,x_m)=f(x_1,...,x_m,\psi_1 (x_1,x_2,...x_m),...,\psi_p (x_1,x_2,...x_m))$(1-1)  
这就转化为无约束最优化问题。  


**然而，显示的解出约束变量几乎是不可能的**  

### 拉格朗日乘子法的内容

引入辅助函数  
$F(x,\lambda)=f(x)+\sum\limits_{r=1}^p \lambda_r g_r(x)$  
其中，$x=(x_1,...x_{m+p})$  


如果a是极值，那么存在$\lambda$，使得$(a,\lambda)$是$F(x,\lambda)$的临界点  
也就是说$$\left \{ \begin{array}{l}
\dfrac{\partial F}{\partial x_k}=0\\
\dfrac{\partial F}{\partial \lambda_r}=g_r=0\\
\end{array}\right.$$  

### 拉格朗日乘子法的证明


#### 必要条件

用到(1-1)式  
$\phi((x_1,...,x_m)=f(x_1,...,x_m,\psi_1 (x_1,x_2,...x_m),...,\psi_p (x_1,x_2,...x_m))$在a取临界点  
$g_r(x_1,...,x_m,\psi_1 (x_1,x_2,...x_m),...,\psi_p (x_1,x_2,...x_m))=0$是恒等式  


上式分别取偏导数，分别得到甲式和乙式。乙式与$\lambda$线性组合加到甲式上。(略)  


得到：  
$\dfrac{\partial f}{\partial x_i}+\sum\limits_{r=1}^p \lambda_r \dfrac{\partial g_r}{\partial x_i}+\sum\limits_{j=1}^p(\dfrac{\partial f}{\partial x_{m+j}}+\sum\limits_{r=1}^p\lambda_r \dfrac{\partial g_r}{\partial x_{m+j}})\dfrac{\partial \psi_j}{\partial x_i}=0$(1-2)  


选择$\lambda$,可以使得  
$\dfrac{\partial f}{\partial x_{m+j}}+\sum\limits_{r=1}^p\lambda_r \dfrac{\partial g_r}{\partial x_{m+j}}=0$(1-3)  
带回(1-2)，得到：  
$\dfrac{\partial f}{\partial x_i}+\sum\limits_{r=1}^p \lambda_r \dfrac{\partial g_r}{\partial x_i}=0$(1-4)  

(1-3)与(1-4)就是拉格朗日条件。  

#### 充分条件
$a+h,a$在可行域上M，$g(a+h)-g(a)=0$二阶展开，带入$f(a+h)-f(a)$后，可以找到取极值的条件。  

### Lagrange对偶函数

从上面知道，对于优化问题：  
$\min f(x)$,   
s.t. $g_i(x) <= 0; i =1, ..., n$  
$h_i(x) = 0; i =1, ..., n $  


对应的Lagrange函数是$L(x,\lambda,v)=f(x)+\sum\limits_{i=1}^m\lambda_i g_i(x)+\sum\limits_{i=1}^p v_ih_i(x)$  


那么Lagrange对偶函数是$g(\lambda,v)=\inf\limits_x L(x,\lambda,v)$  

### Lagrange对偶问题
$\max g(\lambda,v)$  
s.t.$\lambda \geq 0$  

#### 性质1
即使原问题不是凸的，对偶函数也是凹函数

#### 性质2
$\forall \lambda\geq 0,v$有$g(\lambda,v)\leq p^* $  
（其中，$p^* $是原问题的最优值）  

进一步说，如果Lagrange 对偶问题的最优解是 $d^* $，那么有$d^* \leq p^* $  
（称为 **弱对偶性** ）
#### 性质3
如果$d^* = p^* $称为 **强对偶性**  

如果强对偶性成立，问题就更容易解决。  
如果原问题是凸优化问题，且满足 slater 条件，那么强对偶性成立。  


## KKT条件
$\min f(x)$,   
s.t. $$\begin{array}{l}
h_j(x) = 0; j =1, ..., p\\
g_i(x) \leq 0; k =1, ..., q\end{array}$$  


定义拉格朗日函数  $L(X,\lambda,u)=f(X)+\sum\limits_{j=1}^p\lambda_jh_j(X)+\sum\limits_{k=1}^q u_kg_k(X)$  


KKT条件  
$$\begin{array}{lcr}
\dfrac{\partial L}{\partial X}\mid_{X=X^* }=0&&(1)\\
\lambda_j\neq0,&j=1,2,...,p&(2)\\
u_k\geq ,0&k=1,2,...q&(3)\\
u_kg(X^* )=0,&k=1,2,...q&(4)\\
h_j(X^* )=0,&j=1,2,...,p&(5)\\
g_k(X^* )\leq 0&k=1,2,...,q&(6)
\end{array}$$


KKT条件的解释  
(1)是对拉格朗日函数取极值时候带来的一个必要条件，  
(2)是拉格朗日系数约束（同等式情况），  
(3)是不等式约束情况，保证L(x,λ,u)<=f(x)  
(4)是互补松弛条件，  
(5)、(6)是原约束条件。  
**KKT条件是最优解的必要条件，当原问题是凸问题时，KKT条件也是充分条件**  


## 罚函数法
### 外点法
对于原问题：  
$\min f(x)$,   
s.t. $$\begin{array}{l}
h_j(x) = 0; j =1, ..., p\\
g_i(x) \leq 0; k =1, ..., q\end{array}$$  


转化为
$F(x)=f(x)+\sigma P(x)$  
其中，罚函数$P(x)=\sum\limits_{j=1}^p \mid h_j(x) \mid^\beta+\sum\limits_{k=1}^q[max(0,-g_k(x))]^\alpha$  
其中$\alpha, \beta>0$，通常$\alpha=\beta=2$  
### 内点法
**适用于只有不等式约束的问题**  
$\min f(x)$  
s.t. $g_i(x)\geq 0 , i=1,2,...,m$  


定义状态函数$G(x,r)=f(x)+rB(x)$  
其中，x接近D的边界时，$B(x)\to +\infty$  
通常形式是$B(x)=\sum\limits_{i=1}^m \dfrac{1}{g_i(x)},B(x)=-\sum\limits_{i=1}^m \log g_i(x)$  
r是一个很小的正数，便可以保证当x接近D边界$G(x,r)\to +\infty$，当x在D内$G(x,r) \thickapprox f(x)$  


问题转化为求解$\min G(x,r)$

## 参考资料
施光燕：《最优化方法》，高等教育出版社  
龚纯：《Matlab最优化计算》，电子工业出版社  
David R. Anderson ：《数据、模型与决策--管理科学篇》，机械工业出版社  
https://blog.csdn.net/johnnyconstantine/article/details/46335763  
http://www.jianshu.com/p/96db9a1d16e9  
http://www.cnblogs.com/zhangchaoyang/articles/2726873.html  
