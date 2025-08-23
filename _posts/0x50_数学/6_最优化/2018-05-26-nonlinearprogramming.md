---
layout: post
title: 【非线性无约束最优化】理论
categories:
tags: 0x56_最优化
keywords:
description:
order: 7010
---



在数学规划中，至少有一个非线性函数出现（无论是目标还是约束），就叫做非线性规划（Nonlinear Programing）
## 一维搜索算法

### 平分法
适用于一维、单峰、可微的情况
1. 找到初始区间[a,b]  
$x_0$为初始点，$\Delta x$是步长。如果$f'(x_0)<0$,则$x_1=x_0+\Delta x$.如果$f'(x_1)<0$,那么$x_2=x_1+\Delta x$.一直做下去，直到$f(x_n)>0$  

2. 迭代寻优  
$x_0=(a+b)/2$.如果$f(x_0)>0$,区间为$[a,x_0]$.如果$f(x_0)<0$,区间为$[x_0,b]$.

3. 重复第2步

### 0.618法
适用于一维、单峰的情况，不需要微分  

这是另一种搜索方式，从$[a_k,b_k]$内，找到一个子集$[u_k,v_k]$，  
(不妨假设$f(a_k)>f(b_k)$的情况)，  
如果$f(u_k)>f(v_k)$,那么，最小值点在$[u_k,b_k]$，  
如果$f(u_k)<f(v_k)$，那么，最小值点在$[a_k,v_k]$.

显然，这样的$[u_k,b_k]$是有无穷多种的，如果满足这些条件，计算量显然会小很多：
- 每次迭代，等可能性的保留$[u_k,b_k],[a_k,v_k]$，那么$[u_k,b_k]$在$[a_k,b_k]$的对称位置是合理的附加条件
- 每次迭代，区间缩短的比例$\lambda$都是相同的,为了迭代更快，$\lambda$越小越好。
- k次迭代计算的某一个分割点，也是k+1次迭代计算的某一个分割的（少算一次函数值）

满足以上规则的试探点，正好是黄金分割点$(-1+\sqrt 5)/2$约等于0.618,迭代式如下：  
$u_k=a_k+0.382* (b_k - a_k)$
$v_k=a_k+0.618* (b_k - a_k)$


## 梯度下降法

沿着负梯度方向，$f(x)$下降的最快，因此有这么一种迭代求最优的方法
$x_{k+1}=x_k-\rho_k \nabla f(x_k)$  

### 最速下降法
梯度下降法(gradient)或最速下降法(steepest descent)  
沿着负梯度方向，做一维搜索（可以是黄金分割法或其它算法），找到这个方向上的最小值点。   
在新的点上，按同样的方法继续沿着负梯度方向一维搜索   

这里有一个规律：相邻两次的搜索方向是正交的

输入：目标函数$f(x)$,梯度函数$g(x)=\nabla f(x)$, 精度$\epsilon$  


输出：$f(x)$的极小值点$x^* $  


算法：  
step1：取初始值$x_0,k=0$  
step2: 计算$f(x_k)$  
step3: 计算$g_k=g(x_k)$, 如果$\lVert g_k \rVert <\epsilon$,$x^* =x_k$ 算法终止。否则求出：  
$\lambda_k=\arg\min\limits_{\lambda \geq 0}f(x_k-\lambda g(x_k))$  
step4: $x_{k+1}=x_k-\lambda_k g(x_k)$  
如果$\lVert f(x_{k+1})-f(x_k)\rVert <\epsilon$或者$\lVert x_{k+1}-x_k\rVert < \epsilon$，那么$x^* =x_k$，并且算法终止  
step5: k=k+1，转到3  


### 共轭梯度法
前提：二阶可微  
思路：共轭梯度法用于二次函数。也可以推广到一般函数时，认为局部是二次函数。  


Q-共轭
:    $p_i Q p_j =0$叫做$p_i,p_j$是 **Q-共轭** 的  


目标函数为二次函数$f(x)=\dfrac{1}{2}x^T Qx+b^Tx+c$，其中Q为实对称矩阵，$x=(x_1,...,x_n)^T$  
那么可以找到一组基$$\{ p_1,p_2,...p_n\}$$，这组基两两 **Q-共轭**  
在这组基下，$f(x)$转化为这个形式$f(x)=f_1(x_1)+f_2(x_2)+...+f_n(x_n)$  
对于这个形式，只需要沿着每个坐标轴进行一次一维搜索，就可以找到全局最优解（总共n次搜索）  
整个算法围绕如何找到这一组基展开  


