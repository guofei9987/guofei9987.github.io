---
layout: post
title: 多元微积分
categories:
tags: 5-1-代数与分析
keywords:
description:
order: 92301
---


## 常用三角函数公式

积化和差公式
$$\sin \alpha \cos \beta  =\frac{1}{2}[\sin (\alpha+\beta)+\sin(\alpha-\beta)] \\[7pt]
\cos \alpha \sin \beta  =\frac{1}{2}[\sin (\alpha+\beta)-\sin(\alpha-\beta)]  \\[7pt]
\cos \alpha \cos \beta  =\frac{1}{2}[\cos (\alpha+\beta)+\cos(\alpha-\beta)]  \\[7pt]
\sin \alpha \sin \beta  =-\frac{1}{2}[\cos (\alpha+\beta)-\cos(\alpha-\beta)]$$

和差化积公式
$$
\sin\alpha+\sin\beta  =2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}  \\[7pt]
\sin\alpha-\sin\beta  =2\cos\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}  \\[7pt]
\cos\alpha+\cos\beta  =2\cos\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}  \\[7pt]
\cos\alpha-\cos\beta  =-2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2} \\[7pt]
\tan\alpha+\tan\beta  =\frac{\sin (\alpha+\beta)}{\cos\alpha\cdot\cos \beta}
$$

归一化公式
$$
\sin^2 x+\cos^2x   =1 \\[7pt]
\sec^2 x-\tan^2x   =1 \\[7pt]
\cosh^2x-\sinh^2x  =1
$$


倍(半)角公式，降(升)幂公式
$$
\sin^2x  =\frac{1}{2}(1-\cos 2x) \\[7pt]
\cos^2x  =\frac{1}{2}(1+\cos 2x)  \\[7pt]
\tan^2x  =\frac{1-\cos 2x}{1+\cos 2x} \\[7pt]
\sin x   =2\sin\frac{x}{2}\cos\frac{x}{2}  \\[7pt]
\cos x   =2\cos^2\frac{x}{2}-1=1-2\sin^2\frac{x}{2}=\cos^2\frac{x}{2}-\sin^2\frac{x}{2} \\[7pt]
\tan x   =\frac{2\tan(x/2)}{1-\tan^2(x/2)}$$


万能公式
令$ u=\tan\dfrac{x}{2} $则
$$\sin x=\frac{2u}{1+u^2} \\[7pt]
\cos x=\frac{1-u^2}{1+u^2}$$




## 基本求导公式

$$
(C)'=0 \\
( x^{\mu})'=\mu x^{\mu-1} \\
( \sin x)'=\cos x \\
( \cos x)'=-\sin x \\
( \tan x)'=\sec^2 x \\
( \cot x)'=-\csc^2 x \\
( \sec x)'=\sec x\cdot\tan x \\
( \csc x)'=-\csc x\cdot\tan x \\
( a^x)'=a^x\ln a\ (a>0,a\neq1) \\
( \log_{a}x)'=\frac{1}{x\cdot\ln a}\ (a>0,a\neq1) \\
( \arcsin x)'=\frac{1}{\sqrt{1-x^2}} \\
( \arccos x)'=-\frac{1}{\sqrt{1-x^2}} \\
( \arctan x)'=\frac{1}{1+x^2} \\
( \mathrm{arccot}\, x)'=-\frac{1}{1+x^2} \\
$$


## 不定积分求解


