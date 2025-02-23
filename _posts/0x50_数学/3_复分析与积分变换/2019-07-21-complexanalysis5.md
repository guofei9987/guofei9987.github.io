---
layout: post
title: 【Complex Analysis5】级数、留数
categories:
tags: 0x53_复变与积分变换
keywords:
description:
order: 92510
---

## 级数
(定义和容易想到的定理就不写了，参考高数中的相关部分)  

**TH1**  
$z_n=x_n+iy_n$，那么  
$\lim\sum\limits_{n=1}^\infty z_n$收敛的 **充要条件** 是$\lim\sum\limits_{n=1}^\infty x_n$和$\lim\sum\limits_{n=1}^\infty y_n$都收敛  
**TH2**  
如果$\lim\sum\limits_{n=1}^\infty \mid z_n\mid$收敛，那么$\lim\sum\limits_{n=1}^\infty z_n$也收敛  

### 复变函数项级数
$S_n(z)=\sum\limits_{n=1}^\infty f_n(z)$  


## 泰勒级数
### power series
power series 实际上就是泰勒级数，我们先研究这个级数本身的性质。  
$\sum\limits_{n=0}^\infty C_n(z-z_0)^n$称为幂级数  
**TH**  
幂级数在$z_1$收敛，那么在圆域$\mid z-z_0\mid<\mid z_1-z_0\mid$内 **绝对收敛**  
**推论**  
幂级数在$z_2$发散，那么在圆域$\mid z-z_0\mid>\mid z_2-z_0\mid$内发散  
TH  
$\exists R \in [0,+\infty]$, such that:  
- $\sum\limits_{n=0}^\infty C_n(z-z_0)^n$ converges  absolutely in $$\{\mid z-z_0 \mid <R\}$$
- diverges in $$\{\mid z-z_0 \mid >R\}$$
- convergence is uniform in $$\{\mid z-z_0 \mid <r\}$$ for each $r\leq R$


收敛域的判别  
比例法则，根式法则（和微积分部分的一样）  
有些判断不了，例如 $\sum \dfrac{(-1)^k}{2^k}z^{2k}$ 可以看成奇数位为0的序列，就无法使用这两个法则来判断了，但下面这个法则一定可以：  
$R=\dfrac{1}{\lim\limits_{k\to\infty}\sup\sqrt[k]{\mid a_k\mid}}$


**TH**  
如果函数$f(z)$在区域$D$内解析，$z_0$为$D$内一点，$R$为$z_0$到D的边界上各点的最短距离，则当$\mid z-z_0\mid<R$时，$f(z)$可展为幂级数  
$f(z)=\sum\limits_{n=0}^\infty C_n(z-z_0)^n$，  
其中$C_n=\dfrac{1}{n!}f^{(n)}(z_0)$  


**函数在圆盘内解析的充分必要条件是它在这一点的邻域内可以展开为幂级数**  
**如果函数在一个圆盘内解析，那么这个圆盘内各点的值完全取决于$f^{(n)}(z_0)$**



### 黎曼猜想
#### zeta function 定义和性质
for $s\in \mathbb C,\mathrm {Re} s >1$, the zeta function is defined as $\zeta (s)=\sum\limits_{n=1}^\infty \dfrac{1}{n^s}$  

对于s为实数的情况，我们已经讨论过：
- 实数域上 converges for $s>1$
    - $\sum\limits_{n=1}^\infty \dfrac{1}{n^s} \leq 1+\int_1^\infty \dfrac{1}{x^s}dx=\dfrac{s}{s-1}$
    - $\sum\limits_{n=1}^\infty \dfrac{1}{n^s} \geq \int_1^\infty \dfrac{1}{x^s}dx=\dfrac{1}{s-1}$
