---
layout: post
title: 【Complex Analysis1】极限、微分、解析
categories:
tags: 0x53_复变与积分变换
keywords:
description:
order: 92501
---

## 收敛序列

Julia sets for quadratic polynomials
Mandelbrot set

复数序列收敛的定义与数学分析中的一致：  
A sequence $\{ s_n \}$ of complex numbers converges to $s \in \mathbb C$ if for every $\varepsilon>0$ there exists $N\geq 1$ such that $\mid s_n - s \mid <\varepsilon$ for all $n\geq N$.  
in this case we write $\lim\limits_{n\to\infty} s_n =s$


复数序列收敛的案例和性质也与数学分析中的一致（省略）  
收敛序列的加减乘除性质与数学分析中的一致（省略）

定理
- $\lim\limits_{n\to\infty} s_n=0 \Longleftrightarrow \lim\limits_{n\to\infty} \mid s_n \mid=0$
- $\lim\limits_{n\to\infty} x_n+iy_n=x+iy \Longleftrightarrow \lim\limits_{n\to\infty} x_n =x,\lim\limits_{n\to\infty} y_n =y$
- 夹逼准则
- 单调有界

## 极限
**定义**  
$\forall \varepsilon>0,\exists \delta(\varepsilon)$使得$\forall z,0<\mid z-z_0\mid<\delta$，都满足$\mid f(z) -A\mid<\varepsilon$  
A就是$f(z)$在$z\to z_0$的极限，记做$\lim\limits_{z\to z_0}f(z)=A$  


**TH**  
若$\lim\limits_{z\to z_0}f(z)=A$，那么$\lim\limits_{z\to z_0}\mid f(z)\mid=\mid A\mid$  





**补充定义**  
$\lim\limits_{z\to \infty}f(z)=A,\lim\limits_{z\to z_0}f(z)=\infty,\lim\limits_{z\to \infty}f(z)=\infty$  
沿用原定义，并且注意取到无穷大的所有邻域，而不是沿某个方向趋近。  


**TH**  
若$\lim\limits_{z\to z_0}f(z)=A,\lim\limits_{z\to z_0}g(z)=B$  
那么，  
$\lim\limits_{z\to z_0} [f(z) \pm g(z)]=A\pm B$  
$\lim\limits_{z\to z_0} [f(z) \cdot g(z)]=A\cdot B$  
$\lim\limits_{z\to z_0} [f(z) / g(z)]=A/ B ,(B\neq 0)$  

## 连续
$\lim\limits_{z\to z_0}f(z)=f(z_0)$叫做在$z_0$ **连续**  
$f(z)$在一个区域D内处处连续，叫做在D内连续  

**TH**  
连续函数的和、差、积、商、复合都连续  

## 微分
$\lim\limits_{z\to z_0}\dfrac{f(z)-f(z_0)}{z-z_0}$存在，则称为 **可导**，记为$f'(z_0)$  


**TH**  
$[f(z)\pm g(z)]'=f'(z)\pm g'(z)$  
$[f(z)\cdot g(z)]'=f'(z)\cdot g'(z)$  
$[\dfrac{f(z)}{g(z)}]'=\dfrac{f'(z)g(z)-f(z)g'(z)}{g^2(z)}$  
$\dfrac{d f(g(z))}{dz}=f'(g(z))g'(z)$  

**TH**  
前提$f(z)=u(x,y)+iv(x,y)$在$z_0$有聚点  
$f(z)$有极限的 **充分必要条件** 是$u,v$有极限  
$f(z)$有连续的 **充分必要条件** 是$u,v$连续  
$f(z)$可导的 **充分必要条件** 是$u(x,y),v(x,y)$可导，并且$\dfrac{\partial u}{\partial x}=\dfrac{\partial v}{\partial y},\dfrac{\partial u}{\partial y}=-\dfrac{\partial v}{\partial x}$（Cauchy-Riemann Equations, also $f'(z_0)=f_x(z_0)=-if_y(z_0)$）（两个方向的方向导数）  


### 常见微分
$f(z)=z^n,f'(z)=nz^{n-1}$  
...


## 解析
解析定义为在邻域内处处可导
1. 可导未必解析
2. 区域内可导$\Longleftrightarrow$解析
3. 不存在这种情况：只在一点解析，而在其邻域内都不解析


