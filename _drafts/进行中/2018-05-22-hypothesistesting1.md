---
layout: post
title: 【实验设计】理论篇
categories:
tags: 4统计模型
keywords:
description:
order: 407
---

## 方差分析
### 单因素方差分析
上一篇文章已经设计方差分析了，这里详细分析。   
前提假设  
$x_{ij}=u+\delta_i+\varepsilon_{ij}$  
$\varepsilon_{ij \sim N(0,\sigma^2)}$  


H0:$\delta_1=\delta_2=...=\delta_a=0$

### 双因素方差分析
前提假设
$x_{ij}=u+a_i+b_j+\varepsilon_{ij}$  
$\varepsilon_{ij}\sim N(0,\sigma^2)$  
$\sum a_i =\sum b_j=0$  


H0：
$a_i=b_j=0,\forall i,j$  

## 正交试验设计
$L_n(m^k)$  
n是表的行数，也就是安排实验的次数  
k是表的列数，也就是因素的个数
m是每个因素的水平数，表的主题部分，每列最多出现m种数据。
