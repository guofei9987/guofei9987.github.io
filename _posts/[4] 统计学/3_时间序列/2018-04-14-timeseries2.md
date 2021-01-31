---
layout: post
title: 【统计时序】非平稳数据的处理
categories:
tags: 4-3-时间序列
keywords:
description:
order: 450
---

对于不平稳的时序数据，一种思路是转化为平稳数据，也就是分解出趋势性、季节性、随机性  





## 差分
[Cramer 分解定理](http://www.guofei.site/2017/07/06/basictimeseries.html#title3)在理论上保证了适当阶数的差分一定可以充分提取确定性信息  
差分运算实际上也是某种自回归方式  
$\nabla^d=x_t=(1-B)^d x_t\sum\limits_{i=0}^d(-1)^iC_d^i x_{t-i}$  


足够多次数的差分可以充分提取原序列中的非平稳确定性信息  
过渡差分会损失有用信息  
（可以用方差来检验是否过渡差分）  


例如，
$x_t=bt+a_t$  
那么,  $\nabla^1 x_t$方差为$2\sigma_\varepsilon$  
$\nabla^2 x_t$方差为$6\sigma_\varepsilon$  


### 差分处理趋势性

对于线性趋势考虑一阶差分  
对于曲线趋势，继续差分，直到信息完全提取  


### 差分处理季节性
以周期为步长，做s步差分  
$W_t=\nabla_s^D Y_t$  


## ARIMA
就是差分用于ARMA模型   
具体略过  


随机游走模型(背景略，模型结构如下)  
$x_t=x_{t-1}+\varepsilon_t$  
$E\varepsilon_t=0,Var(\varepsilon_t)=\sigma_\varepsilon^2,E(\varepsilon_t\varepsilon_s)=0,s\neq t$  
$Ex_s\varepsilon_t=0,\forall s<t$  


**随机游走模型实际上就是ARIMA(0,1,0)**  


### ARIMA的性质
ARIMA(p,d,q)  

当$d\neq 0$时，模型非平稳  


当$d\neq 0$时，原序列方差非齐性  
当$d=0$时，原序列方差齐性  
以ARIMA(0,1,0)为例，  
$VAR(x_t)=t\sigma_\varepsilon^2$  
$VAR(\nabla x_t)=\sigma_\varepsilon^2$  


## 疏系数模型
疏系数模型就是ARIMA(p,d,q)模型，但其中部分系数为0  
记做$ARIMA((p_1,...,p_m),d,(q_1,q_2,...q_n))$  
其中，$p_i,q_j$代表非0的系数


例如，ARIMA((1,3),1,2)表示二阶自回归系数为0  


至于参数计算，就是用经典的MLE方法啦

## 季节模型
模型本身另一篇博客里讲解过。  
### 简单季节模型
假设$x_t=S_t+T_t+I_t$  
$\nabla_D\nabla^d x_t=\dfrac{\Theta(B)}{\Phi(B)}\varepsilon_t$  

### 乘积季节模型
$\nabla^d\nabla_S^D x_t=\dfrac{\Theta(B)}{\Phi (B)}\dfrac{\Theta_S(B)}{\Phi_S (B)} \varepsilon_t$  

## 残差自相关性
Auto-Regressive  
$x_t=T_t+S_t+\varepsilon_t$  
没什么新东西，主要是对$\varepsilon_t$做ARIMA  
还有DW检验等，与线性回归很类似了。  

## 残差异方差性
跟回归的残差异方差性一样的处理方法
看这里[【回归分析】理论与实现.](http://www.guofei.site/2017/11/22/regression.html)

### 方差齐性变化
（前提是需要事先知道异方差的形式）  
具体内容见于 [【回归分析】理论与实现.](http://www.guofei.site/2017/11/22/regression.html)  

### 条件异方差模型
ARCH  
GARCH  
EGARCH  
AR-GARCH  



## 参考资料
[小象学院-时间序列分析](http://www.chinahadoop.cn/course/953)  
易丹辉《统计预测：方法与应用》，人民大学出版社  
庞皓《计量经济学》，科学出版社（十二五规划教材）  
赵国庆《计量经济学》，中国人民大学出版社（十一五规划教材）  