根据上文可导的充要条件和解析的定义，解析的充要条件是：  
在区域D内，$u(x,y),v(x,y)$可导，并且其一阶偏导数连续，并且$\dfrac{\partial u}{\partial x}=\dfrac{\partial v}{\partial y},\dfrac{\partial u}{\partial y}=-\dfrac{\partial v}{\partial x}$  


调和函数
:    如果实变函数$h(x,y)$在区域D内具有连续的二阶偏导数，并且满足 **拉普拉斯方程** $h_{xx}(x,y)+h_{yy}(x,y)=0$  
称$h(x,y)$是D内的 **调和函数**。  


**TH**  
如果$f(x,y)=u(x,y)+iv(x,y)$在D内解析，那么$u(x,y),v(x,y)$都是 **调和函数**。  

### 解析的例子
- 多项式函数一定解析
- 有理函数（两多项式函数的商）在定义域内解析
- $f(z)=Re z,f(z)=Im z$都处处不解析
- $f(z)=\mid z\mid$在非0处不可导，在0处可导。所以处处不解析。


### 解析延拓
**指数函数**  
$e^{x+iy}=e^x(\cos y+i\sin y)$  
性质($z=x+iy$)
- $\mid e^z \mid =e^x$
- $\arg e^z = y$
- $e^{z+2\pi i}=e^z$
- $e^{z+w}=e^z e^w$
- $\dfrac{d e^z}{dz}=e^z$
- $e^{\bar z}=\bar {e^z}$
- $e^z=1\Longleftrightarrow z=2\pi ik$
**对数函数**  
$\ln z=\ln \mid z\mid +i \arg z=Ln \mid z\mid +i Arg z +2k\pi$  
也可以记为:  
$\ln z=Ln \mid z\mid +iArg z$  
$\ln z=Ln z+ 2k\pi i$  
性质
- $Ln z^n \neq n Ln z$
- $Ln z$在$\mathbb C \setminus (-\infty,0]$上连续，也在这个区间上解析





**幂函数**  
$z^a=e^{a Ln z}=e^{a\ln z}e^{2k\pi ia}$  
1. 当$a$是整数时，只有1中可能取值
2. 当$a$是有理数$q/p$时，有p种可能值
3. 当$a$是无理数或复数时，有无穷多个值


($2^{\sqrt 2}$有1个实数值和无穷个复数值)


**三角函数**  
$e^{ix}=\cos x+i\sin x,e^{-ix}=\cos x-i\sin x$,可以得到  
$\sin x=\dfrac{e^{ix}-e^{-ix}}{2i},\cos x=\dfrac{e^{ix}+e^{-ix}}{2}$  
性质
- $\cos(-z)=\cos z, \sin(-z)=-\sin z$
- $\cos(z+w)=\cos z \cos w- \sin z \sin w, \sin(z+w)=\sin z \cos w+\cos z \sin w$
- $\cos(z+2\pi)=\cos z,sin(z+2\pi)=\sin z$
- $\sin^2 z+\cos^2 z=1$
- $\sin(z+\pi/2)=\cos z$
- $\sin z=0\Longleftrightarrow z=k\pi, \cos z=0 \Longleftrightarrow z=\pi/2+k\pi$
- $(\sin z)'=\cos z, (\cos z)'=-\sin z$

### 解析函数的性质
#### TH1
if f is analytic on a domain D, and if $f'(z)=0 \forall z\in D$, then f is constant in $D$  
证明过程 [在这](https://www.coursera.org/learn/complex-analysis/lecture/EQY8B/first-properties-of-analytic-functions)  
推论, Suppose that $f=u+iv$ is analytic in a domain D.：
- if $u$ is constant, then f is constant
- if $u$ is constant, then f is constant
- if $\mid f \mid$ is constant, then f is constant  
（证明过程用到解析的充要条件）


#### TH2
Suppose that $f : U \to C$ is an **analytic** function and there exists a continuous function $g : D \to U$ from some domain $D \subset C$ into $U$ such that $f(g(z)) = z$ for all $z \in D$. Then g is **analytic** in D, and $f'(z)=\dfrac{1}{f'(g(z))},  z\in D$



## 参考资料
coursera:[Introduction to Complex Analysis](https://www.coursera.org/learn/complex-analysis/)  
李红：《复变函数与积分变换》高等教育出版社  
“十五”国家规划教材《复变函数与积分变换》高等教育出版社  
钟玉泉：《复变函数论》高等教育出版社  
