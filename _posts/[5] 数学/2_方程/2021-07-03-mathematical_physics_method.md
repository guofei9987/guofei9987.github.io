---
layout: post
title: 二阶线性偏微分方程
categories:
tags: 0x52_方程
keywords:
description:
order: 5210
---



二阶线性偏微分方程包括以下几种典型
1. 双曲型方程。典型如波动方程，常用于研究波的传播、弹性体震动。
2. 抛物型方程。典型如热传导方程，常用于热传导、扩散。
3. 椭圆型方程。典型如调和方程（又称 Laplace 方程）和 Poisson 方程


## 波动方程



下面从物理问题出发，导出弦震动方程。  
**问题描述** 一根两端固定的拉紧的均匀柔软的弦，长为 l，外力作用下在平衡位置做微小的横震动，求弦上各点的运动规律。  
数学建模前，必须做一些 **理想化假设**：（**均匀、细、长、两端固定、柔软、拉紧**）  
1. 弦是均匀的，弦的直径相比长度可以忽略。因此弦可以视为一根曲线，他的线密度是常数
2. 弦在某平面内微小横震动
3. 弦柔软。因此不抵抗弯曲形变，弦上各质点与弦的切线保持一直，弦的伸长形变服从胡克定理。

建模过程：


1. 设弦上任意一点的位移为$u(x,t)$  
2. 在任意一段 $(x,x+\Delta x)$，对应的弧长是 $\Delta s=\int_x^{x+\Delta x} \sqrt{1+u_x^2} dx$，由假设2，$u_x^2$ 与 1 相比可以忽略不计，进而 $\Delta s \approx \int_x^{x+\Delta x}dx=\Delta x$  
3. 近似认为任意一段弦在震动过程中未横向移动。弦上任意一点所受张力为 $T(x,t)$，下面的分析中 $T(x,t)$ 都是在同一时刻，因此简记为 $T(x)$，不受影响。
4. 假设 $x,x+\Delta x$ 处的夹角是 $\alpha_1,\alpha_2$
5. x方向上，力的分析
    - x方向上分力是 $T(x)\cos\alpha_1 = T(x+\Delta x)\cos\alpha_2$
    - 我们知道，$\cos\alpha_1=\dfrac{1}{\sqrt{1+u_x^2(x,t)}},  \cos\alpha_2=\dfrac{1}{\sqrt{1+u_x^2(x+\Delta x,t)}}$
    - 也就是说 $\dfrac{T(x)}{\sqrt{1+u_x^2(x,t)}} =   \dfrac{T(x+\Delta x)}{\sqrt{1+u_x^2(x+\Delta x,t)}} = T$
    - 另一种理解是：一根弦上的横向张力是个常量 T
6. u方向上，力的分析
    - u方向上合力是 $-T(x)\sin\alpha_1+T(x+\Delta x)\sin\alpha_2$
    - 我们知道，$\sin \alpha_1 = \dfrac{\tan\alpha_1}{\sqrt{1+\tan^2\alpha_1}} = \dfrac{u_x(x,t)}{\sqrt{1+u_x^2(x,t)}}$因此 $T(x)\sin\alpha_1=\dfrac{T(x) \tan\alpha_1}{\sqrt{1+\tan^2\alpha_1}} = T\tan\alpha_1=Tu_x(x,t)$
    - 同理， $T(x+\Delta x) \sin\alpha_2=Tu_x(x+\Delta x,t)$
    - u 方向上的合力是 $-Tu_x(x,t)+Tu_x(x+\Delta x,t)$
7. 对于弦 $(x,x+\Delta x)$ 在 $(t, t+\Delta t)$ 时间内，计算冲量和动量
    1. 来自张力的冲量是 $\int_t^{t+\Delta t} T[u_x(x+\Delta x,t)-u_x(x,t)]dx$ （根据第6步的结果）
        - 注意到 $u_x(x+\Delta x,t)-u_x(x,t)=\int_x^{x+\Delta x} u_{xx}(x,t) dx$（微积分基本定理）
        - 所以 “来自张力的冲量” 化简后是 $\int_t^{t+\Delta t}\int_x^{x+\Delta x} T u_{xx}(x,t) dxdt$
    2. 另外，假设还有u方向的外力的线密度大小是 $F(x,t)$，对应的冲量就是 $\int_t^{t+\Delta t}\int_x^{x+\Delta x} F(x,t)dxdt$
    3. 动量的变化是 $\int_x^{x+\Delta x}\rho u_t(x,t+\Delta t)dx - \int_x^{x+\Delta x}\rho u_t(x,t)dx$
        - $= \int_x^{x+\Delta x}\rho [u_t(x,t+\Delta t) -  u_t(x,t)]dx$（化简1）
        - $= \int_x^{x+\Delta x} \int_t^{t+\Delta t} \rho u_{tt}(x,t)dtdx$
