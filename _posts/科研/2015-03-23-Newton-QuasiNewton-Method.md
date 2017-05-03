---
layout: post
title: 牛顿法与拟牛顿法（DFP BFGS LBFGS VLBFGS）
category: 科研
tags: Math Optimization 
keywords: 拟牛顿法
description: 
---

最近做LBFGS的并行，顺便把牛顿法、拟牛顿法顺理一下。

拟牛顿法是求解非线性优化问题最有效的方法之一。考虑无约束的极小化问题<a href="http://www.codecogs.com/eqnedit.php?latex=\min\limits_x&space;f(x)" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\min\limits_x&space;f(x)" title="\min\limits_x f(x)" /></a>，假设<a href="http://www.codecogs.com/eqnedit.php?latex=f(x)" target="_blank"><img src="http://latex.codecogs.com/gif.latex?f(x)" title="f(x)" /></a>为凸函数，且二阶连续可导。

###原始牛顿法
基本思想：在现有极小点估计值的附近对f(x)进行二阶泰勒展开，进而找到下一个极小点的估计值

<a href="http://www.codecogs.com/eqnedit.php?latex=x_{k&plus;1}=x_{k}-(H_k)^{-1}g_{k},&space;k=0,1,\cdots" target="_blank"><img src="http://latex.codecogs.com/gif.latex?x_{k&plus;1}=x_{k}-(H_k)^{-1}g_{k},&space;k=0,1,\cdots" title="x_{k+1}=x_{k}-(H_k)^{-1}g_{k}, k=0,1,\cdots" /></a>

牛顿法具有二次收敛性，但当目标函数非二次型时，牛顿法不能保证函数稳定地下降（缺点）。


###阻尼牛顿法
每次迭代前需要沿迭代方向<a href="http://www.codecogs.com/eqnedit.php?latex=d_k=-(H_k)^{-1}g_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?d_k=-(H_k)^{-1}g_k" title="d_k=-(H_k)^{-1}g_k" /></a>做线搜索，寻求最优的步长因子<a href="http://www.codecogs.com/eqnedit.php?latex=\lambda_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\lambda_k" title="\lambda_k" /></a>，即

<a href="http://www.codecogs.com/eqnedit.php?latex=\lambda_k&space;=&space;\arg\min\limits_{\lambda}&space;f(x_k&plus;\lambda&space;d_k)" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\lambda_k&space;=&space;\arg\min\limits_{\lambda}&space;f(x_k&plus;\lambda&space;d_k)" title="\lambda_k = \arg\min\limits_{\lambda} f(x_k+\lambda d_k)" /></a>


###拟牛顿法
基本思想：不使用二阶偏导数而构造出可以近似Hession或Hession的逆的正定对称阵，在“拟牛顿”的条件下优化目标函数。

先推导拟牛顿条件：在<a href="http://www.codecogs.com/eqnedit.php?latex=x_{k&plus;1}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?x_{k&plus;1}" title="x_{k+1}" /></a>附近对<a href="http://www.codecogs.com/eqnedit.php?latex=f(x)" target="_blank"><img src="http://latex.codecogs.com/gif.latex?f(x)" title="f(x)" /></a>做泰勒展开，取二阶近似项

<a href="http://www.codecogs.com/eqnedit.php?latex=f(x)=f(x_{k&plus;1})&plus;\nabla&space;f(x_{k&plus;1})(x-x_{k&plus;1})&plus;\frac{1}{2}(x-x_{k&plus;1})^T\nabla^2&space;f(x_{k&plus;1})(x-x_{k&plus;1})" target="_blank"><img src="http://latex.codecogs.com/gif.latex?f(x)=f(x_{k&plus;1})&plus;\nabla&space;f(x_{k&plus;1})(x-x_{k&plus;1})&plus;\frac{1}{2}(x-x_{k&plus;1})^T\nabla^2&space;f(x_{k&plus;1})(x-x_{k&plus;1})" title="f(x)=f(x_{k+1})+\nabla f(x_{k+1})(x-x_{k+1})+\frac{1}{2}(x-x_{k+1})^T\nabla^2 f(x_{k+1})(x-x_{k+1})" /></a>
推出

<a href="http://www.codecogs.com/eqnedit.php?latex=\nabla&space;f(x)\approx&space;\nabla&space;f(x_{k&plus;1})&plus;H_{k&plus;1}(x-x_{k&plus;1})" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\nabla&space;f(x)\approx&space;\nabla&space;f(x_{k&plus;1})&plus;H_{k&plus;1}(x-x_{k&plus;1})" title="\nabla f(x)\approx \nabla f(x_{k+1})+H_{k+1}(x-x_{k+1})" /></a>
取<a href="http://www.codecogs.com/eqnedit.php?latex=x=x_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?x=x_k" title="x=x_k" /></a>，推出

