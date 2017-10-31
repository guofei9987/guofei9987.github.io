---
layout: post
title: 多元微积分要点提要
categories:
tags: 实分析
keywords:
description:
---


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

$\phi(t) = f(x+th,y+tk)$  
那么：$\phi^{(n)}(t)=(h \dfrac{\partial}{\partial x}+k\dfrac{\partial}{\partial x})^n f(x+th,y+tk)$  

推广：  
$\phi(t)=f(x+th)=f(x_1+th_1,x_2+th_2,...,x_m+th_m)$  
那么：$\phi^{(n)}(t)=(h_1\dfrac{\partial}{\partial x}+h_2\dfrac{\partial}{\partial x}+....+h_m\dfrac{\partial}{\partial x})^n f(x+th)$

多元泰勒公式：  

f是n+1阶连续可微的函数，如果  
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

Def:奈不拉算子
$\nabla =\vec i \dfrac{\partial}{\partial x}
+\vec j \dfrac{\partial}{\partial y}
+\vec k \dfrac{\partial}{\partial z}$

把参数形式代入隐式中，得到：
$$\left \{ \begin{array}{ccc}
\nabla F_{P_0} \centerdot \vec r=0\\
\nabla G_{P_0} \centerdot \vec r=0
\end{array}\right.$$

求出$\vec r$的平行线了：  
$\vec r(t) // \nabla F_{P_0} \times \nabla G_{P_0}$
这就是隐函数的切向量

### 曲面的切平面与法线

- $F(x,y,z)=0$的法向量是$(F_x,F_y,F_z)$

### 曲线的曲率和挠率

- 曲率描述曲线弯曲的程度
- 挠率描述曲线偏离平面的程度








## 方向导数和梯度

方向导数
: $\dfrac{\partial f}{\partial l}=\lim \limits_{t \rightarrow 0^+} \dfrac{f(x_0+tcos \alpha ,y_0+tcos \beta) -f(x_0,y_0)}{t}=f_x cos \alpha +f_y cos \beta$


梯度
: $grad[f(x_0,y_0)] =f_x \vec{i} + f_y \vec{j}$


- 相互关系: $\dfrac{\partial f}{\partial l}=grad(f) \vec{e}_l$



## 通量和散度

通量
: 单位时间通过某个曲面的量  
$\iint\limits_\sum \vec A \vec n d S$
$\vec A$是一个场，$\vec n$是曲面$\sum$的法向量  


散度
: 规定曲面封闭，曲面缩小成一个点，就可以定义这个点的强度  
$div \vec A (M)=\lim\limits_{\Omega \to M}\dfrac{1}{V} \oiint$

## 曲线积分

### 定义

假设曲线是$\phi (t),\psi(t) t \in(\alpha,\beta)$

第一类曲线积分
: $\int_l f(x,y)ds = \int_\alpha^\beta f(\phi(t),\psi(t)) \sqrt{\phi'{}^2(t)+\psi'{}^2(t)}dt$

第二类曲线积分
: $\int_l f(x,y)=\int_\alpha^\beta f(\phi(t),\psi(t))d\phi(t)$

### 关系
- $\int_l Pdx+Qdy=\int_l(Pcos\alpha+Qcos\beta)ds$
其中，$\alpha(x,y),\beta(x,y)$是方向角


- $\iint\limits_D (\dfrac{\partial Q}{\partial x } - \dfrac{\partial P}{\partial y})dxdy=\oint_l Pdx+Qdy$
其中，沿着l运动，D的左边规定为正

### 推论

- 积分与路径无关$\Longleftrightarrow \dfrac{\partial Q}{\partial x}\equiv\dfrac{\partial P}{\partial y}$


- $Pdx+Qdy$是微分$\Longleftrightarrow  \dfrac{\partial Q}{\partial x}\equiv\dfrac{\partial P}{\partial y}$
