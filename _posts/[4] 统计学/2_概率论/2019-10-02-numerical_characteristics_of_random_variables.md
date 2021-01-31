---
layout: post
title: 随机变量的数字特征
categories:
tags: 4-2-概率论
keywords: entropy, conditional entropy
description:
order: 422
---

## 期望
$\int xp(x)dx$  

复合随机变量的期望
$Y=g(x)$，那么
$EY=\int g(x)p(x) dx$  
(然后，根据$DX=EX^2-(EX)^2$，可以计算$DY$)

对于多元复合函数，一样  
$Z=g(X,Y)$，那么  
$EZ=\iint g(x,y) p(x,y) dxdy$

### 数学期望的性质
- $E(X+Y)=EX+EY$
- 如果相互独立，则 $EXY=EXEY$

定理（柯西不等式）  
如果$EX,EY,EX^2,EY^2$都存在，那么$[E(XY)]^2\leq EX^2EY^2$  
证明：构造$E(\lambda X+Y)^2$，这个值恒为非负。  
展开，用二次函数恒为非负的判定公式。  

## 方差
定义：  
$DX=E[X-EX]^2$
### 性质
$D(aX+b)=a^2DX$

## 协方差
定义：  
（首先要求方差存在）$Cov(X,Y)=E[(X-EX)(Y-EY)]$  

### 性质
- $Var(X)=Cov(X,X)$
- $Cov(X,Y)=Cov(Y,X)$
- $Cov(aX,bY)=abCov(X,Y)$
- $Cov(X_1+X_2,Y)=Cov(X_1,Y)+Cov(X_2,Y)$
- $Var(aX+bY)=a^2Var(X)+b^2Var(Y)+2abCov(X,Y)$
- $Cov(X,Y)=EXY-EXEY$

## 相关系数
定义：
$\rho_{XY}=\dfrac{Cov(X,Y)}{\sqrt{Var(X)Var(Y)}}$

### 性质
一下四个命题等价
- $Cov(X,Y)=0$
- X与Y不相关
- $EXY=EXEY$
- $Var(X+Y)=Var(X)+Var(Y)$

不相关不一定独立，独立一定不相关，反例：  
$U\sim U(-\pi,\pi), X=\sin\theta, Y=\cos\theta$  
这两个不相关，但是独立。

但是，对于多维正态分布，不相关一定是独立的。  
（再加一条，边缘分布是正态分布，联合分布未必是多维正态分布）

## 条件期望和条件方差
（这里的$\sum$和$\int$是相通的，分别用于离散概率和连续概率，就只写一种）
### 条件概率

给定一个`样本空间`S，一个`完全事件集合`$$\varepsilon=\{A \mid A \subset S\}$$,一个`概率测度` $Pr:\varepsilon \to [0,1]$，  
给定事件$B\in \varepsilon,Pr(B)>0$,  
那么，对于$A \in \varepsilon$，定义 **条件概率** 为$Pr(A \mid B)=\dfrac{P(A \cap B)}{P(B)}$  