$$
\int k \,\mathrm{d}x=kx+C  \\[7pt]
\int x^\mu\,\mathrm{d}x=\frac{x^{\mu+1}}{\mu+1}+C\ (\mu\neq-1) \\[7pt]
\int \frac{1}{x}\,\mathrm{d}x=\ln|x|+C  \\[7pt]
\int\frac{\mathrm{d}x}{1+x^2}=\arctan x+C   \\[7pt]
\int\frac{\mathrm{d}x}{\sqrt{1-x^2}}=\arcsin x+C_1=-\arccos x+C_2    \\[7pt]
\int \sin x\,\mathrm{d}x=-\cos x+C                                   \\[7pt]
\int\cos x \,\mathrm{d}x=\sin x +C                                   \\[7pt]
\int\tan x\,\mathrm{d}x=-\ln |\cos x|+C                              \\[7pt]
\int\cot x\,\mathrm{d}x=\ln |\sin x|+C                               \\[7pt]
\int\csc x\,\mathrm{d}x=\int\frac{1}{\sin{x}}\,\mathrm{d}x=\frac{1}{2}
\ln{\mid\frac{1-\cos{x}}{1+\cos{x}}\mid}+C=\ln{\mid\tan{\frac{x}{2}}\mid}+C=\ln{\mid\csc{x}-\cot{x}\mid}+C \\[7pt]
\int\sec x\,\mathrm{d}x=\int\frac{1}{\cos{x}}\,\mathrm{d}x=\frac{1}{2}
\ln{\mid\frac{1+\sin{x}}{1-\sin{x}}\mid}+C=\ln{\mid\sec{x}+\tan{x}\mid}+C     \\[7pt]
\int\sec^2 x\,\mathrm{d}x=\tan x +C                                  \\[7pt]
\int \csc^2 x\,\mathrm{d}x=-\cot x +C                                \\[7pt]
\int \sec x\cdot\tan x \,\mathrm{d}x=\sec x+C                        \\[7pt]
\int\csc x \cdot\cot x \,\mathrm{d}x=-\csc x+C                       \\[7pt]
\int \mathrm{e}^x \,\mathrm{d}x=\mathrm{e}^x+C                       \\[7pt]
\int a^x\,\mathrm{d}x=\frac{a^x}{\ln a}+C                            \\[7pt]
\int \sinh x\,\mathrm{d}x=\cosh x+C                                  \\[7pt]
\int \cosh x\,\mathrm{d}x=\sinh x+C                                  \\[7pt]
\int \frac{1}{a^2+x^2}\,\mathrm{d}x=\frac{1}{a}\arctan\frac{x}{a}+C  \\[7pt]
\int \frac{1}{a^2-x^2}\,\mathrm{d}x=\frac{1}{2a}\ln \mid\frac{a+x}{a-x}\mid+C                                     \\[7pt]
\int \frac{1}{\sqrt{a^2-x^2}}\,\mathrm{d}x=\arcsin\frac{x}{a}+C      \\[7pt]
\int \frac{1}{\sqrt{x^2\pm a^2}}\,\mathrm{d}x=\ln \mid x+\sqrt{x^2\pm a^2}\mid+C
$$

### 第一类换元法


三角函数之积的积分
- 一般地,对于$ \sin^{2k+1}x\cos^n x $ 或 $ \sin^n x \cos^{2k+1}x $ (其中$ k\in\mathbb{N} $)型函数的积分,总可依次作变换 $ u=\cos x $ 或 $ u=\sin x $ ,从而求得结果
- 一般地,对于$ \sin^{2k}x\cos^{2l}x $ 或 (其中$ k,l\in \mathbb{N} $)型函数的积分,总是利用降幂公式$ \sin^2=\dfrac{1}{2}(1-\cos 2x), \cos^2=\dfrac{1}{2}(1+\cos 2x) $化成$ \cos 2x $的多项式 ,从而求得结果
- 一般地,对于$ \tan^{n}x\sec^{2k} x $ 或$ \tan^{2k-1} x \sec^{n}x $ (其中$ n,k\in\mathbb{N}_{+} $)型函数的积分,总可依次作变换 $ u=\tan x $或$ u=\sec x $ ,从而求得结果

