---
layout: post
title: 逻辑回归
categories: 模型
tags: 统计
keywords: model evaluation
description:
---

 logistic regression, logit regression, logit model这三个模型本质和用法几乎完全相同，因此这里不加区分

## logistic distribution

### 定义
CDF满足这个的随机变量叫做logistic distribution  
 $F(x; \mu, s) = \dfrac{1}{1+e^{-(x-\mu)/s}}$

### 性质
不难推导出PDF：  
$f(x; \mu,s) = \dfrac {e^{-(x-\mu)/s}} {s (1+e^{-(x-\mu)/s})^2}$

## logistic regression

### 模型
$P(Y=1|x)=\dfrac{\exp(wx)}{1+\exp(wx)}$  

$P(Y=0 \mid x)=\dfrac{1}{1+\exp(wx)}$  

### 策略

求参数的方法，就是经典的MLE方法。  
先求似然函数，  
$\prod \limits_{i=1}^N [P(Y=1|x)]^{y_i} [P(Y=0|x)]^{1-y_i}$  
取对数后求$argmax L(w)$  


$y|x$
