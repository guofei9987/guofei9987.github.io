---
layout: post
title: 多元微积分
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

### 性质1
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

### 性质2

如果：
- 偏导数存在
- 有极值点$(x_0,y_0)$


那么：  
$f_x(x_0,y_0)=f_y(x_0,y_0)=0$


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