这种定义的好处是，$Pr(\star \mid B)$符合[概率测度的定义](http://www.guofei.site/2017/08/02/randomvariable.html)  

### 条件PDF

假设联合pdf是$f(x,y)$  
定义：$f_{X\mid Y}(x\mid y)=\dfrac{f(x,y)}{f_Y(y)}$  


定理： $f_X(x)=\sum\limits_{y} f_{X\mid Y}(x\mid y)f_Y(y)$

（下面就省略下标，例如$f_{X\mid Y}(x\mid y)$简写为$f(x\mid y)$，要知道$f(x),f(y),f(x\mid y)$是不同的函数，别弄混了）  
### 条件期望

**联合期望** 定义为：  
$E[g(x_1,x_2)]=\sum\limits_{(x_1,x_2)}g(x_1,x_2)f(x_1,x_2)$  

**条件期望** 定义为：  
$E[X \mid Y=y]=\sum\limits_{x} x f(x \mid y)$  
记为$E(X\mid Y=y)$  

注意:  
$E(X\mid Y=y)$ 是自变量为$y$的函数  
又记$E(X\mid Y)$ 是Y的函数，它本身是一个随机变量。  

#### 全期望定理(law of total expactation)
**全期望定理**(law of total expactation)  
$E_{Y}[E_{X\mid Y}[X \mid Y]]=\sum\limits_{y}E(X\mid Y=y)f_Y(y)$  
也就是说，  
$E[X]=E[E[X \mid Y]]$  

### 条件方差
**方差** 定义为：  
$E[(X-EX)^2]$  
定理：  
$Var(X)=EX^2-(EX)^2$  


**条件方差** 定义为：  
$Var(X\mid Y=y)=E[(X-E(X\mid Y=y))^2\mid Y=y]$  

（上面的式子，右边代入定义，得到一个定理）  
$Var(X\mid Y=y)=E(X^2\mid Y=y)-(E(X\mid Y=y))^2$  

记$Var(X\mid Y)$是Y的函数，它本身是一个随机变量。得到一个定理  
定理：$Var[X]=E[Var[X \mid Y]]+Var[E[X\mid Y]]$  
证明过程，推荐在纸上推导一下细节。  
- 第一项。$Var[X\mid Y]=E[X^2\mid Y]-(E[X\mid Y])^2$，然后用全期望定理
- 第二项。也是把方差转换为期望表示，然后用全期望定理





### 条件期望和条件方差汇总
$f(x\mid y)=f(x,y)/f_Y(y)$  
$Var X =EX^2-(EX)^2$  
$E(X\mid Y)=\sum\limits_x f(x \mid y)$  
$Var(X\mid Y)=\sum\limits_x(x-u_{x\mid y})^2f(x\mid y)$  
$EX=E(E(x\mid y))$  
$VarX=E(Var(X\mid Y))+Var(E(X\mid Y))$  

## 其它数学特征

### 距
- k阶原点距 $EX^k$
- k阶中心距 $E(X-EX)^k$

### 变异系数
$C=\dfrac{Var(X)}{EX}$

### 中位数和分位数
- 中位数$F(x)=0.5$的解
- 下分位数$F(x)=a$的解
- 上分位数$F(x)=1-a$的解

### 众数
众数就不多说了。

## 多元随机变量：矩阵表示
$$x=\left ( \begin{array}{ccc}  x_1\\x_2\\x_3\\...\\x_k \end{array} \right ),
y=\left ( \begin{array}{ccc}  y_1\\y_2\\y_3\\...\\y_k \end{array} \right )$$是随机变量矩阵  
a,b是常数，
$$c=\left ( \begin{array}{ccc}  c_1\\c_2\\c_3\\...\\c_k \end{array} \right ),
d=\left ( \begin{array}{ccc}  d_1\\d_2\\d_3\\...\\d_k \end{array} \right )$$是常数向量  
$A,B$是矩阵

那么有这些结论：  
#### 1. 定义均值和方差
$$Ex=\left ( \begin{array}{ccc}  Ex_1\\Ex_2\\Ex_3\\...\\Ex_k \end{array} \right )$$  
定义:$cov(x,y)=(cov(x_i,y_j))_ {p\times p}$
#### 2. 线性组合
$E(ax+c)=aEx+c$  
$D(bx+c)=b^2Dx$  


$E(Ax)=AE(x),E(x^TA^T)=E(x^T)A^T$  
$cov(c^Tx,d^Tx)=c^T D(x) d$  
（所以$D(c^Tx)=c^T D(x) c$）  

#### 3. 线性组合plus
$cov(y,x)=(cov(x,y))^T$  
$cov(Ax,y)=A cov(x,y)$(用定义展开立即可证)  
$cov(x,By)=(cov(By,x))^T=(Bcov(y,x))^T=(cov(y,x))^TB^T=cov(x,y)B^T$  


由上面两个式子，  
$cov(Ax,By)=Acov(x,y)B^T$  
