---
layout: post
title: 【统计时序1】工具
categories:
tags: 4-3-时间序列
keywords:
description:
order: 441
---

## 统计时序的基本概念
### 定义
随机序列
:  按时间排序与的一组随机变量  
$..., X_1, X_2, ..., X_t,...$  


观察值序列  
: $x_1, x_2, ..., x_t$  


我们的目的是 **通过观察值序列，去推断随机序列的性质** 。  
### 概率分布族
$F_{t_1,t_2,...,t_m}(x_1,x_2,...,x_m)$

### 特征统计量
均值$u_t=EX_t=\int_{-\infty}^{+\infty}xdF_t(x)$  
方差$DX_t=\int_{-\infty}^{+\infty}(x-u_t)dF_t(x)$  
自协方差$\gamma(t,s)=E(X_t-u_t)(X_s-u_s)$  
自相关系数$\rho(t,s)=\dfrac{\gamma(t,s)}{\sqrt{DX_t DX_s}}$  


## 方法性工具
### 1. 差分算子
**一阶差分** $\nabla x_t=x_t-x_{t-1}$  
**p阶差分** $\nabla^p x_t=\nabla^{p-1} x_t-\nabla^{p-1} x_{t-1}$  
**k步差分** $\nabla_k=x_t-x_{t-k}$  
### 2. 延迟算子
相当于把当前序列值得时间向过去拨了1个时刻
$x_{t-p}=B^p x_t$,  


例如，$x_{t-1}=Bx_t,x_{t-2}=B^2x_t,$  
$\nabla^1 x_t=(1-B)x_t,\nabla^2x_t=(1-B)^2 x_t$  

#### 2-1. 延迟算子的性质
$B^0=1$  
$B(cx_t)=cBx_t$  
$B(x_t+y_t)=Bx_t+By_t$  
$B^n x_t=x_{t-n}$  
$(1-B)^n=\sum(-1)^n C_n^iB^i$  


$\nabla^p x_t=(1-B)^px_t$  
$\nabla_k x_t=(1-B^k)x_t$  
### 3. 线性差分方程
线性差分方程
: $z_t+a_1z_1+a_2z_2+...+a_pz_p=h(t)$  

齐次线性差分方程
: $z_t+a_1z_{t-1}+a_2z_{t-2}+...+a_pz_{t-p}=0$  


#### 3-1. 解齐次线性差分方程
step1：特征方程: $\lambda^p+a_1\lambda^{p-1}+a_2\lambda^{p-2}+...+a_p=0$  
step2：特征方程的根称为特征根，记为$\lambda_1,\lambda_2,...\lambda_p$  
step3：齐次差分方程的通解为：  
不相等的实数根：$z_t=c_1\lambda_1^t+c_2\lambda_2+...+c_p\lambda_p^t$  
有相等的实数根：$z_t=(c_1+c_2t+...+c_dt^{d-1})\lambda_1^t+c_{d+1}^t+...+c_p\lambda_p^t$  
复根：$z_t=r^t(c_1e^{itw}+c_2e^{-itw})+c_3\lambda_3^t+...+c_p\lambda_p^t$  
#### 3-2. 解非齐次线性差分方程
求非齐次线性差分方程的任意特解$z_t''$  
求齐次线性差分方程的通解$z_t'$  
非齐次线性差分方程的通解为$z_t=z_t''+z_t'$  



## 参考资料
[小象学院-时间序列分析](http://www.chinahadoop.cn/course/953)  
易丹辉《统计预测：方法与应用》，人民大学出版社  
庞皓《计量经济学》，科学出版社（十二五规划教材）  
赵国庆《计量经济学》，中国人民大学出版社（十一五规划教材）  