算法如下  
**step1**：任选一个初始点$x^{(1)}\in R^n$,令$p_1=-\nabla f(x^{(1)}), k=1$  
**step2**：若$\nabla f(x^{(k)})=0$，算法终止；否则  
$x^{(k+1)}=x^{(k)}+\alpha_k p_k$  
$\alpha_k=\dfrac{-p_k^T \nabla f(x^{(k)})}{p_k^T Q p_k}$  
$p_{k+1}=-\nabla f(x^{(k+1)})+\lambda_kp_k$  
$\lambda_k=\dfrac{p_k^T Q\nabla f(x^{(k+1)})}{p_k^T Q p_k}$  
**step3**：k=k+1，返回step2  


可以证明，以上算法得到的$p_1,p_2,...p_n$两两Q-共轭，因此迭代n次后，一定得到最优解。  


对于一般二阶可谓函数$f(x)$，在每个局部  
$f(x) \thickapprox f(x^{(x)})^T(x-x^{(k)})+\dfrac{1}{2}(x-x^{(k)})\nabla^2 f(x^{(k)})(x-x^{(k)})$  
用Hesse矩阵来作为二次函数中的Q是合理的。  
进一步说，Hesse矩阵计算量巨大，考虑进一步优化，幸运的是这个成立：$\lambda_k=\dfrac{\lVert \nabla f(x^{(k+1)})\rVert^2}{\lVert \nabla f(x^{(k)})\rVert^2}$  


算法如下  
**step1**：任选一个初始点$x^{(1)}\in R^n$,令$d_1=-\nabla f(x^{(1)}), k=1$  
**step2**：若$\nabla f(x^{(k)})=0$，算法终止；否则  
$x^{(k+1)}=x^{(k)}+\alpha_k d_k$  
$\alpha_k=\arg\min f(x^{(k)}+\alpha d_k)$  
$d_{k+1}=-\nabla f(x^{(k+1)})+\lambda_kd_k$  
$\lambda_k=\dfrac{\lVert \nabla f(x^{(k+1)})\rVert^2}{\lVert \nabla f(x^{(k)})\rVert^2}$  
**step3**：k=k+1，返回step2  



目标函数是二次函数时，用共轭方向作为搜索方向。  
一般的二阶可微函数，局部近似视为二次函数，用共轭方向作为搜索。  

## 牛顿法

牛顿法(Newton method)和拟牛顿法(quasi Newton method), 优点是收敛速度快。  
牛顿法每一步需要求解Hesse矩阵的逆矩阵。  
拟牛顿法用正定矩阵近似Hesse矩阵的逆矩阵，进一步简化了运算。  

### 牛顿法
特点：
- 需要知道一阶导数和二阶导数。   
- 牛顿法收敛速度非常快。  
- 如果二阶梯度不正定，可能不收敛  


原理：  
- 二阶可微函数，局部近似视为二次函数，搜索方向和大小可以立即用解析式确定。  
- 反复迭代。  


考虑无约束最优化问题$\min\limits_{x\in E_n} f(x)$  
梯度为$g_k(x)$, Hesse矩阵为$H(x)=[\dfrac{\partial^2 f}{\partial x_i \partial x_j}]_ {n \times n}$  


二阶泰勒展开：$f(x)=f(x_k)+g^T(x_k)(x-x_k)+1/2 (x-x_k)^T H(x_k)(x-x_k)$  
两边求一阶导数，$\nabla f(x)=H(x_k)(x-x_k)+g^T(x_k)$  
根据最优性条件$\nabla f(x)=0$,得出$x^* - x_k = -Q^{-1}b$  


利用极小值的必要条件$\nabla f(x)=0$，推出  
$x=x_k-H^{-1}(x_k)g(x_k)$  


所以，迭代方法为$x_{k+1}=x_k-H^{-1}(x_k)g(x_k)$  


算法流程：  
输入：$f(x), g(x)=\nabla f(x), H(x)$，精度要求$\varepsilon$  
step1: 取初始点$x_0, k=0$  
step2: 计算$g_k=g(x_k)$，if $\mid \mid g_k \mid \mid<\varepsilon$ : $x^* =x_k$,停止运算  
step3：计算$H_k=H(x_k)$，求$p_k$，使得$H_kp_k=-g_k$  
step4: $x_{k+1}=x_k+p_k$  
step5: $k=k+1$转到2


### 拟牛顿法

牛顿法中，需要计算Hesse矩阵的逆矩阵，这一计算较为复杂
所以考虑用$G$去逼近$H^{-1}$  
包括DFP算法  
BFGS算法
Broyden算法

### 修正牛顿法
如果二阶梯度不正定，牛顿法可能不收敛，为解决这个问题，引入修正牛顿法。  


## 参考资料
施光燕：《最优化方法》，高等教育出版社  
龚纯：《Matlab最优化计算》，电子工业出版社  
David R. Anderson ：《数据、模型与决策--管理科学篇》，机械工业出版社  
https://blog.csdn.net/johnnyconstantine/article/details/46335763  
http://www.jianshu.com/p/96db9a1d16e9  
http://www.cnblogs.com/zhangchaoyang/articles/2726873.html  