<a href="http://www.codecogs.com/eqnedit.php?latex=g_{k&plus;1}-g_{k}\approx&space;H_{k&plus;1}(x_{k&plus;1}-x_k)" target="_blank"><img src="http://latex.codecogs.com/gif.latex?g_{k&plus;1}-g_{k}\approx&space;H_{k&plus;1}(x_{k&plus;1}-x_k)" title="g_{k+1}-g_{k}\approx H_{k+1}(x_{k+1}-x_k)" /></a>

引入记号 <a href="http://www.codecogs.com/eqnedit.php?latex=s_k=x_{k&plus;1}-x_{k},&space;y_k=g_{k&plus;1}-g_{k}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?s_k=x_{k&plus;1}-x_{k},&space;y_k=g_{k&plus;1}-g_{k}" title="s_k=x_{k+1}-x_{k}, y_k=g_{k+1}-g_{k}" /></a>， 推出

<a href="http://www.codecogs.com/eqnedit.php?latex=y_k=H_{k&plus;1}s_k&space;,&space;s_k=H^{-1}_{k&plus;1}y_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?y_k=H_{k&plus;1}s_k&space;,&space;s_k=H^{-1}_{k&plus;1}y_k" title="y_k=H_{k+1}s_k , s_k=H^{-1}_{k+1}y_k" /></a>(`拟牛顿条件`)

它迭代过程中的hession矩阵做约束，因此，对hession对近似的<a href="http://www.codecogs.com/eqnedit.php?latex=B_{k&plus;1}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?B_{k&plus;1}" title="B_{k+1}" /></a>，以及对hession的逆做近似的<a href="http://www.codecogs.com/eqnedit.php?latex=D_{k&plus;1}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?D_{k&plus;1}" title="D_{k+1}" /></a>，可以将

<a href="http://www.codecogs.com/eqnedit.php?latex=y_{k}=B_{k&plus;1}s_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?y_{k}=B_{k&plus;1}s_k" title="y_{k}=B_{k+1}s_k" /></a> 或 <a href="http://www.codecogs.com/eqnedit.php?latex=s_{k}=D_{k&plus;1}y_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?s_{k}=D_{k&plus;1}y_k" title="s_{k}=D_{k+1}y_k" /></a> 作为指导。



####DFP算法（Davidon–Fletcher–Powell formula）

核心：通过迭代的方法，对hession的逆做近似。迭代格式为

<a href="http://www.codecogs.com/eqnedit.php?latex=D_{k&plus;1}=D_k&plus;\Delta&space;D_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?D_{k&plus;1}=D_k&plus;\Delta&space;D_k" title="D_{k+1}=D_k+\Delta D_k" /></a>（通常<a href="http://www.codecogs.com/eqnedit.php?latex=D_0=I" target="_blank"><img src="http://latex.codecogs.com/gif.latex?D_0=I" title="D_0=I" /></a>）

猜想<a href="http://www.codecogs.com/eqnedit.php?latex=\Delta&space;D_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Delta&space;D_k" title="\Delta D_k" /></a>待定为<a href="http://www.codecogs.com/eqnedit.php?latex=\Delta&space;D_k=\alpha&space;\mathbf{u}&space;\mathbf{u}^{\mathrm{T}}&plus;\beta\mathbf{v}\mathbf{v}^{\mathrm{T}}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Delta&space;D_k=\alpha&space;\mathbf{u}&space;\mathbf{u}^{\mathrm{T}}&plus;\beta\mathbf{v}\mathbf{v}^{\mathrm{T}}" title="\Delta D_k=\alpha \mathbf{u} \mathbf{u}^{\mathrm{T}}+\beta\mathbf{v}\mathbf{v}^{\mathrm{T}}" /></a>（具有对称性）

<a href="http://www.codecogs.com/eqnedit.php?latex=\Rightarrow&space;s_k=D_ky_k&plus;\alpha\mathbf{u}\mathbf{u}^{\mathrm{T}}y_k&plus;\beta\mathbf{v}\mathbf{v}^{\mathrm{T}}y_k=D_ky_k&plus;(\alpha\mathbf{u}^{\mathrm{T}}y_k)\mathbf{u}&plus;(\beta\mathbf{v}^{\mathrm{T}}y_k)\mathbf{v}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Rightarrow&space;s_k=D_ky_k&plus;\alpha\mathbf{u}\mathbf{u}^{\mathrm{T}}y_k&plus;\beta\mathbf{v}\mathbf{v}^{\mathrm{T}}y_k=D_ky_k&plus;(\alpha\mathbf{u}^{\mathrm{T}}y_k)\mathbf{u}&plus;(\beta\mathbf{v}^{\mathrm{T}}y_k)\mathbf{v}" title="\Rightarrow s_k=D_ky_k+\alpha\mathbf{u}\mathbf{u}^{\mathrm{T}}y_k+\beta\mathbf{v}\mathbf{v}^{\mathrm{T}}y_k=D_ky_k+(\alpha\mathbf{u}^{\mathrm{T}}y_k)\mathbf{u}+(\beta\mathbf{v}^{\mathrm{T}}y_k)\mathbf{v}" /></a>

