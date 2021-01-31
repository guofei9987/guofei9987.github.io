---
layout: post
title: 【Complex Analysis4】积分
categories:
tags: 5-3-复分析与积分变换
keywords:
description:
order: 92504
---



## 积分的定义
$S_n=\sum f(\xi_k)\Delta z_k$,记为$\int_C f(z)dz$  
$\int_Cf(z)dz=\int_C(u+vi)(dx+idy)=\int_C udx-vdy+i\int_Cvdx+udy$  

### 一个性质

TH:$\mid \int_r f(z) dz\mid\leq \int_r\mid f(z)\mid \mid dz \mid$

In particular, if $\mid f(z)\mid\leq M$, then  
$\mid f(z)dz\mid \leq M L_\gamma$

## 积分路径无关

If f is continuous on a domain D and if f has a primitive F in D, then for any curve $\gamma :[a,b]\to D$ we have that  
$\int_\gamma f(z)dz=F(B)-F(A)$（注，后面这个也就是$F(\gamma(b))-F(\gamma(a))$）
- 积分与路径无关
- 注意一个前提是f在D上存在原函数

### 存在原函数的判定  
（Goursat）在simple connected domain D上解析的函数，一定有原函数。
#### 证明思路
1. （Morera's Theorem）If $f$ is continuous on a simply connected domain D, and if $\int_\gamma f(z)dz=0$ for any triangular curve $\gamma$ in D, then f has a primitive in D.
2. （Cauchy Theorem for Triangles）If $f$ is analytic in D, for any triangle T that fits into D (including its boundary), then  $\int_{\partial T} f(z)dz=0$


#### 判定定理的注意事项
- 一定要在 simple connected domain 上解析。例如$f(z) = \dfrac{1}{z}$ is analytic in the domain  $$D=\mathbb{C}\setminus\{0\}$$，but only have primitive on $\mathbb C \setminus(-\infty,0]$  
- 函数连续，原函数必解析

### Cauchy’s Theorem
Let D be a simply connected domain in C, and let f be analytic in D. Let $\gamma : [a, b] \to D$ be a piecewise smooth, closed curve in D (i.e. $\gamma(b)=\gamma(a)$. Then  
$\int_\gamma f(z)dz = 0$


**TH**  
C是一条闭曲线，$f(z)$在以C为边界的有界闭区域D上解析，那么  
$\int_C f(z)dz=0$  
**推论**  
$f(x)$在单连通区域D内解析，AB两点之间两条路径$L_1,L_2\subset D$，有  
$\int_{C_1}f(z)dz=\int_{C_2}f(x)dz$  

## 柯西积分公式
**TH**  
$f(z)$在简单闭曲线C所围成的区域D内解析，在$D\cup C$上连续，$z_0$是D内任意一点，则  
$f(z_0)=\dfrac{1}{2\pi i}\oint_C\dfrac{f(z)}{z-z_0}dz$  

*证明*，根据积分路径无关的知识，右边的路径可以是一个圆 $z_0+\varepsilon e^{it}$，代入右边可以推导出左边。

注意
- 如果$z_0$不在C 所围成的区域内，就不能用这个公式。（这时，可以考虑整个被积公式解析，进而值可能为0）
- f在C内解析，不然不能用这个定理


**推论1**（平均值公式）  
$f(z)$在$\mid z-z_0\mid<R$内解析，在$\mid z-z_0\mid=R$内连续，那么  
$f(z)=\dfrac{1}{\pi}\int_0^{2\pi}f(z_0+Re^{i\theta})d\theta$  
**推论2**  
$f(z_0)$在由闭曲线$C_1,C_2$围城的二连域内解析，并在$C_1,C_2$上连续，$C_2$在$C_1$内部，$Z_0$为D内一点，则  
$f(z_0)=\dfrac{1}{2\pi i}\oint_{C_1}\dfrac{f(z)}{z-z_0}dz-\dfrac{1}{2\pi i}\oint_{C_2}\dfrac{f(z)}{z-z_0}dz$  

### 定理：解析函数的导数也解析
If f is analytic in an open set U, then $f'$ is also analytic in U.

证明方法：$f'(w)=\dfrac{1}{2\pi i}\int_\gamma\dfrac{f(z)}{(z-w)^2}dz$  
（对$f(w)$求导得到的）  

实际上，$f^{(k)}(w)=\dfrac{k!}{2\pi i}\int_\gamma\dfrac{f(z)}{(z-w)^{k+1}}dz$  
（这也是一个常用结论）
### 推论1：解析函数无限有界，那么一定是常数
Suppose that f is analytic in an open set that contains $\bar B_r(z_0)$, and that |f(z)| ≤ m holds on $\partial B_r(z_0)$ for some constant m. Then for all k ≥ 0,  
$\mid f^{(k)}(z0)\mid ≤ k!m/r^k$  

TH1：可以轻松证明下面的命题：如果 f 在 $\mathbb C$ 上解析且有界，那么f一定是一个常数。  

TH2：$f=u+iv$在$\mathbb C$上解析，如果$\forall z \in \mathbb C, u\leq 0$，那么f是常数。  
证明，构造$g(z)=e^{f(z)}$，对$f(z)$用上面的定理。


### 推论2（代数基本定理）
$p(z)=a_0+a_1z+...+a_nz^n,\exists z_0,p(z_0)=0$

证明（先证明$p(z)=0$有解）
- 假设无解，也就是说，在$\mathbb C$上没有0点，那么$f=1/p$在$\mathbb C$上有界，且解析
- 根据上面的定理，f是常数。矛盾，所以必有零点  

（反复使用多项式除法和上面的定理，证明可以在复数域上进行多项式分解）


### 定理：解析函数的最大值必在边界上
**TH** Let f be analytic in a domain D and suppose there exists a point $z_0 \in D$ such that $\forall z\in D, \mid f(z)\mid \leq |f(z_0)|$. Then f is constant in D.

（联系一下前面有个定理，解析函数在C上有界必为常数）


If D ⊂ C is a bounded domain, and if $f : \bar D \to C$ is continuous in $\bar D$ and analytic in D, then |f| reaches its maximum on ∂D.


## 应用：弧长的计算方法
实分析的方法，先假设$x=\phi(t), y=\psi(t)$，那么$L=\lim\limits_{n\to\infty} \sum\limits_{i=1}^n \sqrt{l_x^2+l_y^2}=\dfrac{\sqrt{(x(t+\Delta t)-x(t))^2+(y(t+\Delta t)-t(t))^2}}{\Delta t}\Delta t=\sqrt{x'^2(t)+y'^2(t)}\Delta t=\int_a^b \sqrt{x'^2(t)+y'^2(t)} dt$  
上面这个式子，恰好是$f=1$时的第一类曲线积分  

复分析方法  
弧是$\gamma :[a,b]\to \mathbb C$  
$L=\sum\limits_{i=0}^n\mid \gamma(t_{i+1})-\gamma(t_i)\mid=\sum\limits_{i=0}^n\dfrac{\mid \gamma(t_{i+1})-\gamma(t_i)\mid}{t_{i+1}-t_i}(t_{i+1}-t_i)=\int_a^b\mid \gamma'(t)\mid dt$  


（两个方法最后的结果其实一样）


我们定义$\mid dr \mid=\mid r'\mid dz$，那么$L=\int_a^b\mid dz \mid=\int_a^b \mid r'\mid dz$