8. 根据动量定理，$\int_t^{t+\Delta t}\int_x^{x+\Delta x} [Tu_{xx}(x,t)+F(x,t)-\rho u_{tt}(x,t)] dxdt = 0$
9. $\Delta t, \Delta x$ 有任意性，所以被积函数恒为0，也就是说，**最终结果**是 $\rho u_{tt}(x,t) = Tu_{xx}(x,t) + F(x,t)$



在数学上，我们把上式抽象为偏微分方程 $u_{tt}(x,t) = a^2 u_{xx}(x,t) + f(x,t)$
类似可以推导出：
- 二维波动方程（薄膜震动）$u_{tt} = a^2 (u_{xx} + u_{yy})+ f(x,y,t)$
- 三维波动方程（电磁波、声波）$u_{tt} = a^2 (u_{xx} + u_{yy} + u_{zz})+ f(x,y,z,t)$



### 额外说明

1. 第7-9步用牛顿第二定律，可以以直观的方式推导出类似结果（但数学上不太严密）：
    - 根据牛顿第二定律，$Tu_x(x+\Delta x,t)-Tu_x(x,t)+F\Delta x=\rho \Delta x u_{tt}$  
    - 根据微分中值定理，$Tu_x(x+\xi,t)\Delta x+F\Delta x=\rho \Delta x u_{xx}$  
    - 所以，$\rho u_{tt}(x,t)=Tu_{xx}(x,t)+F$  
2. 二维的情况下，有类似的推导方法（静止的情况，且过程不严密）：
    - 假设位移是$u(x,y)$  
    - 膜上有一个矩形区域，顶点分别是$(x,y),(x+\Delta x,y),(x+\Delta x,y+\Delta y),(x,y+\Delta y)$  
    - $yOu$平面上，$(T\sin\alpha_2-T\sin\alpha_1)\Delta x\thickapprox T(u_{yy}(x,y+\Delta y)-u_{yy}(x,y))\Delta x=Tu_{xx}\Delta x\Delta y$  
    - $xOu$方向上同理，根据力的平衡原理，$T(u_{xx}+u_{yy})\Delta x\Delta y=\rho \Delta x\Delta y$  
所以，$u_{xx}+u_{yy}=f$，称为 **微翘的薄膜平衡方程**  




一般地，称$u_{xx}+u_{yy}=f(x,y)$为 **二维泊松方程**  
称$u_{xx}+u_{yy}=0$为 **二维拉普拉斯方程** 或 **调和方程**  


### 波动方程的边界条件

对于一维度弦震动问题，要解偏微分方程，需要额外条件
- t=0 的位置给定 $u(x,0)=\phi(x)$
- t=0 的速度给定 $u_t(x,0)=\psi(x)$
- **第一类边界条件**，弦的两端被固定，$u(0,t)=u(l,t)=0$


还有其它的边界条件：

**第二类边界条件**  
弦的左端点可以垂直自由移动，不受垂直的力，而张力的垂直分量是 $Tu_x(0,t)$，  
也就是说 $u_x(0,t)=0$  
更普遍的边界条件 $u_x(0,t)=\mu(t)$  


**第三类边界条件**  
弦的右端点在一个弹簧上（弹簧符合胡克定理）  
张力的垂直分量 $-u_x(l,t) $,弹簧的垂直力 $ku(l,t)$，所以边界条件是 $u_x(l,t)+\sigma u(l,t)=0$  
更普遍的边界条件 $u_x(l,t)+\sigma u(l,t)=v(t)$


### 扩展思考

细杆：可以产生纵向震动，且张力服从胡克定律，求震动方程。假设$\rho(x)$ 是杆的密度，$E(x)$是杨氏摩量

求圆锥形杆的纵向震动方程


悬链线：（不是弦震动方程，但推导过程类似）
- 附加条件1：“弦上每一点都静止” $u_{tt}(x,t)=0$
- 附加条件2:“受到的外力是重力，重力与密度有关，线不做弹性形变”，$F(x,t)=-mg=-\rho\Delta l g = -\rho g \sqrt{1+u_x^2}$（外力与 $u(x)$ 有关，所以不是弦震动方程）
- 悬链线的微分方程是 $u_{xx}=k\sqrt{1+u_x^2}$
- 解出来是 $y=1/k \cosh(kx+c_1)+x_2$

悬链线2：如果假设线做弹性形变，并且服从胡克定理。？？好像还是满足震动方程，其 $f(x,t)=c$（没算出来），解出来是二次方程。


### 波动方程的一些性质

**叠加原理**

如果有两个震动方程
$u_{tt}(x,t) - a^2 u_{xx}(x,t) = f_1(x,t), u_{tt}(x,t) - a^2 u_{xx}(x,t) = f_2(x,t)$  
解是 $u_1(x,t), u_2(x,t)$  
那么 $u(x,t) = C_1 u_1(x,t)+C_2 u_2(x,t)$ 是 $u_{tt}(x,t) - a^2 u_{xx}(x,t) = C_1 f_1(x,t)+C_2 f_x(x,t)$ 的解，此结论对任意常数 $C_1,C_2$ 成立