括号中是数值，将其分别简单赋值为1，-1，即

<a href="http://www.codecogs.com/eqnedit.php?latex=\alpha=\frac{1}{\mathbf{u}^{\mathrm{T}}y_k},\beta=-\frac{1}{\mathbf{v}^{\mathrm{T}}y_k}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\alpha=\frac{1}{\mathbf{u}^{\mathrm{T}}y_k},\beta=-\frac{1}{\mathbf{v}^{\mathrm{T}}y_k}" title="\alpha=\frac{1}{\mathbf{u}^{\mathrm{T}}y_k},\beta=-\frac{1}{\mathbf{v}^{\mathrm{T}}y_k}" /></a>

其中向量u,v仍有待确定，由上面

<a href="http://www.codecogs.com/eqnedit.php?latex=\Rightarrow&space;\mathbf{u}-\mathbf{v}=s_k-D_ky_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Rightarrow&space;\mathbf{u}-\mathbf{v}=s_k-D_ky_k" title="\Rightarrow \mathbf{u}-\mathbf{v}=s_k-D_ky_k" /></a>（要此式成立，不妨直接取<a href="http://www.codecogs.com/eqnedit.php?latex=\mathbf{u}=s_k,\mathbf{v}=D_ky_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\mathbf{u}=s_k,\mathbf{v}=D_ky_k" title="\mathbf{u}=s_k,\mathbf{v}=D_ky_k" /></a>）

<a href="http://www.codecogs.com/eqnedit.php?latex=\Rightarrow&space;\alpha=\frac{1}{s^{\mathrm{T}}_ky_k},\beta=-\frac{1}{y^{\mathrm{T}}_kD_ky_k}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Rightarrow&space;\alpha=\frac{1}{s^{\mathrm{T}}_ky_k},\beta=-\frac{1}{y^{\mathrm{T}}_kD_ky_k}" title="\Rightarrow \alpha=\frac{1}{s^{\mathrm{T}}_ky_k},\beta=-\frac{1}{y^{\mathrm{T}}_kD_ky_k}" /></a>

至此，校正矩阵<a href="http://www.codecogs.com/eqnedit.php?latex=\Delta&space;D_k" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Delta&space;D_k" title="\Delta D_k" /></a>就已经构造出来了

<a href="http://www.codecogs.com/eqnedit.php?latex=\Rightarrow&space;\Delta&space;D_k=\frac{s_ks_k^{\mathrm{T}}}{s_k^{\mathrm{T}}y_k}-\frac{D_ky_ky_k^{\mathrm{T}}D_k}{y_k^{\mathrm{T}}D_ky_k}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?\Rightarrow&space;\Delta&space;D_k=\frac{s_ks_k^{\mathrm{T}}}{s_k^{\mathrm{T}}y_k}-\frac{D_ky_ky_k^{\mathrm{T}}D_k}{y_k^{\mathrm{T}}D_ky_k}" title="\Rightarrow \Delta D_k=\frac{s_ks_k^{\mathrm{T}}}{s_k^{\mathrm{T}}y_k}-\frac{D_ky_ky_k^{\mathrm{T}}D_k}{y_k^{\mathrm{T}}D_ky_k}" /></a>


####BFGS算法（Broyden–Fletcher–Goldfarb–Shanno algorithm）
核心公式的推导过程与DFP完全类似，只是互换了其中s{k}和y{k}的位置。BFGS直接逼近Hession矩阵B_k。(公式敲起来太累了，请自行推导)


####LBFGS算法(limited-memory BFGS)
不再存储完整的D_k，而是存储计算过程中的向量序列{s}，{y}。当需要矩阵D_k时，利用向量序列的计算来代替。并且，向量序列也不是全部存储，而是固定存最新的m个。

若要实现并行，需要同时在x与梯度（影响y的计算）那儿求一致平均。


###资料

【1】[DFP算法](http://en.wikipedia.org/wiki/Davidon%E2%80%93Fletcher%E2%80%93Powell_formula)

【2】[BFGS算法](http://en.wikipedia.org/wiki/Broyden%E2%80%93Fletcher%E2%80%93Goldfarb%E2%80%93Shanno_algorithm)

【3】[LBFGS算法](http://en.wikipedia.org/wiki/Limited-memory_BFGS)

【4】[Large-scale L-BFGS using MapReduce](http://papers.nips.cc/paper/5333-large-scale-l-bfgs-using-mapreduce.pdf)