常见的凑微分类型  
$$
\int {f( ax + b){\rm{d}}x = }\frac{1}{a}\int {f(ax+b){\mathrm{d}}(ax + b)\;(a \neq 0)}                                                              \\[7pt]
\int {f(a{x^{m + 1}} + b){x^m}{\rm{d}}x} = \frac{1}{a(m + 1)}\int {f(a{x^{m + 1}} + b){\rm{d}}(a{x^{m + 1}} + b)}                                 \\[7pt]
\int {f\left( \frac{1}{x}\right) \frac{\rm{d}x}{x^2}}  =  - \int {f\left( \frac{1}{x}\right) {\rm{d}}\left( \frac{\rm{1}}{x}\right) } \\[7pt]
\int {f(\ln x)\frac{1}{x}} {\rm{d}}x = \int {f(\ln x){\rm{d(}}\ln x)}                                                                               \\[7pt]
\int {f({\mathrm{e}^x})} {\mathrm{e}^x}{\rm{d}}x = \int {f({\mathrm{e}^x}} ){\rm{d(}}{\mathrm{e}^x})                                                \\[7pt]
\int {f(\sqrt x } )\frac{\rm{d}x}{\sqrt x } = 2\int {f(\sqrt x } ){\rm{d}}(\sqrt x )                                                          \\[7pt]
\int {f(\sin x)\cos x{\rm{d}}x = } \int {f(\sin x){\rm{d}}\sin x}                                                                                   \\[7pt]
\int {f(\cos x)\sin x{\rm{d}}x = }  - \int {f(\cos x){\rm{d}}\cos x}                                                                                \\[7pt]
\int {f(\tan x){\sec^2}} x{\rm{d}}x = \int {f(\tan x){\rm{d}}\tan x}                                                                             \\[7pt]
\int {f(\cot x){\csc^2}} x{\rm{d}}x =  - \int {f(\cot x){\rm{d}}\cot x}                                                                          \\[7pt]
\int {f(\arcsin x)\frac{1}{\sqrt {1 - x^2} }} {\rm{d}}x = \int {f(\arcsin x){\rm{d}}\arcsin x}                                                  \\[7pt]
\int {f(\arctan x)\frac{1}{1 + x^2}} {\rm{d}}x = \int {f(\arctan x){\rm{d}}\arctan x}                                                           \\[7pt]
\int {\frac{f'(x)}{f(x)}} {\rm{d}}x = \int {\frac{\rm{d}f(x)}{f(x)}}  = \ln \mid f(x)\mid + C
$$

### 换元法

三种
- 三角换元
  - 出现 $a^2-x^2$，令 $x=a\sin t$ 得到 $a^2-x^2=a^2\cos^2 t$
  - 出现 $x^2+a^2$，令 $x=a\tan t$ 得到 $x^2+a^2=a^2\sec^2 t$
  - 出现 $x^2-a^2$，令 $x=a\sec t$ 得到 $x^2-a^2=a^2\tan^2 t$
- 倒数换元 $x=1/t$ 或者 $x=1/t^n$ 或者 $x=t^n$
- 直接替换复杂项


### 有理函数的积分

$\frac{P(x)}{Q(x)}$ 其中P和Q都是实多项式。
- Q一定可以因式分解为最高二次的实多项式的
- 然后可以化为数个简单的分式，分母最多2次，分子最多1次。
- 然后各部分套公式



三角函数 $I_n  =\int_0^{\frac{\pi}{2}}\sin^nx\,\mathrm{d}x=\int_0^{\frac{\pi}{2}}\cos^nx\,\mathrm{d}x$  
得到迭代式 $I_n  =\frac{n-1}{n}I_{n-2}$
- 当n是偶数 $\dfrac{n - 1}{n} \cdot \dfrac{n - 3}{n - 2} \cdots \dfrac{4}{5} \cdot \dfrac{2}{3},I_1=1$
- 当n是奇数 $\dfrac{n - 1}{n} \cdot \dfrac{n - 3}{n - 2} \cdots \dfrac{3}{4} \cdot \dfrac{1}{2} \cdot \dfrac{\pi }{2},I_0=\dfrac{\pi}{2}$

### 分部积分

口诀：反对幂指三

https://www.zhihu.com/question/29319155/answer/1433338416

## 定积分求导
$F(x)=\int_{g(x)}^{h(x)}f(t)dt$，  
那么$F'(x)=h'(x)f[h(x)]-g'(x)f[g(x)]$  


## 可微的性质
TH1：
若$\dfrac{\partial^2 Z}{\partial x \partial y}$和$\dfrac{\partial^2Z}{\partial y \partial x}$都连续，那么$\dfrac{\partial^2 Z}{\partial x \partial y}=\dfrac{\partial^2Z}{\partial y \partial x}$

TH2：
若偏导数连续，那么可微

TH3：
若可微，那么：
- 偏导数存在
- 函数连续
- 所有方向导数都存在

Def1：
- 全增量$\Delta z=f(x+\Delta x,y+\Delta y)-f(x,y)$
- 全微分$d z=A\Delta x+B\Delta y$

## 极值


### 极值的必要条件

如果：
- 点a附近有定义，且在点a可微
- 在a点取极值


那么：  
$\dfrac{\partial f}{\partial x_i}=0, \space i=1,2,...m$    


证明提示：  
1. $f(a+h)-f(a)=\sum A_i h_i +o(\mid\mid h\mid\mid)$  
2. $h_i=A_i \varepsilon$


### 极值的充分条件
如果：
- 有连续的二阶偏导
- $z=f(x,y)$连续
- $f_x(x_0,y_0)=f_y(x_0,y_0)=0$  


那么：
- 如果$B^2<AC$，那么有极值
    - $A>0$有极小值
    - $A<0$有极大值
- 如果$B^2=AC$，那么无法判断是否有极值
- 如果$B^2>AC$，那么无极值

### 充分条件的推广

（连续可微：各偏导数连续，所以可微，叫做连续可微）  
多元函数$f(x)$在a点二阶连续可微，如果在a点取极值，那么：  


$\dfrac{\partial f}{\partial x_i}=0, \space i=1,2,...m$(用泰勒公式的一阶展开)  


然后用泰勒公式的二阶展开，并且使一阶项为0：  
$f(a+h)-f(a)=0.5(h_1\dfrac{\partial}{\partial x_1}+...+h_m\dfrac{\partial}{\partial x_m})^2 f(a) +o(\mid\mid h\mid \mid^2)$  
=$0.5\sum\limits_{i,j=1}^m A_{ij}h_i h_j+o(\mid\mid h\mid \mid^2)$  
(其中$A_{ij}=\dfrac{\partial^2 f}{\partial x_i \partial y_j}(a)$)  

上式是一个二次型(二次型正定的充分必要条件时系数方阵上所有的顺序主子式都大于0)  
事实上，可以定义 **Hasse矩阵** ：  
$H_f(a)=(\dfrac{\partial^2 f}{\partial x_i \partial x_j}(a))_ {m \times m}$  

综上，
f在a点所有的一阶偏导数为0，那么：  
- 如果Hasse矩阵正定，那么在a点取严格极小值。  
- 如果Hasse矩阵负定，那么在a点取严格极大值。  

### 拉普拉斯算子
二维拉普拉斯算子定义：  
$\Delta =\dfrac{\partial^2 }{\partial x^2}+\dfrac{\partial^2 }{\partial y^2}$  

对$u=ln 1/r $计算$\Delta u$, 这里$r=\sqrt{x^2+y^2}$  

答案：0

三维拉普拉斯算子定义:
$\Delta =\dfrac{\partial^2 }{\partial x^2}+\dfrac{\partial^2 }{\partial y^2}+\dfrac{\partial^2 }{\partial z^2}$  

对$u=1/r $计算$\Delta u$, 这里$r=\sqrt{x^2+y^2+z^2}$  


答案：0

## 泰勒公式

$$
f(x)=  f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n+o[(x-x_0)^n]  \\[7pt]
f(x)=  f(x_0)+f'(x_0)(x-x_0)+\frac{f''(x_0)}{2!}(x-x_0)^2+\cdots+\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n+\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}
$$

常用泰勒公式
$$
\mathrm{e}^{x}  =1+x+\frac{1}{2}x^{2}+\frac{1}{6}x^{3}+\cdots+\frac{1}{n!}x^{n}+o(x^{n})    \\[7pt]
\ln(x+1)        =x-\frac{1}{2}x^2+\frac{1}{3}x^3-\cdots+(-1)^{n-1}\frac{1}{n}x^{n}+o(x^{n})
$$


令 $n=2m$ 有,
$$
\sin x  =x-\frac{1}{6}x^{3}+\frac{1}{120}x^{5}+\cdots+(-1)^{m-1}\frac{1}{(2m-1)!}x^{2m-1}+o(x^{2m}) \\[7pt]
\cos x  =1-\frac{1}{2}x^2+\frac{1}{24}x^4-\cdots+(-1)^m \frac{1}{(2m)!}x^{2m}+o(x^{2m+1})           \\[7pt]
\tan x  =x+\frac{1}{3}x^3+\frac{2}{15}x^5+\frac{17}{315}x^7+\cdots+o(x^{2m-1}) \\[7pt]
\arcsin x  =x+\frac{1}{6}x^3+\frac{3}{40}x^{5}+\cdots+o(x^{2m}) \\[7pt]
\frac{1}{1-x}   =1+x+x^2+x^3+\cdots+x^n+o(x^n) \\[7pt]
(1+x)^{\alpha}  =\sum_{i=0}^{n}\frac{\prod_{j=0}^{i-1}{(\alpha-j})}{i!}x^n+o(x^n)           \\[7pt]
\alpha^x        =\sum_{i=0}^{n}\frac{\ln^n \alpha}{n!}x^n+o(x^n)
$$

### 多元泰勒公式
$\phi(t) = f(x+th,y+tk)$  
那么：$\phi^{(n)}(t)=(h \dfrac{\partial}{\partial x}+k\dfrac{\partial}{\partial x})^n f(x+th,y+tk)$  

推广：  
$\phi(t)=f(x+th)=f(x_1+th_1,x_2+th_2,...,x_m+th_m)$  
那么：$\phi^{(n)}(t)=(h_1\dfrac{\partial}{\partial x_1}+h_2\dfrac{\partial}{\partial x_2}+....+h_m\dfrac{\partial}{\partial x_m})^n f(x+th)$

多元泰勒公式：  

f是n+1阶连续可微的函数，那么  
$f(a+h)=\sum_{p=0}^n \dfrac{1}{p!}(h_1\dfrac{\partial}{\partial x_1}+...+h_m\dfrac{\partial}{\partial x_m})^p f(a)+R_{n+1}$  

拉格朗日余项$R_{n+1}=\dfrac{1}{(n+1)!} (h_1\dfrac{\partial}{\partial x_1}+...+h_m\dfrac{\partial}{\partial x_m})^{(n+1)}f(a+\theta h) \space (0<\theta<1)$  
积分余项$R_{n+1}=\dfrac{1}{n!}\int_0^1(1-t)^n (h_1\dfrac{\partial}{\partial x_1}+...+h_m\dfrac{\partial}{\partial x_m})^{(n+1)}f(a+th) d t$  
皮亚诺余项$R_{n+1}=o(\mid\mid h\mid\mid^n)$  



## 向量函数
### 定义

$\vec r=f_1 \vec i +f_2 \vec j +f_3 \vec k $


- $\vec r$有极限$\Leftrightarrow f_1,f_2,f_3$有极限
- $\vec r$连续$\Leftrightarrow f_1,f_2,f_3$连续
- $\vec r$可导$\Leftrightarrow f_1,f_2,f_3$可导

### 性质
- $[\vec u(t) \vec v(t)]'=\vec u' \vec v+\vec u \vec v'$
- $(\vec u \times \vec v)'=\vec u' \times \vec v+\vec u \times \vec v'$
- $[\vec u (\phi(t))]'=\vec u' \phi$

### 曲线的切向量

- $$\left \{ \begin{array}{ccc}
x=x(t)\\y=y(t)\\z=z(t)
\end{array}\right.$$的切向量是$(x',y',z')$


- $$\left \{ \begin{array}{ccc}
y=y(x)\\z=z(x)
\end{array}\right.$$可以转化为参数形式


- 隐式
$$\left \{ \begin{array}{ccc}
F(x,y,z)=0\\G(x,y,z)=0
\end{array}\right.$$

Def:**nabla 算子**
$\nabla =\vec i \dfrac{\partial}{\partial x}
+\vec j \dfrac{\partial}{\partial y}
+\vec k \dfrac{\partial}{\partial z}$

把参数形式代入隐式中，得到：
$$\left \{ \begin{array}{ccc}
\nabla F_{P_0} \cdot \vec r=0\\
\nabla G_{P_0} \cdot \vec r=0
\end{array}\right.$$

求出$\vec r$的平行线了：  
$\vec r(t) // \nabla F_{P_0} \times \nabla G_{P_0}$
这就是隐函数的切向量

### 曲面的切平面与法线

- $F(x,y,z)=0$的法向量是$(F_x,F_y,F_z)$

### 曲线的曲率和挠率

- 曲率描述曲线弯曲的程度
- 挠率描述曲线偏离平面的程度


曲率的定义式  
$K=\mid \dfrac{\mathrm{d}\alpha}{\mathrm{d}s}\mid $

由定义式我们可以推得：
- **直角坐标** $y=y(x)$ 的曲率是 $K=\frac{\mid y'' \mid}{( 1+y^{'2} )^{3/2}}$
- **参数方程** $x=\varphi(t),y=\psi(t)$ 的曲率是 $K=\frac{\mid \varphi'(t)\psi''(t)-\varphi''(t)\psi'(t)\mid}{[ \varphi^{'2}(t) +\psi^{'2}(t) ]^{3/2}}$
- **极坐标** 有曲率表达式 $K=\frac{\mid r^2+2r^{'2}-r\cdot r''\mid}{(r^2+r^{'2})^{3/2}}$


曲线在对应点 $M(x,y)$  的曲率中心 $D(\alpha,\beta)$ 的坐标为：
$$
\left \{ \begin{array}{l}
\alpha=x-\displaystyle\frac{y'(1+y^{'2})^3}{y^{''2}} \\
\beta=y+\displaystyle\frac{1+y^{'2}}{y''}
\end{array}\right.
$$


### 曲线的渐近线


1. 若 $\lim\limits_{ x\rightarrow \infty }f(x)=b$ ,则称 $y=b$ 为曲线 $f(x)$ 的 **水平渐近线**
2. 若 $\lim\limits_{ x\rightarrow x_0 }f(x)=\infty$ ,则称 $x=x_0$ 为曲线 $f(x)$ 的 **垂直渐近线**
3. 若 $\lim\limits_{ x\rightarrow \infty }[f(x)-(ax+b)]=0$ ,其中 $$
\begin{cases}
a=\displaystyle \lim\limits_{x\to \infty}\frac{f(x)}{x} \\[7pt]
b=\displaystyle \lim\limits_{x\to \infty}[f(x)-ax]
\end{cases}$$ ，则称 $y=ax+b$ 为曲线 $f(x)$ 的 **斜渐近线**





## 场论

### 方向导数和梯度

方向导数
: $\dfrac{\partial f}{\partial l}=\lim \limits_{t \rightarrow 0^+} \dfrac{f(x_0+tcos \alpha ,y_0+tcos \beta) -f(x_0,y_0)}{t}=f_x cos \alpha +f_y cos \beta$


梯度
: $grad[f(x_0,y_0)] =f_x \vec{i} + f_y \vec{j}$


- 相互关系: $\dfrac{\partial f}{\partial l}=grad(f) \vec{e}_l$



### 通量和散度

通量
: 单位时间通过某个曲面的量  
$\iint\limits_\Sigma \vec A \vec n d S$
$\vec A$是一个场，$\vec n$是曲面$\sum$的法向量  


散度
: 规定曲面封闭，曲面缩小成一个点，就可以定义这个点的强度  
$div \vec A (M)=\lim\limits_{\Omega \to M}\dfrac{1}{V} \iint_\Sigma \vec A \vec n dS$(要加个圈表示闭曲面上的积分)  


散度为正，表示向外膨胀（如辐射粒子）。  
散度为负，表示向内搜索（如黑洞）  
散度还有个等价定义$div F=\nabla \cdot F = \dfrac{\partial F_x}{\partial x}+\dfrac{\partial F_y}{\partial y}+\dfrac{\partial F_z}{\partial z}$


### 环流和旋度
环流
: $\oint_\Gamma \vec A \vec \tau dl$  
$\vec \tau$是曲线l的切线方向。  

旋度
: $\lim\limits_{\sum \to M}\dfrac{1}{S} \oint_\Gamma \vec A \vec \tau dl$  
$\sum$是封闭曲面$\Gamma$围成的区域，S是$\sum$的面积

### 计算方法
用 nabla 算子可以统一表示场论里的某些运算[^nabla]  

上文已经定义了 **nabla 算子**
$\nabla =\vec i \dfrac{\partial}{\partial x}
+\vec j \dfrac{\partial}{\partial y}
+\vec k \dfrac{\partial}{\partial z}$  

以三维为例，进行说明：

梯度
:    $grad f =\nabla f$  
$= \vec i \dfrac{\partial f}{\partial x} +\vec j \dfrac{\partial f}{\partial y} +\vec k \dfrac{\partial f}{\partial z}$  
（nabla 算子直接作用于标量函数f）  

散度
:    $div \vec F = \nabla \cdot \vec F$
$ =(\vec i \dfrac{\partial}{\partial x} + \vec j \dfrac{\partial}{\partial y} + \vec k \dfrac{\partial}{\partial z})\cdot (u(x,y,z)\vec i+v(x,y,z)\vec j+w(x,y,z)\vec k)=\dfrac{\partial u}{\partial x}+\dfrac{\partial v}{\partial y}+\dfrac{\partial w}{\partial z}$  
(以内积的形式作用，输入一个矢量函数，输出一个标量)

旋度
:    $curl \vec F = \nabla \times \vec F$


## 曲线积分

### 定义

假设曲线是$\phi (t),\psi(t) ,\space t \in(\alpha,\beta)$

第一类曲线积分
: $\int_l f(x,y)ds = \int_\alpha^\beta f(\phi(t),\psi(t)) \sqrt{\phi'{}^2(t)+\psi'{}^2(t)}dt$

第二类曲线积分
: $\int_l f(x,y)dx=\int_\alpha^\beta f(\phi(t),\psi(t))d\phi(t)$

### 关系
- $\int_l Pdx+Qdy=\int_l(Pcos\alpha+Qcos\beta)ds$
其中，$\alpha(x,y),\beta(x,y)$是L切线的方向角


- $\iint\limits_D (\dfrac{\partial Q}{\partial x } - \dfrac{\partial P}{\partial y})dxdy=\oint_l Pdx+Qdy$
其中，沿着l运动，D的左边规定为正

### 推论

- 积分与路径无关$\Longleftrightarrow \dfrac{\partial Q}{\partial x}\equiv\dfrac{\partial P}{\partial y}$


- $Pdx+Qdy$是微分$\Longleftrightarrow  \dfrac{\partial Q}{\partial x}\equiv\dfrac{\partial P}{\partial y}$


### 直观理解
$f\equiv 1$时的第一类曲线积分，就是l弧长。（弧微分）

## 变元法

### 定理
如果：  
$\Omega \subset R^m$是一个开集  
$\phi:\Omega \to R^m$是一个连续可微映射  
$E\subset \Omega$是一个闭约当可测集  
$\det D\phi(t) \neq 0, \forall t \in int E$  
$\phi(E)$在$intE$中是单一的  


那么：  
$\phi(E)$是一个闭若当可测集  
对于任意$\phi(E)$上的连续函数$f(x)$，$\int_{\phi(E)}f(x)dx=\int_E f(\phi(t)) \mid \det D\phi(t) \mid dt$  



举个例子(1)[^hi]，  
$\int_{\phi(E)}f(x,y)d(x,y)=\iint_E f(x(u,v),y(u,v)) \mid \dfrac{\partial (x,y)}{\partial(u,v)} \mid d(u,v)$  


举个例子(2),  
因为$\dfrac{\partial(x,y)}{\partial(r,\theta)}$,所以，  
$\iint_D f(x,y)d(x,y)=\int_0^{2\pi} \int_a^b f(rcos\theta,rsin\theta)rdr$  

## 参考文献
[^nabla]: https://baike.baidu.com/item/Nabla%20%E7%AE%97%E5%AD%90/20177377
[^hi]: http://www.doc88.com/p-8179991133177.html

[微积分整理](https://github.com/ShevonKuan/Calculus-Summarize/releases/tag/1.0.0)
