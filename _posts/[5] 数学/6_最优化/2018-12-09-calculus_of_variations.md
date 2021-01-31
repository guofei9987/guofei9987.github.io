---
layout: post
title: 【动态最优化】变分法
categories:
tags: 5-6-最优化
keywords:
description:
order: 7401
---

动态最优化有3个板块：
1. 变分法
2. 最优控制
3. 动态规划


$\min V[y]=\int_0^T F(t,y(t),y'(t))$  
s.t. $y(0)=A,y(T)=Z$  


最优控制理论增加了一个控制变量$u(t)$  
$\min V[y]=\int_0^T F(t,y(t),y'(t),u(t))$  
s.t. $y(0)=A,y(T)=Z,y'(t)=f[t,y(t),u(t)]$  

（动态规划问题）


## 问题定义
要解决这么一种特殊的泛函的最值问题  
$V[y]=\int_0^T F[t,y(t),y'(t)]dt$  
s.t. $y(0)=A,y(T)=Z$  

### 最优化目标
1. $V[y]=\int_0^T F[t,y(t),y'(t)]dt$  
2. 有时候，最优化目标只取决于终止点的位置，所以不需要积分，因为不去要过程的加总  
$V[y]=G(T,y(T))$
3. 有时候，最优化的目标是过程加结果，  
$V[y]=\int_0^TF[t,y(t),y'(t)]dt+G[T,y(T)]$


以上1,2,3 分别称为 **标准问题，Mayer 问题，Bolza问题**  
实际上，2和3可以转化为1（证明提要，定义一个新变量$z(T)=G(t,y(t))$,且$z(0)=0$,那么$\int_0^T z'(t)dt=G[T,y(T)]$）  

所以，优化目标的一般形式是$V[y]=\int_0^T F[t,y(t),y'(t)]dt$  

### 边界条件
#### 1. 固定终止点问题
命令$y(0)=A,y(T)=Z$(T,A,Z都是事先给定的)

#### 2. 垂直终止线
给定终止时间T，但终止状态是自由的  
**固定时间水平问题，固定时间问题 (fixed-time-horizon problem)，垂直终止线问题（vertical-terminal-line problem）**  
例如，一年内利润最大化的问题
#### 3. 水平终止线
给定终止状态，但终止时间是自由的  
**固定端点问题 （fixed-endpoint problem），horizonal-terminal-line problem**  
例如，以最小成本生产一批材料
#### 4. 一般终止线
终止状态是可变的，被一个约束方程约束$X=\phi (T)$  
比如，客户想在完工日期和完工质量之间做一个 tradeoff  


## 变分法的推导
对于问题：  
$\min V[y]=\int_0^T F(t,y(t),y'(t))$  
s.t. $y(0)=A,y(T)=Z$  
要求可行集$\{y\}$平滑，F二次可微

### 技术1：扰动
定义一个扰动（perturbing）曲线$p(t)$,要求$p(0)=p(T)=0$  
假设最优路径是$y^* $  
任意$y(t)=y^* (t)+\varepsilon p(t)$  
泛函$V[y]$又可以看做$V=V(\varepsilon)$  
那么必定有$\dfrac{dV}{d\varepsilon}\mid_{\varepsilon=0}=0$时，取得极值  



### 技术2：Leibniz法则
假设$I(x)=\int_{a(x)}^{b(x)}f(x,t)dt$  
那么$\dfrac{d I(x)}{dx}=f(a(x))a'(x)-f(b(x))b'(x)+\int_{a(x)}^{b(x)}f_x(x,t)dt$


### 构建欧拉方程
step1：  
$y(t)=y^* (t)+\varepsilon p(t)$  
$\dfrac{dV(\varepsilon)}{d \varepsilon}$  
$=\int_0^T\dfrac{\partial F}{\partial \varepsilon}dt$(Leibniz法则)  
$=\int_0^T (\dfrac{\partial F}{\partial y}\dfrac{dy}{d\varepsilon}+\dfrac{\partial F}{\partial y'}\dfrac{d y'}{d\varepsilon})dt$(链式法则)  
$=\int_0^T F_yp(t)dt+\int_0^T F_{y'}p'(t)dt=0$  


step2:  
对上式第二部分进行 **分部积分**  
$\int_0^T F_{y'}p'(t)dt=F_yp(t)\mid_0^T-\int_0^Tp(t)\dfrac{d F_{y'}}{dt}dt$  
$=-\int_0^Tp(t)\dfrac{d F_{y'}}{dt}dt$  
所以，$\dfrac{dV(\varepsilon)}{d \varepsilon}=\int_0^Tp(t)[F_y-\dfrac{d}{dt}F_{y'}]dt=0$  

step3:  
考虑到$p(t)$也是任意给出的，所以  
$F_y-\dfrac{d}{dt}F_{y'}=0,t\in[0,T]$(**欧拉方程**)  

step4：  
对于事先给定的$F(t,y,y')$  
$\dfrac{dF_{y'}}{dt}=\dfrac{\partial F_{y'}}{\partial t}+\dfrac{\partial F_{y'}}{\partial y}\dfrac{dy}{dt}+\dfrac{\partial F_{y'}}{\partial t}{\dfrac{dy'}{dt}}$  
$=F_{ty'}+F_{yy'}y'(t)+F_{y'y'}y''(t)$  
因此，$F_{y'y'}y''(t)+F_{yy'}y'(t)+F_{ty'}-F_y=0,t\in[0,T]$(**欧拉方程**)  


对于事先给定的$F$,上面是一个关于$y(x)$的偏微分方程，解出这个方程，并且注意到边界条件，就可以得到最终结果了。  


#### 1. 特殊的欧拉方程（化简）
$F(t,y')$，欧拉方程是$F_{y'}=C$  
$F(y,y')$，欧拉方程是$d(y'F_{y'}-F)/dt=0$  
$F(y')$,欧拉方程为$F_{y'y'}y''(t)=0$,两项都可以为0，分别都解出直线族  
$F(t,y)$,欧拉方程$F_y=0$不是一个微分方程，而是一个通常的方程，边界条件要巧合才有解。    
#### 2. 多变量欧拉方程
对于含多个状态变量的情况，  
$V[y_1,...,y_n]=\int_0^TF(t,y_1,...,y_n,y'_ 1,...y'_ n)dt$  
用同样方法，得到欧拉方程  
$F_{y_j}-\dfrac{d}{dt}F_{y'_ j}=0$（一组）  

#### 3. 含高阶导数的欧拉方程
对于含高阶导数的情况，  
$V[y]=\int_0^T F(t,y,y',y'',...,y^{(n)})$  
有两种思路，  
一是引入新变量,例如$z\equiv y'$，从而把问题转化为多状态变量的情况  
或者模仿欧拉方程的推导得到$F_y-\dfrac{d}{dt}F_{y'}+\dfrac{d^2}{dt^2}F_{y''}-...+(-1)^n\dfrac{d^n}{dt^n}F_{y^{(n)}}=0$







## 一般横截条件
这里，让边界条件的终点不固定。  

$\min V[y]=\int_0^T F(t,y(t),y'(t))$  
s.t. $y(0)=A,y(T)=y_T^{}$（$T,y_T^{}$自由）  


$T=T^* +\varepsilon \Delta T$  
$y(t)=y^* (t)+\varepsilon p(t)$  
其中，$\Delta T$是实现给定的数  
$p(0)=0$

我们想要$\dfrac{dV}{d\varepsilon}=0$

$\dfrac{dV}{d\varepsilon}=\int_0^{T(\varepsilon)}\dfrac{\partial F}{\partial \varepsilon}dt+F[T,y(T),y'(T)]\dfrac{dT}{d\varepsilon}$  


对于前项，用类似的分步积分法  
前项$=\int_0^Tp(t)[F_y-\dfrac{d}{dt}F_{y'}]+p(T)[F_{y'}]_ {t=T}$  
后项$=[F]_ {t=T} \Delta T$  

考虑到$dV/dt=0$，
有$\int_0^Tp(t)[F_y-\dfrac{d}{dt}F_{y'}]dt+p(T)[F_{y'}]_ {t=T}+[F]_ {t=T} \Delta T=0$  

又有$p(T)=\Delta y_T^{} -y'(T)\Delta T$（这一步没理解）  

代入后2项得到$[F-y'F_{y'}]_ {t=T} \Delta T+[F_{y'}]_ {t=T} \Delta y_T^{}=0$  
而前1项是上面的欧拉方程$F_y-\dfrac{d}{dt}F_{y'}=0$  

### 1. 垂直终止线问题
最终时间是固定的，最终状态是任意的.  
也就是说，$\Delta T=0, \Delta y_T^{}$ 任意  

边界条件化简为$[F_{y'}]_ {t=T}=0$  

### 2. 水平终止线问题
最终状态固定，最终时间不固定.  
也就是说，$\Delta T$任意，$\Delta y_T^{}=0$  

边界条件简化为$[F-y'F_{y'}]_ {t=T}=0$  

### 3. 终止曲线
终止时间和终止点都不确定，而是满足一个约束$y_T^{}=\phi(T)$  

所以，$\Delta y_T^{}=\phi'\Delta T$  
把上式代入到边界条件中，化简得到$[F+(\phi'-y')F_{y'}]_ {t=T}=0$  

### 4. 截断的垂直终止线
终止线是垂直的，但是有个最大值约束  
$\Delta T=0,y_T^{}\geq y_{\min}$  

$[F_{y'}]_ {t=T} \Delta y_T^{}=0$是一个条件
有两种情况
1. $y_T^* >y_{\min}$，此时，正确解的周围都是可行路径，$\Delta y_T^{}\equiv y_T^{}-y_T^* $可正可负，因此，问题的条件是$[F_{y'}]_ {t=T}=0$
2. $y_T^* =y_{\min}$，此时，允许的扰动$\Delta y_T^{}\geq 0$  

对于V最大化的问题，$[y_{y'}]_ {t=T}\leq 0,y_T^* \geq y_{\min},(Y^* - y_{\min})[F_{y'}]_ {t=T}=0$  
对于V最小化的问题，$[y_{y'}]_ {t=T}\geq 0,y_T^* \geq y_{\min},(Y^* - y_{\min})[F_{y'}]_ {t=T}=0$  

### 5. 截断水平终止线
增加限制条件$T\leq T_{\max}$
对于V最大化的问题，$[F-y'F_{y'}]_ {t=T} \geq 0,T^* \leq T_{\max},(T^* -T_{\max})[F-y'F_{y'}]_ {t=T}=0$  
增加限制条件$T\leq T_{\max}$
对于V最小化的问题，$[F-y'F_{y'}]_ {t=T} \leq 0,T^* \leq T_{\max},(T^* -T_{\max})[F-y'F_{y'}]_ {t=T}=0$  


## 无限水平
前面的讨论中，时间区间都是有限的。这里讨论无限时间内的动态最优化问题。  
目标泛函$V[y]=\int_0^{+\infty}F(t,y,y')dt$  

上一部分的一般横截条件的结论是，  
解是欧拉方程$F_y-\dfrac{d}{dt}F_{y'}=0$  
边界条件$[F-y'F_{y'}]_ {t=T} \Delta T+[F_{y'}]_ {t=T} \Delta y_T^{}=0$  

对于无限时间，欧拉方程一样，边界条件变成  
$[F-y'F_{y'}]_ {t\to +\infty} \Delta T+[F_{y'}]_ {t\to +\infty} \Delta y_T^{}=0$  

对于第一项$\Delta T$不为0，有$\lim\limits_{t\to+\infty}(F-y'F_{y'})=0$  
对于第二项，如果问题给定了终止状态$\lim\limits_{t\to+\infty} y(t)=y_{\infty}=$常数，那么第二项必然为零（因为$\Delta y_T^{}=0$）,不再需要终止条件  
对于第二项，如果终止状态是自由的，那么需要终止条件$\lim\limits_{t\to +\infty} F_{y'}=0$  

<!--
## 约束问题
前面讨论的都是无约束的最值问题，这里讨论一下有约束最值问题  

### 1. 等式约束
$V=\int_0^T F(t,y_1,...,y_n,y_1',...,y_n')dt$   -->












## 参考文献
【美】蒋中一：《动态最优化基础》，中国人民大学出版社  
莫顿，南茜：《动态优化：经济学和管理学中的变分法和最优控制》，中国人民大学出版社  