- 实数域上 diverges for $s=1$.  
$\sum\limits_{n=1}^\infty \dfrac{1}{n^s}=1+1/2+	\underbrace{1/3+1/4}_{>1/2}+\underbrace{1/5+...+1/8}_{>1/2}+\underbrace{1/9+1/16}_{>1/2}+...$
- 在复数域$\mathrm{Re} s\geq r$ for any $r>1$上  
$$\zeta (s)
= \sum\limits_{n=1}^\infty \mid \dfrac{1}{n^s} \mid
= \sum\limits_{n=1}^\infty \dfrac{1}{\mid n^s\mid}
= \sum\limits_{n=1}^\infty \dfrac{1}{\mid \exp(s \ln n) \mid}
= \sum\limits_{n=1}^\infty \dfrac{1}{\exp(\mathrm{Re} s \ln n)}
= \sum\limits_{n=1}^\infty \dfrac{1}{n^{\mathrm{Re} s }}$$  
所以级数是收敛的。  
进一步的，the convergence is uniform in $\mathrm{Re} s\geq r$ for any $r>1$，所以$\zeta (s)$ 在这个区域内也是解析的



**实际上**， zeta function 在 $$\mathbb C\setminus \{0\}$$ 上解析，并且$\lim\limits_{s\to 1} \zeta (s) =\infty$

#### 黎曼猜想
下面3条已经证明
1. 满足 $\zeta(s)=0$ 且在 $0\leq \mathrm{Re} s\leq 1$ 之外的 s 仅有负偶数 $-2, -4, -6, ...$。
2. 满足 $\zeta(s)=0$ 的s，一定不满足$\mathrm{Re} s=1$
3. 满足 $\zeta(s)=0$ 的s，一定不满足$\mathrm{Re} s=0$（第二条的推论）

**黎曼猜想**  
in $$\{0< \mathrm{Re} s< 1\}$$,if $\zeta(s)=0$,then $\mathrm {Re} s=1/2$

七个 “Millennium Prize Problems” 之一（其中庞加莱猜想被证明了，其它都还没）

#### 素数
$\sum\limits_{p\in prime} 1/p$ 发散

prime counting function
:   $\pi(x)$ = number of primes less than or equal to x.  
- 我们找不到这个函数的显式表达
- 但可以分析一下渐进情况

**Theorem (Prime Number Theorem)**  
$\lim\limits_{x\to\infty}\dfrac{\pi(x)}{x/\ln x}=1$


#### zeta function 与 prime numbers 的关系

$\zeta(s)=\prod_p\dfrac{1}{1-p^{-s}}$  

证明如下：
![](/pictures_for_blog/tmp/tmp1.png)

推论
- for $s.real>1, \zeta(s)\not=0$
- 证明 Prime Number Theorem 的关键是证明for $s.real=1, \zeta(s)\not=0$

## 洛朗级数
（Laurent）  
$f(z)$在圆环域$R_1<\mid z-z_0\mid <R_2$内处处解析，则$f(z)$一定可以表示为  
$f(z)=\sum\limits_{n=-\infty}^\infty C_n(z-z_0)^n$  
其中，$C_n=\dfrac{1}{2\pi i}\oint_C\dfrac{f(\xi)}{(\xi-z_0)^{n+1}}d\xi(n=0,\pm1,\pm 2,...)$  
C是圆环域内绕$r_0$的任一简单闭曲线  

语言解释：
- 泰勒级数是在一个圆盘内解析，洛朗级数是在一个圆环内解析
- 当然，如果在圆盘内解析，也可以展开为洛朗级数，化简后就得到泰勒级数。因此，可以说洛朗级数是泰勒级数的推广。

### isolated singularity
#### 奇点的基本概念
孤立奇点
:    $f(z)$在$z_0$处不解析，但在$0<\mid z-z_0\mid<\delta$内处处解析，称$z_0$为$f(z)$的孤立奇点  


把$f(z)$展开为 **洛朗级数** $f(z)=\sum\limits_{n=-\infty}^\infty C_n(z-z_0)^n$,  
发现$\sum\limits_{n=0}^{+\infty}$一定解析，所以奇异性质就完全体现在$\sum\limits_{n=-\infty}^{-1}$部分  
据此，可以把孤立奇点分为以下三类：
1. **可去奇点** 对所有的$n<0$，都有$C_n=0$，叫做$z_0$是$f(z)$的 **可去奇点**  
2. **极点** 如果只有有限个$n<0$，使得$C_n\neq 0$,叫做$z_0$是$f(z)$的 **极点**  。假如使得$C_n\neq 0$的最小的n记为m，称为$z_0$是$f(z)$的 **m阶极点**。称1阶极点为 **简单极点**
3. **本性极点** 如果有无限个$n<0$,使得$c_n\neq 0$，那么称为$z_0$是$f(z)$的本性奇点  