**传播波**  
如果没有外力 $f(x,t)=0$,  
$u_{tt}(x,t) - a^2 u_{xx}(x,t) = 0$ 的通解形如 $F(x-at)+G(x+at)$  
函数图像看起来好像在左右平移一般。



## 热传导方程

1. 符号表示
    - $u(x,y,z,t)$ 是物体 G 在位置 $(x,y,z)$ 和时刻 t 的温度
    - $k(x,y,z)$ 是热传导系数
2. 根据 **傅立叶实验定律**，dt 时间内，沿法线 n 流过无穷小面积 dS 的热量 记为 $dQ = -k \dfrac{\partial u}{\partial n}dSdt$
    - 物品 G 内任意闭曲线是 $\Gamma$，所包围的区域记为 $\Omega$
    - $(t_1,t_2)$ 时间段内，流入 $\Omega$ 的热量为 $$Q_1 = \int_{t_1}^{t_2} \{ \iint\limits_{\Gamma} k \dfrac{\partial u}{\partial n}dS \}dt$$
    - 根据格林函数，化简为 $Q_1 = \int_{t_1}^{t_2}  \iiint\limits_{\Omega} \{ \dfrac{\partial}{\partial x}(ku_x) + \dfrac{\partial}{\partial y}(ku_y) + \dfrac{\partial}{\partial z}(ku_z) \} dxdydzdt$
3. 从温度变化的角度看，流入的热量是 $Q_2 = \iiint\limits_{\Omega} c\rho[u(x,y,z,t_1)-u(x,y,z,t_2)]dxdydz$
    - $c(x,y,z)$ 是比热
    - $\rho(x,t,z)$ 是密度
    - 用积分基本定理化简为 $Q = \iiint\limits_{\Omega} c\rho [\int_{t_1}^{t_2} u_tdt]dxdydz$
    - $ = \int_{t_1}^{t_2} \iiint\limits_{\Omega} c\rho u_t dxdydzdt$
4. 假设内部有热源，$Q_3=\int_{t_1}^{t_2} \iiint\limits_\Omega F(x,y,z,t)dxdydzdt$
5. 联合2、3、4，$Q_1+Q_3=Q_2$
6. 注意到 $t_1,t_2,\Omega$都是任意的，有
    - $\dfrac{\partial}{\partial x}(ku_x) + \dfrac{\partial}{\partial y}(ku_y) + \dfrac{\partial}{\partial z}(ku_z) +F(x,t,z,t) = c\rho u_t$
    - （上式就是 **非均匀各向同性体的热传导方程**）


如果物体是均匀的，也就是说$k,c,\rho$是常数，那么，热传导方程可以化简为
- $u_t=a^2(u_{xx}^2+u_{yy}^2+u_{zz}^2) + f(x,y,z,t)$
- 其中，$a^2=\dfrac{k}{c\rho}$
- 其中，$f(x,y,z,t)=\dfrac{F(x,y,z,t)}{\rho c}$
- 如果 $f(x,y,z,t)\equiv 0$，称为 **齐次热传导方程**



### 热传导方程的边界条件


**第一类边界条件**
1. 知道初始时间每一点的温度 $u(x,y,z,0)=\phi(x,y,z)$
2. 知道边界上每个点每个时刻的温度 $u(x,y,z,y) \mid_{(x,y,z)\in \Gamma} = g(x,y,z,t),$

**第二类边界条件**
1. 同上的条件1
2. 知道的不是表面温度，而是表面热量的流动，
    - 根据傅立叶定律 $\dfrac{dQ}{dSdt}=-k\dfrac{\partial u}{\partial n}$
    - 也就是说，边界条件的形式是 $\dfrac{\partial u}{\partial n}\mid_{(x,y,z)\in \Gamma} = g(x,y,z,t)$


**第三类边界条件**
1. 条件同上
2. 如果物体在介质（如空气）中，只能测量物体边缘处的介质温度 $u_1$，它与物体温度 $u$ 往往不相等。而是服从牛顿定律 $dQ=k_1(u-u_1)dSdt$
    - 可以写为 $(\dfrac{\partial u}{\partial n}+\sigma u) \mid_{(x,t,z)\in\Gamma}=g(x,y,z,t)$


**柯西问题**，如果物体体积很大，或者只考虑较短时间和较小温度变化的情况，边界条件可以忽略，初始条件是 $u(x,y,z,0)=\phi(x,y,z),(-\infty<x,y,z<\infty)$



## 椭圆型方程

Laplace 方程：$u_{xx}+u_{yy}+u_{zz} = 0$

Poisson 方程：$u_{xx}+u_{yy}+u_{zz} = f(x,y,z)$




## 参考文献
《数学物理方程》谷超豪，高等教育出版社
