---
layout: post
title: 【感知机】理论简介
categories: old_ann
tags: 
keywords:
description:
order: 280
---

## 模型[^lihang]

假设
- input space: $\mathscr{X} \subset R^n$
- output space: $$\mathscr{Y} =\{1,-1 \}$$  
- feature vector: $x\in \mathscr{X}$  



模型是$f(x)=sign(wx+b)$  
其中,  
- weight vector(weight): $w\in R^n$
- bias: $b\in R$

## 策略

经验风险函数为：  
$L(w,b)=-\sum\limits_{i \in M} y_i (wx_i+b)$  

其中M是误分类点。  

## 算法

感知机用的是 **随机梯度下降法**(stochastic gradient descent)  

$\dfrac{\partial L}{\partial w}=- \sum\limits_{i \in M} y_i x_i$  
$\dfrac{\partial L}{\partial b}=- \sum\limits_{i \in M} y_i$  


原始算法：  
step1:随机生成初始值$w_0,b_0$  
step2:选取数据$(x_i,y_i)$  
step3:if $y_i(wx_i+b) \leq 0$:$w=w+\eta y_i x_i,b=b+\eta y_i$
step4:转到step2，直到误差足够小，或者达到最大迭代限制。  

### 算法实现

参见另一篇博客：[【Matlab】自编代码实现感知机](http://www.guofei.site/2016/05/06/MatlabPerceptron.html)


## 其它事项

1. 如果数据是线性可分的，那么感知机算法是收敛的
2. 如果数据是线性可分的，那么感知机存在无穷多组解




## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)
