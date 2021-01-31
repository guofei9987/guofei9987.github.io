---
layout: post
title: 【丢弃】【随机变量】矩阵
categories:
tags:
keywords:
description:
order: 9510
---

丢弃原因：整合到 [随机变量的数字特征](http://www.guofei.site/2019/10/02/numerical_characteristics_of_random_variables.html)

## 随机变量矩阵的推导
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