（英文翻译为 removable，a pole(simple pole)， essential）

#### 奇点的性质
1. 设$z_0$是$f(z)$的一个孤立奇点，则$z_0$是 **可去奇点** 的 **充分必要条件** 是$f(z)$在$z_0$的一个邻域内有界
2. 设$z_0$是$f(z)$的一个孤立奇点，则$z_0$是 **极点** 的 **充分必要条件** 是$\mid f(z)\mid\to \infty$ as $z\to z_0$
3. Suppose that $z_0$ is an essential singularity of f. Then for every $w_0 \in \mathbb C$ there exists a sequence $z_n$ with $z_n \to z_0$ such that $f(z_n) \to w_0$ as $n \to \infty$（本性极点，存在一个子列，趋近任何复数）  
有个更严格的定理(Picard) Suppose that $z_0$ is an essential singularity of f. Then for every $w_0 \in \mathbb C $ with at most one exception there exists a sequence $z_n$ with $z_n \to z_0$ such that $f(z_n) = w_0$.（本性极点，存在一个子列，趋近任何剔掉一个数的复数）

#### 奇点的判断

- 设函数$f(z)$在$0<\mid z-z_0\mid<\delta$内解析，那么，$z_0$是$f(z)$的可去奇点的 **充分必要条件** 是存在极限$\lim\limits_{z\to z_0} f(z)=C_0$  
（进一步，把这个极限填回去后，就在整个圆盘上解析了）
- 设函数$f(z)$在$0<\mid z-z_0\mid<\delta$内解析，那么$z_0$是$f(z)$的极点的 **充分必要条件** 是$\lim\limits_{z\to z_0}f(z)=\infty$  
- $z_0$是$f(z)$的m阶极点的 **充分必要条件** 是$\lim\limits_{z\to z_0}(z-z_0)^mf(z)=C_{-m}$,其中$m$是正整数，$C_{-m}\neq 0$  
- 设函数$f(z)$在$0<\mid z-z_0\mid<\delta$内解析，那么$z_0$是$f(z)$的本性奇点的 **充分必要条件** 是$\lim\limits_{z\to z_0}f(z)$不存在（有限或无限极限都不存在）  


### 留数(Residue)
$z_0$是$f(z)$的 **孤立奇点** ，把$f(z)$在$z_0$处的洛朗展开式中的$C_{-1}$部分称为$f(z)$在$z_0$处的留数，记做$Res[f(z),z_0]$  
显然$Res[f(z),z_0]=C_{-1}=\dfrac{1}{2\pi i}\oint_C f(z)dz$  


为什么我们单独研究留数呢？  
我们把洛朗级数展开式的两边都沿着闭合的圆做积分。
$\int_c f(z)=\sum\limits_{n=-\infty}^\infty \int_c C_n(z-z_0)^n$  
看右边，当$n\not=-1$时，都为0. $n=-1$时，$\int_c(z-z_0)^n dz=2\pi i$  
因此，$\int_c f(z)dz=2\pi i C_{-1}$

#### 留数定理

C是逆时针的闭曲线，围成一个区域D. f在D上解析，除了这些奇点之外$z_1,...,z_n \in D$，那么  
$\int_c f(z) dz=2\pi i \sum\limits_{k=1}^n \text {Res}(f,z_k)$  

#### 求留数
写下洛朗展开，发现以下规律：
- removable，$\text{Res}(f,z)=0$
- simple pole, $\text{Res} f(z)=a_{-1}=\lim\limits_{z\to z_0}(z-z_0)f(z)$
- poles of order n, $\text{Res}(f,z_0)=a_{-1}=\dfrac{1}{(n-1)!}\lim\limits_{z\to z_0}\dfrac{d^{n-1}}{dz^{n-1}}((z-z_0)^nf(z))$ （这个方法真好，不用求积分了）


## 参考资料
李红：《复变函数与积分变换》高等教育出版社  
“十五”国家规划教材《复变函数与积分变换》高等教育出版社  
钟玉泉：《复变函数论》高等教育出版社
